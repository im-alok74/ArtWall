````markdown
# ARTWALL 2.0 — COMPLETE UI/UX REDESIGN & PLATFORM BUILD PROMPT

You are a **Senior Software Architect, Product Designer, Full-Stack Engineer, Database Architect, QA Engineer, and Security Engineer** working on my existing project called **ArtWall**.

I want to transform the current ArtWall application into a **complete professional art-management platform**, taking strong product and UX inspiration from **Artwork Archive** and **VarisArt**, while keeping ArtWall's own branding, identity, and existing functionality.

Reference:

- Artwork Archive: https://www.artworkarchive.com/
- VarisArt: Research the current product, workflows, and feature set yourself.

> **IMPORTANT:** Do not copy proprietary code, branding, text, images, assets, or exact designs. Use these products as product/UX references and build our own implementation.

---

# 1. MOST IMPORTANT REQUIREMENT

## DO NOT BREAK MY EXISTING APPLICATION

Before changing anything:

- Inspect the complete repository.
- Understand the existing architecture.
- Understand the current database.
- Understand authentication.
- Understand all routes.
- Understand all server actions/API routes.
- Understand Cloudinary.
- Understand the current waitlist.
- Understand the founding artist system.
- Understand the Collaborative Wall.
- Understand admin functionality.
- Understand all existing pages and components.

Existing functionality must continue working.

### Existing functionality that MUST be preserved

- Waitlist
- Founding artist registration
- Founder numbers
- Artwork uploads
- Collaborative Wall
- Wall search
- Real-time activity
- Admin moderation
- Cloudinary image uploads
- Neon PostgreSQL
- Existing server actions
- CSRF protection
- Rate limiting
- Bot protection
- Existing experiential pages
- Existing public pages
- Existing data

Do not delete existing functionality just because we are redesigning the UI.

---

# 2. CURRENT TECH STACK

The existing application currently uses:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui
- Neon PostgreSQL
- Cloudinary
- Server Actions
- CSRF protection
- Rate limiting
- Bot protection

First verify the actual repository before assuming anything.

If the existing architecture is good, **extend it rather than replacing it**.

---

# 3. PRODUCT VISION

ArtWall should become a platform where artists can manage their complete professional art business.

The platform should allow artists to:

- Manage artworks
- Create collections
- Manage editions
- Manage series
- Track artwork locations
- Manage exhibitions
- Manage collectors
- Manage galleries
- Manage contacts
- Manage sales
- Manage invoices
- Manage payments
- Manage documents
- Generate certificates
- Track provenance
- Create private viewing rooms
- Manage public profile
- Manage events
- Track tasks
- View analytics
- Generate reports
- Share artwork professionally

The long-term product relationship should look like:

```text
Artist
   ↓
Artwork
   ↓
Collection / Series / Edition
   ↓
Exhibition
   ↓
Location
   ↓
Contact / Collector / Gallery
   ↓
Sale
   ↓
Invoice / Payment
   ↓
Provenance
   ↓
Certificate
   ↓
Reports / Analytics
````

---

# 4. COMPLETE UI/UX REDESIGN

The current ArtWall frontend is dark, cinematic, and launch-focused.

I no longer want the main product UI to have this visual direction.

I want the new ArtWall UI to feel:

* Warm
* Minimal
* Elegant
* Editorial
* Professional
* Premium
* Art-focused
* Calm
* Sophisticated
* Modern
* Highly usable

The main visual inspiration should be **Artwork Archive-style professional art management**, but ArtWall must maintain its own identity.

Think:

```text
Contemporary art gallery
        +
Editorial magazine
        +
Professional SaaS
        +
Art archive
```

Instead of:

```text
Dark futuristic startup dashboard
```

---

# 5. VISUAL DESIGN SYSTEM

## Background

Use:

* Warm ivory
* Off-white
* Soft cream
* White surfaces
* Very light warm gray

Avoid making the entire product pure white.

---

## Typography

Use a sophisticated typography system.

### Display Typography

Use an elegant serif/editorial font for:

* Hero headings
* Major page titles
* Artist names
* Exhibition titles
* Important artwork titles

### UI Typography

Use a clean modern sans-serif for:

* Navigation
* Buttons
* Forms
* Tables
* Metadata
* Body content

Avoid overly futuristic fonts.

Avoid excessive font weights.

Use typography to create hierarchy instead of heavy cards.

---

# 6. COLORS

Create a consistent ArtWall color system.

### Primary

```text
Warm Ivory
```

### Surface

```text
White
Soft Cream
Light Warm Gray
```

### Text

```text
Charcoal
Dark Gray
Muted Gray
```

### Accent

Use subtle:

```text
Muted Olive
Earthy Gold
Warm Brown
```

Do not use bright yellow everywhere.

Do not use gradients as the primary design language.

Do not use pure black backgrounds for normal application screens.

---

# 7. SPACING

Use generous whitespace.

The interface should breathe.

Avoid placing every piece of information inside a card.

Use:

* Whitespace
* Typography
* Thin dividers
* Image hierarchy
* Alignment

instead of excessive containers.

---

# 8. ARTWORK-FIRST DESIGN

Artwork should be the visual focus of ArtWall.

Whenever artwork is displayed:

* Use high-quality images.
* Maintain the original aspect ratio.
* Avoid unnecessary borders.
* Avoid excessive shadows.
* Use clean metadata.
* Use large imagery.
* Allow artwork to visually breathe.

Example:

```text
┌─────────────────────────────┐
│                             │
│                             │
│        ARTWORK IMAGE        │
│                             │
│                             │
└─────────────────────────────┘

