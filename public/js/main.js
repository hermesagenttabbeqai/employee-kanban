/**
 * main.js — Entry point; wires DOM events to board/store logic and renders the UI.
 * BR-01 through BR-09, NFR-01 through NFR-05
 */

import { createTask, moveTask, deleteTask, filterTasks } from './board.js';
import { saveBoard, loadBoard } from './store.js';
import { attachDragListeners, attachDropZone } from './drag.js';

// ── State ─────────────────────────────────────────────────
let tasks = [];

// ── DOM refs ──────────────────────────────────────────────
const filterSelect   = document.getElementById('filter-employee');
const btnAddTask     = document.getElementById('btn-add-task');
const modalOverlay   = document.getElementById('modal-overlay');
const btnModalClose  = document.getElementById('btn-modal-close');
const btnCancel      = document.getElementById('btn-cancel');
const taskForm       = document.getElementById('task-form');
const inputTitle     = document.getElementById('input-title');
const inputDesc      = document.getElementById('input-description');
const inputEmployee  = document.getElementById('input-employee');
const charCount      = document.getElementById('char-count');
const errorTitle     = document.getElementById('error-title');

const STATUSES = ['TODO', 'In-Progress', 'Ready'];

// ── Employee → badge CSS class ────────────────────────────
function badgeClass(assignee) {
  if (assignee === 'John Doe')    return 'badge-john';
  if (assignee === 'Elias Hmede') return 'badge-elias';
  if (assignee === 'Samir')       return 'badge-samir';
  return '';
}

// ── Render ────────────────────────────────────────────────
/**
 * Re-renders the board.
 * @param {Array}  taskList    - Full task array.
 * @param {string} filterValue - Assignee name to filter by, or '' for all.
 */
function renderBoard(taskList, filterValue) {
  const visible = filterTasks(taskList, filterValue || null);

  STATUSES.forEach((status) => {
    const list      = document.getElementById(`list-${status}`);
    const countEl   = document.getElementById(`count-${status}`);
    const colEl     = document.getElementById(`col-${status}`);

    // Clear previous content
    list.innerHTML = '';

    const statusTasks = visible.filter(t => t.status === status);
    countEl.textContent = statusTasks.length;

    if (statusTasks.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-state';
      empty.innerHTML = '<span class="empty-icon">📋</span><span>No tasks here</span>';
      list.appendChild(empty);
    } else {
      statusTasks.forEach(task => {
        const card = buildCard(task);
        list.appendChild(card);
      });
    }

    // Re-attach drop zone each render
    attachDropZone(colEl, (taskId, newStatus) => {
      const target = tasks.find(t => t.id === taskId);
      if (target && target.status !== newStatus) {
        moveTask(target, newStatus);
        saveBoard(tasks);
      }
      renderBoard(tasks, filterSelect.value);
    });
  });
}

/** Builds a card DOM element for a task. */
function buildCard(task) {
  const card = document.createElement('article');
  card.className = 'card';
  card.dataset.taskId = task.id;
  card.setAttribute('role', 'listitem');
  card.setAttribute('aria-label', `Task: ${task.title}, assigned to ${task.assignee}`);

  // Delete button
  const delBtn = document.createElement('button');
  delBtn.className = 'btn-delete';
  delBtn.setAttribute('aria-label', `Delete task: ${task.title}`);
  delBtn.innerHTML = '&times;';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    tasks = deleteTask(tasks, task.id);
    saveBoard(tasks);
    renderBoard(tasks, filterSelect.value);
  });

  // Title
  const title = document.createElement('p');
  title.className = 'card-title';
  title.textContent = task.title;

  // Description (optional)
  if (task.description && task.description.trim()) {
    const desc = document.createElement('p');
    desc.className = 'card-description';
    desc.textContent = task.description;
    card.appendChild(title);
    card.appendChild(desc);
  } else {
    card.appendChild(title);
  }

  // Footer: badge
  const footer = document.createElement('div');
  footer.className = 'card-footer';

  const badge = document.createElement('span');
  badge.className = `badge ${badgeClass(task.assignee)}`;
  badge.textContent = task.assignee;

  footer.appendChild(badge);
  card.appendChild(footer);
  card.appendChild(delBtn);

  // Drag listeners
  attachDragListeners(card, () => {}); // onDrop handled at column level

  return card;
}

// ── Modal helpers ─────────────────────────────────────────
function openModal() {
  taskForm.reset();
  charCount.textContent = '0 / 200';
  inputTitle.classList.remove('error');
  errorTitle.hidden = true;
  modalOverlay.hidden = false;
  inputTitle.focus();
}

function closeModal() {
  modalOverlay.hidden = true;
}

// ── Event wiring ──────────────────────────────────────────
btnAddTask.addEventListener('click', openModal);
btnModalClose.addEventListener('click', closeModal);
btnCancel.addEventListener('click', closeModal);

// Close modal on backdrop click
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !modalOverlay.hidden) closeModal();
});

// Character counter for description
inputDesc.addEventListener('input', () => {
  charCount.textContent = `${inputDesc.value.length} / 200`;
});

// Filter change
filterSelect.addEventListener('change', () => {
  renderBoard(tasks, filterSelect.value);
});

// Form submit
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = inputTitle.value.trim();
  if (!title) {
    inputTitle.classList.add('error');
    errorTitle.hidden = false;
    inputTitle.focus();
    return;
  }

  inputTitle.classList.remove('error');
  errorTitle.hidden = true;

  const task = createTask(title, inputEmployee.value, inputDesc.value.trim());
  tasks.push(task);
  saveBoard(tasks);
  closeModal();
  renderBoard(tasks, filterSelect.value);
});

// ── Init ──────────────────────────────────────────────────
tasks = loadBoard();
renderBoard(tasks, '');
