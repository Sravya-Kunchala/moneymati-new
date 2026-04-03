"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";

if (typeof window !== "undefined") {
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;
}

const FLIP_MS   = 1200;
const ZOOM_MIN  = 0.5;
const ZOOM_MAX  = 3.0;
const ZOOM_STEP = 0.25;

function spreadPages(s: number) {
  if (s === 0) return { L: null as number | null, R: 1 as number };
  return { L: s * 2 as number, R: s * 2 + 1 as number };
}
function totalSpreads(n: number) { return n <= 0 ? 0 : 1 + Math.ceil((n - 1) / 2); }
function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }

function playFlip(dir: "fwd" | "bwd") {
  try {
    const AC  = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AC(), t = ctx.currentTime, dur = 0.55;
    const g   = ctx.createGain(); g.gain.value = 0.4; g.connect(ctx.destination);
    const buf = ctx.createBuffer(1, ctx.sampleRate * dur | 0, ctx.sampleRate);
    const d   = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const s = ctx.createBufferSource(); s.buffer = buf;
    const f = ctx.createBiquadFilter(); f.type = "bandpass";
    f.frequency.setValueAtTime(dir === "fwd" ? 2600 : 700, t);
    f.frequency.exponentialRampToValueAtTime(dir === "fwd" ? 700 : 2600, t + dur * 0.7);
    f.Q.value = 1.8;
    const ng = ctx.createGain();
    ng.gain.setValueAtTime(0.001, t); ng.gain.linearRampToValueAtTime(0.85, t + 0.025);
    ng.gain.setValueAtTime(0.85, t + dur * 0.18); ng.gain.exponentialRampToValueAtTime(0.001, t + dur * 0.78);
    s.connect(f); f.connect(ng); ng.connect(g); s.start(t); s.stop(t + dur);
    setTimeout(() => ctx.close(), (dur + 0.3) * 1000);
  } catch (_) {}
}

/* ── Canvas drawing helpers ─────────────────────────────────────────────── */

function drawSpread(
  cx: CanvasRenderingContext2D,
  W: number, H: number,
  leftPage:  HTMLCanvasElement | null,
  rightPage: HTMLCanvasElement | null,
  isCover?: boolean,
) {
  const pw = W / 2;
  cx.clearRect(0, 0, W, H);
  if (isCover && rightPage) { cx.drawImage(rightPage, 0, 0, W, H); return; }
  if (leftPage)  { cx.drawImage(leftPage,  0,   0, pw, H); }
  else           { cx.fillStyle = "#f8f8f8"; cx.fillRect(0, 0, pw, H); }
  if (rightPage) { cx.drawImage(rightPage, pw,  0, pw, H); }
  else           { cx.fillStyle = "#ffffff"; cx.fillRect(pw, 0, pw, H); }
  const sg = cx.createLinearGradient(pw - 5, 0, pw + 8, 0);
  sg.addColorStop(0,   "rgba(0,0,0,0.18)");
  sg.addColorStop(0.5, "rgba(0,0,0,0.07)");
  sg.addColorStop(1,   "rgba(0,0,0,0)");
  cx.fillStyle = sg;
  cx.fillRect(pw - 5, 0, 13, H);
}

function drawSinglePage(
  cx: CanvasRenderingContext2D,
  W: number, H: number,
  page: HTMLCanvasElement | null,
) {
  cx.clearRect(0, 0, W, H);
  if (page) { cx.drawImage(page, 0, 0, W, H); }
  else      { cx.fillStyle = "#f8f8f8"; cx.fillRect(0, 0, W, H); }
}

