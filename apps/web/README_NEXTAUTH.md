NextAuth integration (Google & LinkedIn)
=====================================

This project includes a basic NextAuth configuration to enable Google and LinkedIn sign-in via the app router.

Files added
- `src/app/api/auth/[...nextauth]/route.ts` — NextAuth route handler (GET/POST).
- `.env.example` — example environment variables.

Setup
1. Install dependencies in `apps/web` (yarn/npm/pnpm/bun):

```bash
# npm
cd apps/web
npm install

# or pnpm
pnpm install

# or bun
bun install
```

2. Copy `.env.example` to `.env.local` and set the values:

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<a-random-string>
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
LINKEDIN_CLIENT_ID=...
LINKEDIN_CLIENT_SECRET=...
```

3. Configure OAuth apps:
- Google: set Authorized redirect URI to `http://localhost:3000/api/auth/callback/google`
- LinkedIn: set OAuth 2.0 redirect URI to `http://localhost:3000/api/auth/callback/linkedin`

4. Run the dev server and open `/signin`. Click the Google or LinkedIn button to start the auth flow.

Notes
- Session strategy is JWT by default in the added handler. Add a DB adapter (Prisma) to persist users and sessions.
- The signin page buttons are wired to `signIn('google')` and `signIn('linkedin')`.
