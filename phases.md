# Project Status: AIIMS Telepathology Teaching Initiative

## Current Phase: Phase 1 (Not Started)

---

## Executive Summary

This document outlines the development phases with a **parallel execution strategy using git worktrees**. Each worktree operates on an independent branch, allowing multiple developers (or Claude instances) to work simultaneously on different parts of the system.

---

## Git Worktree Setup Commands

### Initial Setup

```bash
# Clone main repository
git clone <repo-url> digipath-main
cd digipath-main

# Create worktrees for parallel development
git worktree add ../digipath-backend-core feature/backend-core
git worktree add ../digipath-backend-api feature/backend-api
git worktree add ../digipath-frontend-core feature/frontend-core
git worktree add ../digipath-frontend-public feature/frontend-public
git worktree add ../digipath-frontend-admin feature/frontend-admin
```

### Worktree Directory Structure

```
/projects/
├── digipath-main/              # Main integration branch
├── digipath-backend-core/      # Backend scaffolding & models
├── digipath-backend-api/       # API endpoints
├── digipath-frontend-core/     # React setup & UI components
├── digipath-frontend-public/   # Public-facing pages
└── digipath-frontend-admin/    # Admin dashboard & pages
```

---

## Phase Overview & Dependencies

```
Phase 1: Foundation (PARALLEL)
├── [WT-1] Backend Core Setup ────────┐
└── [WT-2] Frontend Core Setup ───────┼──▶ Phase 2
                                      │
Phase 2: Core Backend & Types (PARALLEL after Phase 1)
├── [WT-1] Backend API Development ───┐
└── [WT-2] TypeScript Types & API ────┼──▶ Phase 3
                                      │
Phase 3: Frontend Features (PARALLEL after Phase 2)
├── [WT-1] Public Pages ──────────────┐
└── [WT-2] Admin Pages ───────────────┼──▶ Phase 4
                                      │
Phase 4: Integration & Polish
└── [MAIN] Integration, Testing, Deployment
```

---

## Phase 1: Foundation (Parallel Execution)

**Duration Estimate:** Foundation layer
**Worktrees Active:** 2
**Dependencies:** None

### Worktree 1: Backend Core (`feature/backend-core`)

**Assignee:** Developer A / Claude Instance A

- [ ] **1.1 Project Scaffolding**
  - [ ] Initialize Flask project structure
  - [ ] Create `app/__init__.py` with app factory pattern
  - [ ] Set up `config.py` with environment-based configs
  - [ ] Create `extensions.py` for Flask extensions
  - [ ] Set up `requirements.txt` with all dependencies

- [ ] **1.2 Database Setup**
  - [ ] Configure SQLAlchemy with PostgreSQL
  - [ ] Set up Flask-Migrate for Alembic migrations
  - [ ] Create base model with common fields (id, timestamps)

- [ ] **1.3 Database Models**
  - [ ] Implement `AdminUser` model
  - [ ] Implement `Speaker` model
  - [ ] Implement `Tag` model with category enum
  - [ ] Implement `Session` model with status enum
  - [ ] Implement `Recording` model
  - [ ] Define all relationships and constraints
  - [ ] Create initial migration

- [ ] **1.4 Authentication Foundation**
  - [ ] Configure Flask-JWT-Extended
  - [ ] Create auth decorators (`@admin_required`)
  - [ ] Implement password hashing utilities

- [ ] **1.5 Basic Configuration**
  - [ ] Set up logging configuration
  - [ ] Configure CORS
  - [ ] Create seed data script for initial admin user

**Deliverables:**
- Working Flask app with database connection
- All models with migrations
- Basic auth infrastructure
- Seed script for development

---

### Worktree 2: Frontend Core (`feature/frontend-core`)

**Assignee:** Developer B / Claude Instance B

- [ ] **1.1 Project Scaffolding**
  - [ ] Initialize Vite + React + TypeScript project
  - [ ] Configure Tailwind CSS
  - [ ] Set up ESLint and Prettier
  - [ ] Configure path aliases in `tsconfig.json`

- [ ] **1.2 Base Configuration**
  - [ ] Create Axios client instance with interceptors
  - [ ] Set up React Query provider
  - [ ] Configure React Router with base routes
  - [ ] Create environment variable handling