function drawCurl(
  cx: CanvasRenderingContext2D,
  W: number, H: number,
  progress: number,
  forward: boolean,
  srcPage:  HTMLCanvasElement | null,
  dstPage:  HTMLCanvasElement | null,
  bgLeft:   HTMLCanvasElement | null,
  bgRight:  HTMLCanvasElement | null,
  bgIsCover?: boolean,
) {
  cx.clearRect(0, 0, W, H);
  const pw = W / 2;
  const p  = ease(progress);

  if (bgIsCover && bgRight) { cx.drawImage(bgRight, 0, 0, W, H); }
  else {
    if (bgLeft)  cx.drawImage(bgLeft,  0,   0, pw, H);
    else         { cx.fillStyle = "#f8f8f8"; cx.fillRect(0, 0, pw, H); }
    if (bgRight) cx.drawImage(bgRight, pw,  0, pw, H);
    else         { cx.fillStyle = "#ffffff"; cx.fillRect(pw, 0, pw, H); }
  }

  const cornerX = forward ? W - p * (W + pw * 0.05) : p * (W + pw * 0.05);
  const originX = forward ? W : 0;
  const midX    = (originX + cornerX) / 2;

  const leanAmount  = pw * Math.sin(p * Math.PI) * 0.35;
  const foldTopX    = forward ? midX + leanAmount : midX - leanAmount;
  const foldBottomX = midX;
  const flDx = foldTopX - foldBottomX;
  const flDy = -H;
  const flLen = Math.sqrt(flDx * flDx + flDy * flDy);

  function reflectPoint(px: number, py: number) {
    const vx = px - foldBottomX, vy = py - H;
    const ux = flDx / flLen,     uy = flDy / flLen;
    const dot   = vx * ux + vy * uy;
    const projX = foldBottomX + dot * ux;
    const projY = H           + dot * uy;
    return { x: 2 * projX - px, y: 2 * projY - py };
  }

  const origTopFree = forward ? { x: W, y: 0 } : { x: 0, y: 0 };
  const rTop        = reflectPoint(origTopFree.x, origTopFree.y);
  const clampX      = forward ? (x: number) => Math.max(0, x) : (x: number) => Math.min(W, x);

  const frontTL = { x: pw,              y: 0 };
  const frontTR = { x: clampX(rTop.x), y: rTop.y };
  const frontBR = { x: clampX(forward ? W - p * (W + pw * 0.05) : p * (W + pw * 0.05)), y: H };
  const frontBL = { x: pw,              y: H };

  function drawImageInQuad(
    img: HTMLCanvasElement,
    tlX: number, tlY: number,
    trX: number, trY: number,
    brX: number, brY: number,
    blX: number, blY: number,
  ) {
    const SLICES = 64;
    for (let i = 0; i < SLICES; i++) {
      const t0 = i / SLICES, t1 = (i + 1) / SLICES;
      const lx0 = tlX + (blX - tlX) * t0, ly0 = tlY + (blY - tlY) * t0;
      const lx1 = tlX + (blX - tlX) * t1, ly1 = tlY + (blY - tlY) * t1;
      const rx0 = trX + (brX - trX) * t0, ry0 = trY + (brY - trY) * t0;
      const rx1 = trX + (brX - trX) * t1, ry1 = trY + (brY - trY) * t1;
      const srcY0 = t0 * H, srcY1 = t1 * H, srcH = srcY1 - srcY0;
      if (srcH < 0.5) continue;
      const sliceW = Math.hypot(((rx0 + rx1) / 2) - ((lx0 + lx1) / 2), ((ry0 + ry1) / 2) - ((ly0 + ly1) / 2));
      const sliceH = Math.hypot(lx1 - lx0, ly1 - ly0);
      if (sliceW < 0.3 || sliceH < 0.3) continue;
      cx.save();
      cx.beginPath();
      cx.moveTo(lx0, ly0); cx.lineTo(rx0, ry0);
      cx.lineTo(rx1, ry1); cx.lineTo(lx1, ly1);
      cx.closePath(); cx.clip();
      const a  = (rx0 - lx0) / pw, b  = (ry0 - ly0) / pw;
      const c  = (lx1 - lx0) / srcH, d2 = (ly1 - ly0) / srcH;
      const e  = lx0 - c * srcY0,    f  = ly0 - d2 * srcY0;
      cx.setTransform(a, b, c, d2, e, f);
      cx.drawImage(img, 0, 0, pw, H);
      cx.restore();
    }
  }

  if (progress < 0.999) {
    cx.save();
    cx.beginPath();
    cx.moveTo(frontTL.x, frontTL.y); cx.lineTo(frontTR.x, frontTR.y);
    cx.lineTo(frontBR.x, frontBR.y); cx.lineTo(frontBL.x, frontBL.y);
    cx.closePath(); cx.clip();
    if (srcPage) {
      if (forward) drawImageInQuad(srcPage, frontTL.x, frontTL.y, frontTR.x, frontTR.y, frontBR.x, frontBR.y, frontBL.x, frontBL.y);
      else         drawImageInQuad(srcPage, frontTR.x, frontTR.y, frontTL.x, frontTL.y, frontBL.x, frontBL.y, frontBR.x, frontBR.y);
    } else { cx.fillStyle = "#f8f8f8"; cx.fill(); }
    cx.restore();
  }

  const backTL    = reflectPoint(frontTL.x, frontTL.y);
  const backTR    = reflectPoint(frontTR.x, frontTR.y);
  const backBR    = reflectPoint(frontBR.x, frontBR.y);
  const backBL    = reflectPoint(frontBL.x, frontBL.y);
  const backWidth = Math.abs(backTR.x - backTL.x) + Math.abs(backBR.x - backBL.x);

  if (backWidth > 2 && progress < 0.98) {
    cx.save();
    cx.beginPath();
    if (forward) cx.rect(0, 0, pw, H); else cx.rect(pw, 0, pw, H);
    cx.clip();
    cx.save();
    cx.beginPath();
    cx.moveTo(backTL.x, backTL.y); cx.lineTo(backTR.x, backTR.y);
    cx.lineTo(backBR.x, backBR.y); cx.lineTo(backBL.x, backBL.y);
    cx.closePath(); cx.clip();
    if (dstPage) {
      if (forward) drawImageInQuad(dstPage, backTR.x, backTR.y, backTL.x, backTL.y, backBL.x, backBL.y, backBR.x, backBR.y);
      else         drawImageInQuad(dstPage, backTL.x, backTL.y, backTR.x, backTR.y, backBR.x, backBR.y, backBL.x, backBL.y);
      cx.fillStyle = "rgba(0,0,0,0.10)"; cx.fill();
    } else {
      cx.fillStyle = "#f8f8f8"; cx.fill();
      cx.fillStyle = "rgba(0,0,0,0.04)"; cx.fill();
    }
    cx.restore(); cx.restore();
  }

  const foldArc = Math.sin(p * Math.PI);
  if (foldArc > 0.02 && progress < 0.999) {
    cx.save();
    cx.beginPath();
    cx.moveTo(frontTL.x, frontTL.y); cx.lineTo(frontTR.x, frontTR.y);
    cx.lineTo(frontBR.x, frontBR.y); cx.lineTo(frontBL.x, frontBL.y);
    cx.closePath(); cx.clip();
    const shadW = pw * 0.28;
    const gx0   = forward ? frontTL.x : frontTR.x;
    const gx1   = forward ? frontTL.x + shadW : frontTR.x - shadW;
    const grad  = cx.createLinearGradient(gx0, 0, gx1, 0);
    grad.addColorStop(0, `rgba(0,0,0,${foldArc * 0.15})`);
    grad.addColorStop(1, "rgba(0,0,0,0)");
    cx.fillStyle = grad; cx.fillRect(0, 0, W, H);
    cx.restore();
  }

  const shadowI = Math.sin(p * Math.PI) * 0.25;
  if (shadowI > 0.02) {
    const shadowW = pw * 0.38 * Math.sin(p * Math.PI);
    cx.save();
    if (forward) {
      const grad = cx.createLinearGradient(pw, 0, pw - shadowW, 0);
      grad.addColorStop(0, `rgba(0,0,0,${shadowI})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      cx.fillStyle = grad; cx.fillRect(pw - shadowW, 0, shadowW, H);
    } else {
      const grad = cx.createLinearGradient(pw, 0, pw + shadowW, 0);
      grad.addColorStop(0, `rgba(0,0,0,${shadowI})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      cx.fillStyle = grad; cx.fillRect(pw, 0, shadowW, H);
    }
    cx.restore();
  }

  const sg2 = cx.createLinearGradient(pw - 5, 0, pw + 8, 0);
  sg2.addColorStop(0,   "rgba(0,0,0,0.18)");
  sg2.addColorStop(0.5, "rgba(0,0,0,0.07)");
  sg2.addColorStop(1,   "rgba(0,0,0,0)");
  cx.fillStyle = sg2; cx.fillRect(pw - 5, 0, 13, H);
}

function drawMobileFlip(
  cx: CanvasRenderingContext2D,
  W: number, H: number,
  progress: number,
  forward: boolean,
  srcPage: HTMLCanvasElement | null,
  dstPage: HTMLCanvasElement | null,
) {
  cx.clearRect(0, 0, W, H);
  const p    = ease(progress);
  const outX = forward ? -p * W : p * W;
  const inX  = forward ? W - p * W : -(W - p * W);
  if (srcPage) cx.drawImage(srcPage, outX, 0, W, H);
  else { cx.fillStyle = "#f8f8f8"; cx.fillRect(outX, 0, W, H); }
  if (dstPage) cx.drawImage(dstPage, inX, 0, W, H);
  else { cx.fillStyle = "#ffffff"; cx.fillRect(inX, 0, W, H); }
}

/* ── Sub-components ─────────────────────────────────────────────────────── */

interface BgCanvasProps {
  W: number; H: number;
  leftPage: number | null; rightPage: number | null;
  pageCanvases: Map<number, HTMLCanvasElement>;
  isCover?: boolean;
  isMobile?: boolean;
  onPainted?: () => void;
}
function BgCanvas({ W, H, leftPage, rightPage, pageCanvases, isCover, isMobile, onPainted }: BgCanvasProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current || W === 0 || H === 0) return;
    ref.current.width  = W;
    ref.current.height = H;
    const cx  = ref.current.getContext("2d")!;
    const get = (n: number | null) => (n ? pageCanvases.get(n) ?? null : null);
    if (isMobile) {
      drawSinglePage(cx, W, H, get(rightPage) ?? get(leftPage));
    } else {
      drawSpread(cx, W, H, get(leftPage), get(rightPage), isCover);
    }
    if (onPainted) requestAnimationFrame(() => onPainted());
  }, [W, H, leftPage, rightPage, pageCanvases, isCover, isMobile, onPainted]);
  return (
    <canvas
      ref={ref}
      width={W}
      height={H}
      style={{ position: "absolute", inset: 0, display: "block", zIndex: 1 }}
    />
  );
}