Untitled No. 04
2026
Oil on canvas
₹85,000
```

Metadata should remain quiet and minimal.

---

# 9. APPLICATION SHELL

Create a complete professional application shell.

Include:

* Left sidebar
* Collapsible sidebar
* Top navigation
* Global search
* Notifications
* User menu
* Breadcrumbs
* Page titles
* Primary actions
* Responsive navigation
* Mobile navigation
* Command/search interface

The authenticated experience should feel like a mature professional art-management application.

---

# 10. NAVIGATION

Create a minimal professional sidebar.

Suggested structure:

```text
ARTWALL

Overview

WORK
  Artwork
  Collections
  Series
  Editions
  Exhibitions
  Locations

BUSINESS
  Contacts
  Sales
  Invoices
  Payments

MANAGEMENT
  Documents
  Certificates
  Provenance
  Private Rooms

TOOLS
  Calendar
  Tasks
  Reports
  Insights

SYSTEM
  Settings

------------------

My Profile
```

Do not blindly use this exact structure.

After auditing the current application and researching the reference products, improve the information architecture if necessary.

---

# 11. LANDING PAGE REDESIGN

Completely redesign the current dark landing page.

The existing design contains:

* Black background
* Grid background
* Large white serif heading
* Countdown
* Yellow CTA

Replace this visual direction with a much more sophisticated editorial art experience.

Use:

* Warm ivory background
* Minimal navigation
* Editorial typography
* Large artwork imagery
* Generous whitespace
* Thin separators
* Subtle animations
* Calm interactions

The landing page should feel like:

```text
Contemporary art institution
+
Premium gallery
+
Editorial publication
```

Not like a generic startup landing page.

---

# 12. LANDING PAGE STRUCTURE

Create a complete landing page.

Suggested structure:

```text
Hero
   ↓
Featured Artists
   ↓
Featured Artwork
   ↓
How ArtWall Works
   ↓
For Artists
   ↓
For Collectors
   ↓
Exhibitions
   ↓
The Wall
   ↓
Founding Artists
   ↓
About ArtWall
   ↓
CTA
   ↓
Footer
```

Keep existing ArtWall messaging and functionality but redesign the presentation.

Do not make every section look like a standard SaaS section.

Use:

* Editorial layouts
* Artwork grids
* Asymmetric layouts
* Large typography
* White space
* Image storytelling

---

# 13. NAVIGATION ON LANDING PAGE

Example:

```text
ARTWALL

Artwork
Artists
Exhibitions
About

                         Search
                         Sign in
                         Join ArtWall
```

On scroll:

* Reduce navigation height slightly.
* Add subtle background.
* Add subtle bottom border.
* Animate smoothly.

On mobile:

* Hamburger/menu button
* Animated drawer
* Clean navigation
* Smooth transitions

---

# 14. DASHBOARD

Create a completely new professional artist dashboard.

Example:

```text
Good morning, Alok

Tuesday, August 11

────────────────────────────────────────

128 artworks     6 exhibitions     ₹8.4L sales

────────────────────────────────────────

Recent Activity

Upcoming

