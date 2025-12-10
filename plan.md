# Implementation Plan: AIIMS Telepathology Teaching Initiative

## 1. System Overview

A national educational portal led by the Department of Pathology, AIIMS designed to:
- Expand access to digital pathology learning across India
- Provide structured live sessions and archived recordings
- Enable admins to manage sessions, recordings, and classification tags
- Serve public users without authentication for viewing content

### 1.1 Technology Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Backend | Flask 3.x + Flask-RESTful | Lightweight, flexible Python framework |
| ORM | SQLAlchemy 2.x | Robust ORM with excellent PostgreSQL support |
| Database | PostgreSQL 15+ | Reliable, feature-rich RDBMS |
| Migrations | Flask-Migrate (Alembic) | Industry-standard schema migrations |
| Auth | Flask-JWT-Extended | JWT-based authentication for admin |
| Frontend | React 18 + TypeScript | Component-based, type-safe UI |
| Styling | Tailwind CSS 3.x | Utility-first CSS framework |
| State | TanStack Query (React Query) | Server state management |
| Routing | React Router v6 | Client-side routing |
| Build | Vite | Fast build tooling |

---

## 2. Architecture Specification

### 2.1 Backend Project Structure (Flask)

```
backend/
├── app/
│   ├── __init__.py              # Flask app factory
│   ├── config.py                # Configuration classes
│   ├── extensions.py            # Flask extensions initialization
│   │
│   ├── models/                  # SQLAlchemy models
│   │   ├── __init__.py
│   │   ├── session.py           # Session model
│   │   ├── recording.py         # Recording model
│   │   ├── speaker.py           # Speaker model
│   │   ├── tag.py               # Tag model
│   │   └── admin_user.py        # AdminUser model
│   │
│   ├── schemas/                 # Marshmallow schemas (request/response)
│   │   ├── __init__.py
│   │   ├── session_schema.py
│   │   ├── recording_schema.py
│   │   ├── speaker_schema.py
│   │   ├── tag_schema.py
│   │   └── auth_schema.py
│   │
│   ├── api/
│   │   ├── __init__.py
│   │   └── v1/
│   │       ├── __init__.py      # Blueprint registration
│   │       ├── auth.py          # Auth endpoints
│   │       ├── sessions.py      # Session CRUD
│   │       ├── recordings.py    # Recording endpoints
│   │       ├── speakers.py      # Speaker CRUD
│   │       ├── tags.py          # Tag management
│   │       └── public.py        # Public-facing endpoints
│   │
│   ├── services/                # Business logic layer
│   │   ├── __init__.py
│   │   ├── session_service.py
│   │   ├── recording_service.py
│   │   ├── calendar_service.py  # ICS generation
│   │   └── youtube_service.py   # YouTube thumbnail extraction
│   │
│   └── utils/
│       ├── __init__.py
│       ├── decorators.py        # Auth decorators
│       ├── validators.py        # Custom validators
│       └── helpers.py           # Utility functions
│
├── migrations/                  # Alembic migrations
├── tests/
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_sessions.py
│   └── test_recordings.py
├── requirements.txt
└── run.py
```

### 2.2 Database Models (SQLAlchemy)

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   AdminUser     │     │     Speaker     │     │      Tag        │
├─────────────────┤     ├─────────────────┤     ├─────────────────┤
│ id: UUID (PK)   │     │ id: UUID (PK)   │     │ id: UUID (PK)   │
│ name: String    │     │ name: String    │     │ category: Enum  │
│ email: String   │     │ designation:Str │     │ label: String   │
│ password_hash   │     │ is_aiims: Bool  │     │ is_active: Bool │
│ role: Enum      │     │ created_at      │     │ created_at      │
│ created_at      │     │ updated_at      │     │ updated_at      │
│ updated_at      │     └────────┬────────┘     └────────┬────────┘
└─────────────────┘              │                       │
                                 │                       │
                    ┌────────────┴───────────────────────┴────────────┐
                    │                    Session                       │
                    ├──────────────────────────────────────────────────┤
                    │ id: UUID (PK)                                    │
                    │ title: String (required)                         │
                    │ summary: Text (required)                         │
                    │ abstract: Text (required)                        │
                    │ objectives: JSON (optional, list)                │
                    │ date: Date (required)                            │
                    │ time: Time (required)                            │
                    │ duration_minutes: Integer (required)             │
                    │ status: Enum(Draft, Published, Completed)        │
                    │ platform: String (required)                      │
                    │ meeting_link: String                             │
                    │ meeting_id: String (optional)                    │
                    │ meeting_password: String (optional)              │
                    │ speaker_id: UUID (FK -> Speaker.id)              │
                    │ organ_tag_id: UUID (FK -> Tag.id)                │
                    │ type_tag_id: UUID (FK -> Tag.id)                 │
                    │ level_tag_id: UUID (FK -> Tag.id)                │
                    │ created_by: UUID (FK -> AdminUser.id)            │
                    │ created_at: DateTime                             │
                    │ updated_at: DateTime                             │
                    └────────────────────────┬─────────────────────────┘
                                             │
                                             │ 1:1 (optional)
                                             ▼
                              ┌──────────────────────────────┐
                              │          Recording           │
                              ├──────────────────────────────┤
                              │ id: UUID (PK)                │
                              │ session_id: UUID (FK, unique)│
                              │ youtube_url: String          │
                              │ thumbnail_url: String        │
                              │ pdf_url: String (optional)   │
                              │ recorded_date: Date          │
                              │ views_count: Integer         │
                              │ created_at: DateTime         │
                              │ updated_at: DateTime         │
                              └──────────────────────────────┘
