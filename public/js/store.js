/**
 * store.js — Persist and restore board state via localStorage.
 * BR-07, NFR-04
 */

const STORAGE_KEY = 'employee-kanban-board';

/**
 * Saves the tasks array to localStorage.
 * @param {Array} tasks
 */
export function saveBoard(tasks) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Loads and returns the tasks array from localStorage.
 * Returns an empty array if nothing has been saved yet.
 * @returns {Array}
 */
export function loadBoard() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
