declare module "next-auth" {
  import NextAuth from "next-auth";
  export * from "next-auth";
  export default NextAuth;
}

declare module "next-auth/react" {
  import React from "react";
  export function signIn(provider?: string | undefined, options?: Record<string, any>, authorizationParams?: Record<string, any>): Promise<void>;
  export function signOut(options?: Record<string, any>): Promise<void>;
  export function useSession(): { data: any; status: "loading" | "authenticated" | "unauthenticated" };
}

declare module "next-auth/providers/*" {
  const content: any;
  export default content;
}
