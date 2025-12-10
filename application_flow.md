AIIMS Telepathology Teaching Initiative

Full Functional Documentation (No MVP Cuts)

This document defines the complete functional, screen-level, and visual design specification for the AIIMS Telepathology Teaching Initiative platform. The scope includes the full public education experience and the complete admin content-operations experience, including editing past sessions and adding/updating recordings after completion.

⸻

1. Product Overview

1.1 Product Name

AIIMS Telepathology Teaching Initiative

1.2 Purpose

A national educational portal led by the Department of Pathology, AIIMS to:
	•	Expand access to digital pathology learning across India.
	•	Provide structured live sessions and archived recordings.
	•	Communicate national impact for institutional/government support.
	•	Maintain high trust through a clean, authoritative, low-friction experience.

1.3 Primary Success Outcomes
	1.	Educational reach and equity: Learners from regions lacking specialty training can access expert sessions.
	2.	Credibility: AIIMS-led, faculty-verified content with structured classification.
	3.	Operational simplicity: Admins can publish sessions rapidly and convert to recordings with minimal overhead.
	4.	Long-term library value: High-quality recordings with optional slide decks/notes.

⸻

2. Users, Roles & Permissions

2.1 Roles

A) Public (Student/Doctor)
No login
	•	Browse upcoming sessions.
	•	View upcoming session details.
	•	Join live session.
	•	Add to calendar.
	•	Copy share link.
	•	Browse recordings library.
	•	Watch recordings.
	•	Download PDF slides/notes (if provided).

B) Admin (AIIMS Faculty/Program Team)
Login required
	•	Create/edit/publish upcoming sessions.
	•	Manage speaker info.
	•	Manage tags (Organ/Type/Level).
	•	Mark sessions completed.
	•	Add recordings (YouTube) and optional PDFs.
	•	Edit Past Sessions for metadata corrections and late recording uploads.

2.2 Permissions Matrix

Capability	Public	Admin
View landing page	✅	✅
Browse upcoming sessions	✅	✅
View upcoming session detail	✅	✅
Join live session	✅	✅
Add to calendar	✅	✅
Browse recordings	✅	✅
Watch recordings	✅	✅
Create/edit sessions	❌	✅
Publish sessions	❌	✅
Mark session completed	❌	✅
Add/Update recordings	❌	✅
Edit past sessions	❌	✅
Manage tags	❌	✅


⸻

3. Information Architecture

3.1 Public Navigation
	•	Home
	•	Upcoming Sessions
	•	Recordings
	•	About
	•	Contact
	•	Small link: Admin Login

3.2 Admin Navigation (post-login)
	•	Admin Dashboard
	•	Upcoming Sessions
	•	Past Sessions
	•	Create Session
	•	Tags & Filters
	•	Logout

⸻

4. Visual Design & Styling System

This section ensures development matches the existing landing page screenshots and brand tone.

4.1 Brand Personality

Institutional, clinical, calm authority.
	•	National initiative feel.
	•	High trust, no clutter.
	•	Strong hierarchy and whitespace.

4.2 Color Language (Implementation Guidance)
	•	Primary: Deep AIIMS Blue / Royal Blue.
	•	Secondary accents: Soft light blues for icons/highlights.
	•	Surfaces:
	•	White background for content-rich sections.
	•	Blue gradient/overlay for hero, CTA band, footer.
	•	Text:
	•	Dark neutral for headings.
	•	Medium gray for body.
	•	White text on blue sections.

4.3 Typography
	•	Modern sans-serif family.
	•	Large, bold hero headings.
	•	Clear typographic scale:
	•	H1: Initiative title.
	•	H2: Section headers (Why This Matters, This Month’s Live Sessions).
	•	Body: Short, readable paragraphs.

4.4 Core UI Components

Header
	•	Left: Logo + “AIIMS Telepathology Teaching Initiative”.
	•	Center: Menu items.
	•	Right:
	•	Public: Admin Login (subtle).
	•	Admin: Admin Dashboard + Logout.
	•	Active menu state: Underline or color emphasis.

Buttons
	•	Rounded rectangle.
	•	Clear hierarchy:
	•	Primary CTA: Solid blue.
	•	Secondary CTA: Light/outlined.