- [ ] **1.3 UI Component Library**
  - [ ] Create `Button` component (primary, secondary, outline variants)
  - [ ] Create `Input` component with validation states
  - [ ] Create `Card` component with shadow and rounded corners
  - [ ] Create `Badge` component for status indicators
  - [ ] Create `TagChip` component (pill style)
  - [ ] Create `Modal` component
  - [ ] Create `Skeleton` loading component
  - [ ] Create `Pagination` component
  - [ ] Create `EmptyState` component

- [ ] **1.4 Layout Components**
  - [ ] Create `PublicLayout` with header and footer
  - [ ] Create `AdminLayout` with sidebar navigation
  - [ ] Create `Header` component (public version)
  - [ ] Create `Footer` component
  - [ ] Create `Sidebar` component for admin

- [ ] **1.5 Common Components**
  - [ ] Create `SessionCard` component
  - [ ] Create `RecordingCard` component
  - [ ] Create `FilterPanel` component
  - [ ] Create `SearchBar` component

- [ ] **1.6 Auth Context**
  - [ ] Create `AuthContext` with provider
  - [ ] Implement `useAuth` hook
  - [ ] Create protected route wrapper

**Deliverables:**
- Fully configured React/Vite project
- Complete UI component library
- Layout structure ready for pages
- Auth context and routing setup

---

### Phase 1 Merge Checklist

- [ ] Merge `feature/backend-core` into `main`
- [ ] Merge `feature/frontend-core` into `main`
- [ ] Verify no conflicts
- [ ] Tag release: `v0.1.0-foundation`

---

## Phase 2: Core Backend & Frontend Types (Parallel Execution)

**Duration Estimate:** API and types layer
**Worktrees Active:** 2
**Dependencies:** Phase 1 complete

### Worktree 1: Backend API (`feature/backend-api`)

**Assignee:** Developer A / Claude Instance A

- [ ] **2.1 Marshmallow Schemas**
  - [ ] Create `auth_schema.py` (LoginRequest, TokenResponse)
  - [ ] Create `session_schema.py` (Create, Update, Response, List)
  - [ ] Create `recording_schema.py` (Create, Update, Response)
  - [ ] Create `speaker_schema.py` (Create, Update, Response)
  - [ ] Create `tag_schema.py` (Create, Update, Response)

- [ ] **2.2 Service Layer**
  - [ ] Implement `session_service.py`
    - [ ] Create session
    - [ ] Update session
    - [ ] Publish/unpublish logic
    - [ ] Complete session logic
    - [ ] List with filters and pagination
  - [ ] Implement `recording_service.py`
    - [ ] Add recording
    - [ ] Update recording
    - [ ] YouTube thumbnail extraction
  - [ ] Implement `calendar_service.py`
    - [ ] ICS file generation

- [ ] **2.3 Authentication Endpoints**
  - [ ] POST `/auth/login`
  - [ ] POST `/auth/refresh`
  - [ ] POST `/auth/logout`
  - [ ] GET `/auth/me`

- [ ] **2.4 Public API Endpoints**
  - [ ] GET `/public/home` (landing page data)
  - [ ] GET `/public/sessions/upcoming`
  - [ ] GET `/public/sessions/{id}`
  - [ ] GET `/public/sessions/{id}/calendar`
  - [ ] GET `/public/recordings`
  - [ ] GET `/public/recordings/{id}`
  - [ ] GET `/public/tags`

- [ ] **2.5 Admin Session Endpoints**
  - [ ] GET `/admin/sessions`
  - [ ] POST `/admin/sessions`
  - [ ] GET `/admin/sessions/{id}`
  - [ ] PUT `/admin/sessions/{id}`
  - [ ] DELETE `/admin/sessions/{id}`
  - [ ] POST `/admin/sessions/{id}/publish`
  - [ ] POST `/admin/sessions/{id}/unpublish`
  - [ ] POST `/admin/sessions/{id}/complete`
  - [ ] GET `/admin/sessions/upcoming`
  - [ ] GET `/admin/sessions/past`

- [ ] **2.6 Admin Recording Endpoints**
  - [ ] POST `/admin/recordings`
  - [ ] PUT `/admin/recordings/{id}`
  - [ ] DELETE `/admin/recordings/{id}`