interface FlipCanvasProps {
  W: number; H: number; forward: boolean;
  srcPage: number | null; dstPage: number | null;
  bgLeft: number | null; bgRight: number | null;
  pageCanvases: Map<number, HTMLCanvasElement>;
  bgIsCover?: boolean;
  isMobile?: boolean;
  visible: boolean;
  onDone: () => void;
  onSettled: () => void;
  nextBgLeft: number | null;
  nextBgRight: number | null;
}
function FlipCanvas({
  W, H, forward, srcPage, dstPage, bgLeft, bgRight,
  pageCanvases, bgIsCover, isMobile, visible, onDone, onSettled,
  nextBgLeft, nextBgRight,
}: FlipCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const doneRef   = useRef(false);

  useEffect(() => {
    if (!canvasRef.current || W === 0 || H === 0) return;
    doneRef.current   = false;
    const canvas      = canvasRef.current;
    canvas.width      = W;
    canvas.height     = H;
    const cx          = canvas.getContext("2d")!;
    const startMs     = performance.now();
    const get         = (n: number | null) => (n ? pageCanvases.get(n) ?? null : null);

    const frame = (now: number) => {
      const t = Math.min((now - startMs) / FLIP_MS, 1);
      if (isMobile) {
        drawMobileFlip(cx, W, H, t, forward, get(srcPage), get(dstPage));
      } else {
        drawCurl(cx, W, H, t, forward, get(srcPage), get(dstPage), get(bgLeft), get(bgRight), bgIsCover);
      }
      if (t < 1) { rafRef.current = requestAnimationFrame(frame); return; }
      if (doneRef.current) return;
      doneRef.current = true;

      if (isMobile) {
        drawSinglePage(cx, W, H, get(dstPage));
      } else {
        drawSpread(cx, W, H, get(nextBgLeft), get(nextBgRight), false);
      }
      onDone();
    };

    rafRef.current = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(rafRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [W, H, forward, srcPage, dstPage, bgLeft, bgRight, isMobile]);

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{
        position: "absolute", inset: 0, display: "block",
        zIndex: 10, pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0s",
      }}
    />
  );
}

