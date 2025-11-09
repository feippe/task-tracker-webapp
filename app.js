// app.js
import { readTasks, createTask, toggleTask, deleteTask, updateTask } from './storage.js';

const $form = document.getElementById('task-form');
const $title = document.getElementById('task-title');
const $priority = document.getElementById('task-priority');
const $list = document.getElementById('task-list');
const $filterStatus = document.getElementById('filter-status');
const $filterPriority = document.getElementById('filter-priority');
const $summary = document.getElementById('summary');
const $clearAll = document.getElementById('clear-all');

let state = {
  tasks: readTasks(),
  filterStatus: 'all',
  filterPriority: 'all',
};

function applyFilters(tasks) {
  console.log('🔍 Applying filters:', { filterStatus: state.filterStatus, filterPriority: state.filterPriority });
  const filtered = tasks.filter(t => {
    const statusOk = state.filterStatus === 'all'
      ? true
      : state.filterStatus === 'done' ? t.done : !t.done;
    const priorityOk = state.filterPriority === 'all' ? true : t.priority === state.filterPriority;
    return statusOk && priorityOk;
  });
  console.log(`📊 Filtered ${filtered.length} of ${tasks.length} tasks`);
  return filtered;
}

function render() {
  const total = state.tasks.length;
  const done = state.tasks.filter(t => t.done).length;
  $summary.textContent = `${done}/${total} done`;

  const filtered = applyFilters(state.tasks);
  $list.innerHTML = '';

  if (filtered.length === 0) {
    const li = document.createElement('li');
    li.textContent = 'No tasks match your filters.';
    li.className = 'muted';
    $list.appendChild(li);
    return;
  }

  filtered.forEach(task => {
    const li = document.createElement('li');
    li.className = `task ${task.done ? 'done' : ''}`;

    const title = document.createElement('span');
    title.className = 'title';
    title.textContent = task.title;

    const badge = document.createElement('span');
    badge.className = `badge ${task.priority}`;
    badge.textContent = task.priority;

    const btnDone = document.createElement('button');
    btnDone.className = 'icon-btn complete';
    btnDone.title = task.done ? 'Mark as open' : 'Mark as done';
    btnDone.textContent = task.done ? '↩︎' : '✓';
    btnDone.addEventListener('click', () => {
      state.tasks = toggleTask(task.id);
      render();
    });

    const btnEdit = document.createElement('button');
    btnEdit.className = 'icon-btn edit';
    btnEdit.title = 'Edit task';
    btnEdit.textContent = '✎';
    btnEdit.addEventListener('click', () => {
      const newTitle = prompt('New title:', task.title);
      if (!newTitle) return;
      const newPrio = prompt("Priority (low|normal|high):", task.priority);
      if (!['low','normal','high'].includes((newPrio||'').toLowerCase())) return;
      state.tasks = updateTask(task.id, { title: newTitle.trim(), priority: newPrio.toLowerCase() });
      render();
    });

    const btnDelete = document.createElement('button');
    btnDelete.className = 'icon-btn delete';
    btnDelete.title = 'Delete task';
    btnDelete.textContent = '🗑';
    btnDelete.addEventListener('click', () => {
      state.tasks = deleteTask(task.id);
      render();
    });

    li.append(title, badge, btnDone, btnEdit, btnDelete);
    $list.appendChild(li);
  });
}

// Form submit
$form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = $title.value.trim();
  if (!title) return;
  const priority = $priority.value;
  console.log('➕ Creating task:', { title, priority });
  createTask(title, priority);
  state.tasks = readTasks();
  console.log('📦 State after creating task:', { taskCount: state.tasks.length, filterStatus: state.filterStatus, filterPriority: state.filterPriority });
  $title.value = '';
  render();
});

// Filters
$filterStatus.addEventListener('change', (e) => {
  state.filterStatus = e.target.value;
  render();
});
$filterPriority.addEventListener('change', (e) => {
  state.filterPriority = e.target.value;
  render();
});

// Clear filters button
$clearAll.addEventListener('click', () => {
  state.filterStatus = 'all';
  state.filterPriority = 'all';
  $filterStatus.value = 'all';
  $filterPriority.value = 'all';
  render();
});

// Init
console.log('🚀 Initializing app...');
console.log('Initial state:', state);
console.log('Filter select DOM values:', { status: $filterStatus.value, priority: $filterPriority.value });
$filterStatus.value = state.filterStatus;
$filterPriority.value = state.filterPriority;
console.log('After sync:', { status: $filterStatus.value, priority: $filterPriority.value });
render();