Artwork
```

Dashboard should contain meaningful information.

## Overview

Show:

* Total artworks
* Available artworks
* Sold artworks
* Reserved artworks
* Draft artworks
* Total collections
* Active exhibitions
* Upcoming exhibitions
* Active private rooms
* Recent sales

## Activity

Show:

* New artwork
* Artwork sold
* Artwork moved
* Exhibition created
* Contact added
* Document uploaded
* Certificate generated
* Private room viewed

## Quick Actions

```text
+ Add Artwork
+ Create Collection
+ Create Exhibition
+ Add Contact
+ Record Sale
+ Create Private Room
+ Generate Report
```

Do not create meaningless statistics.

All metrics must come from real database data.

---

# 15. ARTWORK INVENTORY

Artwork inventory is the core feature of ArtWall.

Create a professional inventory system.

Each artwork should support:

```text
Title
Artist
Year
Medium
Materials
Dimensions
Weight
Description
Price
Currency
Status
Availability
Location
Collection
Series
Edition
Tags
Notes
Exhibitions
Sales
Provenance
Documents
Certificate
Created Date
Updated Date
```

---

# 16. ARTWORK INVENTORY UI

Support multiple views.

## Grid View

Large visual artwork cards.

## List View

Professional list.

## Table View

For managing large inventories.

## Filters

Filter by:

* Artist
* Collection
* Series
* Medium
* Year
* Price
* Status
* Location
* Exhibition
* Availability
* Tags
* Sold
* Available
* Created date

## Sorting

Support:

* Recently updated
* Recently created
* Title
* Price
* Year
* Artist

## Search

Create global artwork search.

## Bulk Actions

Support:

* Archive
* Delete
* Add to collection
* Add tag
* Change location
* Change status
* Add to exhibition
* Export
* Generate labels
* Generate QR codes

---

# 17. ARTWORK CARD DESIGN

Artwork cards should feel editorial.

Example:

```text
┌──────────────────────┐
│                      │
│                      │
│       ARTWORK        │
│                      │
│                      │
└──────────────────────┘

Untitled
2026
Oil on canvas
₹85,000
```

On hover:

```text
Image subtle zoom
+
Metadata subtle movement
+
Secondary actions appear
```

Do not over-animate.

---

# 18. ARTWORK DETAIL PAGE

Create an editorial artwork detail page.

Suggested layout:

```text
┌────────────────────────┬───────────────────────┐
│                        │                       │
│                        │ Untitled              │
│       ARTWORK          │ 2026                  │
│                        │                       │
│                        │ Oil on canvas         │
│                        │ 120 × 90 cm           │
│                        │                       │
│                        │ ₹85,000               │
│                        │                       │
│                        │ Available             │
│                        │                       │
│                        │ Edit   Share   More   │
│                        │                       │
└────────────────────────┴───────────────────────┘
```

Below:

* Overview
* Description
* Metadata
* Collections
* Exhibitions
* Locations
* Provenance
* Sales
* Documents
* Certificate
* Activity

Use thin separators rather than excessive cards.

---

# 19. ADD ARTWORK

Create a professional artwork creation workflow.

Fields:

```text
Basic Information
    Title
    Artist
    Year

Artwork Details
    Medium
    Materials
    Dimensions
    Weight
    Description

Pricing
    Price
    Currency
    Availability

Classification
    Collection
    Series
    Edition
    Tags

Location
    Current Location

Media
    Images

Documents
    Attachments

Notes
```

Support:

* Multiple image upload
* Image preview
* Reordering
* Primary image
* Remove image
* Upload progress
* Validation

Use Cloudinary for artwork images.

---

# 20. ARTIST PROFILE

Create public:

```text
/artist/[handle]
```

The public profile should feel like a professional gallery profile.

Include:

* Profile image
* Cover image
* Artist name
* Biography
* Artist statement
* Location
* Website
* Social links
* Featured artwork
* Collections
* Exhibitions
* Available works
* Sold works
* Contact

Authenticated users should be able to edit their profile.

---

# 21. COLLECTIONS

Artists should be able to create collections.

Collection fields:

```text
Name
Description
Cover Image
Artist
Artwork
Tags
Visibility
Created Date
Updated Date
```

Features:

* Create
* Edit
* Delete
* Reorder
* Add artwork
* Remove artwork
* Public/private
* Share
* Analytics

---

# 22. SERIES

Support artwork series.

Example:

```text
Series:
Urban Memories

Artwork:
Untitled I
Untitled II
Untitled III
```

Features:

* Create series
* Add artwork
* Remove artwork
* Series description
* Series cover
* Public/private visibility

---

# 23. EDITIONS

Support:

* Original
* Limited edition
* Open edition
* Edition number
* Edition size
* Edition status
* Edition pricing
* Sold editions

Example:

```text
Print 01
Edition 1 / 25
```

---

# 24. EXHIBITIONS

Create complete exhibition management.

Fields:

```text
Exhibition Name
Description
Venue
Start Date
End Date
Artists
Artwork
Curator
Status
Images
Documents
```

Statuses:

```text
Draft
Upcoming
Active
Completed
Archived
```

Features:

* Create exhibition
* Edit exhibition
* Add artists
* Add artworks
* Assign location
* Exhibition timeline
* Exhibition page
* Exhibition reports
* Export
* Public/private visibility

---

# 25. LOCATIONS

Create location management.

Examples:

```text
Studio
Gallery
Collector
Warehouse
Museum
Exhibition
Storage
Other
```

Track:

```text
Current Location
Previous Location
Moved From
Moved To
Date
Reason
Notes
```

Every artwork should have location history.

---

# 26. PROVENANCE

Create a visual provenance timeline.

Example:

```text
Artwork Created
      ↓