/* ── Main component ─────────────────────────────────────────────────────── */

interface BookViewerProps { pdfFile: string; }

export default function BookViewer({ pdfFile }: BookViewerProps) {
  const [numPages, setNumPages]         = useState(0);
  const [spread, setSpread]             = useState(0);
  const [bgSpread, setBgSpread]         = useState(0);
  const [flipping, setFlipping]         = useState(false);
  const [settling, setSettling]         = useState(false);
  const [flipVisible, setFlipVisible]   = useState(false);
  const [flipDir, setFlipDir]           = useState<"fwd" | "bwd">("fwd");
  const [nextSpread, setNextSpread]     = useState(0);
  const [pdfErr, setPdfErr]             = useState(false);
  const [pw, setPw]                     = useState(400);
  const [pageAspect, setPageAspect]     = useState(0.707);
  const [pageCanvases, setPageCanvases] = useState<Map<number, HTMLCanvasElement>>(new Map());
  const [zoom, setZoom]                 = useState(1.0);
  const [isMobile, setIsMobile]         = useState(false);

  // FIX 2: ref to avoid stale closure in handleBgPainted
  const settlingRef = useRef(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const total = totalSpreads(numPages);

  const zoomedPw = Math.round(pw * zoom);
  const ph       = pageAspect > 0 ? Math.round(zoomedPw / pageAspect) : Math.round(zoomedPw * 1.414);

  const recompute = useCallback(() => {
    if (!containerRef.current || pageAspect === 0) return;
    const mobile = window.innerWidth <= 768;
    setIsMobile(mobile);
    const aH = containerRef.current.offsetHeight * (mobile ? 0.90 : 0.84);
    const aW = containerRef.current.offsetWidth  * (mobile ? 0.80 : 0.84);
    if (mobile) {
      setPw(Math.min(Math.floor(aH * pageAspect), Math.floor(aW)));
    } else {
      setPw(Math.min(Math.floor(aH * pageAspect), Math.floor(aW / 2)));
    }
  }, [pageAspect]);

  useEffect(() => {
    recompute();
    window.addEventListener("resize", recompute);
    return () => window.removeEventListener("resize", recompute);
  }, [recompute]);

  useEffect(() => {
    setNumPages(0); setSpread(0); setBgSpread(0);
    setFlipping(false); setSettling(false); setFlipVisible(false);
    setPdfErr(false); setPageCanvases(new Map());
    setZoom(1.0);
    settlingRef.current = false;
  }, [pdfFile]);

  const handleCapture = useCallback((n: number, c: HTMLCanvasElement) => {
    setPageCanvases(prev => { const m = new Map(prev); m.set(n, c); return m; });
  }, []);

  const go = useCallback((dir: "fwd" | "bwd") => {
    if (flipping || settling) return;
    const nxt = dir === "fwd" ? spread + 1 : spread - 1;
    if (nxt < 0 || nxt >= total) return;
    playFlip(dir);
    setFlipDir(dir);
    setNextSpread(nxt);
    setFlipVisible(true);
    setFlipping(true);
  }, [flipping, settling, spread, total]);

  const zoomIn  = useCallback(() => setZoom(z => Math.min(+(z + ZOOM_STEP).toFixed(2), ZOOM_MAX)), []);
  const zoomOut = useCallback(() => setZoom(z => Math.max(+(z - ZOOM_STEP).toFixed(2), ZOOM_MIN)), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT") return;
      switch (e.key) {
        case "ArrowRight": case "ArrowDown": case " ": e.preventDefault(); go("fwd"); break;
        case "ArrowLeft":  case "ArrowUp":             e.preventDefault(); go("bwd"); break;
        case "+": case "=": e.preventDefault(); zoomIn();  break;
        case "-":           e.preventDefault(); zoomOut(); break;
        case "0": if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(1.0); } break;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, zoomIn, zoomOut]);

  // FIX 2: set settlingRef alongside settling state
  const handleDone = useCallback(() => {
    setBgSpread(nextSpread);
    setSpread(nextSpread);
    setFlipping(false);
    settlingRef.current = true;
    setSettling(true);
  }, [nextSpread]);

  // FIX 2: read ref instead of closure — no stale capture possible
  const handleBgPainted = useCallback(() => {
    if (!settlingRef.current) return;
    settlingRef.current = false;
    setFlipVisible(false);
    setSettling(false);
  }, []);

  const cur = spreadPages(bgSpread);
  const nxt = spreadPages(nextSpread);

  const bgIsCover   = bgSpread === 0;
  const isCoverIdle = bgSpread === 0 && !flipping && !settling && nextSpread === 0;

  const mobileCurrentPage = cur.R ?? cur.L;
  const mobileNextPage    = flipDir === "fwd" ? (nxt.R ?? nxt.L) : (nxt.L ?? nxt.R);

  // FIX 3: prefetch ahead from nextSpread during a flip, not from stale spread
  const prefetchAhead = flipping ? nextSpread : spread;
  const neededPages = Array.from(new Set([
    cur.L, cur.R,
    nxt.L, nxt.R,
    spreadPages(prefetchAhead + 1).L, spreadPages(prefetchAhead + 1).R,
    prefetchAhead > 0 ? spreadPages(prefetchAhead - 1).L : null,
    prefetchAhead > 0 ? spreadPages(prefetchAhead - 1).R : null,
  ].filter((n): n is number => n !== null && n >= 1 && n <= numPages)));

  const animSrc        = flipDir === "fwd" ? spreadPages(bgSpread).R : spreadPages(bgSpread).L;
  const animDst        = flipDir === "fwd" ? nxt.L : nxt.R;
  const canvasBgL      = nxt.L;
  const canvasBgR      = nxt.R;
  const desktopBookW   = isCoverIdle ? zoomedPw : zoomedPw * 2;
  const containerW     = isMobile ? zoomedPw : desktopBookW;
  const desktopCanvasW = (flipping || settling) ? zoomedPw * 2 : desktopBookW;

  const label = () => {
    if (!numPages) return "Loading...";
    if (bgSpread === 0) return `1 / ${numPages}`;
    const r = cur.R ?? cur.L;
    return `${cur.L}–${Math.min(r as number, numPages)} / ${numPages}`;
  };

  const offscreenPage = (n: number) => (
    <div
      key={`cap-${pdfFile}-${n}-${zoomedPw}`}
      data-capture={n}
      style={{ position: "fixed", left: -99999, top: 0, width: zoomedPw, overflow: "hidden", pointerEvents: "none", zIndex: -1 }}
    >
      <Page
        pageNumber={n}
        width={zoomedPw}
        renderAnnotationLayer={false}
        renderTextLayer={false}
        onLoadSuccess={pg => { if (n === 1) setPageAspect(pg.originalWidth / pg.originalHeight); }}
        onRenderSuccess={() => {
          const host = document.querySelector(`[data-capture="${n}"]`);
          const c = host?.querySelector("canvas") as HTMLCanvasElement | null;
          if (c) handleCapture(n, c);
        }}
      />
    </div>
  );

  const zoomPct        = Math.round(zoom * 100);
  const canZoomIn      = zoom < ZOOM_MAX;
  const canZoomOut     = zoom > ZOOM_MIN;
  const isPrevDisabled = flipping || settling || spread <= 0;
  const isNextDisabled = flipping || settling || spread >= total - 1;

  const navBtnStyle = (side: "prev" | "next", disabled: boolean): React.CSSProperties => ({
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    [side === "prev" ? "left" : "right"]: isMobile ? 10 : -56,
    width:          isMobile ? 36 : 44,
    height:         isMobile ? 36 : 44,
    borderRadius:   "50%",
    border:         "1px solid rgba(0,0,0,0.10)",
    background:     disabled ? "rgba(255,255,255,0.4)" : "#ffffff",
    color:          disabled ? "rgba(0,0,0,0.2)" : "#1a3a2e",
    fontSize:       isMobile ? 22 : 26,
    lineHeight:     1,
    display:        "flex",
    alignItems:     "center",
    justifyContent: "center",
    cursor:         disabled ? "default" : "pointer",
    zIndex:         40,
    padding:        0,
    boxShadow:      disabled ? "none" : "0 2px 8px rgba(0,0,0,0.12)",
    transition:     "background 0.15s, box-shadow 0.15s",
    userSelect:     "none" as const,
    outline:        "none",
  });

  return (
    <div style={{
      width: "100%", height: "100vh",
      background: "#1a3a2e",
      display: "flex", flexDirection: "column", overflow: "hidden",
    }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .react-pdf__Page { display: flex !important; }
        .react-pdf__Page canvas { display: block !important; }
        .bv-nav-btn:focus { outline: none; }
        .bv-nav-btn:focus-visible { outline: 2px solid rgba(255,255,255,0.4); outline-offset: 2px; }
      `}</style>

      {/* ── Viewer area ── */}
      <div
        ref={containerRef}
        style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", overflow: "auto", position: "relative" }}
      >
        <Document
          file={pdfFile}
          onLoadSuccess={({ numPages: n }) => setNumPages(n)}
          onLoadError={() => setPdfErr(true)}
          loading={
            <div style={{ textAlign: "center" }}>
              <div style={{ width: 40, height: 40, border: "3px solid rgba(255,255,255,0.1)", borderTopColor: "#ffffff", borderRadius: "50%", animation: "spin .8s linear infinite", margin: "0 auto 12px" }} />
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 14, margin: 0, fontFamily: "system-ui,sans-serif" }}>Loading...</p>
            </div>
          }
        >
          {pdfErr ? (
            <div style={{ borderRadius: 12, background: "rgba(255,255,255,0.08)", padding: 60, textAlign: "center", border: "1px solid rgba(255,255,255,0.12)" }}>
              <p style={{ fontSize: 48, margin: "0 0 16px" }}>📄</p>
              <p style={{ color: "rgba(255,255,255,0.9)", fontWeight: 700, fontSize: 18, margin: "0 0 8px", fontFamily: "system-ui,sans-serif" }}>PDF not found</p>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, margin: 0, fontFamily: "system-ui,sans-serif" }}>
                Place your PDF at{" "}
                <code style={{ background: "rgba(255,255,255,0.1)", padding: "2px 6px", borderRadius: 3, color: "#90e0b0" }}>{pdfFile}</code>
              </p>
            </div>
          ) : (
            <>
              {numPages > 0 && zoomedPw > 0 && neededPages.map(n => offscreenPage(n))}

              <div style={{ position: "relative" }}>
                {/* ── White book card ── */}
                <div style={{
                  width: containerW,
                  height: ph,
                  position: "relative",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#ffffff",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.32), 0 2px 8px rgba(0,0,0,0.16)",
                }}>
                  {zoomedPw > 0 && ph > 0 && (
                    <BgCanvas
                      W={isMobile ? zoomedPw : desktopBookW}
                      H={ph}
                      leftPage={isMobile ? null : cur.L}
                      rightPage={isMobile ? mobileCurrentPage : cur.R}
                      pageCanvases={pageCanvases}
                      isCover={bgIsCover}
                      isMobile={isMobile}
                      onPainted={handleBgPainted}
                    />
                  )}
                  {(flipping || settling) && zoomedPw > 0 && ph > 0 && (
                    <FlipCanvas
                      W={isMobile ? zoomedPw : desktopCanvasW}
                      H={ph}
                      forward={flipDir === "fwd"}
                      srcPage={isMobile ? mobileCurrentPage : animSrc}
                      dstPage={isMobile ? mobileNextPage : animDst}
                      bgLeft={isMobile ? null : canvasBgL}
                      bgRight={isMobile ? null : canvasBgR}
                      nextBgLeft={isMobile ? null : nxt.L}
                      nextBgRight={isMobile ? null : nxt.R}
                      pageCanvases={pageCanvases}
                      bgIsCover={bgIsCover}
                      isMobile={isMobile}
                      visible={flipVisible}
                      onDone={handleDone}
                      onSettled={() => {}}
                    />
                  )}
                </div>

                {/* ── Prev button ── */}
                <button
                  className="bv-nav-btn"
                  style={navBtnStyle("prev", isPrevDisabled)}
                  disabled={isPrevDisabled}
                  onClick={() => go("bwd")}
                  onMouseEnter={e => { if (!isPrevDisabled) { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)"; }}}
                  onMouseLeave={e => { if (!isPrevDisabled) { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)"; }}}
                  aria-label="Previous page"
                >
                  &#8249;
                </button>

                {/* ── Next button ── */}
                <button
                  className="bv-nav-btn"
                  style={navBtnStyle("next", isNextDisabled)}
                  disabled={isNextDisabled}
                  onClick={() => go("fwd")}
                  onMouseEnter={e => { if (!isNextDisabled) { e.currentTarget.style.background = "#f0f0f0"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.18)"; }}}
                  onMouseLeave={e => { if (!isNextDisabled) { e.currentTarget.style.background = "#ffffff"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.12)"; }}}
                  aria-label="Next page"
                >
                  &#8250;
                </button>
              </div>
            </>
          )}
        </Document>
      </div>

      {/* ── Toolbar ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: isMobile ? "wrap" : "nowrap",
        gap: isMobile ? 8 : 0,
        padding: isMobile ? "8px 12px" : "10px 24px",
        background: "rgba(0,0,0,0.25)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        flexShrink: 0,
        backdropFilter: "blur(8px)",
      }}>
        {/* Zoom controls */}
        <div style={{
          display: "flex", gap: 6, alignItems: "center",
          order: 1,
          flex: isMobile ? "1 1 auto" : undefined,
          justifyContent: isMobile ? "center" : undefined,
        }}>
          <button style={tbStyle} onClick={zoomOut} disabled={!canZoomOut} title="Zoom out (-)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            {!isMobile && <span>Zoom out</span>}
          </button>

          <button
            style={{ ...tbStyle, minWidth: 52, justifyContent: "center" }}
            onClick={() => setZoom(1.0)}
            title="Reset zoom (Ctrl+0)"
          >
            {zoomPct}%
          </button>

          <button style={tbStyle} onClick={zoomIn} disabled={!canZoomIn} title="Zoom in (+)">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
            {!isMobile && <span>Zoom in</span>}
          </button>
        </div>

        {/* Page label */}
        <span style={{
          color: "rgba(255,255,255,0.55)",
          fontSize: 13,
          fontFamily: "system-ui,sans-serif",
          order: 2,
          flex: isMobile ? "0 0 auto" : undefined,
        }}>
          {label()}
        </span>

        {/* FIX 1: restored missing opening <a tag */}
        <div style={{
          order: 3,
          flex: isMobile ? "1 1 100%" : undefined,
          display: "flex",
          justifyContent: isMobile ? "center" : undefined,
        }}>
          <a
            href={pdfFile}
            download
            style={{
              background: "#ffffff",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#1a3a2e",
              cursor: "pointer",
              padding: "0 16px",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              gap: 6,
              height: 36,
              fontSize: 13,
              fontFamily: "system-ui,sans-serif",
              fontWeight: 700,
              textDecoration: "none",
              width: isMobile ? "100%" : undefined,
              justifyContent: isMobile ? "center" : undefined,
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </a>
        </div>
      </div>
    </div>
  );
}

/* ── Shared toolbar button style ─────────────────────────────────────────── */
const tbStyle: React.CSSProperties = {
  background:   "rgba(255,255,255,0.10)",
  border:       "1px solid rgba(255,255,255,0.15)",
  color:        "rgba(255,255,255,0.75)",
  cursor:       "pointer",
  padding:      "0 12px",
  borderRadius: 8,
  display:      "flex",
  alignItems:   "center",
  gap:          6,
  height:       36,
  fontSize:     13,
  fontFamily:   "system-ui,sans-serif",
};