# Processing Garden

[Live version](https://processing-garden.vercel.app/)

## Requirements

- Node.js 14.18.0
- PostgreSQL

### Instalation

```
npm install
npm run prisma:generate
```

## Running

```
npm run dev
```

Before start, provide enviroment variables on your machine:

```
DATABASE_URL={database-url}
CLIENT_ID={google-oauth-client-id}
CLIENT_SECRET={google-oauth-secret}
NEXTAUTH_URL={next-js-redirect-url}
SECRET={vercel-secret-for-deployemnt-of-next-js-app}
```

### Deployment

App build with Next.js is hosted on Vercel along with CD/CD.

PostgreSQL database is hosted on Supabase with migrations applied via CI/CD pipeline built with Github Action
