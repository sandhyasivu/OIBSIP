document.getElementById('add-task-button').addEventListener('click', addTask);

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = {
    text: taskText,
    date: new Date().toLocaleString(),
  };

  createTaskElement(task, 'pending-list');
  taskInput.value = '';
}

function createTaskElement(task, listId) {
  const list = document.getElementById(listId);
  const li = document.createElement('li');
  li.innerHTML = `
    <span>${task.text} <small>(${task.date})</small></span>
    <div>
      ${listId === 'pending-list' ? '<button class="complete">Complete</button>' : ''}
      <button class="edit">Edit</button>
      <button class="delete">Delete</button>
    </div>
  `;

  // Complete Button
  if (listId === 'pending-list') {
    li.querySelector('.complete').addEventListener('click', () => {
      list.removeChild(li);
      task.date = new Date().toLocaleString();
      createTaskElement(task, 'completed-list');
    });
  }

  // Edit Button
  li.querySelector('.edit').addEventListener('click', () => {
    const newTaskText = prompt('Edit Task:', task.text);
    if (newTaskText) {
      task.text = newTaskText;
      task.date = new Date().toLocaleString();
      li.querySelector('span').innerHTML = `${task.text} <small>(${task.date})</small>`;
    }
  });

  // Delete Button
  li.querySelector('.delete').addEventListener('click', () => {
    list.removeChild(li);
  });

  list.appendChild(li);
}
