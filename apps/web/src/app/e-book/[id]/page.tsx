// src/app/e-book/[id]/page.tsx
import Header from "@/components/header";
import Footer from "@/components/footer";
import { getBook } from "@/app/lib/books";
import SepEBookClient from "./SepEBookClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SepEBookPage({ params }: PageProps) {
  const { id: rawId } = await params;
  const id = parseInt(rawId, 10);
  const book = getBook(id);

  if (!book) {
    return (
      <>
        <Header />
        <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 48, margin: "0 0 16px" }}>📚</p>
            <h2 style={{ color: "#064E3B", marginBottom: 8 }}>E-Book not found</h2>
            <a href="/e-book" style={{ color: "#064E3B", fontWeight: 600 }}>← Back to E-Books</a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return <SepEBookClient book={book} />;
}