# DoctorAppoint

Live Site URL: https://doctor-appoint-client.vercel.app

DoctorAppoint is a doctor appointment booking platform where patients can browse specialists, open doctor details, and manage bookings from a private dashboard.

## Features

- Modern home page with hero slider, statistics, top-rated doctors, and trust sections.
- Searchable and filterable doctor directory with appointment booking entry points.
- Doctor details view with appointment booking flow and review section.
- Secure authentication with Better Auth, Google sign-in, and protected dashboard routes.
- Dashboard tools for viewing bookings, updating appointments, and editing profile data.
- Responsive layout, custom 404 page, and page-level metadata for better SEO.

## Tech Stack

- Next.js 16 App Router
- React 19
- Better Auth
- MongoDB
- Tailwind CSS v4
- Swiper.js, Framer Motion, React Hot Toast

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env.local` file with values similar to these:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_uri
GOOGLE_CLIENTID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Notes

- Replace any temporary URLs with your deployed client/server URLs before submission.
- The project is built to be extended with review, sorting, and theme toggle features if needed.
