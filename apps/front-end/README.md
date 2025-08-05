# NaviDate Frontend

This is the frontend application for NaviDate, built with Next.js.

## Environment Variables

### Development Environment (.env.development)
Create a `.env.development` file in the root directory:

```env
# Development Environment Variables
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id-here
NEXT_PUBLIC_GOOGLE_CALLBACK_URL=http://localhost:3000/auth/callback

# API Configuration
NEXT_PUBLIC_API_TIMEOUT=10000
NEXT_PUBLIC_ENABLE_DEBUG=true
```

### Production Environment (.env.production)
Create a `.env.production` file in the root directory:

```env
# Production Environment Variables
NEXT_PUBLIC_BACKEND_URL=https://api.navidate.com
NEXT_PUBLIC_BASE_URL=https://navidate.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-production-google-client-id
NEXT_PUBLIC_GOOGLE_CALLBACK_URL=https://navidate.com/auth/callback

# API Configuration
NEXT_PUBLIC_API_TIMEOUT=15000
NEXT_PUBLIC_ENABLE_DEBUG=false
```

### Environment Variable Loading
Next.js automatically loads the appropriate environment file based on the `NODE_ENV`:
- `NODE_ENV=development` → `.env.development`
- `NODE_ENV=production` → `.env.production`

## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Build and Deploy

### Development Build
```bash
npm run build
npm run start
```

### Production Build
```bash
NODE_ENV=production npm run build
NODE_ENV=production npm run start
```

## Environment-Specific Scripts

You can also add environment-specific scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:dev": "NODE_ENV=development next build",
    "build:prod": "NODE_ENV=production next build",
    "start": "next start",
    "start:dev": "NODE_ENV=development next start",
    "start:prod": "NODE_ENV=production next start"
  }
}
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
