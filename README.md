# Timesheet Management App

A SaaS-style Timesheet Management application built as part of the Tentwenty Frontend Developer Assessment.
---

## Overview

This application allows users to log in and manage timesheet entries through a clean, responsive dashboard interface.

The goal was to simulate a real-world frontend architecture using modern tools and best practices.
---

## Features

### Authentication

Dummy login system
Session-based handling
Protected dashboard route

### Dashboard

Timesheet table view
Columns: Week #, Date, Status, Actions
Add, edit, and delete entries
Modal-based form

### User Experience

Form validation
Error handling
Responsive layout (mobile and desktop)
Empty states

---

## Tech Stack

Next.js (Pages Router)
TypeScript
Tailwind CSS
React Hooks
Next.js API Routes

---

## Architecture and Approach

Modular component structure
Reusable UI components
Custom hooks for state management
API abstraction using internal routes
Clear separation of concerns

---

## Project Structure

/pages – Application routes and API endpoints
/components – UI components
/hooks – Custom hooks
/types – Type definitions

---

## API Routes

GET `/api/timesheets`
POST `/api/timesheets`
PUT `/api/timesheets`
DELETE `/api/timesheets`

---

## Setup Instructions

```bash
git clone <repo-url>
cd project
npm install
npm run dev
```

Application runs on:
http://localhost:3000

---

## Live Demo

https://timesheet-management-app-oq1e.vercel.app/

---

## Time Spent

Approximately 6–8 hours

---

## Assumptions and Notes

Dummy authentication is used instead of a real backend
Data is handled via Next.js API routes (mocked storage)
Focus was on UI accuracy, usability, and maintainable code
React hooks are used for state management without external libraries

---

## Testing

Basic testing can be added using Jest or React Testing Library as an enhancement.