Artist Studio
      ↓
Gallery Exhibition
      ↓
Collector Purchase
      ↓
Private Collection
      ↓
Museum Exhibition
```

Each provenance event should support:

```text
Date
Location
Owner
Event Type
Description
Documents
Notes
```

---

# 27. CONTACTS / CRM

Create a professional CRM.

Contact types:

```text
Collector
Gallery
Curator
Museum
Artist
Journalist
Venue
Organization
Other
```

Contact profile should contain:

* Name
* Email
* Phone
* Company
* Address
* Notes
* Tags
* Sales
* Artwork
* Exhibitions
* Communication history

---

# 28. SALES PIPELINE

Create a professional sales pipeline.

Stages:

```text
Lead
 ↓
Inquiry
 ↓
Interested
 ↓
Negotiation
 ↓
Reserved
 ↓
Sold
 ↓
Paid
 ↓
Completed
```

A sale should support:

```text
Artwork
Contact
Price
Discount
Tax
Commission
Payment Status
Invoice
Sale Date
Notes
```

---

# 29. INVOICES

Create professional invoices.

Fields:

```text
Invoice Number
Customer
Artwork
Subtotal
Discount
Tax
Commission
Total
Currency
Due Date
Payment Status
Notes
```

Statuses:

```text
Draft
Sent
Partially Paid
Paid
Overdue
Cancelled
```

Generate PDF invoices.

---

# 30. PAYMENTS

Track:

* Payment amount
* Payment date
* Payment method
* Reference
* Status
* Remaining balance
* Related invoice
* Related sale

Do not process real payments unless a proper payment gateway is implemented.

---

# 31. DOCUMENT MANAGEMENT

Allow documents to be attached to:

* Artwork
* Artist
* Exhibition
* Sale
* Contact
* Collection

Document types:

```text
Certificate
Contract
Invoice
Condition Report
Provenance
Receipt
Image
Other
```

Private documents must never become accidentally public.

---

# 32. CERTIFICATE OF AUTHENTICITY

Create actual certificate generation.

Certificate should contain:

```text
Artwork
Artist
Artwork Image
Title
Year
Medium
Dimensions
Edition
Certificate Number
Artist Information
Date
Signature Area
QR Code
```

Generate a professional PDF.

Every certificate must have a unique verification ID.

Example:

```text
/artwork/verify/[certificateId]
```

---

# 33. QR CODES

Generate QR codes for:

* Artworks
* Certificates
* Artist profiles
* Collections
* Exhibitions
* Private rooms

Create appropriate public verification pages.

---

# 34. PRIVATE VIEWING ROOMS

Create private rooms.

Workflow:

```text
Create Room
     ↓
Select Artwork
     ↓
Customize Room
     ↓
Generate Link
     ↓
Share
```

Room should contain:

* Cover
* Artist information
* Selected artwork
* Artwork details
* Pricing
* Contact button

Optional:

* Password protection
* Expiration date
* View analytics
* Hide prices
* Download permissions

---

# 35. CALENDAR

Create a calendar.

Display:

* Exhibitions
* Events
* Sales
* Tasks
* Deadlines
* Reminders
* Artwork movements

Views:

```text
Month
Week
Day
Agenda
```

---

# 36. TASK MANAGEMENT

Tasks should support:

```text
Title
Description
Due Date
Priority
Assignee
Related Artwork
Related Exhibition
Status
```

Statuses:

```text
Todo
In Progress
Completed
Cancelled
```

---

# 37. NOTIFICATIONS

Create notifications for:

* New sale
* Payment received
* Exhibition approaching
* Task due
* Private room viewed
* Certificate generated
* Artwork status changed
* Important system activity

---

# 38. GLOBAL SEARCH

Search across:

```text
Artwork
Artists
Collections
Series
Exhibitions
Contacts
Sales
Documents
Locations
```

Support:

* Search
* Filters
* Sorting
* Recent searches
* Suggestions

---

# 39. REPORTS

Create:

* Artwork inventory report
* Sales report
* Revenue report
* Collection report
* Exhibition report
* Location report
* Provenance report
* Artist report
* Valuation report

Allow:

```text
Preview
Export PDF
Export CSV
Print
```

---

# 40. INSIGHTS / ANALYTICS

Create meaningful analytics.

Possible metrics:

* Artwork count
* Sales
* Revenue
* Average artwork price
* Sales by collection
* Sales by medium
* Sales by year
* Exhibition performance
* Private room views
* Artwork engagement

Do not create fake analytics.

Everything must be based on actual data.

---

# 41. ADMIN PANEL

Preserve the existing admin panel.

Improve its UI to match the new design system.

Admin should manage:

* Users
* Artists
* Artworks
* Waitlist
* Founding artists
* Reports
* Moderation
* Uploaded content
* Platform statistics

Do not remove current moderation functionality.

---

# 42. AUTHENTICATION

Use **Clerk** if it integrates cleanly with the current application.

Support:

* Sign up
* Sign in
* Sign out
* Email verification
* Password recovery
* Profile
* Sessions

Prepare architecture for organizations.

Do not store critical business data only in Clerk metadata.

Business data must live in PostgreSQL.

---

# 43. USER ROLES

Design for:

```text
Artist
Artist Manager
Gallery
Collector
Curator
Organization Admin
Team Member
Platform Admin
```

Not all roles need to be exposed immediately.

Implement proper authorization from the beginning.

---

# 44. ORGANIZATION / TEAM MANAGEMENT

Prepare architecture for:

```text
Organization
    ↓
