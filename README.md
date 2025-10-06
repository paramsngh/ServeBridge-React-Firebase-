# ServeBridge: Volunteer Matching Web App
A cloud-first web app that connects volunteers with local nonprofits for time or item donations. Built with React (Vite + Tailwind) and Firebase (Auth + Firestore). Role-aware UX: organizations post opportunities; volunteers browse, apply, and track their applications.

## Features
- Responsive, modern UI with toast notifications
- Role-based flows: organizations post, volunteers apply
- My Applications page with status chips (pending, accepted, declined)
- Firestore security rules for authentication, ownership, and role checks
- Runs fully on the free Spark tier via direct Firestore writes, with an optional Cloud Functions backend

## Tech Stack
- Frontend: React 18, Vite, Tailwind, React Router
- Cloud: Firebase v10 (Authentication, Firestore)
- Data model: users, opportunities, applications; server timestamps for ordering

## Security Highlights
Authorization is enforced in Firestore rules: only organizations can create or modify their opportunities; only volunteers can create applications; reads are scoped to the applicant or the owning organization. The UI also hides actions outside a user’s role.

## Quick Start

### 0) Prerequisites
- Node.js 18 or newer
- A Firebase project

### 1) Firebase setup
- In Firebase Console: create a Web App
- Enable Authentication → Email/Password
- Enable Firestore Database (Production mode)
- Paste your Firebase config into `web/src/lib/firebase.js`

### 2) Run locally
```bash
cd web
npm install
npm run dev