```

#### Model Definitions

**AdminUser**
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, default=uuid4 |
| name | String(100) | NOT NULL |
| email | String(255) | NOT NULL, UNIQUE |
| password_hash | String(255) | NOT NULL |
| role | Enum('super_admin', 'admin') | NOT NULL, default='admin' |
| created_at | DateTime | NOT NULL, default=now |
| updated_at | DateTime | NOT NULL, onupdate=now |

**Speaker**
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, default=uuid4 |
| name | String(200) | NOT NULL |
| designation | String(300) | NOT NULL |
| is_aiims | Boolean | NOT NULL, default=True |
| created_at | DateTime | NOT NULL, default=now |
| updated_at | DateTime | NOT NULL, onupdate=now |

**Tag**
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, default=uuid4 |
| category | Enum('organ', 'type', 'level') | NOT NULL |
| label | String(100) | NOT NULL |
| is_active | Boolean | NOT NULL, default=True |
| created_at | DateTime | NOT NULL, default=now |
| updated_at | DateTime | NOT NULL, onupdate=now |
| | | UNIQUE(category, label) |

**Session**
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, default=uuid4 |
| title | String(300) | NOT NULL |
| summary | Text | NOT NULL |
| abstract | Text | NOT NULL |
| objectives | JSON | NULLABLE (array of strings) |
| date | Date | NOT NULL |
| time | Time | NOT NULL |
| duration_minutes | Integer | NOT NULL |
| status | Enum('draft', 'published', 'completed') | NOT NULL, default='draft' |
| platform | String(100) | NOT NULL |
| meeting_link | String(500) | NULLABLE |
| meeting_id | String(100) | NULLABLE |
| meeting_password | String(100) | NULLABLE |
| speaker_id | UUID | FK -> Speaker.id, NOT NULL |
| organ_tag_id | UUID | FK -> Tag.id, NOT NULL |
| type_tag_id | UUID | FK -> Tag.id, NOT NULL |
| level_tag_id | UUID | FK -> Tag.id, NOT NULL |
| created_by | UUID | FK -> AdminUser.id, NOT NULL |
| created_at | DateTime | NOT NULL, default=now |
| updated_at | DateTime | NOT NULL, onupdate=now |

**Recording**
| Field | Type | Constraints |
|-------|------|-------------|
| id | UUID | PK, default=uuid4 |
| session_id | UUID | FK -> Session.id, UNIQUE, NOT NULL |
| youtube_url | String(500) | NOT NULL |
| thumbnail_url | String(500) | NULLABLE (derived from YouTube) |
| pdf_url | String(500) | NULLABLE |
| recorded_date | Date | NOT NULL |
| views_count | Integer | NOT NULL, default=0 |
| created_at | DateTime | NOT NULL, default=now |
| updated_at | DateTime | NOT NULL, onupdate=now |

---

### 2.3 API Contract (Flask-RESTful)

#### Authentication Endpoints

| Method | Endpoint | Request Schema | Response Schema | Description | Auth |
|--------|----------|----------------|-----------------|-------------|------|
| POST | `/api/v1/auth/login` | `LoginRequest` | `TokenResponse` | Admin login | No |
| POST | `/api/v1/auth/refresh` | - | `TokenResponse` | Refresh JWT token | Yes |
| POST | `/api/v1/auth/logout` | - | `MessageResponse` | Logout (blacklist token) | Yes |
| GET | `/api/v1/auth/me` | - | `AdminUserResponse` | Get current admin | Yes |

#### Public Endpoints (No Auth Required)

| Method | Endpoint | Request Schema | Response Schema | Description |
|--------|----------|----------------|-----------------|-------------|
| GET | `/api/v1/public/sessions/upcoming` | Query params | `PaginatedSessionList` | List published upcoming sessions |
| GET | `/api/v1/public/sessions/{id}` | - | `SessionDetailResponse` | Get session detail |
| GET | `/api/v1/public/sessions/{id}/calendar` | - | ICS file | Download calendar invite |
| GET | `/api/v1/public/recordings` | Query params | `PaginatedRecordingList` | List recordings |
| GET | `/api/v1/public/recordings/{id}` | - | `RecordingDetailResponse` | Get recording detail |
| GET | `/api/v1/public/tags` | - | `TagListResponse` | Get all active tags |
| GET | `/api/v1/public/home` | - | `HomeDataResponse` | Landing page data |

#### Admin Session Endpoints

| Method | Endpoint | Request Schema | Response Schema | Description | Auth |
|--------|----------|----------------|-----------------|-------------|------|
| GET | `/api/v1/admin/sessions` | Query params | `PaginatedSessionList` | List all sessions | Yes |
| POST | `/api/v1/admin/sessions` | `SessionCreate` | `SessionResponse` | Create session | Yes |
| GET | `/api/v1/admin/sessions/{id}` | - | `SessionResponse` | Get session | Yes |
| PUT | `/api/v1/admin/sessions/{id}` | `SessionUpdate` | `SessionResponse` | Update session | Yes |
| DELETE | `/api/v1/admin/sessions/{id}` | - | `MessageResponse` | Delete draft session | Yes |
| POST | `/api/v1/admin/sessions/{id}/publish` | - | `SessionResponse` | Publish session | Yes |
| POST | `/api/v1/admin/sessions/{id}/unpublish` | - | `SessionResponse` | Unpublish to draft | Yes |
| POST | `/api/v1/admin/sessions/{id}/complete` | `CompleteSessionRequest` | `SessionResponse` | Mark completed | Yes |
| GET | `/api/v1/admin/sessions/upcoming` | Query params | `PaginatedSessionList` | Upcoming sessions | Yes |
| GET | `/api/v1/admin/sessions/past` | Query params | `PaginatedSessionList` | Past/completed sessions | Yes |

#### Admin Recording Endpoints

| Method | Endpoint | Request Schema | Response Schema | Description | Auth |
|--------|----------|----------------|-----------------|-------------|------|
| POST | `/api/v1/admin/recordings` | `RecordingCreate` | `RecordingResponse` | Add recording to session | Yes |
| PUT | `/api/v1/admin/recordings/{id}` | `RecordingUpdate` | `RecordingResponse` | Update recording | Yes |
| DELETE | `/api/v1/admin/recordings/{id}` | - | `MessageResponse` | Delete recording | Yes |

#### Admin Speaker Endpoints

| Method | Endpoint | Request Schema | Response Schema | Description | Auth |
|--------|----------|----------------|-----------------|-------------|------|
| GET | `/api/v1/admin/speakers` | - | `SpeakerListResponse` | List all speakers | Yes |
| POST | `/api/v1/admin/speakers` | `SpeakerCreate` | `SpeakerResponse` | Create speaker | Yes |
| PUT | `/api/v1/admin/speakers/{id}` | `SpeakerUpdate` | `SpeakerResponse` | Update speaker | Yes |
| DELETE | `/api/v1/admin/speakers/{id}` | - | `MessageResponse` | Delete unused speaker | Yes |

#### Admin Tag Endpoints

| Method | Endpoint | Request Schema | Response Schema | Description | Auth |
|--------|----------|----------------|-----------------|-------------|------|
| GET | `/api/v1/admin/tags` | - | `TagListResponse` | List all tags | Yes |
| POST | `/api/v1/admin/tags` | `TagCreate` | `TagResponse` | Create tag | Yes |
| PUT | `/api/v1/admin/tags/{id}` | `TagUpdate` | `TagResponse` | Update tag | Yes |
| DELETE | `/api/v1/admin/tags/{id}` | - | `MessageResponse` | Delete unused tag | Yes |
| GET | `/api/v1/admin/tags/{id}/usage` | - | `TagUsageResponse` | Check tag usage count | Yes |

---

### 2.4 Frontend Project Structure (React + TypeScript)

```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── main.tsx                 # Entry point
│   ├── App.tsx                  # Root component with routing
│   ├── vite-env.d.ts
│   │
│   ├── api/                     # API layer (no fetch in components)
│   │   ├── client.ts            # Axios instance configuration
│   │   ├── auth.api.ts
│   │   ├── sessions.api.ts
│   │   ├── recordings.api.ts
│   │   ├── speakers.api.ts
│   │   └── tags.api.ts
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useSessions.ts
│   │   ├── useRecordings.ts
│   │   └── useTags.ts
│   │
│   ├── types/                   # TypeScript interfaces
│   │   ├── session.types.ts
│   │   ├── recording.types.ts
│   │   ├── speaker.types.ts
│   │   ├── tag.types.ts
│   │   └── auth.types.ts
│   │
│   ├── components/              # Shared UI components
│   │   ├── ui/                  # Atomic components
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── TagChip.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Pagination.tsx
│   │   │
│   │   ├── layout/
│   │   │   ├── PublicLayout.tsx
│   │   │   ├── AdminLayout.tsx
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── common/
│   │       ├── SessionCard.tsx
│   │       ├── RecordingCard.tsx
│   │       ├── FilterPanel.tsx
│   │       ├── SearchBar.tsx
│   │       └── EmptyState.tsx
│   │
│   ├── features/                # Feature-based modules
│   │   ├── home/
│   │   │   ├── HomePage.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── ImpactCards.tsx
│   │   │   ├── SessionPreview.tsx
│   │   │   ├── RecordingPreview.tsx
│   │   │   └── CTABand.tsx
│   │   │
│   │   ├── sessions/
│   │   │   ├── UpcomingSessionsPage.tsx
│   │   │   ├── SessionDetailPage.tsx
│   │   │   └── SessionFilters.tsx
│   │   │
│   │   ├── recordings/
│   │   │   ├── RecordingsPage.tsx
│   │   │   ├── RecordingDetailPage.tsx
│   │   │   ├── YouTubeEmbed.tsx
│   │   │   └── RecordingFilters.tsx
│   │   │
│   │   ├── about/
│   │   │   └── AboutPage.tsx
│   │   │
│   │   ├── contact/
│   │   │   └── ContactPage.tsx
│   │   │
│   │   └── admin/
│   │       ├── auth/
│   │       │   └── LoginPage.tsx
│   │       │
│   │       ├── dashboard/
│   │       │   └── DashboardPage.tsx
│   │       │
│   │       ├── sessions/
│   │       │   ├── AdminSessionsPage.tsx
│   │       │   ├── CreateSessionPage.tsx
│   │       │   ├── EditSessionPage.tsx
│   │       │   ├── PastSessionsPage.tsx
│   │       │   ├── SessionForm.tsx
│   │       │   └── CompleteSessionModal.tsx
│   │       │
│   │       ├── recordings/
│   │       │   ├── AddRecordingModal.tsx
│   │       │   └── UpdateRecordingModal.tsx
│   │       │
│   │       └── tags/
│   │           ├── TagsManagementPage.tsx
│   │           ├── TagForm.tsx
│   │           └── TagDeleteModal.tsx
│   │
│   ├── context/
│   │   └── AuthContext.tsx
│   │
│   ├── utils/
│   │   ├── constants.ts
│   │   ├── formatters.ts        # Date, time formatting
│   │   ├── validators.ts
│   │   └── calendar.ts          # Calendar invite generation
│   │
│   └── styles/
│       └── globals.css          # Tailwind imports
│
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