Members
    ↓
Roles
    ↓
Permissions
```

Potential structure:

```text
Artist
├── Manager
├── Assistant
├── Gallery
└── Team Member
```

---

# 45. DATABASE ARCHITECTURE

Use the existing Neon PostgreSQL database.

Do not destroy the existing schema.

Use proper migrations.

Potential entities:

```text
users

artists

organizations
organization_members
roles
permissions

artworks
artwork_images
artwork_tags
tags

collections
collection_artworks

series
series_artworks

editions

exhibitions
exhibition_artworks
exhibition_artists

locations
artwork_locations
location_history

contacts
contact_notes
contact_tags

sales
sale_items

invoices
payments

documents
document_links

certificates
provenance_events

private_rooms
private_room_artworks

tasks
calendar_events

notifications

reports

audit_logs
```

Also preserve existing tables such as:

```text
waitlist_entries
founding artist data
wall/activity data
```

Do not create duplicate entities if equivalent tables already exist.

First inspect the current schema.

---

# 46. DATABASE REQUIREMENTS

Use:

* Foreign keys
* Unique constraints
* Proper indexes
* Transactions
* Soft deletion where appropriate
* Timestamps
* Audit fields
* Ownership relationships
* Data isolation

Important tables should generally include:

```text
id
created_at
updated_at
```

Use the existing project's ID strategy if it is sound.

---

# 47. BACKEND ARCHITECTURE

Keep business logic separate from the UI.

Preferred architecture:

```text
Frontend
   ↓
Server Action / API
   ↓
Validation
   ↓
Business Logic / Service
   ↓
Database
```

Do not put complex business logic inside React components.

---

# 48. VALIDATION

Validate all external input.

Validate:

* Forms
* API requests
* Server actions
* IDs
* File uploads
* Prices
* Dates
* Permissions
* File types
* User input

Use the existing validation system or introduce Zod if appropriate.

---

# 49. SECURITY

Maintain and improve:

* Authentication
* Authorization
* CSRF protection
* Rate limiting
* Input validation
* Secure file uploads
* Private document protection
* Access control
* Audit logging

Check for:

```text
IDOR
SQL Injection
XSS
CSRF
Broken Access Control
File Upload Vulnerabilities
Data Leakage
Exposed Secrets
```

---

# 50. CLOUDINARY

Continue using Cloudinary for artwork images unless there is a strong reason to change.

Support:

* Multiple images
* Image optimization
* Thumbnails
* Responsive images
* Primary image
* Image ordering
* Secure uploads
* Upload progress

Private documents must be protected appropriately.

---

# 51. PERFORMANCE

Optimize:

* Dashboard loading
* Artwork inventory
* Image loading
* Database queries
* Search
* Pagination
* Filtering
* Server rendering
* Caching where useful

Avoid:

* N+1 queries
* Loading thousands of artworks at once
* Unnecessary client-side fetching
* Huge JavaScript bundles

---

# 52. ANIMATION SYSTEM

I want **beautiful animations**, but they must be subtle.

Animations should feel:

* Elegant
* Calm
* Natural
* Premium
* Intentional

Use:

* Page transitions
* Fade-in
* Slide-in
* Image reveal
* Hover image zoom
* Navigation transitions
* Modal transitions
* Drawer transitions
* Filter transitions
* Grid/list transitions
* Skeleton loading
* Smooth scrolling

Artwork hover:

```text
Hover
 ↓
Image slightly scales
 ↓
Metadata subtly moves
 ↓
Secondary action appears
```

Do not animate every element.

Respect:

```text
prefers-reduced-motion
```

---

# 53. ANIMATION TIMING

Use sensible timing.

Approximately:

```text
Micro interactions: 150–200ms

Buttons/hover: 150–250ms

