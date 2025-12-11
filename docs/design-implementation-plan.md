# Design Implementation Plan

## Overview

This document maps the Visual & Interaction Design Spec (`design-spec.md`) to the existing application structure (`application_flow.md`) and outlines the implementation strategy.

---

## Component Mapping: Design Spec vs Application Flow

### Global Components (Section 4 of Design Spec)

| Design Spec Component | Application Flow Reference | Current Component | Status |
|----------------------|---------------------------|-------------------|--------|
| Primary Button | Section 4.4 (Buttons) | `Button.tsx` | Needs Enhancement |
| Secondary Button | Section 4.4 (Buttons) | `Button.tsx` | Needs Enhancement |
| Cards | Section 4.4 (Cards) | `Card.tsx`, `SessionCard.tsx`, `RecordingCard.tsx` | Needs Enhancement |
| Tag Chips | Section 4.4 (Tag Chips) | `TagChip.tsx` | Needs Enhancement |
| Text Input | - | `Input.tsx` | Needs Enhancement |
| Toast/Notification | - | Not Implemented | New |
| Skeleton Loading | Section 6.1 (States) | `Skeleton.tsx` | Needs Enhancement |
| Modal | Section 7.8 | `Modal.tsx` | Needs Enhancement |

### Layout Components (Section 5 of Design Spec)

| Design Spec Component | Application Flow Reference | Current Component | Status |
|----------------------|---------------------------|-------------------|--------|
| Public Header | Section 4.4 (Header) | `Header.tsx` | Needs Enhancement |
| Admin Header | Section 4.4 (Header) | `Header.tsx` | Needs Enhancement |
| Footer | Section 6.1.7 (Footer) | `Footer.tsx` | Needs Enhancement |
| Public Layout | Section 3.1 | `PublicLayout.tsx` | Needs Enhancement |
| Admin Layout | Section 3.2 | `AdminLayout.tsx` | Needs Enhancement |

### Page Components

| Design Spec Section | Application Flow Section | Current Page | Priority |
|--------------------|-------------------------|--------------|----------|
| 6. Home/Landing | 6.1 | `HomePage.tsx` | P1 |
| 6.1 Hero Section | 6.1.2 | `HeroSection.tsx` | P1 |
| 6.2 Impact Cards | 6.1.3 | `ImpactCards.tsx` | P1 |
| 6.3 Sessions Preview | 6.1.4 | `SessionPreview.tsx` | P1 |
| 6.4 Recordings Preview | 6.1.5 | `RecordingPreview.tsx` | P1 |
| 6.5 CTA Band | 6.1.6 | `CTABand.tsx` | P1 |
| 7. Upcoming Sessions | 6.2 | `UpcomingSessionsPage.tsx` | P1 |
| 8. Session Detail | 6.3 | `SessionDetailPage.tsx` | P1 |
| 9. Recordings Library | 6.4 | `RecordingsPage.tsx` | P2 |
| 10. Recording Detail | 6.5 | `RecordingDetailPage.tsx` | P2 |
| 11. About Page | 6.6 | `AboutPage.tsx` | P3 |
| 12. Contact Page | 6.7 | `ContactPage.tsx` | P3 |
| 13. Admin Login | 7.1 | `LoginPage.tsx` | P2 |
| 14. Admin Dashboard | 7.2 | `DashboardPage.tsx` | P2 |
| 14.2 Admin Sessions | 7.3 | `AdminSessionsPage.tsx` | P2 |
| 14.2 Past Sessions | 7.6 | `PastSessionsPage.tsx` | P2 |
| 15. Session Form | 7.4 | `SessionForm.tsx`, `CreateSessionPage.tsx`, `EditSessionPage.tsx` | P2 |
| 16. Recording Modal | 7.8 | `AddRecordingModal.tsx`, `UpdateRecordingModal.tsx` | P2 |

---

## Design Token Updates Required

### Tailwind Config Updates

