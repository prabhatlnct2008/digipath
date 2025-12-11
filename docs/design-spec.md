# AIIMS Telepathology - Visual & Interaction Design Spec

This document describes only the visual appearance and interaction behaviours of the application. No data model, no backend logic - just how things look, feel, and respond on every page.

---

## 1. Global Design Principles

1. **Tone**: Institutional, calm, high-trust. No flashy colours, no noisy animation.
2. **Clarity first**: Strong visual hierarchy, large headings, plenty of whitespace.
3. **Consistency**: Same styles for buttons, cards, chips, and text across all pages.
4. **Soft motion**: Subtle micro-animations (150-250 ms) for hover, press, and entrance.
5. **Responsive**: Works on desktop, tablet, and mobile with predictable stacking.

---

## 2. Global Layout & Spacing

- **Page width**: Central content container max ~1200 px.
- **Horizontal padding**:
  - Mobile: 16-20 px each side.
  - Tablet: 24-32 px.
  - Desktop: 40-64 px.
- **Vertical rhythm**:
  - Major sections separated by 64-96 px on desktop, 40-56 px on mobile.
- **Alignment**: Headings left-aligned, key CTAs under or to the right of headings.

---

## 3. Colour & Typography Tokens

These names are conceptual - implementation may use variables.

### 3.1 Colour Palette (suggested)

| Token | Description |
|-------|-------------|
| Primary Blue | Deep, rich blue for CTAs and highlights |
| Primary Blue - Dark | Used on hover and footer |
| Soft Blue | Pale blue for backgrounds and selected chips |
| Surface White | For cards and main content areas |
| Page Gray | Very light gray for alternate sections |
| Text Main | Almost black for body text |
| Text Muted | Medium gray for secondary text |
| Border Subtle | Light gray for borders and dividers |
| Danger Red | Red for warnings/badges |

### 3.2 Typography

- **Font**: Clean sans-serif system font (SF Pro / Inter / similar).
- **Heading weight**: Bold.
- **Body weight**: Regular to medium.
- **Hero title**: Large (40-48 px desktop).
- **Section title**: 28-32 px.
- **Card title**: 18-20 px.
- **Body text**: 16-18 px.

---

## 4. Global Components & Behaviours

### 4.1 Primary Button

**Usage**: Main call-to-action (e.g., "View Upcoming Sessions", "Join Live Session").

- **Shape**: Pill with fully rounded corners.
- **Default state**:
  - Background: primary blue.
  - Text: white, medium weight.
  - Shadow: soft drop shadow under the button.
  - Cursor: pointer.
- **Hover behaviour**:
  - Background darkens slightly.
  - Button moves up by 1-2 px (translateY(-1px)).
  - Shadow becomes slightly stronger and larger.
- **Active/pressed behaviour**:
  - Button returns closer to original position.
  - Shadow becomes smaller, as if pressed into the surface.
- **Disabled state**:
  - Background becomes muted gray.
  - Shadow removed.
  - Cursor set to not-allowed.

### 4.2 Secondary Button

**Usage**: Secondary actions (e.g., "Browse Recordings", "Watch Recording").

- **Shape**: Same pill as primary.
- **Default state**:
  - Background: white on blue surfaces, or transparent on white surfaces.
  - Border: thin line in soft blue or subtle gray.
  - Text: primary blue.
- **Hover behaviour**:
  - Background fills with soft blue.
  - Border darkens slightly.
  - Slight upward motion (1-2 px).
- **Active behaviour**:
  - Motion reduces.
  - Border becomes slightly darker.

### 4.3 Text Link

- **Default**: Medium gray or blue depending on context.
- **Hover**: Underline appears and the text shifts to a richer blue.
- **Active**: Underline remains, text darkens slightly.

### 4.4 Cards (Sessions & Recordings)

- **Shape**: Rounded corners, medium radius.
- **Background**: White.
- **Border**: Thin, very subtle gray line.
- **Shadow**: Soft shadow to separate from background.
- **Content layout**:
  - Meta row (tags or date) at top.
  - Title.
  - Short description.
  - Meta icons (speaker, date, time, duration) in a row.
  - Action button or link at bottom.
- **Hover behaviour**:
  - Card lifts by 2-3 px.
  - Shadow becomes slightly deeper.
  - Border colour shifts to soft blue.
