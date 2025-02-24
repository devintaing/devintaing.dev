const todoList = [];

function addTask() {
  const inputElement = document.querySelector('.js-task-input');
  const task = inputElement.value;
  todoList.push(task);
  console.log(todoList);
  inputElement.value = '';
}

function printTasks() {
  let todoListHTML = '';
  for(let i = 0; i < todoList.length; i++) {
    const task = todoList[i];
    const html = `<p>${task}</p>`;
    todoListHTML = todoListHTML + html;
  }

  document.querySelector('.js-tasks').innerHTML = todoListHTML;
}