# Organization and User Management System

A full-stack web application for managing organizations and their users, built with FastAPI backend and React frontend.

## 🏗️ Architecture

This application follows a modern full-stack architecture:

- **Backend**: FastAPI with PostgreSQL database
- **Frontend**: React with Vite build tool
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Styling**: TailwindCSS for responsive UI
- **API Communication**: Axios for HTTP requests

## 📁 Project Structure

```
Interview-buddy/
├── backend/                    # FastAPI backend
│   ├── app/
│   │   ├── main.py            # FastAPI application entry point
│   │   ├── core/              # Core configuration
│   │   │   ├── config.py      # Environment configuration
│   │   │   └── database.py    # Database connection
│   │   ├── models/            # SQLAlchemy models
│   │   │   ├── organization.py
│   │   │   └── user.py
│   │   ├── schemas/           # Pydantic schemas
│   │   │   ├── organization.py
│   │   │   └── user.py
│   │   ├── routers/           # API route handlers
│   │   │   ├── organizations.py
│   │   │   └── users.py
│   │   ├── services/          # Business logic layer
│   │   │   ├── organization_service.py
│   │   │   └── user_service.py
│   │   ├── repositories/      # Data access layer
│   │   │   ├── organization_repo.py
│   │   │   └── user_repo.py
│   │   └── static/uploads/    # File uploads directory
│   ├── requirements.txt       # Python dependencies
│   └── README.md              # Backend documentation
├── frontend/                  # React frontend
│   └── Organization-Users-Management/
│       ├── src/
│       │   ├── components/    # Reusable UI components
│       │   ├── pages/         # Page components
│       │   ├── services/      # API service functions
│       │   └── assets/        # Static assets
│       ├── package.json       # Node dependencies
│       └── README.md          # Frontend documentation
├── ER-Diagram.png            # Database schema diagram
└── README.md                 # This file
```

## 🚀 Features

### Organizations Management

- Create, read, update, and delete organizations
- Upload organization logos
- Manage organization status (active/inactive)
- Configure organization settings (timezone, language, etc.)
- Set maximum coordinators limit

### Users Management

- Add users to organizations
- View all users within an organization
- Update user details
- Delete users
- Role-based user management

### Additional Features

- Responsive design with TailwindCSS
- File upload functionality
- Pagination for large datasets
- Form validation
- Error handling
- CORS enabled for frontend-backend communication

## 🛠️ Prerequisites

Before running this application, make sure you have the following installed:

- **Python 3.8+** with pip
- **Node.js 16+** with npm
- **PostgreSQL** database server
- **Git** for version control

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Interview-buddy
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
# Create a .env file in backend/ directory with:
DATABASE_URL=postgresql://username:password@localhost:5432/dbname

# Run database migrations (if using Alembic) or ensure tables are created
# The application will auto-create tables on startup

# Start the FastAPI server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd ../frontend/Organization-Users-Management

# Install dependencies
npm install

# Start the development server
npm run dev
```

### 4. Database Setup

1. Create a PostgreSQL database
2. Update the `DATABASE_URL` in your `.env` file
3. The application will automatically create tables on first run

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```

### CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` (Vite dev server). Update the origins in `backend/app/main.py` if needed.

## 📡 API Endpoints

### Organizations

- `GET /organizations/` - List all organizations
- `GET /organizations/{id}` - Get organization details
- `POST /organizations/` - Create new organization
- `PUT /organizations/{id}` - Update organization
- `PUT /organizations/{id}/logo` - Upload organization logo
- `DELETE /organizations/{id}` - Delete organization

### Users

- `GET /users/by-organization/{org_id}` - Get users for organization
- `POST /users/` - Create new user
- `PUT /users/{id}` - Update user
- `DELETE /users/{id}` - Delete user

## 🖥️ Usage

1. Start the backend server (runs on http://localhost:8000)
2. Start the frontend server (runs on http://localhost:5173)
3. Open your browser and navigate to http://localhost:5173
4. Use the interface to manage organizations and users