### 2.5 Key Schema Definitions (Marshmallow)

#### Session Schemas

```python
# SessionCreate
{
    "title": str,           # required, max 300
    "summary": str,         # required
    "abstract": str,        # required
    "objectives": [str],    # optional
    "date": "YYYY-MM-DD",   # required
    "time": "HH:MM",        # required
    "duration_minutes": int,# required
    "platform": str,        # required
    "meeting_link": str,    # optional (required for publish)
    "meeting_id": str,      # optional
    "meeting_password": str,# optional
    "speaker_id": uuid,     # required
    "organ_tag_id": uuid,   # required
    "type_tag_id": uuid,    # required
    "level_tag_id": uuid    # required
}

# SessionResponse
{
    "id": uuid,
    "title": str,
    "summary": str,
    "abstract": str,
    "objectives": [str],
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "duration_minutes": int,
    "status": "draft|published|completed",
    "platform": str,
    "meeting_link": str,
    "meeting_id": str,
    "meeting_password": str,
    "speaker": SpeakerResponse,
    "organ_tag": TagResponse,
    "type_tag": TagResponse,
    "level_tag": TagResponse,
    "recording": RecordingResponse | null,
    "has_recording": bool,
    "created_at": datetime,
    "updated_at": datetime
}
```

---

## 3. Implementation Details

