# AIIMS Telepathology Teaching Initiative

A national educational portal led by the Department of Pathology, AIIMS to expand access to digital pathology learning across India.

## Tech Stack

- **Backend**: Flask 3.x, SQLAlchemy, Flask-JWT-Extended, Marshmallow
- **Frontend**: React 18, TypeScript, Tailwind CSS, React Query
- **Database**: SQLite (default) - No external database setup required

## Project Structure

```
digipath/
├── backend/                 # Flask Backend API
│   ├── app/
│   │   ├── api/v1/         # REST API endpoints
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Marshmallow schemas
│   │   ├── services/       # Business logic
│   │   └── utils/          # Helpers & decorators
│   ├── requirements.txt
│   ├── run.py              # Entry point
│   └── seed.py             # Database seeding
│
├── frontend/               # React Frontend
│   ├── src/
│   │   ├── api/           # API functions
│   │   ├── components/    # UI components
│   │   ├── features/      # Page components
│   │   ├── hooks/         # React Query hooks
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── plan.md                 # Architecture documentation
└── phases.md               # Development phases
```

---

## Quick Start (Development)

### Prerequisites

- Python 3.11+
- Node.js 18+
- Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd digipath
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create environment file
cp .env.example .env

# Initialize database and run migrations
flask db init
flask db migrate -m "Initial migration"
flask db upgrade

# Seed the database with initial data
python seed.py

# Start the backend server
python run.py
```

Backend will be running at `http://localhost:5000`

### 3. Frontend Setup (New Terminal)

```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start the development server
npm run dev
```

Frontend will be running at `http://localhost:5173`

### 4. Access the Application

- **Public Site**: http://localhost:5173
- **Admin Login**: http://localhost:5173/admin/login
- **API Health Check**: http://localhost:5000/health

**Default Admin Credentials:**
- Email: `admin@aiims.edu`
- Password: `admin123`

---

## Configuration

### Backend Environment Variables (`backend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `FLASK_APP` | Flask application entry | `run.py` |
| `FLASK_ENV` | Environment mode | `development` |
| `SECRET_KEY` | Flask secret key | (change in production) |
| `HOST` | Server host | `0.0.0.0` |
| `PORT` | Server port | `5000` |
| `DATABASE_URL` | Database connection string | `sqlite:///digipath.db` |
| `JWT_SECRET_KEY` | JWT signing key | (change in production) |
| `JWT_ACCESS_TOKEN_EXPIRES` | Token expiry in seconds | `3600` |
| `CORS_ORIGINS` | Allowed origins (comma-separated) | `http://localhost:3000,http://localhost:5173` |

### Frontend Environment Variables (`frontend/.env`)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API URL | `http://localhost:5000/api/v1` |
| `VITE_HOST` | Dev server host | `0.0.0.0` |
| `VITE_PORT` | Dev server port | `5173` |
| `VITE_PREVIEW_PORT` | Preview server port | `4173` |

---

## Production Deployment

### Option 1: Traditional Server Deployment

#### Backend Deployment

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create production .env file
cp .env.example .env

# Edit .env with production values
# - Set strong SECRET_KEY and JWT_SECRET_KEY
# - Set FLASK_ENV=production
# - Configure PORT and HOST as needed
# - Update CORS_ORIGINS with your frontend domain

# Initialize database
flask db upgrade
python seed.py

# Run with Gunicorn (production WSGI server)
gunicorn --bind 0.0.0.0:5000 --workers 4 run:app
```

#### Frontend Deployment

```bash
cd frontend

# Install dependencies
npm install

# Create production .env file
cp .env.example .env

# Edit .env with production API URL
# VITE_API_BASE_URL=https://your-api-domain.com/api/v1

# Build for production
npm run build

# The build output will be in 'dist/' folder
# Serve with any static file server (nginx, apache, etc.)
```

### Option 2: Docker Deployment

#### Backend Dockerfile

Create `backend/Dockerfile`:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["gunicorn", "--bind", "0.0.0.0:5000", "--workers", "4", "run:app"]
```

#### Frontend Dockerfile

Create `frontend/Dockerfile`:

```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Docker Compose

Create `docker-compose.yml` in the root directory:

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "${BACKEND_PORT:-5000}:5000"
    environment:
      - FLASK_ENV=production
      - SECRET_KEY=${SECRET_KEY}
      - JWT_SECRET_KEY=${JWT_SECRET_KEY}
      - CORS_ORIGINS=${FRONTEND_URL:-http://localhost}
    volumes:
      - ./data:/app/data  # Persist SQLite database

  frontend:
    build: ./frontend
    ports:
      - "${FRONTEND_PORT:-80}:80"
    depends_on:
      - backend
```

Run with:
```bash
docker-compose up -d
```

### Option 3: Cloud Platform Deployment

#### Heroku

**Backend:**
```bash
cd backend
heroku create your-app-backend
heroku config:set FLASK_ENV=production
heroku config:set SECRET_KEY=your-secret-key
heroku config:set JWT_SECRET_KEY=your-jwt-secret
git push heroku main
```

**Frontend (Netlify/Vercel):**
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variable: `VITE_API_BASE_URL=https://your-backend.herokuapp.com/api/v1`

#### Railway / Render

Both platforms support automatic deployment from GitHub. Configure environment variables in their dashboard.

---

## Nginx Configuration (Production)

Example nginx configuration for serving both frontend and proxying API:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend static files
    location / {
        root /var/www/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # API proxy
    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## API Documentation

### Authentication

All admin endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <access_token>
```

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/public/home` | Landing page data |
| GET | `/api/v1/public/sessions/upcoming` | List upcoming sessions |
| GET | `/api/v1/public/sessions/{id}` | Session detail |
| GET | `/api/v1/public/sessions/{id}/calendar` | Download ICS file |
| GET | `/api/v1/public/recordings` | List recordings |
| GET | `/api/v1/public/recordings/{id}` | Recording detail |
| GET | `/api/v1/public/tags` | All active tags |

### Auth Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/login` | Admin login |
| POST | `/api/v1/auth/refresh` | Refresh token |
| GET | `/api/v1/auth/me` | Current user |

### Admin Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/v1/admin/sessions` | List/Create sessions |
| GET/PUT/DELETE | `/api/v1/admin/sessions/{id}` | Session CRUD |
| POST | `/api/v1/admin/sessions/{id}/publish` | Publish session |
| POST | `/api/v1/admin/sessions/{id}/complete` | Mark completed |
| GET/POST | `/api/v1/admin/recordings` | Recording management |
| GET/POST | `/api/v1/admin/speakers` | Speaker management |
| GET/POST | `/api/v1/admin/tags` | Tag management |

---

## Troubleshooting

### Backend Issues

**Database migration errors:**
```bash
# Reset migrations
rm -rf migrations/
flask db init
flask db migrate -m "Initial"
flask db upgrade
```

**Port already in use:**
```bash
# Change port in .env file
PORT=5001
```

### Frontend Issues

**Build errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**API connection issues:**
- Verify `VITE_API_BASE_URL` in `.env` matches your backend URL
- Check CORS_ORIGINS in backend includes your frontend URL

---

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

---

## License

This project is licensed under the MIT License.