- **Focus (keyboard) behaviour**:
  - Clear outline around card.

### 4.5 Tag Chips

- **Shape**: Pill with small padding.
- **Default**:
  - Background: very light gray.
  - Text: medium gray.
- **Hover**: Background brightens slightly, text darkens.
- **Selected (filter context)**:
  - Background: soft blue.
  - Border: thin primary blue.
  - Text: primary blue.

### 4.6 Text Input / Search Field

- **Shape**: Rounded rectangle.
- **Default**:
  - Background: white.
  - Border: subtle gray.
  - Left icon for search where applicable.
- **Focus behaviour**:
  - Border colour shifts to primary blue.
  - Soft blue glow or outline appears.
- **Error behaviour**:
  - Border and message text appear in red.

### 4.7 Toast / Notification

- **Location**: Top-right on desktop, top-center on mobile.
- **Shape**: Rounded rectangle.
- **Background**: Near-black with slightly transparent overlay.
- **Text**: White.
- **Entrance**: Fades and slides in from above.
- **Exit**: Fades out after a few seconds or when close icon is tapped.

### 4.8 Skeleton Loading States

- Cards replaced by gray rectangles with subtle rounded corners.
- Slight shimmer animation from left to right.
- Buttons in loading state show a small spinner and reduced opacity.

### 4.9 Modals

- **Background overlay**: Semi-transparent dark layer over the whole page.
- **Modal card**: White, rounded, centered with a slight drop shadow.
- **Close behaviour**: Top-right close icon and clicking overlay outside.
- **Entrance**: Fade and scale from 95% to 100%.

---

## 5. Header & Navigation - Behaviours

### 5.1 Public Header

- **Position**: Fixed at the top, spanning full width.
- **Background**: White.
- **Bottom border**: Thin subtle gray line.
- **Left**: Logo + initiative name.
- **Center**: Navigation links (Home, Upcoming Sessions, Recordings, About, Contact).
- **Right**: Small text link Admin Login.

#### Scroll behaviour

- On scroll down, header remains fixed.
- A slightly stronger shadow appears to separate it from content.

#### Nav link hover

- Text colour shifts to primary blue.
- Small underline appears and animates in from center.

#### Active page

- Nav text stays in primary blue.
- Underline remains visible beneath the active item.

#### Admin Login link

- Positioned at far right.
- Default: medium gray text.
- Hover: text becomes primary blue and gains underline.

### 5.2 Admin Header (after login)

- Right side shows Admin Dashboard and a primary or secondary style Logout button.
- Admin Dashboard behaves like a normal nav link (hover underline, colour shift).
- Logout uses a smaller pill button with hover lift.

---

## 6. Home / Landing Page - Design & Interactions

### 6.1 Hero Section

#### Layout

- **Background**: Deep blue gradient.
- **Left column**: Text (eyebrow, title, subheading, CTAs).
- **Right column**: Abstract illustration / microscopy imagery with soft shapes.

#### Text stack

- **Eyebrow**: Small white text above title.
- **Title**: Large bold white heading.
- **Subheading**: Slightly smaller, regular weight, max width ~60% of column.
- **Supporting line**: Smaller text in slightly muted white.

#### Buttons

- Primary button "View Upcoming Sessions".
- Secondary button "Browse Recordings" to the right of or under the primary.
- Buttons aligned horizontally on desktop, stacked on mobile.

#### Hero interactions

- On page load, text column fades in and moves up ~10 px.
- Buttons appear with a slight delay (50-100 ms) after the heading.
- Image column has gentle parallax: small movement in response to mouse position.

### 6.2 "Why This Initiative Matters" Section

#### Layout

- **Background**: White or very light gray.
- Centered section title.
- Subtitle text below title.
- Three impact cards in a row on desktop, stacked on mobile.

#### Impact cards

- Icon inside a circular soft blue background at top.
- Title beneath icon.
- Body text below.

#### Card interactions

- On hover, the card lifts slightly and shadow strengthens.
- Icon circle scales up by a tiny amount (e.g., 1.05x).
- Title colour shifts slightly darker.

### 6.3 "This Month's Live Sessions" Preview

#### Layout

- Section title aligned left.
- Small subtext below title.
- "View All" link aligned to the right within the same row.
- Session cards arranged in a horizontal grid.