Menus/dropdowns: 200–300ms

Cards: 250–400ms

Page transitions: 300–500ms
```

Avoid slow animations that make the application feel sluggish.

---

# 54. FORMS

Redesign forms to be simple and elegant.

Do not show 30 fields at once.

Group information:

```text
Basic Information

Artwork Details

Pricing

Classification

Media

Documents

Additional Information
```

Use progressive disclosure where appropriate.

---

# 55. TABLES

Tables should be:

* Clean
* Compact
* Readable
* Minimal

Use:

* Thin separators
* Good spacing
* Clear typography

Support:

* Sorting
* Filtering
* Selection
* Bulk actions
* Pagination
* Column customization

Avoid heavy borders.

---

# 56. EMPTY STATES

Do not use:

```text
No data found.
```

Instead:

```text
Your collection is empty.

Start by adding your first artwork.

+ Add Artwork
```

Empty states should tell the user what to do next.

---

# 57. LOADING STATES

Create professional loading states.

Use:

* Skeletons
* Progressive image loading
* Subtle transitions

Do not show blank screens while data loads.

---

# 58. ERROR STATES

Create useful error states.

Include:

* Clear explanation
* Retry button
* Appropriate fallback
* Developer logging

Never silently swallow errors.

---

# 59. RESPONSIVE DESIGN

## Desktop

Professional art-management workspace.

## Tablet

Adaptive navigation and grids.

## Mobile

Optimize for:

* Artwork browsing
* Artwork detail
* Tasks
* Notifications
* Calendar
* Quick actions

Do not simply shrink the desktop UI.

---

# 60. ACCESSIBILITY

Follow good accessibility practices.

Include:

* Keyboard navigation
* Proper labels
* Semantic HTML
* Focus states
* Screen reader support
* Sufficient contrast
* Reduced motion support
* Accessible dialogs
* Accessible forms

---

# 61. DESIGN SYSTEM COMPONENTS

Create reusable components for:

```text
Button
Input
Select
Textarea
Dialog
Drawer
Dropdown
Tabs
Tooltip
Badge
Card
Table
DataTable
Search
Filter
Breadcrumb
Toast
Modal
Sheet
Avatar
ArtworkCard
ArtworkGrid
ArtworkTable
ArtworkGallery
EmptyState
LoadingState
ErrorState
Timeline
ActivityFeed
```

Do not duplicate components.

---

# 62. FRONTEND TODO

```text
[ ] Complete design system
[ ] Global typography
[ ] Color system
[ ] Application shell
[ ] Sidebar
[ ] Top navigation
[ ] Global search
[ ] Notifications
[ ] User menu
[ ] Dashboard
[ ] Artwork grid
[ ] Artwork table
[ ] Artwork list
[ ] Artwork filters
[ ] Artwork search
[ ] Artwork detail
[ ] Add artwork
[ ] Edit artwork
[ ] Bulk actions
[ ] Collections
[ ] Series
[ ] Editions
[ ] Exhibitions
[ ] Locations
[ ] Provenance
[ ] Contacts
[ ] Sales
[ ] Sales pipeline
[ ] Invoices
[ ] Payments
[ ] Documents
[ ] Certificates
[ ] QR verification
[ ] Private rooms
[ ] Calendar
[ ] Tasks
[ ] Reports
[ ] Insights
[ ] Artist profile
[ ] Public artist profile
[ ] Settings
[ ] Admin
[ ] Landing page redesign
[ ] The Wall redesign
[ ] Responsive UI
[ ] Loading states
[ ] Empty states
[ ] Error states
[ ] Accessibility
[ ] Animation system
```

---

# 63. BACKEND TODO

```text
[ ] Authentication
[ ] Authorization
[ ] Artist APIs/server actions
[ ] Artwork APIs/server actions
[ ] Collection APIs/server actions
[ ] Series APIs/server actions
[ ] Edition APIs/server actions
[ ] Exhibition APIs/server actions
[ ] Location APIs/server actions
[ ] Provenance APIs/server actions
[ ] Contact APIs/server actions
[ ] Sales APIs/server actions
[ ] Invoice APIs/server actions
[ ] Payment tracking
[ ] Document management
[ ] Certificate generation
[ ] QR verification
[ ] Private rooms
[ ] Calendar
[ ] Tasks
[ ] Notifications
[ ] Search
[ ] Reports
[ ] Analytics
[ ] Admin APIs
[ ] Audit logs
[ ] Rate limiting
[ ] Validation
[ ] Error handling
[ ] File security
```

---

# 64. DATABASE TODO

```text
[ ] Audit current schema
[ ] Design relationships
[ ] Add artist relationships
[ ] Add user relationships
[ ] Add organizations
[ ] Add organization members
[ ] Add artworks
[ ] Add artwork images
[ ] Add collections
[ ] Add tags
[ ] Add series
[ ] Add editions
[ ] Add exhibitions
[ ] Add locations
[ ] Add location history
[ ] Add provenance
[ ] Add contacts
[ ] Add sales
[ ] Add invoices
[ ] Add payments
[ ] Add documents
[ ] Add certificates
[ ] Add private rooms
[ ] Add tasks
[ ] Add calendar events
[ ] Add notifications
[ ] Add audit logs
[ ] Add indexes
[ ] Add constraints
[ ] Create migrations
[ ] Test migrations
```

---

# 65. TESTING TODO

Test every major feature.

```text
[ ] Authentication tests
[ ] Authorization tests
[ ] Artwork CRUD tests
[ ] Collection tests
[ ] Series tests
[ ] Edition tests
[ ] Exhibition tests
[ ] Location tests
[ ] Provenance tests
[ ] Contact tests
[ ] Sales tests
[ ] Invoice tests
[ ] Payment tests
[ ] Document tests
[ ] Certificate tests
[ ] QR verification tests
[ ] Private room tests
[ ] Search tests
[ ] Permission tests
[ ] File upload tests
[ ] Server action/API tests
[ ] Integration tests
[ ] E2E tests
[ ] Mobile testing
[ ] Accessibility testing
[ ] Regression testing
[ ] Performance testing
```

Test both:

### Happy paths

and:

### Failure paths

Examples:

```text
Artist creates artwork
Artist edits artwork
Artist archives artwork
Unauthorized user tries to edit artwork
Artwork is sold
Certificate is generated
Private room is accessed
Private document is requested
Invalid file uploaded
Invalid price submitted
Invalid artwork ID submitted
Unauthorized API request
```

---

# 66. MIGRATION STRATEGY

Before changing the database:

1. Inspect the current schema.
2. Understand existing relationships.
3. Verify existing data.
4. Create migration.
5. Test migration locally.
6. Verify existing functionality.
7. Apply migration.
8. Run tests.
9. Verify production safety.

Never perform destructive database changes without understanding the consequences.

---

# 67. IMPLEMENTATION PHASES

## PHASE 0 — AUDIT

```text
[ ] Repository audit
[ ] Database audit
[ ] UI audit
[ ] API audit
[ ] Authentication audit
[ ] Existing feature map
```

---

## PHASE 1 — DESIGN SYSTEM + APPLICATION SHELL

```text
[ ] New color system
[ ] Typography
[ ] Spacing
[ ] Components
[ ] Sidebar
[ ] Header
[ ] Dashboard shell
[ ] Responsive navigation
[ ] Animation system
```

---

## PHASE 2 — AUTHENTICATION + ARTIST

```text
[ ] Authentication
[ ] User model
[ ] Artist model
[ ] Artist dashboard
[ ] Artist profile
[ ] Public artist profile
```

---

## PHASE 3 — ARTWORK

```text
[ ] Artwork database
[ ] Artwork CRUD
[ ] Image management
[ ] Artwork inventory
[ ] Grid view
[ ] List view
[ ] Table view
[ ] Search
[ ] Filters
[ ] Sorting
[ ] Bulk actions
```

---

## PHASE 4 — ORGANIZATION

```text
[ ] Collections
[ ] Series
[ ] Editions
[ ] Tags
```

---

## PHASE 5 — EXHIBITIONS + LOCATIONS

```text
[ ] Exhibitions
[ ] Exhibition artwork
[ ] Exhibition artists
[ ] Locations
[ ] Location history
```

---

## PHASE 6 — PROVENANCE + CERTIFICATES

```text
[ ] Provenance
[ ] Certificate generation
[ ] QR generation
[ ] QR verification
```

---

## PHASE 7 — CRM + SALES

```text
[ ] Contacts
[ ] Contact profiles
[ ] Sales
[ ] Sales pipeline
[ ] Invoices
[ ] Payments
```

---

## PHASE 8 — DOCUMENTS + PRIVATE ROOMS

```text
[ ] Documents
[ ] Private rooms
[ ] Sharing
[ ] Permissions
[ ] Password protection
[ ] Expiration
```

---

## PHASE 9 — PROFESSIONAL TOOLS

```text
[ ] Calendar
[ ] Tasks
[ ] Notifications
[ ] Reports
[ ] Analytics
[ ] Import/export
```

---

## PHASE 10 — FINAL POLISH

```text
[ ] Performance audit
[ ] Accessibility audit
[ ] Security audit
[ ] Responsive audit
[ ] UX audit
[ ] Animation audit
[ ] Database audit
[ ] API audit
[ ] Regression testing
[ ] Production deployment preparation
```

---

# 68. DEVELOPMENT RULE

Do not start by coding random pages.

Follow:

```text
AUDIT
   ↓