### 3.1 Business Logic Rules

#### Session Status Transitions

```
Draft ──[publish]--> Published ──[complete]--> Completed
  ▲                      │
  └────[unpublish]───────┘
```

**Publish Validation:**
- All required fields must be filled
- `meeting_link` MUST be present
- Session date must be in the future

**Complete Validation:**
- Session must be in `published` status
- YouTube URL is recommended but not required

#### Recording Rules

- Recording is optional for completed sessions
- Admin can add/update recording at any time after completion
- YouTube thumbnail is auto-extracted from URL
- PDF upload is optional supplementary material

### 3.2 Third-Party Integrations

| Integration | Purpose | Implementation |
|-------------|---------|----------------|
| YouTube | Video hosting | Embed URLs, thumbnail extraction |
| ICS Calendar | Add to calendar | Generate ICS files server-side |
| File Upload | PDF slides | Store in local filesystem or S3 |

### 3.3 Security Considerations

- JWT tokens with short expiry (15 min access, 7 day refresh)
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- CORS configuration for frontend origin
- Input sanitization on all endpoints
- XSS prevention in frontend

### 3.4 Performance Considerations

- Database indexes on frequently queried fields
- Pagination on all list endpoints (default 20 items)
- Query optimization for session/recording joins
- Frontend: React Query caching
- Lazy loading for recording pages

