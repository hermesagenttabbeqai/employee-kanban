import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { createTask, moveTask, deleteTask, filterTasks } from '../public/js/board.js';

describe('createTask', () => {
  it('returns an object with id, title, assignee, description, status=TODO', () => {
    const task = createTask('Fix login', 'John Doe', 'Check auth');
    assert.ok(task.id, 'should have an id');
    assert.equal(task.title, 'Fix login');
    assert.equal(task.assignee, 'John Doe');
    assert.equal(task.description, 'Check auth');
    assert.equal(task.status, 'TODO');
  });

  it('generates unique ids', () => {
    const t1 = createTask('A', 'John Doe', '');
    const t2 = createTask('B', 'Samir', '');
    assert.notEqual(t1.id, t2.id);
  });
});

describe('moveTask', () => {
  it('returns the same task object with updated status', () => {
    const task = createTask('Fix login', 'John Doe', 'Check auth');
    const moved = moveTask(task, 'In-Progress');
    assert.equal(moved, task, 'should return the same object reference');
    assert.equal(moved.status, 'In-Progress');
  });
});

describe('deleteTask', () => {
  it('returns the array without the deleted task', () => {
    const tasks = [
      createTask('A', 'John Doe', ''),
      createTask('B', 'Samir', ''),
      createTask('C', 'Elias Hmede', ''),
    ];
    const idToDelete = tasks[1].id;
    const result = deleteTask(tasks, idToDelete);
    assert.equal(result.length, 2);
    assert.ok(!result.find(t => t.id === idToDelete));
  });
});

describe('filterTasks', () => {
  const tasks = [
    createTask('A', 'Samir', ''),
    createTask('B', 'John Doe', ''),
    createTask('C', 'Samir', ''),
  ];

  it('returns only tasks with the specified assignee', () => {
    const result = filterTasks(tasks, 'Samir');
    assert.equal(result.length, 2);
    assert.ok(result.every(t => t.assignee === 'Samir'));
  });

  it('returns all tasks when filter is null', () => {
    const result = filterTasks(tasks, null);
    assert.equal(result.length, tasks.length);
  });
});
