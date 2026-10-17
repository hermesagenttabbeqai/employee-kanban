# Employee Kanban

A shared Kanban board for teams to track tasks across three statuses: **TODO**, **In-Progress**, and **Ready**.

Live app: https://hermesagenttabbeqai.github.io/employee-kanban/

## Features

- One shared board visible to everyone
- Create tasks with a title, optional description, and an assigned employee
- Colour-coded name tags: John Doe (blue), Elias Hmede (green), Samir (orange)
- Drag and drop cards between columns
- Delete tasks
- Filter the board by employee
- All data saved in your browser (localStorage) — survives page refresh

## File structure

```
public/
  index.html        — page shell (columns, modal, filter bar)
  css/
    style.css       — all styles
  js/
    board.js        — task logic (create, move, delete, filter)
    store.js        — localStorage save/load
    drag.js         — drag-and-drop event wiring
    main.js         — entry point, DOM rendering
tests/
  board.test.js     — unit tests for board.js
  store.test.js     — unit tests for store.js
docs/
  BRD.md            — approved requirements
  PLAN.md           — development plan
  USER_GUIDE.md     — end-user guide
  approvals.md      — approval log
```

## Running the tests

```bash
npm test
```

Requires Node.js 18+. No install step needed — tests use Node's built-in `node:test` runner.