Cards
	•	Soft shadow.
	•	Rounded corners.
	•	Clean spacing.
	•	Support tag chips.

Tag Chips
	•	Pill style.
	•	Light blue or neutral background.
	•	Used consistently across upcoming and recordings.

Iconography
	•	Thin-line or minimal filled icons.
	•	Circular soft-blue icon badge in impact section.

⸻

5. Status Model

5.1 Session Status
	•	Draft: Internal only.
	•	Published: Visible to public under Upcoming.
	•	Completed: Visible to public under Past/Recordings when assets exist (see rules below).

5.2 Recording State (asset-level)
	•	Not added
	•	Added
	•	Updated

Key principle:
A session may be Completed even if a recording is not yet added. The recording is an editable asset that can be attached later.

⸻

6. Public Experience — Screens & Functional Specs

6.1 Home / Landing Page

Purpose
	•	Explain AIIMS initiative.
	•	Showcase national educational impact.
	•	Provide direct access to sessions/recordings.

Sections
	1.	Header with navigation.
	2.	Hero
	•	Title + initiative description.
	•	Buttons:
	•	View Upcoming Sessions (primary)
	•	Browse Recordings (secondary)
	•	Support line: Free academic access.
	3.	Why This Matters (grant-oriented)
	•	3 impact cards:
	•	Digital Slide Learning
	•	Expert-Led
	•	National Reach
	4.	This Month’s Live Sessions (preview)
	•	2–4 cards.
	•	“View All” → Upcoming Sessions page.
	5.	Recently Added Recordings (preview)
	•	2–4 cards.
	•	“View Library” → Recordings page.
	6.	Bottom CTA Band
	•	“Ready to expand your pathology knowledge?”
	•	Button: Find a Session.
	7.	Footer
	•	Initiative summary.
	•	Quick links.
	•	Contact details and email.
	•	Small Admin Login.

States
	•	Empty preview states should still render the section with a gentle message.

⸻

6.2 Upcoming Sessions Listing

Purpose
Provide a searchable, filterable list of published upcoming sessions.

Filters
	•	Organ
	•	Type
	•	Level
	•	Search

Card Fields
	•	Title
	•	Short description/summary
	•	Speaker
	•	Date
	•	Time (IST)
	•	Duration
	•	Tags
	•	CTA: View Details

States
	•	Loading: Skeleton cards.
	•	Empty filter results: “No sessions match your filters” + Clear Filters.

⸻

6.3 Upcoming Session Detail

Purpose
Convert interest into attendance with clear learning value.

Content
	•	Title
	•	Date + Time (IST)
	•	Duration
	•	Tags (Organ/Type/Level)
	•	Speaker + AIIMS designation
	•	Abstract
	•	Learning objectives (bullet list)
	•	Suggested audience

Actions
	•	Join Live Session
	•	Add to Calendar (ICS)
	•	Copy Link

Rules
	•	Join button enabled only when status = Published AND meeting link exists.
	•	Calendar invite contains link, speaker, duration.

⸻

6.4 Recordings Library

Purpose
A structured archive of past sessions and recorded learning.

Filters
	•	Organ System
	•	Type
	•	Level
	•	Year

Sorting
	•	Newest
	•	Oldest
	•	Most Viewed

Card Fields
	•	YouTube thumbnail
	•	Title
	•	Speaker
	•	Tags
	•	Recorded date/year
	•	CTA: Watch Recording

States
	•	No recordings yet: “Recordings will appear here after sessions are completed.”

⸻

6.5 Recorded Session Detail

Purpose
Deliver a complete learning package.

Content
	•	Embedded YouTube player
	•	Abstract + objectives
	•	Speaker info
	•	Tags
	•	PDF slides/notes (optional)
	•	Related sessions (same organ/type)

Actions
	•	Watch / Play
	•	Download PDF (if exists)
	•	Browse related sessions

⸻

6.6 About Page

Purpose
Explain initiative background, leadership, national vision, and future roadmap.

Content Suggestions
	•	Program mission
	•	Faculty leadership
	•	Teaching philosophy
	•	National scale intent

⸻

6.7 Contact Page

Purpose
Provide official contact route for institutions, learners, and collaborators.

Fields
	•	Department email displayed.
	•	Optional simple contact form (name/email/message) if you want.

⸻

7. Admin Experience — Screens & Functional Specs