PRODUCT ARCHITECTURE
   ↓
DATABASE ARCHITECTURE
   ↓
DESIGN SYSTEM
   ↓
APPLICATION SHELL
   ↓
CORE WORKFLOWS
   ↓
IMPLEMENTATION
   ↓
TESTING
   ↓
REVIEW
   ↓
REFACTOR
```

---

# 69. HOW YOU SHOULD WORK WITH ME

Treat me as the **Founder/Product Owner**.

You are my senior technical team.

Do not blindly agree with everything I say.

If something is:

* Unnecessary
* Technically risky
* Expensive
* Difficult to scale
* Bad UX
* Bad architecture
* Over-engineered

Tell me.

Give me a better alternative.

For major architectural decisions, explain the options before implementing.

---

# 70. CODE QUALITY RULES

Always:

* Reuse existing code where appropriate.
* Keep components modular.
* Keep business logic separate.
* Use strict TypeScript.
* Avoid `any`.
* Avoid duplicated code.
* Avoid giant components.
* Avoid unnecessary abstractions.
* Avoid premature microservices.
* Use proper database transactions.
* Validate all inputs.
* Handle errors properly.
* Write tests.
* Follow accessibility practices.
* Follow responsive design practices.
* Follow security best practices.
* Keep the codebase maintainable.

---

# 71. FINAL PRODUCT GOAL

The final ArtWall should feel like:

> **A professional operating system for an artist's art business.**

Not simply:

> **An artist portfolio website.**

An artist should be able to open ArtWall every day and manage:

```text
ARTWORK
   ↓