```javascript
// Current tokens that need expansion
colors: {
  primary: {
    50: '#f0f4f8',   // Soft Blue (backgrounds)
    100: '#d9e2ec',  // Border Subtle
    200: '#bcccdc',
    300: '#9fb3c8',
    400: '#829ab1',
    500: '#627d98',  // Text Muted
    600: '#1e3a5f',  // Primary Blue
    700: '#1a324f',  // Primary Blue Dark
    800: '#16293f',
    900: '#0f1f2f',  // Footer Navy
  },
  // Add semantic colors
  surface: {
    white: '#ffffff',
    gray: '#f8fafc',
  },
  text: {
    main: '#1a202c',
    muted: '#64748b',
  },
  danger: {
    50: '#fef2f2',
    500: '#ef4444',
    600: '#dc2626',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    600: '#16a34a',
  }
}
```

### Animation/Transition Tokens

```javascript
// Extend theme with transitions
transitionDuration: {
  'micro': '150ms',
  'normal': '200ms',
  'slow': '250ms',
}
transitionTimingFunction: {
  'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
}
```

---

## Key Visual Enhancements Summary

### 1. Button Enhancements
- Add pill shape (rounded-full)
- Add hover lift animation (translateY(-1px))
- Add shadow states (default, hover, active)
- Add loading state with spinner
- Add disabled state styling

### 2. Card Enhancements
- Add hover lift animation (translateY(-2px))
- Add border color transition on hover
- Add shadow deepening on hover
- Add focus outline for accessibility
- Make entire card clickable

### 3. Header Enhancements
- Add scroll shadow effect
- Add nav link underline animation (from center)
- Add active page indicator
- Add mobile hamburger menu

### 4. Hero Section Enhancements
- Add fade-in entrance animation
- Add parallax effect on illustration
- Add staggered button appearance

### 5. Impact Cards Enhancements
- Add hover lift and shadow
- Add icon scale animation
- Add title color shift

### 6. Session/Recording Cards
- Add thumbnail zoom effect
- Add play icon overlay
- Add smooth transitions

### 7. Form Enhancements
- Add focus ring animation
- Add error state styling
- Add loading states on buttons

### 8. Toast Notifications
- Create new component
- Add slide-in animation
- Add auto-dismiss functionality

---

## Parallel Development Strategy

Using Git Worktrees for parallel execution:

```
main
├── worktree: design/core-components    (Phase 1)
├── worktree: design/public-pages       (Phase 2A)
├── worktree: design/admin-pages        (Phase 2B)
└── worktree: design/polish-animations  (Phase 3)
```

### Dependency Graph

```
Phase 1 (Core Components)
    ├── Button, Card, Input, TagChip, Badge
    ├── Modal, Skeleton (with shimmer)
    ├── Toast (new)
    └── Tailwind config updates
         │
         ├────────────────┬────────────────┐
         ▼                ▼                ▼
Phase 2A              Phase 2B        Phase 2C
(Public Pages)        (Admin Pages)   (Layout)
├── HomePage          ├── LoginPage   ├── Header
├── SessionsPage      ├── Dashboard   ├── Footer
├── SessionDetail     ├── SessionForm ├── Sidebar
├── RecordingsPage    └── Modals      └── Mobile Nav
└── RecordingDetail
         │                │                │
         └────────────────┴────────────────┘
                          │
                          ▼
                    Phase 3 (Polish)
                    ├── Micro-animations
                    ├── Parallax effects
                    ├── Accessibility
                    └── Performance
```

---

## Testing Checklist by Phase

### Phase 1: Core Components
- [ ] Button variants render correctly
- [ ] Button hover/active states work
- [ ] Card hover animations smooth
- [ ] Input focus states visible
- [ ] Tag chips selection works
- [ ] Toast appears and dismisses
- [ ] Skeleton shimmer animates

### Phase 2A: Public Pages
- [ ] Hero entrance animation plays
- [ ] Impact cards hover effect works
- [ ] Session cards are clickable
- [ ] Recording thumbnails have overlay
- [ ] Empty states display correctly
- [ ] Responsive layout works

### Phase 2B: Admin Pages
- [ ] Login error states display
- [ ] Form validation feedback works
- [ ] Modal animations smooth
- [ ] Table row hover highlights
- [ ] Status badges colored correctly

### Phase 2C: Layout
- [ ] Header shadow on scroll
- [ ] Nav link animations work
- [ ] Mobile menu opens/closes
- [ ] Footer links have hover states

### Phase 3: Polish
- [ ] All animations are 150-250ms
- [ ] Keyboard navigation works
- [ ] Touch feedback on mobile
- [ ] No layout shifts during load
- [ ] Lighthouse accessibility score > 90