7.1 Admin Login

Fields
	•	Username/Email
	•	Password

Behaviour
	•	Error area for:
	•	Invalid credentials
	•	Account disabled (optional)
	•	Basic rate limiting.

⸻

7.2 Admin Dashboard

Tabs
	•	Upcoming Sessions
	•	Past Sessions
	•	Create Session
	•	Tags & Filters
	•	Logout

Optional Summary Widgets
	•	Total sessions
	•	Total recordings
	•	Next session date

⸻

7.3 Admin — Upcoming Sessions List

Purpose
Operational control of all future sessions.

List/Row/Card fields
	•	Title
	•	Date/Time
	•	Duration
	•	Speaker
	•	Tags
	•	Status badge

Actions
	•	Edit
	•	Publish/Unpublish (optional)
	•	Quick view of meeting link presence

⸻

7.4 Create / Edit Session (Core Form)

Sections & Fields
A) Basic Info
	•	Title (required)
	•	Summary (required)
	•	Abstract (required)
	•	Learning objectives (optional structured list)

B) Schedule
	•	Date (required)
	•	Time (required)
	•	Duration (required; minutes)

C) Meeting
	•	Platform (required)
	•	Link (required for publish)
	•	Meeting ID (optional)
	•	Password (optional)

D) Speaker
	•	Name (required)
	•	AIIMS Designation (required)

E) Classification
	•	Organ (required)
	•	Type (required)
	•	Level (required)

F) Tags
	•	Multi-select + Add New

Buttons
	•	Save Draft
	•	Publish

Validation Rules
Publish blocked unless all required sections are complete.

⸻

7.5 Mark Completed + Add Recording (Primary Path)

Flow
Admin selects a published upcoming session → clicks Mark Completed.

Fields displayed
	•	YouTube link (recommended required for recording availability)
	•	PDF Upload (optional)

Outcome
	•	Session status becomes Completed.
	•	Session appears under Past Sessions in admin.
	•	Recording appears in public Recordings library when YouTube link is present.

⸻

7.6 Admin — Past Sessions List (UPDATED)

Purpose
Manage all completed sessions, fix metadata, and support late recording uploads.

List/Row/Card Fields
	•	Title
	•	Speaker
	•	Completed date
	•	Tags
	•	Recording status indicator:
	•	Recording added
	•	Recording not added (warning badge)

Actions
	•	Edit Past Session
	•	Add Recording (if missing)
	•	Update Recording (if already present)
	•	View Public Page (optional)

Key Rule
A session can be in Past Sessions even if recording is not added yet.

⸻

7.7 Edit Past Session (UPDATED)

Purpose
Allow correction of metadata and addition/replacement of learning assets.

Editable Fields
	•	Title
	•	Summary
	•	Abstract
	•	Learning objectives
	•	Speaker name + designation
	•	Organ/Type/Level
	•	Tags
	•	Recorded date (optional)

Asset Actions
	•	Add/Update YouTube link
	•	Add/Update PDF slides/notes

Constraints
	•	Changes reflect immediately in public recording detail and library cards.

⸻

7.8 Add/Update Recording Modal or Screen

When invoked from Past Sessions
	•	If recording missing:
	•	Show YouTube link field + PDF upload.
	•	Primary CTA: Add Recording.
	•	If recording exists:
	•	Pre-fill YouTube link.
	•	Show PDF replace option.
	•	Primary CTA: Update Recording.

Validation
	•	YouTube link format check.
	•	PDF file type + size checks.

⸻

7.9 Tags & Filters Management

Categories
	•	Organ System
	•	Session Type
	•	Level

Capabilities
	•	Add
	•	Edit
	•	Delete unused tags

Guardrails
	•	If tag is in use:
	•	Warning prompt.
	•	Optional “Replace tag with…” before delete.

⸻

8. Data Model (Logical)

8.1 Entities

Session
	•	id
	•	title
	•	summary
	•	abstract
	•	objectives (optional)
	•	date
	•	time
	•	duration_minutes
	•	status (Draft/Published/Completed)
	•	platform
	•	meeting_link
	•	meeting_id (optional)
	•	meeting_password (optional)
	•	speaker_id
	•	organ_tag_id
	•	type_tag_id
	•	level_tag_id
	•	created_by
	•	created_at
	•	updated_at

