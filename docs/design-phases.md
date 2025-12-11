# Design Implementation Phases

## Git Worktree Strategy for Parallel Development

```bash
# Create worktrees for parallel development
git worktree add ../digipath-design-core design/core-components
git worktree add ../digipath-design-public design/public-pages
git worktree add ../digipath-design-admin design/admin-pages
```

---

## Phase 1: Core Design System (Foundation)

**Branch**: `design/core-components`
**Duration**: Can run independently
**Priority**: Critical - blocks all other phases

### 1.1 Tailwind Configuration Updates

**File**: `frontend/tailwind.config.js`

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0fa',
          100: '#cce0f5',
          200: '#99c2eb',
          300: '#66a3e0',
          400: '#3385d6',
          500: '#1e3a5f',  // Primary Blue
          600: '#1a324f',  // Primary Blue Dark
          700: '#16293f',
          800: '#12202f',
          900: '#0e171f',
        },
        secondary: {
          50: '#e6f7ff',
          100: '#bae7ff',
          200: '#91d5ff',
          300: '#69c0ff',
          400: '#40a9ff',
          500: '#1890ff',
          600: '#096dd9',
        },
        surface: {
          white: '#ffffff',
          gray: '#f8fafc',
          dark: '#1e293b',
        },
        text: {
          primary: '#1a202c',
          secondary: '#64748b',
          muted: '#94a3b8',
          inverse: '#ffffff',
        },
        border: {
          light: '#e2e8f0',
          DEFAULT: '#cbd5e1',
          focus: '#3b82f6',
        },
        status: {
          success: '#22c55e',
          'success-light': '#dcfce7',
          warning: '#f59e0b',
          'warning-light': '#fef3c7',
          danger: '#ef4444',
          'danger-light': '#fee2e2',
          info: '#3b82f6',
          'info-light': '#dbeafe',
        },
      },
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'section': ['1.875rem', { lineHeight: '1.2', fontWeight: '700' }],
        'card-title': ['1.25rem', { lineHeight: '1.4', fontWeight: '600' }],
      },
      boxShadow: {
        'soft': '0 2px 8px -2px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 12px -4px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 24px -8px rgba(0, 0, 0, 0.15)',
        'button': '0 2px 4px rgba(30, 58, 95, 0.2)',
        'button-hover': '0 4px 8px rgba(30, 58, 95, 0.25)',
      },
      transitionDuration: {
        'micro': '150ms',
        'normal': '200ms',
        'slow': '300ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite linear',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
```

### 1.2 Button Component Enhancement

**File**: `frontend/src/components/ui/Button.tsx`

**Design Requirements**:
- Pill shape with `rounded-full`
- Hover lift effect (`-translate-y-0.5`)
- Shadow transitions
- Loading state with spinner
- Disabled state styling

**Variants**:
- `primary`: Solid blue, white text
- `secondary`: Outlined, blue text
- `ghost`: No background, subtle hover
- `danger`: Red styling for destructive actions

### 1.3 Card Component Enhancement

**File**: `frontend/src/components/ui/Card.tsx`

**Design Requirements**:
- Rounded corners (`rounded-xl`)
- Soft shadow (`shadow-card`)
- Hover lift (`-translate-y-0.5`, `shadow-card-hover`)
- Border color transition on hover
- Focus outline for accessibility
- Clickable variant (entire card as link)

### 1.4 Input Component Enhancement

**File**: `frontend/src/components/ui/Input.tsx`

**Design Requirements**:
- Rounded shape (`rounded-lg`)
- Focus ring animation
- Error state with red border
- Helper text support
- Left icon support (for search)

### 1.5 TagChip Component Enhancement

**File**: `frontend/src/components/ui/TagChip.tsx`

**Design Requirements**:
- Pill shape
- Hover background change
- Selected state (soft blue bg, primary text)
- Clickable variant for filters

### 1.6 Skeleton Component Enhancement

**File**: `frontend/src/components/ui/Skeleton.tsx`

**Design Requirements**:
- Shimmer animation (gradient moving left to right)
- Rounded variants
- Multiple shapes (text, card, button, avatar)

### 1.7 Toast Component (NEW)

**Files**:
- `frontend/src/components/ui/Toast.tsx`
- `frontend/src/hooks/useToast.ts`
- `frontend/src/context/ToastContext.tsx`

**Design Requirements**:
- Position: top-right desktop, top-center mobile
- Dark background with white text
- Slide-in from top animation
- Auto-dismiss after 4 seconds
- Close button
- Variants: success, error, info, warning

### 1.8 Modal Component Enhancement

**File**: `frontend/src/components/ui/Modal.tsx`

**Design Requirements**:
- Backdrop with semi-transparent dark overlay
- Scale-in animation (0.95 to 1.0)
- Close on backdrop click
- Close button top-right
- Trap focus for accessibility

---

## Phase 2A: Public Pages Design (Parallel)

**Branch**: `design/public-pages`
**Depends on**: Phase 1 completion
**Can run in parallel with**: Phase 2B, 2C

### 2A.1 Home Page - Hero Section

**File**: `frontend/src/features/home/components/HeroSection.tsx`

**Design Requirements**:
- Deep blue gradient background
- Two-column layout (text left, image right)
- Fade-in + slide-up animation on load
- Staggered button appearance (50-100ms delay)
- Eyebrow text above title
- Large hero title (40-48px)
- Subheading with max-width
- Primary + Secondary CTA buttons

**Animations**:
```css
/* Text entrance */
.hero-text {
  animation: slideUp 0.5s ease-out forwards;
}

/* Staggered buttons */
.hero-buttons {
  animation: fadeIn 0.3s ease-out 0.2s forwards;
  opacity: 0;
}
```

### 2A.2 Home Page - Impact Cards

**File**: `frontend/src/features/home/components/ImpactCards.tsx`

**Design Requirements**:
- Section title centered
- 3 cards in row (stack on mobile)
- Icon in circular soft-blue background
- Hover: card lifts, icon scales (1.05x)
- Title color darkens on hover

### 2A.3 Home Page - Session Preview

**File**: `frontend/src/features/home/components/SessionPreview.tsx`

**Design Requirements**:
- Section title with "View All" link right-aligned
- Horizontal grid of session cards
- Card hover effects per design spec
- View All link: arrow slides right on hover

### 2A.4 Home Page - Recording Preview

**File**: `frontend/src/features/home/components/RecordingPreview.tsx`

**Design Requirements**:
- Thumbnail-focused cards
- Play icon overlay centered on thumbnail
- Hover: thumbnail darkens, play icon grows
- "Watch Recording" link/button

### 2A.5 Home Page - CTA Band

**File**: `frontend/src/features/home/components/CTABand.tsx`

**Design Requirements**:
- Full-width deep blue background
- Centered text and button
- Bold white heading
- Muted white supporting text
- Button inverts on hover

### 2A.6 Upcoming Sessions Page

**File**: `frontend/src/features/sessions/UpcomingSessionsPage.tsx`

**Design Requirements**:
- Page title
- Filter bar below title
- Selected filter chips use soft-blue styling
- Clear filters link when active
- Session cards in vertical list
- Empty state with illustration

### 2A.7 Session Detail Page

**File**: `frontend/src/features/sessions/SessionDetailPage.tsx`

**Design Requirements**:
- Card-style centered layout
- Tags row under title
- Two columns: content left, schedule block right
- Schedule block: very light blue background
- Action buttons: Join Live (primary), Add to Calendar (secondary), Copy Link (tertiary)
- Abstract and objectives with clear headings

### 2A.8 Recordings Library Page

**File**: `frontend/src/features/recordings/RecordingsPage.tsx`

**Design Requirements**:
- Filter bar with sort dropdown
- Recording cards with thumbnail emphasis
- Thumbnail zoom + overlay on hover
- Empty state messaging

### 2A.9 Recording Detail Page

**File**: `frontend/src/features/recordings/RecordingDetailPage.tsx`

**Design Requirements**:
- Video player with shadow frame
- Content below: title, tags, speaker, description
- Sidebar: PDF download card, related sessions
- PDF card hover: lift + icon rotation
- Related sessions: smaller horizontal cards

### 2A.10 About & Contact Pages

**Files**:
- `frontend/src/features/about/AboutPage.tsx`
- `frontend/src/features/contact/ContactPage.tsx`

**Design Requirements**:
- Clean white background
- Centered title and intro
- Sectioned content with dividers
- Contact form with proper validation states

---

## Phase 2B: Admin Pages Design (Parallel)

**Branch**: `design/admin-pages`
**Depends on**: Phase 1 completion
**Can run in parallel with**: Phase 2A, 2C

### 2B.1 Login Page

**File**: `frontend/src/features/admin/auth/LoginPage.tsx`

**Design Requirements**:
- Centered card on light gray background
- Logo at top of card
- Form inputs with focus states
- Full-width login button
- Error banner with icon, dismissible

### 2B.2 Dashboard Page

**File**: `frontend/src/features/admin/dashboard/DashboardPage.tsx`

**Design Requirements**:
- Page title and status summary
- Summary count cards (hover: lift + shadow)
- Quick links to common actions

### 2B.3 Admin Sessions List

**File**: `frontend/src/features/admin/sessions/AdminSessionsPage.tsx`

**Design Requirements**:
- Table or card layout
- Row hover: light gray background
- Status badges:
  - Published: soft blue
  - Completed: green
  - Draft: gray
- Action buttons: small pills with hover lift

### 2B.4 Past Sessions List

**File**: `frontend/src/features/admin/sessions/PastSessionsPage.tsx`

**Design Requirements**:
- Recording status indicator
  - "Recording added": soft green badge
  - "Recording not added": pale red badge
- Action buttons: Add Recording, Update Recording

### 2B.5 Session Form

**File**: `frontend/src/features/admin/sessions/SessionForm.tsx`

**Design Requirements**:
- Multi-section form with headings
- Faint divider lines between sections
- Labels above inputs, required asterisk
- Form buttons bottom-right
- Loading states on submit
- Validation feedback: red border + error text

### 2B.6 Recording Modals

**Files**:
- `frontend/src/features/admin/recordings/AddRecordingModal.tsx`
- `frontend/src/features/admin/recordings/UpdateRecordingModal.tsx`

**Design Requirements**:
- Modal with title indicating action
- Video link input
- PDF upload button (shows filename)
- Save button with loading state
- Toast on success

### 2B.7 Tags Management

**File**: `frontend/src/features/admin/tags/TagsManagementPage.tsx`

**Design Requirements**:
- Grouped by category
- Add, Edit, Delete actions
- Delete modal with replacement option

---

## Phase 2C: Layout Components (Parallel)

**Branch**: `design/layout`
**Depends on**: Phase 1 completion
**Can run in parallel with**: Phase 2A, 2B

### 2C.1 Header Component

**File**: `frontend/src/components/layout/Header.tsx`

**Design Requirements**:
- Fixed position, full width
- White background with bottom border
- Logo left, nav center, admin login right
- Scroll shadow effect
- Nav link hover: text color + underline animation
- Active page: persistent underline
- Admin header: Dashboard link + Logout button

### 2C.2 Mobile Navigation (NEW)

**File**: `frontend/src/components/layout/MobileNav.tsx`

**Design Requirements**:
- Hamburger menu icon
- Full-height slide panel
- Menu items stack vertically
- Close on item click or X button
- Backdrop overlay

### 2C.3 Footer Component

**File**: `frontend/src/components/layout/Footer.tsx`

**Design Requirements**:
- Dark navy background
- Three columns: description, quick links, contact
- Links underline on hover
- Small text styling

### 2C.4 Public Layout

**File**: `frontend/src/components/layout/PublicLayout.tsx`

**Design Requirements**:
- Proper spacing for fixed header
- Content container max-width
- Responsive padding

### 2C.5 Admin Layout

**File**: `frontend/src/components/layout/AdminLayout.tsx`

**Design Requirements**:
- Sidebar navigation
- Main content area
- Responsive collapse on mobile

---

## Phase 3: Polish & Animations

**Branch**: `design/polish`
**Depends on**: Phase 2A, 2B, 2C completion
**Final phase**

### 3.1 Entrance Animations
- Staggered list item appearances
- Page transition effects
- Skeleton to content transitions

### 3.2 Micro-interactions
- Button press feedback
- Form field focus animations
- Checkbox/toggle animations
- Loading state transitions

### 3.3 Performance Optimization
- Use CSS transforms over position
- Avoid layout thrashing
- Optimize animation frame rate
- Lazy load heavy components

### 3.4 Accessibility Polish
- Focus visible states
- Keyboard navigation testing
- Screen reader compatibility
- Reduced motion support

### 3.5 Responsive Fine-tuning
- Breakpoint consistency
- Touch target sizes (44x44 minimum)
- Mobile animation performance

---

## Merge Strategy

```bash
# After Phase 1 completion
git checkout main
git merge design/core-components

# After Phase 2 completions (can be in any order)
git merge design/public-pages
git merge design/admin-pages
git merge design/layout

# After Phase 3 completion
git merge design/polish
```

---

## Estimated Effort by Phase

| Phase | Components | Complexity | Parallelizable |
|-------|------------|------------|----------------|
| Phase 1 | 8-10 | Medium | No (foundation) |
| Phase 2A | 10-12 | High | Yes |
| Phase 2B | 8-10 | Medium | Yes |
| Phase 2C | 5-6 | Low-Medium | Yes |
| Phase 3 | Cross-cutting | Medium | No (needs all) |

---

## Quality Gates

Before merging each phase:

1. **Visual Review**: Compare against design spec screenshots
2. **Interaction Testing**: Test all hover/focus/active states
3. **Responsive Testing**: Check mobile, tablet, desktop
4. **Accessibility Check**: Keyboard nav, focus states
5. **Performance Check**: No janky animations
6. **Cross-browser**: Test Chrome, Firefox, Safari
