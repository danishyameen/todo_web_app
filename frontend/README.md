# Taskly Frontend

This is the frontend for the Taskly Full-Stack Web Application built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive UI with Tailwind CSS
- Authentication system (login, signup, logout)
- Task management (create, read, update, delete tasks)
- Task filtering and search
- User dashboard
- API integration with backend services

## Tech Stack

- Next.js 14 (with App Router)
- TypeScript
- Tailwind CSS
- React Context API for state management
- API Client for backend communication

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend directory: `cd frontend`
3. Install dependencies: `npm install`
4. Create a `.env.local` file based on the `.env.local.example` with your backend API URL

### Environment Variables

Create a `.env.local` file in the root of the frontend directory:

```
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
```

### Running the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:3000` (or the next available port if 3000 is in use).

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── api/            # API routes (placeholder - actual API is in backend)
│   ├── auth/           # Authentication pages
│   ├── dashboard/      # Dashboard page
│   ├── tasks/          # Task management pages
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── providers.tsx   # React providers wrapper
├── components/         # Reusable UI components
├── lib/               # Utility functions and context
│   ├── api-client.ts   # API client for backend communication
│   └── auth-context.tsx # Authentication context
├── public/            # Static assets
└── styles/            # Global styles (globals.css in app/)
```

## API Integration

The frontend communicates with the backend API through the API client located in `lib/api-client.ts`. The client handles:

- Authentication (login, register, logout)
- Task management (get, create, update, delete tasks)
- Error handling and token management

## Environment Configuration

The application uses environment variables to configure the backend API URL. Make sure to set `NEXT_PUBLIC_BACKEND_API_URL` in your `.env.local` file to point to your backend service.

## Authentication Flow

The application implements token-based authentication:

1. Users login/register via the auth pages
2. Upon successful authentication, a token is stored in localStorage
3. The token is included in API requests to authenticate the user
4. The AuthContext provides authentication state throughout the app

## Task Management

Users can:

- View all tasks on the tasks page
- Filter tasks by status, priority, and search term
- Create new tasks
- View task details
- Edit existing tasks
- Mark tasks as complete/incomplete

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request