- [ ] **2.7 Admin Speaker Endpoints**
  - [ ] GET `/admin/speakers`
  - [ ] POST `/admin/speakers`
  - [ ] PUT `/admin/speakers/{id}`
  - [ ] DELETE `/admin/speakers/{id}`

- [ ] **2.8 Admin Tag Endpoints**
  - [ ] GET `/admin/tags`
  - [ ] POST `/admin/tags`
  - [ ] PUT `/admin/tags/{id}`
  - [ ] DELETE `/admin/tags/{id}`
  - [ ] GET `/admin/tags/{id}/usage`

- [ ] **2.9 Error Handling**
  - [ ] Implement global error handlers
  - [ ] Create custom exception classes
  - [ ] Standardize error response format

- [ ] **2.10 API Documentation**
  - [ ] Add Flask-Swagger/Flasgger for OpenAPI docs

**Deliverables:**
- Complete REST API
- All business logic in services
- OpenAPI documentation
- Error handling

---

### Worktree 2: Frontend Types & API Layer (`feature/frontend-core` continued or new branch)

**Assignee:** Developer B / Claude Instance B

- [ ] **2.1 TypeScript Types**
  - [ ] Define `session.types.ts`
    - [ ] Session, SessionCreate, SessionUpdate
    - [ ] SessionStatus enum
    - [ ] SessionFilters interface
  - [ ] Define `recording.types.ts`
    - [ ] Recording, RecordingCreate, RecordingUpdate
  - [ ] Define `speaker.types.ts`
    - [ ] Speaker, SpeakerCreate, SpeakerUpdate
  - [ ] Define `tag.types.ts`
    - [ ] Tag, TagCategory enum
  - [ ] Define `auth.types.ts`
    - [ ] LoginRequest, TokenResponse, AdminUser
  - [ ] Define `common.types.ts`
    - [ ] PaginatedResponse, ApiError

- [ ] **2.2 API Functions**
  - [ ] Implement `auth.api.ts`
    - [ ] login(), logout(), refreshToken(), getCurrentUser()
  - [ ] Implement `sessions.api.ts`
    - [ ] All session API calls with proper typing
  - [ ] Implement `recordings.api.ts`
    - [ ] All recording API calls
  - [ ] Implement `speakers.api.ts`
    - [ ] All speaker API calls
  - [ ] Implement `tags.api.ts`
    - [ ] All tag API calls

- [ ] **2.3 React Query Hooks**
  - [ ] Implement `useSessions.ts`
    - [ ] useUpcomingSessions, useSession, useCreateSession, etc.
  - [ ] Implement `useRecordings.ts`
    - [ ] useRecordings, useRecording, useAddRecording, etc.
  - [ ] Implement `useSpeakers.ts`
  - [ ] Implement `useTags.ts`
  - [ ] Implement `useAuth.ts` (extended with React Query)

- [ ] **2.4 Utility Functions**
  - [ ] Create `formatters.ts` (date, time, duration)
  - [ ] Create `validators.ts` (YouTube URL, email, etc.)
  - [ ] Create `calendar.ts` (client-side calendar utilities)
  - [ ] Create `constants.ts` (API routes, status values)

**Deliverables:**
- Complete TypeScript type definitions
- API layer with all endpoints
- React Query hooks for data fetching
- Utility functions

---

### Phase 2 Merge Checklist

- [ ] Merge `feature/backend-api` into `main`
- [ ] Merge frontend types/API into `main`
- [ ] Run integration tests
- [ ] Tag release: `v0.2.0-api-complete`

---

## Phase 3: Frontend Features (Parallel Execution)

**Duration Estimate:** All pages
**Worktrees Active:** 2
**Dependencies:** Phase 2 complete

### Worktree 1: Public Pages (`feature/frontend-public`)

**Assignee:** Developer A / Claude Instance A

- [ ] **3.1 Home Page**
  - [ ] Implement `HomePage.tsx`
  - [ ] Create `HeroSection.tsx` with CTAs
  - [ ] Create `ImpactCards.tsx` (3 impact items)
  - [ ] Create `SessionPreview.tsx` (2-4 cards)
  - [ ] Create `RecordingPreview.tsx` (2-4 cards)
  - [ ] Create `CTABand.tsx` (bottom CTA)
  - [ ] Handle empty states