#### Session card content

- Tags or small label at top.
- Title.
- Short description.
- Row of meta items (speaker, date/time, duration) with small icons.
- "View Details" button at bottom.

#### Interactions

- Card hover as per global card behaviour.
- "View All" link: underline and arrow icon slide a few pixels to the right on hover.

### 6.4 "Recently Added Recordings" Preview

#### Layout

- Similar structure to sessions preview.
- Larger focus on thumbnails.

#### Recording card

- Large thumbnail occupying top of card.
- Play icon overlay centered on thumbnail.
- On hover, thumbnail slightly darkens and play icon grows.
- Under thumbnail: title and tags.
- A subtle "Watch Recording" text link or button.

### 6.5 Bottom CTA Band

#### Layout

- Full-width section with deep blue background.
- Centered text and button.

#### Text

- Bold white heading.
- Muted white supporting line.

#### Button

- Primary button styled in white text with contrasting blue or white outline.
- On hover, button background and text invert subtly, maintaining contrast.

### 6.6 Footer

#### Layout

- Darker navy background.
- Three columns: Initiative description, Quick Links, Contact.
- Small text across the footer.

#### Interactions

- Links underline on hover.
- Contact email uses a text link style with the same behaviour.

---

## 7. Upcoming Sessions Page - Design & Interactions

### 7.1 Filter Bar

#### Placement

- At top of content area, below page title.

#### Elements

- Text search input.
- Dropdowns or chips for Organ, Type, Level.

#### Behaviour

- When a filter is selected, its chip or dropdown label uses the selected style (soft blue background, primary blue text).
- A small "Clear filters" text link appears when any filter is active, underlined on hover.

### 7.2 Session List

#### Layout

- Vertical list of cards with even spacing.

#### Interactions

- Card hover and press as per global card behaviour.
- When a card is clicked, the whole card is clickable and navigates to the detail page, not just the button.

### 7.3 Empty State

- When no sessions match:
  - Show friendly illustration or simple icon.
  - Text: short explanation.
  - Prominent "Clear filters" button.

---

## 8. Upcoming Session Detail Page - Design & Interactions

### 8.1 Layout

- Content centered in a card-style layout.
- Title at top.
- Under title: tags row (Organ, Type, Level).
- Two columns on desktop:
  - **Left**: Main information (abstract, objectives, audience).
  - **Right**: Schedule and action block (date, time, duration, buttons).

### 8.2 Schedule Block

- **Background**: Very light blue card.
- Shows date, time, duration, and speaker name/title.

### 8.3 Action Buttons

- **Primary**: Join Live Session.
- **Secondary**: Add to Calendar.
- **Tertiary**: Small icon button or link for Copy Link.

#### Button states

- When the user hovers over "Join Live Session", the button lifts and colour darkens.
- When clicked, button goes into a brief pressed state (shadow reduces) and, if applicable, shows a short loading state.

### 8.4 Content Area

- Abstract and learning objectives separated by clear sub-headings.
- Objectives shown as bullet points.

---

## 9. Recordings Library Page - Design & Interactions

### 9.1 Filter & Sort Bar

- Similar style to Upcoming Sessions filter bar.
- Additional control: sort dropdown (Newest, Oldest, Most Viewed).
- Sort dropdown hover:
  - Menu appears with light background and slight shadow.

### 9.2 Recording Cards

- Larger emphasis on video thumbnail.
- On hover:
  - Card lifts.
  - Thumbnail zooms in slightly.
  - A semi-transparent overlay with a play icon appears.

### 9.3 Empty State

- If no recordings are available, show a simple card with text explaining that recordings will appear after sessions.

---

## 10. Recording Detail Page - Design & Interactions

### 10.1 Layout

- Top section contains embedded video player.
- Below: title, tags, speaker info, and description.
- On the right or below (depending on screen width): block for downloadable PDF and related sessions.

### 10.2 Video Player

- Player framed by a subtle drop shadow.
- Background immediately around player remains white for contrast.

### 10.3 PDF / Notes Block

- Appears as a small card with an icon and text like "Download slides".
- On hover, the card lifts slightly and the icon rotates or shifts a few degrees.

### 10.4 Related Sessions