Recording
	•	id
	•	session_id
	•	youtube_url
	•	thumbnail_url (derived)
	•	pdf_url (optional)
	•	recorded_date
	•	views_count
	•	updated_at

Speaker
	•	id
	•	name
	•	designation
	•	is_aiims (default true)

Tag
	•	id
	•	category (Organ/Type/Level)
	•	label
	•	is_active

AdminUser
	•	id
	•	name
	•	email
	•	password_hash
	•	role

⸻

9. Search & Filtering Behaviour

9.1 Upcoming Sessions Search

Matches:
	•	Title
	•	Summary
	•	Abstract
	•	Speaker
	•	Tag labels

9.2 Recordings Search

Matches:
	•	Title
	•	Speaker
	•	Tags
	•	Year

⸻

10. Analytics (Recommended)

Even if not visible in UI, log for national impact reporting:
	•	Landing page views
	•	Upcoming sessions page views
	•	Session detail CTR
	•	Join live clicks
	•	Add to calendar clicks
	•	Recording plays
	•	Most viewed organ/type/level
	•	Time-to-recording availability after completion

⸻

11. Edge Cases & Quality Rules
	1.	Published session without meeting link → Block publish.
	2.	Completed session without recording → Allowed.
	•	Must show admin warning badge: “Recording not added.”
	3.	Late uploads from Past Sessions → Allowed and expected.
	4.	Tag deletion used in sessions → Warn and prevent direct hard delete without replacement.
	5.	Timezone → All scheduling is IST.
	6.	Mobile behaviour → Filters collapse into a drawer.

⸻

12. Screen Inventory

Public
	1.	Home / Landing
	2.	Upcoming Sessions (List + Filters)
	3.	Upcoming Session Detail
	4.	Recordings Library (List + Filters)
	5.	Recorded Session Detail
	6.	About
	7.	Contact

Admin
	1.	Admin Login
	2.	Admin Dashboard
	3.	Upcoming Sessions (Admin list)
	4.	Past Sessions (Admin list)
	5.	Create Session
	6.	Edit Session
	7.	Mark Completed + Add Recording
	8.	Edit Past Session
	9.	Add/Update Recording modal/screen
	10.	Tags & Filters

⸻

13. Definition of Done (Build Checklist)

Public
	•	Navigation routes correct.
	•	Upcoming sessions filters + search work reliably.
	•	Session cards show all specified fields.
	•	Join live + calendar + copy link functional.
	•	Recordings filters + sorting implemented.
	•	YouTube embed responsive.
	•	PDF download works only when available.
	•	Empty states implemented across sections.

Admin
	•	Role gating prevents public access to admin screens.
	•	Draft/Publish/Completed workflow solid.
	•	Mark Completed flow attaches assets and moves session.
	•	Past Sessions supports Edit + Add/Update Recording.
	•	Recording missing badge appears in Past list.
	•	Tag CRUD with basic safety guardrails.
	•	Validations match form rules.

⸻

14. Recommended Test Scenarios
	1.	Create Draft → not visible publicly.
	2.	Publish without meeting link → blocked.
	3.	Publish with all required fields → visible publicly.
	4.	Mark Completed with YouTube → appears in Recordings.
	5.	Mark Completed without YouTube → session appears in admin Past with “Recording not added.”
	6.	Add recording later from Past Sessions → recording appears publicly.
	7.	Update recording link → public detail updates.
	8.	Replace PDF → public download updates.
	9.	Delete tag in use → warning + prevention.

⸻

15. Notes on Long-Term Scaling (Non-MVP but Future-safe)
	•	The current design intentionally avoids heavy LMS complexity.
	•	Tag axis (Organ/Type/Level) is a strong, scalable classification system.
	•	YouTube hosting keeps ops light and dependable.
	•	A future enhancement could be:
	•	Optional registration for certificates
	•	Attendance analytics
	•	CME tracking

⸻

16. Summary of the Key Update You Requested

Yes, admin must be able to edit Past Sessions and upload recordings later.

This spec now explicitly includes:
	•	Past Sessions edit capabilities.
	•	Add/Update Recording actions in the Past Sessions list.
	•	A recording-missing status badge.
	•	The rule that completion does not require immediate recording availability.

⸻

