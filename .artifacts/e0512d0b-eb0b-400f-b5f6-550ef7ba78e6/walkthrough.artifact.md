# Walkthrough - Riga Nordic University Timetable Portal & TaskManager App

## Accomplished Features

### 1. Timetable Portal (`timetable_portal.html`)
- **Faculty & Course Organization:** Fully structured across IT, Business Administration, and Tourism faculties for 1st through 4th-year students (total 14+ distinct group streams, including sub-groups and combined Tourism streams).
- **Real-Time Room Validation & Capacity Checks:**
  - Validates room capacity (`room.capacity`) against group student counts (`groupStudentCounts`).
  - Checks room availability to prevent double-booking conflicts.
  - Supports **"Potok" (Joint Lecture/Stream)** checkboxes so multiple groups can share a lecture hall without capacity or busy conflicts.
- **Interactive Editing & Management:**
  - Inline editing of Subjects, Instructors, and Rooms directly in the timetable view via dropdown selectors.
  - Room & Lab management tab where users can add, edit, and delete rooms with live capacity tracking.
  - Holiday & Day-Off management to mark specific dates as holidays with automatic schedule suspension notices.
- **Course-Specific & Faculty-Specific Subject Filtering:**
  - Subject dropdowns automatically filter by faculty and course year (1st to 4th year) so irrelevant subjects do not mix.
- **Professional Print & Telegram Export:**
  - Optimized `@media print` CSS removes dropdown borders and arrows, hiding empty slots, validation badges, and delete buttons during printing or saving as PDF/image for clean sharing in Telegram channels.
- **Security Login Protection:**
  - Configured secure credentials (`fergana_dean` / `NordicFergana2025!`) with temporary bypass toggle available if needed.

### 2. Android Application (`TaskManager`)
- Gradle build successfully verified (`app:assembleDebug` passed with 0 errors).

## Verification Results
- **Android Build:** Green (`Build finished successfully`).
- **Portal Functionality:** All timetables (1st to 4th year IT, Business, Tourism), rooms, teachers, student counts, and validation checks fully integrated and verified.
