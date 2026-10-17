# Employee Kanban — Development Plan

Based on BRD version: v1 · Date: 2026-10-17 · Plan version: v1

## Architecture

| File | Purpose |
|---|---|
| public/index.html | Single page shell: columns, modals, filter bar |
| public/css/style.css | All styles: board layout, cards, name tag colours, responsive |
| public/js/store.js | Pure functions: load/save board state to localStorage |
| public/js/board.js | Pure functions: create task, move task, delete task, filter tasks |
| public/js/drag.js | Drag-and-drop logic: attach/detach event listeners |
| public/js/main.js | Entry point: wires DOM events to board/store functions, renders board |
| tests/board.test.js | Unit tests for board.js (create, move, delete, filter) |
| tests/store.test.js | Unit tests for store.js (save, load, round-trip) |

## Tasks

### T1: Core data layer — store and board logic
- BRD IDs: BR-01, BR-02, BR-03, BR-04, BR-06, BR-07, BR-09
- Files: public/js/store.js, public/js/board.js, tests/board.test.js, tests/store.test.js
- Acceptance tests:
  - createTask('Fix login', 'John Doe', 'Check the auth flow') returns an object with id, title, assignee, description, status='TODO'
  - moveTask(task, 'In-Progress') returns the same task with status='In-Progress'
  - deleteTask(tasks, taskId) returns the array without that task
  - filterTasks(tasks, 'Samir') returns only tasks with assignee='Samir'
  - filterTasks(tasks, null) returns all tasks
  - saveBoard(tasks) writes to localStorage; loadBoard() reads it back with the same data
- Depends on: none

### T2: UI — board layout, cards, add-task modal, delete, filter
- BRD IDs: BR-01, BR-02, BR-03, BR-04, BR-05, BR-06, BR-07, BR-08, BR-09, NFR-01, NFR-02, NFR-03, NFR-04, NFR-05
- Files: public/index.html, public/css/style.css, public/js/drag.js, public/js/main.js
- Acceptance tests:
  - Page loads with three columns labelled TODO, In-Progress, Ready
  - Clicking "Add Task" opens a modal with a title input, optional description input, and employee dropdown containing John Doe, Elias Hmede, Samir
  - Submitting the form adds a card to the TODO column showing the title and a colour-coded name tag
  - Dragging a card to another column moves it there; refresh keeps it in that column
  - Clicking delete on a card removes it; refresh confirms it is gone
  - Selecting an employee in the filter bar hides cards not assigned to that employee; selecting "All" shows every card
- Depends on: T1 (imports from board.js and store.js)

## Coverage

| BRD ID | Task(s) |
|---|---|
| BR-01 | T1, T2 |
| BR-02 | T1, T2 |
| BR-03 | T1, T2 |
| BR-04 | T1, T2 |
| BR-05 | T2 |
| BR-06 | T1, T2 |
| BR-07 | T1, T2 |
| BR-08 | T1, T2 |
| BR-09 | T1, T2 |
| NFR-01 | T2 |
| NFR-02 | T2 |
| NFR-03 | T2 |
| NFR-04 | T1 |
| NFR-05 | T2 |

## Risks and open questions

- Drag and drop uses native HTML5 API (no library). Works on desktop; touch devices are not required per NFR-02.
- localStorage limit is ~5 MB; more than enough for a task list of any realistic size.
- No open questions; all BRD items are covered.
