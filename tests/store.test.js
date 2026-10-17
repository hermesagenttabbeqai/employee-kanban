import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { saveBoard, loadBoard } from '../public/js/store.js';

global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] ?? null; },
  setItem(k, v) { this._data[k] = v; }
};

describe('saveBoard / loadBoard', () => {
  beforeEach(() => {
    global.localStorage._data = {};
  });

  it('saveBoard writes to localStorage key employee-kanban-board', () => {
    const tasks = [{ id: '1', title: 'Test', assignee: 'Samir', description: '', status: 'TODO' }];
    saveBoard(tasks);
    const raw = global.localStorage._data['employee-kanban-board'];
    assert.ok(raw, 'key should exist in localStorage');
    const parsed = JSON.parse(raw);
    assert.deepEqual(parsed, tasks);
  });

  it('loadBoard reads back the same data saved by saveBoard', () => {
    const tasks = [
      { id: '1', title: 'Fix login', assignee: 'John Doe', description: 'Check auth', status: 'TODO' },
      { id: '2', title: 'Deploy', assignee: 'Elias Hmede', description: '', status: 'In-Progress' },
    ];
    saveBoard(tasks);
    const loaded = loadBoard();
    assert.deepEqual(loaded, tasks);
  });

  it('loadBoard returns empty array when nothing is saved', () => {
    const loaded = loadBoard();
    assert.deepEqual(loaded, []);
  });
});