---

## Files to Modify (Complete List)

### Core Components
1. `frontend/src/components/ui/Button.tsx`
2. `frontend/src/components/ui/Card.tsx`
3. `frontend/src/components/ui/Input.tsx`
4. `frontend/src/components/ui/TagChip.tsx`
5. `frontend/src/components/ui/Badge.tsx`
6. `frontend/src/components/ui/Modal.tsx`
7. `frontend/src/components/ui/Skeleton.tsx`
8. `frontend/src/components/ui/Toast.tsx` (NEW)
9. `frontend/src/components/ui/Pagination.tsx`
10. `frontend/tailwind.config.js`

### Layout Components
11. `frontend/src/components/layout/Header.tsx`
12. `frontend/src/components/layout/Footer.tsx`
13. `frontend/src/components/layout/PublicLayout.tsx`
14. `frontend/src/components/layout/AdminLayout.tsx`
15. `frontend/src/components/layout/Sidebar.tsx`
16. `frontend/src/components/layout/MobileNav.tsx` (NEW)

### Common Components
17. `frontend/src/components/common/SessionCard.tsx`
18. `frontend/src/components/common/RecordingCard.tsx`
19. `frontend/src/components/common/FilterPanel.tsx`
20. `frontend/src/components/common/SearchBar.tsx`
21. `frontend/src/components/common/EmptyState.tsx`

### Home Page
22. `frontend/src/features/home/HomePage.tsx`
23. `frontend/src/features/home/components/HeroSection.tsx`
24. `frontend/src/features/home/components/ImpactCards.tsx`
25. `frontend/src/features/home/components/SessionPreview.tsx`
26. `frontend/src/features/home/components/RecordingPreview.tsx`
27. `frontend/src/features/home/components/CTABand.tsx`

### Public Pages
28. `frontend/src/features/sessions/UpcomingSessionsPage.tsx`
29. `frontend/src/features/sessions/SessionDetailPage.tsx`
30. `frontend/src/features/recordings/RecordingsPage.tsx`
31. `frontend/src/features/recordings/RecordingDetailPage.tsx`
32. `frontend/src/features/recordings/components/RecordingFilters.tsx`
33. `frontend/src/features/about/AboutPage.tsx`
34. `frontend/src/features/contact/ContactPage.tsx`

### Admin Pages
35. `frontend/src/features/admin/auth/LoginPage.tsx`
36. `frontend/src/features/admin/dashboard/DashboardPage.tsx`
37. `frontend/src/features/admin/sessions/AdminSessionsPage.tsx`
38. `frontend/src/features/admin/sessions/PastSessionsPage.tsx`
39. `frontend/src/features/admin/sessions/SessionForm.tsx`
40. `frontend/src/features/admin/sessions/CreateSessionPage.tsx`
41. `frontend/src/features/admin/sessions/EditSessionPage.tsx`
42. `frontend/src/features/admin/sessions/CompleteSessionModal.tsx`
43. `frontend/src/features/admin/recordings/AddRecordingModal.tsx`
44. `frontend/src/features/admin/recordings/UpdateRecordingModal.tsx`
45. `frontend/src/features/admin/tags/TagsManagementPage.tsx`
46. `frontend/src/features/admin/tags/TagForm.tsx`
47. `frontend/src/features/admin/tags/TagDeleteModal.tsx`

### New Files
48. `frontend/src/components/ui/Toast.tsx`
49. `frontend/src/components/layout/MobileNav.tsx`
50. `frontend/src/hooks/useToast.ts`
51. `frontend/src/context/ToastContext.tsx`

---

## Success Criteria

The design implementation is complete when:

1. **Visual Consistency**: All components follow the design token system
2. **Smooth Interactions**: All hover/focus states have 150-250ms transitions
3. **Responsive**: Layout works on mobile, tablet, and desktop
4. **Accessible**: Keyboard navigation works, focus states visible
5. **Performance**: No janky animations, smooth 60fps
6. **Polish**: Micro-animations enhance without distracting

---

## Notes

- Use `framer-motion` for complex animations if needed
- Consider `@headlessui/react` for accessible components
- Use CSS transforms over position changes for better performance
- Test on low-end devices for animation performance