- Display as smaller horizontal cards.
- On hover, each related card lifts and border turns soft blue.

---

## 11. About Page - Design & Interactions

- Clean white background.
- Centered title and introductory paragraph.
- Content divided into sections (e.g., "Our mission", "Faculty leadership", "National reach").
- Subtle dividers between sections.
- No complex interactions; simple hover behaviour on any outbound links.

---

## 12. Contact Page - Design & Interactions

- Title at top.
- Two main parts:
  - Text block with department address and email.
  - Optional contact form.

#### Form fields

- Use global input styles.
- When error occurs, show red border and inline error text.

#### Submit button

- Primary button style.
- On submit, changes to loading state with spinner.

---

## 13. Admin - Login Page

### 13.1 Layout

- Centered card on a light gray background.
- Card contains logo at top, then "Admin Login" title, then form.

### 13.2 Form Appearance

- Two fields: username/email and password.
- Inputs use global styles.

### 13.3 Button

- Primary button "Login" spans full width of form.
- Hover and active behaviours as per global primary button.

### 13.4 Error Display

- If login fails, a red-tinted banner appears above or below the form with message text.
- Banner has an icon and is dismissible with a small close icon.

---

## 14. Admin - Dashboard & Lists

### 14.1 Dashboard Layout

- **Top**: Page title and brief status summary.
- **Below**: Cards summarising counts (e.g., total sessions, total recordings).
- **Summary cards**:
  - White background, soft shadow.
  - Hover: slight lift and shadow increase.

### 14.2 Upcoming & Past Session Lists

- Table or card layout.
- Columns: title, schedule, tags, status, actions.

#### Row interactions

- On hover, row background becomes very light gray.
- Action buttons for each row appear as small secondary buttons or icons.

#### Status badge

- "Published": pill with soft blue background and blue text.
- "Completed": pill with green/neutral background.
- "Recording not added": pill with pale red background and red text.

### 14.3 Action Buttons

- Edit, Mark Completed, Add Recording, Update Recording appear as small pill buttons.
- On hover, they lift slightly and background brightens.

---

## 15. Admin - Create/Edit Session Form

### 15.1 Layout

- Multi-section form separated by headings (Basic Info, Schedule, Meeting, Speaker, Classification, Tags).
- Each section grouped with a faint divider line.

### 15.2 Inputs & Labels

- Labels are above inputs, left-aligned, medium weight.
- Required fields indicated with a small asterisk in the label.

### 15.3 Form Buttons

- At bottom right on desktop:
  - Secondary button "Save Draft".
  - Primary button "Publish".
- On mobile, both buttons appear full width, one above the other.

#### Behaviour on click

- When "Save Draft" is clicked, button goes into loading state briefly, then a toast appears "Draft saved".
- When "Publish" is clicked, button goes into loading state; on success, toast appears "Session published".

### 15.4 Validation Feedback

- If a required field is empty on publish:
  - Field border turns red.
  - Small red text appears under the field explaining the issue.

---

## 16. Admin - Past Sessions & Recording Management

### 16.1 Past Sessions List

- Similar layout to Upcoming list.
- Each row shows recording status.

#### Recording status indicator

- If no recording: red badge "Recording not added".
- If recording exists: soft green or blue badge "Recording added".

### 16.2 Add/Update Recording Modal

- Triggered when "Add Recording" or "Update Recording" is clicked.

#### Modal content

- Title indicating action: "Add Recording" or "Update Recording".
- Input for video link.
- File upload control for slides (button with text like "Upload PDF").
- Primary button at bottom right: "Save".

#### Interactions

- File upload button shows the selected file name once chosen.
- On Save, button goes to loading state; on success, modal fades out and a toast appears.

---

## 17. Responsive Behaviour Overview

- On smaller screens:
  - Navigation collapses into a hamburger menu; menu opens into a full-height panel from the side or top.
  - Hero section stacks vertically with text above image.
  - Cards become full-width and stack vertically.
  - Forms switch to single-column layout with full-width buttons.
- All hover effects that depend on a cursor should have equivalent focus styles for keyboard and basic tap feedback (background or shadow change) for touch devices.

---

This document should be read as the single source of truth for design and interactions. Developers and designers should check each page and component against these behaviours and styles to make the interface feel polished, consistent, and pleasant to use.
