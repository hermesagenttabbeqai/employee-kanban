# Business Requirements Document

**Project:** employee-kanban
**Requester:** (name not provided — recorded as "Team")
**Date:** 2026-10-17
**Version:** v1

---

## 1. Summary

A shared Kanban board for employees to organize and track tasks across three statuses: TODO, In-Progress, and Ready. Any team member can create, move, and manage tasks. Each task carries an employee name tag to show who owns it.

---

## 2. Users and Goals

| User | Goal |
|------|------|
| Any employee | See all tasks on the shared board at a glance |
| Any employee | Create a new task and assign it to a team member |
| Any employee | Move a task across the three columns as work progresses |
| Any employee | Identify who owns each task via the name tag |

---

## 3. Functional Requirements

| ID | Requirement |
|----|-------------|
| BR-01 | The board displays three columns in this order: TODO, In-Progress, Ready |
| BR-02 | Each task card shows a title and the assigned employee's name tag |
| BR-03 | Any user can create a new task by entering a title and selecting an employee from the list |
| BR-04 | The employee list contains: John Doe, Elias Hmede, Samir |
| BR-05 | Any user can drag and drop a task card between columns to change its status |
| BR-06 | Any user can delete a task card |
| BR-07 | The board state (all tasks and their statuses) is saved in the browser and restored on next visit |
| BR-08 | Any user can filter the board to show only tasks assigned to a specific employee |
| BR-09 | Each task card shows a short optional description (up to 200 characters) |

---

## 4. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-01 | The app loads and is usable within 3 seconds on a standard connection |
| NFR-02 | The layout works on desktop (1024px+) and adapts reasonably to tablet |
| NFR-03 | The app works on the latest versions of Chrome, Firefox, and Edge |
| NFR-04 | No server or login is required; all data lives in localStorage |
| NFR-05 | Text is in English |

---

## 5. Recommendations Accepted

| Feature | Reason |
|---------|--------|
| Drag and drop between columns | Natural kanban interaction; more intuitive than buttons |
| Optional task description | Gives context beyond just the title without cluttering the card |
| Filter by employee | Quickly isolates one person's tasks on a busy board |

---

## 6. Assumptions

- The three employee names (John Doe, Elias Hmede, Samir) are fixed; adding new employees is out of scope for v1.
- No user login or authentication is needed; the board is shared and open to anyone who visits the URL.
- "Website" means a static web app hosted on GitHub Pages.
- Desktop-first layout, clean light theme (no specific brand colors provided).

---

## 7. Out of Scope

- User login or per-user views
- Adding or removing employees from within the app
- Due dates, priorities, or labels beyond the employee name tag
- Real-time sync across multiple browsers/devices
- Backend server or database

---

## 8. Acceptance Checklist

- [ ] Board shows three columns: TODO, In-Progress, Ready
- [ ] Can create a task with a title and assign it to John Doe, Elias Hmede, or Samir
- [ ] Task cards show the employee name tag visually
- [ ] Drag and drop moves a card between columns
- [ ] Board data survives a page refresh
- [ ] Filter works: selecting an employee hides other employees' tasks
- [ ] Deleting a task removes it from the board
- [ ] App is usable on a desktop browser
