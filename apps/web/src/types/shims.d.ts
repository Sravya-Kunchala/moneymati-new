declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function useRouter(): any;
  export function usePathname(): string;
}

declare module "next/font/google" {
  type FontStyle = { fontFamily?: string };
  type FontResult = { className?: string; variable?: string; style?: FontStyle };
  export function Inter(options?: any): FontResult;
  export function DM_Sans(options?: any): FontResult;
  export function Inria_Serif(options?: any): FontResult;
  export function Playfair_Display(options?: any): FontResult;
  export function Dancing_Script(options?: any): FontResult;
}

declare module "lucide-react" {
  export const Eye: any;
  export const EyeOff: any;
  export const CheckCircle2: any;
  export const Circle: any;
  export const ShieldCheck: any;
  export const ChevronLeft: any;
  export const ChevronRight: any;
  export const TrendingUp: any;
  export const BookOpen: any;
  export const Users: any;
  export const Target: any;
  export const GraduationCap: any;
  export const ClipboardList: any;
  export const Video: any;
}
