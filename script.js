const dailyInput = document.getElementById('dailyInput');
const dailyList = document.getElementById('dailyList');
const monthlyInput = document.getElementById('monthlyInput');
const monthlyList = document.getElementById('monthlyList');

// Load tasks from localStorage
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('tasks')) || { daily: [], monthly: [] };
  saved.daily.forEach(task => renderTask(task.text, task.completed, 'daily'));
  saved.monthly.forEach(task => renderTask(task.text, task.completed, 'monthly'));

  if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add('dark');
  }
};

function saveTasks() {
  const tasks = { daily: [], monthly: [] };

  document.querySelectorAll('#dailyList li').forEach(li => {
    tasks.daily.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });

  document.querySelectorAll('#monthlyList li').forEach(li => {
    tasks.monthly.push({
      text: li.querySelector('span').innerText,
      completed: li.classList.contains('completed')
    });
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask(type) {
  const input = type === 'daily' ? dailyInput : monthlyInput;
  const text = input.value.trim();
  if (!text) return;
  renderTask(text, false, type);
  input.value = '';
  saveTasks();
}

function renderTask(text, completed, type) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const taskContent = document.createElement('div');
  taskContent.classList.add('task-content');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = completed;
  checkbox.onchange = () => {
    li.classList.toggle('completed', checkbox.checked);
    saveTasks();
  };

  const span = document.createElement('span');
  span.innerText = text;

  taskContent.appendChild(checkbox);
  taskContent.appendChild(span);

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const editBtn = document.createElement('button');
  editBtn.innerText = 'Edit';
  editBtn.onclick = () => {
    const newText = prompt('Edit task:', span.innerText);
    if (newText) {
      span.innerText = newText;
      saveTasks();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.innerText = 'Delete';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  li.appendChild(taskContent);
  li.appendChild(actions);

  if (type === 'daily') {
    dailyList.appendChild(li);
  } else {
    monthlyList.appendChild(li);
  }
}

function toggleMode() {
  document.body.classList.toggle('dark');
  localStorage.setItem('mode', document.body.classList.contains('dark') ? 'dark' : 'light');
}