COLLECTIONS
   ↓
SERIES
   ↓
EDITIONS
   ↓
EXHIBITIONS
   ↓
LOCATIONS
   ↓
COLLECTORS
   ↓
SALES
   ↓
DOCUMENTS
   ↓
PROVENANCE
   ↓
CERTIFICATES
   ↓
REPORTS
```

while the public side remains beautiful, artistic, premium, and immersive.

The product should combine:

```text
Artwork Archive-style management
+
VarisArt-style art workflows
+
ArtWall's own visual identity
+
ArtWall's Collaborative Wall
+
Professional artist tools
```

---

# 72. MOST IMPORTANT UI GOAL

The current ArtWall looks like:

```text
Dark
Cinematic
Futuristic
Launch-focused
High contrast
```

The new ArtWall should look like:

```text
Warm white
Editorial
Minimal
Quiet
Premium
Professional
Art-focused
Image-first
Sophisticated
```

Think:

```text
Contemporary gallery
+
Art archive
+
Editorial magazine
+
Professional SaaS
```

The authenticated management interface should be highly functional and minimal.

The public ArtWall/WALL experience can retain more artistic expression and immersive interactions.

---

# 73. FIRST TASK — DO NOT CODE YET

Before changing anything, inspect the complete repository and return:

## 1. Existing Architecture

* Frontend
* Backend
* Database
* Authentication
* Storage
* Routes
* Server actions
* Existing components

## 2. Existing Features

List everything currently working.

## 3. Existing Database

Show current tables and relationships.

## 4. UI Audit

Explain which existing pages should be:

* Redesigned
* Preserved
* Merged
* Replaced
* Extended

## 5. New Information Architecture

Show proposed ArtWall navigation.

## 6. New Design System

Explain:

* Colors
* Typography
* Spacing
* Components
* Buttons
* Cards
* Tables
* Forms
* Artwork layouts

## 7. Dashboard Wireframe

Show the proposed dashboard structure.

## 8. Artwork Inventory Wireframe

Show:

* Grid
* List
* Table
* Filters
* Search
* Bulk actions

## 9. Artwork Detail Wireframe

Show the proposed artwork detail structure.

## 10. Public Artist Profile

Show the proposed public profile structure.

## 11. Database ERD

Show proposed entities and relationships.

## 12. Backend Architecture

Explain:

* Server actions
* APIs
* Services
* Validation
* Authorization
* Database access

## 13. Animation Strategy

Explain where animations will be used and how they will behave.

## 14. Implementation Roadmap

Break the work into small, safe milestones.

## 15. Risk Assessment

Identify anything that could potentially break existing functionality.

---

# FINAL INSTRUCTION

**Do not start making major code changes until you have completed the audit and presented the architecture and UI plan.**

Once approved, implement the redesign incrementally.

Never sacrifice existing working functionality just to implement a new feature.

The goal is not to make ArtWall look like a copy of Artwork Archive.

The goal is to make ArtWall feel like a **much more polished, premium, minimal, professional art-management platform inspired by the best parts of Artwork Archive and VarisArt, with its own identity.**

```
```
