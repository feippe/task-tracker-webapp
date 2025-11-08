// storage.js
// Simple persistence layer backed by localStorage.
// Each task: { id: string, title: string, priority: 'low'|'normal'|'high', done: boolean }

const KEY = 'TASK_TRACKER__TASKS';

/** Read all tasks from localStorage */
export function readTasks() {
  const raw = localStorage.getItem(KEY);
  try { return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}

/** Persist tasks array to localStorage */
export function writeTasks(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

/** Create a new task and persist */
export function createTask(title, priority = 'normal') {
  const list = readTasks();
  const task = { id: String(Date.now()), title, priority, done: false };
  writeTasks([task, ...list]);
  return task;
}

/** Toggle done flag for a task by id */
export function toggleTask(id) {
  const list = readTasks().map(t => t.id === id ? { ...t, done: !t.done } : t);
  writeTasks(list);
  return list;
}

/** Delete task by id */
export function deleteTask(id) {
  const list = readTasks().filter(t => t.id !== id);
  writeTasks(list);
  return list;
}

/** Update task title or priority */
export function updateTask(id, updates) {
  const list = readTasks().map(t => t.id === id ? { ...t, ...updates } : t);
  writeTasks(list);
  return list;
}
