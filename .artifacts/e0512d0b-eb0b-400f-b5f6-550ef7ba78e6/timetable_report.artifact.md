# Riga Nordic University Fergana Branch — Timetable Portal Report

## Overview
This report summarizes the complete implementation of the enterprise-grade Timetable Portal (`timetable_portal.html`) and associated Android project structure (`TaskManager`).

## 1. Faculty & Group Structure (14+ Streams)
- **IT Faculty:**
  - 1st Year: `Information Systems A (4251 A)` (19 students), `Information Systems B (4251 B)` (18 students)
  - 2nd Year: `Information Systems` (22 students)
  - 3rd Year: `Information Systems (3rd Year)` (4 students)
  - 4th Year: `Group IT (4th Year)` (4 students)
- **Business Administration & Tourism Faculty:**
  - 1st Year: `Business Administration ENG (3160F) / Tourism ENG (5160F)` (96 students), `Business Administration (3161 A, B) / Tourism (5161)` (100 students)
  - 2nd Year: `Business Administration (3151 A, B, C) / Tourism (5151)` (94 students), `Business Administration (3150 F) / Tourism (5050 F)` (64 students)
  - 3rd Year: `Business Administration (3131)` (23 students)
  - 4th Year: `Business Administration / Tourism` (16 students)
- **Tourism Faculty:**
  - 3rd Year: `Tourism-31` (25 students)
  - 4th Year: `Tourism-41` (25 students)

## 2. Key Features Implemented
- **Real-Time Room Validation & Capacity Check:** Automatically verifies if room capacity ($\ge$ student count) is sufficient and checks for room/teacher double-booking conflicts.
- **Potok (Joint Lecture/Stream) Support:** Allows combining groups into a shared stream by checking the "Potok (Umumiy)" option.
- **Course & Faculty-Specific Subject Filtering:** Ensures subject dropdowns only display courses appropriate to each group (1st through 4th year).
- **Holiday Management:** Easily add and manage university holidays/days-off with automatic schedule suspension notices.
- **Professional Print & Telegram Export:** Formats schedules as clean official university documents (`@media print`) hiding editing controls and empty slots when exporting.
- **Robust Error Handling & Auto-Initialization:** Bulletproof script execution with `try...catch` and smart default merging ensuring immediate responsiveness upon page load.

## 3. Access Link
- [timetable_portal.html](file:///C:/Users/Starsa/AndroidStudioProjects/TaskManager/timetable_portal.html)
