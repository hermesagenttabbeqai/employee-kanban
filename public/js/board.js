/**
 * board.js — Pure functions for task management.
 * BR-02, BR-03, BR-04, BR-06, BR-09
 */

/**
 * Creates a new task object.
 * @param {string} title
 * @param {string} assignee
 * @param {string} description
 * @returns {{ id: string, title: string, assignee: string, description: string, status: string }}
 */
export function createTask(title, assignee, description) {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    title,
    assignee,
    description: description ?? '',
    status: 'TODO',
  };
}

/**
 * Moves a task to a new status in-place and returns the same object.
 * @param {{ status: string }} task
 * @param {string} newStatus
 * @returns {typeof task}
 */
export function moveTask(task, newStatus) {
  task.status = newStatus;
  return task;
}

/**
 * Removes the task with the given id from the array and returns a new array.
 * @param {Array} tasks
 * @param {string} taskId
 * @returns {Array}
 */
export function deleteTask(tasks, taskId) {
  return tasks.filter(t => t.id !== taskId);
}

/**
 * Filters tasks by assignee. Returns all tasks when assignee is null/undefined/''.
 * @param {Array} tasks
 * @param {string|null} assignee
 * @returns {Array}
 */
export function filterTasks(tasks, assignee) {
  if (!assignee) return tasks;
  return tasks.filter(t => t.assignee === assignee);
}
