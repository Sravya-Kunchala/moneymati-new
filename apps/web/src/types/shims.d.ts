declare module "next/link" {
  const Link: any;
  export default Link;
}

declare module "next/navigation" {
  export function useRouter(): any;
  export function usePathname(): string;
}

declare module "next/font/google" {
  export function Inter(options?: any): { className: string };
  export function DM_Sans(options?: any): { variable?: string };
  export function Inria_Serif(options?: any): { variable?: string };
  export function Playfair_Display(options?: any): { variable?: string };
  export function Dancing_Script(options?: any): { variable?: string };
}

declare module "lucide-react" {
  export const Eye: any;
  export const EyeOff: any;
  export const CheckCircle2: any;
  export const Circle: any;
  export const ShieldCheck: any;
}
