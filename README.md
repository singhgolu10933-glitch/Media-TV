# Story TV – Full-Stack Starter

A starter project for a short-story/episode streaming app with an Android client, Node.js API, PostgreSQL schema, and admin-panel starter.

## Project structure

- `android/` – Kotlin + Jetpack Compose Android app
- `backend/` – Node.js + Express API
- `database/` – PostgreSQL schema and seed data
- `admin-panel/` – React/Vite starter
- `docs/` – API notes

## Important

This is a starter/prototype. Replace the sample branding, artwork, video URLs, secrets, and content with your own.

## Run backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Default API: `http://localhost:3000`

## Database

Create a PostgreSQL database, then run:

```bash
psql "$DATABASE_URL" -f database/schema.sql
```

## Android

Open the `android/` folder in Android Studio and run it on an emulator/device. The sample app currently displays sample stories and uses a placeholder player screen.

## Admin panel

```bash
cd admin-panel
npm install
npm run dev
```

## GitHub

```bash
git init
git add .
git commit -m "Initial Story TV starter"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```
