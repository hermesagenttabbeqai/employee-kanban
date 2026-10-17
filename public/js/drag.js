/**
 * drag.js — HTML5 drag-and-drop helpers for the kanban board.
 * BR-05
 */

/**
 * Makes a card element draggable and fires onDrop when dropped.
 * @param {HTMLElement} cardEl   - The card element to make draggable.
 * @param {Function}    onDrop  - Called as onDrop(taskId, newStatus) on a successful drop.
 */
export function attachDragListeners(cardEl, onDrop) {
  cardEl.setAttribute('draggable', 'true');

  cardEl.addEventListener('dragstart', (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', cardEl.dataset.taskId);
    // slight delay so the card has moved in the visual stack before applying class
    requestAnimationFrame(() => cardEl.classList.add('dragging'));
  });

  cardEl.addEventListener('dragend', () => {
    cardEl.classList.remove('dragging');
  });
}

/**
 * Makes a column element a valid drop target.
 * Highlights the column on dragover and calls onDrop when a card is dropped.
 * @param {HTMLElement} columnEl  - The column container element.
 * @param {Function}    onDrop   - Called as onDrop(taskId, newStatus) on drop.
 */
export function attachDropZone(columnEl, onDrop) {
  const status = columnEl.dataset.status;

  columnEl.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    columnEl.classList.add('drag-over');
  });

  columnEl.addEventListener('dragleave', (e) => {
    // Only remove the highlight if the pointer truly left the column
    if (!columnEl.contains(e.relatedTarget)) {
      columnEl.classList.remove('drag-over');
    }
  });

  columnEl.addEventListener('drop', (e) => {
    e.preventDefault();
    columnEl.classList.remove('drag-over');
    const taskId = e.dataTransfer.getData('text/plain');
    if (taskId) {
      onDrop(taskId, status);
    }
  });
}
