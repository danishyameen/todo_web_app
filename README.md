# Todo Web Application

Made and Designed by Danish Yameen

A full-stack todo management application built with Next.js 14, TypeScript, Tailwind CSS for the frontend, and FastAPI, SQLModel, and PostgreSQL for the backend. This application provides a complete solution for managing tasks with authentication, categorization, and advanced filtering capabilities.

## 🌟 Features

### Frontend Features
- **Modern UI/UX**: Built with Next.js 14 and Tailwind CSS for a responsive, beautiful interface
- **Authentication System**: Complete login, signup, and logout functionality
- **Task Management**: Create, read, update, and delete tasks with real-time updates
- **Advanced Filtering**: Filter tasks by status, priority, categories, and search terms
- **User Dashboard**: Personalized dashboard showing task statistics and overview
- **Profile Management**: Update user profile information and settings
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices

### Backend Features
- **RESTful API**: Well-documented API endpoints for all operations
- **JWT Authentication**: Secure token-based authentication with refresh tokens
- **Database Management**: PostgreSQL with SQLModel ORM and Alembic migrations
- **Task Operations**: Full CRUD operations with bulk operations support
- **Category Management**: Organize tasks into customizable categories
- **Security**: Password hashing, input validation, and user isolation
- **Performance**: Connection pooling, query optimization, and indexing

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API and Zustand
- **HTTP Client**: Axios for API communication
- **Animation**: Framer Motion

### Backend
- **Framework**: FastAPI
- **Database**: PostgreSQL (with Neon Serverless support)
- **ORM**: SQLModel (combines SQLAlchemy and Pydantic)
- **Authentication**: JWT with PyJWT and PassLib for password hashing
- **Migrations**: Alembic
- **Validation**: Pydantic
- **Security**: BCrypt for password hashing

## 📁 Project Structure

```
todo_web_app/
├── backend/
│   ├── src/
│   │   ├── api/              # API routes (auth, tasks, categories)
│   │   ├── models/           # SQLModel database models
│   │   ├── services/         # Business logic services
│   │   ├── utils/            # Utilities (JWT, exceptions, etc.)
│   │   ├── config/           # Configuration and settings
│   │   └── db/               # Database session, monitoring, backup
│   ├── alembic/              # Database migrations
│   ├── docs/                 # Database schema documentation
│   ├── requirements.txt      # Python dependencies
│   ├── start_server.py       # Server startup script
│   └── seed_db.py            # Database seeding script
├── frontend/
│   ├── app/                  # Next.js App Router pages
│   │   ├── api/             # API routes (placeholder - actual API is in backend)
│   │   ├── auth/            # Authentication pages
│   │   ├── dashboard/       # Dashboard page
│   │   ├── profile/         # Profile management
│   │   ├── tasks/           # Task management pages
│   │   ├── layout.tsx       # Root layout
│   │   ├── page.tsx         # Home page
│   │   └── providers.tsx    # React providers wrapper
│   ├── components/           # Reusable UI components
│   ├── lib/                 # Utility functions and context
│   │   ├── api-client.ts    # API client for backend communication
│   │   └── auth-context.tsx # Authentication context
│   ├── public/              # Static assets
│   ├── styles/              # Global styles (globals.css in app/)
│   └── package.json         # Node.js dependencies
├── specs/                   # Project specifications
├── history/                 # Project history and records
└── .specify/                # SpecKit Plus templates and scripts
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) for frontend
- **Python** (v3.8 or higher) for backend
- **PostgreSQL** database (or Neon Serverless account)
- **npm** or **yarn** for frontend package management

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables in `.env`:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/todo_db
   DB_ECHO=false
   JWT_SECRET_KEY=your-super-secret-jwt-key-change-in-production
   JWT_REFRESH_SECRET_KEY=your-super-secret-refresh-key-change-in-production
   ACCESS_TOKEN_EXPIRE_MINUTES=30
   REFRESH_TOKEN_EXPIRE_DAYS=7
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
   ```

4. Set up the database:
   ```bash
   # Create the database tables
   alembic upgrade head
   ```

5. (Optional) Seed the database with sample data:
   ```bash
   python seed_db.py
   ```

6. Start the backend server:
   ```bash
   python start_server.py
   ```
   The backend API will be available at `http://localhost:8000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the frontend root directory:
   ```
   NEXT_PUBLIC_BACKEND_API_URL=http://localhost:8000/api
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```
   The application will start on `http://localhost:3000`.

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /login` - Login and get access tokens
- `POST /refresh` - Refresh access token
- `POST /logout` - Logout user
- `GET /me` - Get current user info
- `PUT /profile` - Update user profile

### Tasks (`/api/tasks`)
- `GET /` - Get all tasks for the current user (with optional filters)
- `GET /{task_id}` - Get a specific task
- `POST /` - Create a new task
- `PUT /{task_id}` - Update an existing task
- `DELETE /{task_id}` - Delete a task
- `POST /bulk-update` - Bulk update tasks
- `POST /bulk-delete` - Bulk delete tasks

### Categories (`/api/categories`)
- `GET /` - Get all categories for the current user
- `GET /{category_id}` - Get a specific category
- `POST /` - Create a new category
- `PUT /{category_id}` - Update an existing category
- `DELETE /{category_id}` - Delete a category

## 🛡️ Security Features

- **JWT-based Authentication**: Secure token-based authentication with access and refresh tokens
- **Password Hashing**: All passwords are hashed using BCrypt
- **User Isolation**: Users can only access their own data
- **Input Validation**: Comprehensive input validation and sanitization
- **Rate Limiting**: Built-in rate limiting to prevent abuse (to be implemented)

## 🧪 Testing

### Backend Testing
Run backend tests with pytest:
```bash
cd backend
pytest
```

### Frontend Testing
Run frontend tests (if available):
```bash
cd frontend
npm run test
```

## 🚢 Deployment

### Backend Deployment
1. Set up a production PostgreSQL database
2. Update environment variables for production
3. Deploy the FastAPI application to your preferred hosting provider

### Frontend Deployment
1. Build the application for production:
   ```bash
   npm run build
   ```
2. Deploy the built application to a hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions, please open an issue in the repository or contact the maintainers.

---

Made and Designed by Danish Yameen

Built with ❤️ using Next.js, FastAPI, and PostgreSQL.