- [ ] **3.2 Upcoming Sessions Page**
  - [ ] Implement `UpcomingSessionsPage.tsx`
  - [ ] Implement `SessionFilters.tsx` (organ, type, level)
  - [ ] Add search functionality
  - [ ] Implement pagination
  - [ ] Handle loading states (skeleton)
  - [ ] Handle empty filter results

- [ ] **3.3 Session Detail Page**
  - [ ] Implement `SessionDetailPage.tsx`
  - [ ] Display all session info
  - [ ] Implement "Join Live Session" button
  - [ ] Implement "Add to Calendar" (ICS download)
  - [ ] Implement "Copy Link" functionality
  - [ ] Show related sessions

- [ ] **3.4 Recordings Library Page**
  - [ ] Implement `RecordingsPage.tsx`
  - [ ] Implement `RecordingFilters.tsx` (organ, type, level, year)
  - [ ] Add sorting (newest, oldest, most viewed)
  - [ ] Implement search
  - [ ] Implement pagination
  - [ ] Handle empty states

- [ ] **3.5 Recording Detail Page**
  - [ ] Implement `RecordingDetailPage.tsx`
  - [ ] Create `YouTubeEmbed.tsx` (responsive)
  - [ ] Display abstract, objectives, speaker
  - [ ] Implement PDF download button
  - [ ] Show related recordings

- [ ] **3.6 About Page**
  - [ ] Implement `AboutPage.tsx`
  - [ ] Program mission section
  - [ ] Faculty leadership
  - [ ] Teaching philosophy
  - [ ] National scale intent

- [ ] **3.7 Contact Page**
  - [ ] Implement `ContactPage.tsx`
  - [ ] Display department email
  - [ ] Optional: Contact form

- [ ] **3.8 Mobile Responsiveness**
  - [ ] Ensure all public pages are mobile-friendly
  - [ ] Collapsible filter drawer on mobile
  - [ ] Responsive navigation

**Deliverables:**
- All public-facing pages
- Fully responsive design
- All user interactions working

---

### Worktree 2: Admin Pages (`feature/frontend-admin`)

**Assignee:** Developer B / Claude Instance B

- [ ] **3.1 Admin Login Page**
  - [ ] Implement `LoginPage.tsx`
  - [ ] Email/password form
  - [ ] Error handling (invalid credentials)
  - [ ] Redirect after login

- [ ] **3.2 Admin Dashboard**
  - [ ] Implement `DashboardPage.tsx`
  - [ ] Summary widgets (total sessions, recordings)
  - [ ] Quick navigation tabs
  - [ ] Next session indicator

- [ ] **3.3 Admin Sessions Management**
  - [ ] Implement `AdminSessionsPage.tsx` (list view)
  - [ ] Session row with status badge
  - [ ] Quick actions (edit, publish/unpublish)
  - [ ] Filter by status

- [ ] **3.4 Create/Edit Session**
  - [ ] Implement `CreateSessionPage.tsx`
  - [ ] Implement `EditSessionPage.tsx`
  - [ ] Create `SessionForm.tsx` (reusable)
    - [ ] Basic Info section
    - [ ] Schedule section
    - [ ] Meeting section
    - [ ] Speaker selection
    - [ ] Classification tags
  - [ ] Form validation
  - [ ] Save Draft / Publish buttons

- [ ] **3.5 Past Sessions Management**
  - [ ] Implement `PastSessionsPage.tsx`
  - [ ] Show recording status badge
  - [ ] Add/Update Recording actions
  - [ ] Edit Past Session action

- [ ] **3.6 Complete Session Flow**
  - [ ] Implement `CompleteSessionModal.tsx`
  - [ ] YouTube link input
  - [ ] PDF upload (optional)
  - [ ] Confirmation flow

- [ ] **3.7 Recording Management**
  - [ ] Implement `AddRecordingModal.tsx`
  - [ ] Implement `UpdateRecordingModal.tsx`
  - [ ] YouTube URL validation
  - [ ] PDF file upload

- [ ] **3.8 Tags Management**
  - [ ] Implement `TagsManagementPage.tsx`
  - [ ] Category tabs (Organ, Type, Level)
  - [ ] Create `TagForm.tsx`
  - [ ] Create `TagDeleteModal.tsx` with usage warning
  - [ ] CRUD operations

