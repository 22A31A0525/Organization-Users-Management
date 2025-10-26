# Backend - Organization and User Management API

FastAPI backend for the Organization and User Management System.

## 🏗️ Architecture

The backend follows a layered architecture pattern:

- **Routers**: API endpoints and request handling
- **Services**: Business logic and validation
- **Repositories**: Data access layer with SQLAlchemy
- **Models**: Database table definitions
- **Schemas**: Pydantic models for request/response validation
- **Core**: Configuration and database connection

## 📁 Directory Structure

```
backend/
├── app/
│   ├── main.py                    # FastAPI application entry point
│   ├── core/
│   │   ├── config.py             # Environment configuration (Pydantic)
│   │   └── database.py           # SQLAlchemy engine and session management
│   ├── models/
│   │   ├── organization.py       # Organization SQLAlchemy model
│   │   └── user.py               # User SQLAlchemy model
│   ├── schemas/
│   │   ├── organization.py       # Pydantic schemas for organizations
│   │   └── user.py               # Pydantic schemas for users
│   ├── routers/
│   │   ├── organizations.py      # Organization API endpoints
│   │   └── users.py              # User API endpoints
│   ├── services/
│   │   ├── organization_service.py # Organization business logic
│   │   └── user_service.py       # User business logic
│   ├── repositories/
│   │   ├── organization_repo.py  # Organization data access
│   │   └── user_repo.py          # User data access
│   └── static/uploads/           # File upload directory
├── requirements.txt               # Python dependencies
├── .env                          # Environment variables (create this)
└── README.md                     # This file
```

## 🛠️ Prerequisites

- Python 3.8+
- PostgreSQL database
- pip package manager

## ⚙️ Installation

1. **Navigate to backend directory:**

   ```bash
   cd backend
   ```

2. **Create virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables:**
   Create a `.env` file in the backend directory:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/Organization-Users-Management
   ```

5. **Database setup:**
   - Create a PostgreSQL database
   - Update DATABASE_URL with your credentials
   - Tables will be auto-created when the app starts

## 🚀 Running the Application

### Development Mode

```bash
uvicorn app.main:app --reload
```

### Production Mode

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

The API will be available at: http://localhost:8000

## 📡 API Documentation

### Interactive API Docs

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

### Organizations Endpoints

| Method | Endpoint                   | Description                           |
| ------ | -------------------------- | ------------------------------------- |
| GET    | `/organizations/`          | List all organizations (paginated)    |
| GET    | `/organizations/{id}`      | Get organization details by ID        |
| POST   | `/organizations/`          | Create new organization               |
| PUT    | `/organizations/{id}`      | Update organization details           |
| PUT    | `/organizations/{id}/logo` | Upload organization logo              |
| DELETE | `/organizations/{id}`      | Delete organization and all its users |

### Users Endpoints

| Method | Endpoint                          | Description                       |
| ------ | --------------------------------- | --------------------------------- |
| GET    | `/users/by-organization/{org_id}` | Get all users for an organization |
| POST   | `/users/`                         | Create new user                   |
| PUT    | `/users/{id}`                     | Update user details               |
| DELETE | `/users/{id}`                     | Delete user                       |

### Request/Response Examples

#### Create Organization

```bash
POST /organizations/
Content-Type: application/json

{
  "name": "Tech Corp",
  "slug": "tech-corp",
  "support_email": "support@techcorp.com",
  "phone": "+1-555-0123"
}
```

#### Get Organizations

```bash
GET /organizations/
Response:
[
  {
    "id": 1,
    "name": "Tech Corp",
    "status": "active",
    "logo_url": "/static/uploads/logo.png"
  }
]
```

#### Create User

```bash
POST /users/
Content-Type: application/json

{
  "name": "John Doe",
  "role": "admin",
  "organization_id": 1
}
```

## 🔧 Configuration

### Environment Variables

| Variable       | Description                  | Default  |
| -------------- | ---------------------------- | -------- |
| `DATABASE_URL` | PostgreSQL connection string | Required |

### CORS Configuration

CORS is configured in `app/main.py`. Currently allows:

- Origin: `http://localhost:5173` (React dev server)
- Methods: All HTTP methods
- Headers: All headers
- Credentials: True

Update the `origins` list in `main.py` for production deployment.

## 📊 Database Schema

### Organizations Table

- `id`: Primary key (Integer)
- `name`: Organization name (String)
- `slug`: Unique identifier (String)
- `status`: Organization status (String, default: "active")
- `logo_url`: Logo file path (String)
- `support_email`: Support email (String)
- `contact_no`: Contact phone (String)
- `alternative_phone`: Alternative phone (String)
- `primary_admin_name`: Primary admin name (String)
- `primary_admin_email`: Primary admin email (String)
- `website_url`: Website URL (String)
- `max_coordinators`: Max coordinators limit (String)
- `timezone`: Organization timezone (String)
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

### Users Table

- `id`: Primary key (Integer)
- `name`: User name (String)
- `role`: User role (String)
- `organization_id`: Foreign key to organizations
- `created_at`: Creation timestamp
- `updated_at`: Last update timestamp

## 🧪 Testing

```bash
# Install test dependencies (if any)
pip install pytest

# Run tests
pytest

# Run with coverage
pytest --cov=app --cov-report=html
```

## 🚀 Deployment

### Using Docker (Recommended)

```dockerfile
# Dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Using Gunicorn (Production)

```bash
pip install gunicorn
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

## 🔒 Security Features

- Input validation using Pydantic schemas
- SQL injection prevention with SQLAlchemy
- CORS protection
- File upload validation
- Error handling with appropriate HTTP status codes

## 📝 Error Handling

The API returns appropriate HTTP status codes:

- `200`: Success
- `201`: Created
- `400`: Bad Request
- `404`: Not Found
- `500`: Internal Server Error

Error responses include a `detail` field with error description.

## 🔄 Future Enhancements

- [ ] JWT authentication
- [ ] Role-based access control (RBAC)
- [ ] API rate limiting
- [ ] Request logging
- [ ] Database migrations with Alembic
- [ ] API versioning
- [ ] Comprehensive test suite
- [ ] API documentation with examples
