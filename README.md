# ServeBridge — Volunteer & Donation Finder

**ServeBridge** is a cloud-based volunteer management platform built to connect organizations with volunteers who want to make an impact.  
I created this project after experiencing local crises in the Philippines where people wanted to help, but there wasn’t a clear way to see which organizations needed volunteers or donations.  
ServeBridge bridges that gap by providing a simple, secure, and intuitive way to find, apply, and manage volunteer opportunities.

---

## Live Demo
> Coming soon — hosted via Firebase  
> (Will be accessible at: https://servebridge.web.app once deployed)

---

## Overview
ServeBridge allows:
- **Volunteers** to browse opportunities, apply, and track their applications  
- **Organizations** to post opportunities, view applications, and manage responses  
- **Admins** to manage and monitor activity in real-time via Firebase

---

## Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Firebase (Auth, Firestore, Cloud Functions) |
| Cloud Hosting | Firebase Hosting |
| Version Control | Git + GitHub |

---

## Environment Setup

This project uses environment variables to keep sensitive configuration (like Firebase credentials) secure.  
To run the app locally, follow these steps:

### Create your environment file
Copy the provided `.env.example` template:
```bash
cp web/.env.example web/.env