- [ ] **3.9 Speaker Management (if needed)**
  - [ ] Speaker list/CRUD in session form
  - [ ] Inline speaker creation

- [ ] **3.10 Admin Navigation & UX**
  - [ ] Breadcrumbs
  - [ ] Success/error toast notifications
  - [ ] Confirmation dialogs for destructive actions
  - [ ] Loading states

**Deliverables:**
- Complete admin dashboard
- Full session management workflow
- Recording management
- Tag management

---

### Phase 3 Merge Checklist

- [ ] Merge `feature/frontend-public` into `main`
- [ ] Merge `feature/frontend-admin` into `main`
- [ ] Resolve any component conflicts
- [ ] Full integration testing
- [ ] Tag release: `v0.3.0-frontend-complete`

---

## Phase 4: Integration, Testing & Deployment

**Duration Estimate:** Polish and launch
**Worktrees Active:** 1 (main)
**Dependencies:** Phase 3 complete

### Integration Tasks

- [ ] **4.1 End-to-End Testing**
  - [ ] Test complete session lifecycle
  - [ ] Test recording addition flow
  - [ ] Test all public page flows
  - [ ] Test admin authentication

- [ ] **4.2 Backend Testing**
  - [ ] Unit tests for services
  - [ ] Integration tests for API endpoints
  - [ ] Auth flow tests
  - [ ] Edge case handling

- [ ] **4.3 Frontend Testing**
  - [ ] Component unit tests
  - [ ] Integration tests with mock API
  - [ ] E2E tests with Playwright/Cypress

- [ ] **4.4 Performance Optimization**
  - [ ] Database query optimization
  - [ ] Add database indexes
  - [ ] Frontend bundle optimization
  - [ ] Image/asset optimization
  - [ ] Lazy loading implementation

- [ ] **4.5 Security Audit**
  - [ ] Review auth implementation
  - [ ] Check for XSS vulnerabilities
  - [ ] Validate all inputs server-side
  - [ ] Review CORS configuration
  - [ ] Rate limiting on sensitive endpoints

### Deployment Preparation

- [ ] **4.6 Production Configuration**
  - [ ] Set up production environment variables
  - [ ] Configure Gunicorn for Flask
  - [ ] Build frontend for production
  - [ ] Set up Nginx configuration

- [ ] **4.7 Database Production**
  - [ ] Set up production PostgreSQL
  - [ ] Run migrations
  - [ ] Create initial admin user
  - [ ] Seed initial tags

- [ ] **4.8 Deployment**
  - [ ] Deploy backend
  - [ ] Deploy frontend (static files)
  - [ ] Configure SSL/HTTPS
  - [ ] Set up monitoring/logging
  - [ ] Create backup strategy

- [ ] **4.9 Documentation**
  - [ ] API documentation review
  - [ ] Admin user guide
  - [ ] Deployment runbook

### Final Checklist

- [ ] All tests passing
- [ ] No critical security issues
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Tag release: `v1.0.0`

---

## Parallel Execution Matrix

| Phase | Worktree 1 | Worktree 2 | Duration |
|-------|------------|------------|----------|
| **Phase 1** | Backend Core | Frontend Core | Parallel |
| **Phase 2** | Backend API | Frontend Types/API | Parallel |
| **Phase 3** | Public Pages | Admin Pages | Parallel |
| **Phase 4** | Integration (Single) | - | Sequential |

---

## Risk Mitigation

### Merge Conflicts
- Regular sync meetings between parallel tracks
- Shared type definitions agreed upon early
- Clear interface boundaries

### API Contract Changes
- Define API contracts in Phase 2 before frontend work
- Use TypeScript to catch mismatches
- Version API endpoints

### Dependency Issues
- Phase 1 must fully complete before Phase 2
- Types must be defined before pages are built
- Mock API available for frontend development

---

## Quick Reference: Worktree Commands

```bash
# List all worktrees
git worktree list

# Create new worktree
git worktree add <path> <branch>

# Remove worktree
git worktree remove <path>

# Prune stale worktrees
git worktree prune
```

---

*Last Updated: 2024*
*Next Review: After Phase 1 completion*