---

## 4. Development Environment

### 4.1 Prerequisites

- Python 3.11+
- Node.js 18+
- PostgreSQL 15+
- Git

### 4.2 Environment Variables

**Backend (.env)**
```
FLASK_APP=run.py
FLASK_ENV=development
SECRET_KEY=<generate-secure-key>
JWT_SECRET_KEY=<generate-secure-key>
DATABASE_URL=postgresql://user:pass@localhost:5432/digipath
CORS_ORIGINS=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000/api/v1
```

---

## 5. Deployment Architecture (Future)

```
                    ┌─────────────────┐
                    │   Nginx/Caddy   │
                    │   (Reverse Proxy)│
                    └────────┬────────┘
                             │
              ┌──────────────┴──────────────┐
              │                             │
    ┌─────────▼─────────┐       ┌───────────▼───────────┐
    │   Flask Backend   │       │   React Frontend      │
    │   (Gunicorn)      │       │   (Static Build)      │
    │   Port: 5000      │       │   Served by Nginx     │
    └─────────┬─────────┘       └───────────────────────┘
              │
    ┌─────────▼─────────┐
    │   PostgreSQL      │
    │   Port: 5432      │
    └───────────────────┘
```

---

## 6. Git Worktree Strategy for Parallel Development

To enable parallel development by multiple developers or Claude instances, the project is structured into independent modules that can be developed in separate git worktrees.

### 6.1 Worktree Branches

| Worktree | Branch Pattern | Purpose |
|----------|----------------|---------|
| Main | `main` | Integration branch |
| Backend-Core | `feature/backend-core` | Flask setup, models, migrations |
| Backend-API | `feature/backend-api` | API endpoints, schemas |
| Frontend-Core | `feature/frontend-core` | React setup, UI components |
| Frontend-Public | `feature/frontend-public` | Public pages |
| Frontend-Admin | `feature/frontend-admin` | Admin pages |

### 6.2 Independence Matrix

| Module | Dependencies | Can Parallel With |
|--------|--------------|-------------------|
| Backend-Core | None | Frontend-Core |
| Backend-API | Backend-Core | Frontend-Public, Frontend-Admin |
| Frontend-Core | None | Backend-Core |
| Frontend-Public | Frontend-Core, API types | Backend-API |
| Frontend-Admin | Frontend-Core, API types | Frontend-Public |

---

*Last Updated: 2024*
*Version: 1.0*
