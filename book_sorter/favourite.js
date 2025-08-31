window.onload=function(){
  const quotes=JSON.parse(localStorage.getItem('quote-list')) || [];
  if(quotes.length>0) document.getElementById('quote-divider').style.display='block';
  quotes.forEach(item=>renderQuote(item));

  const words=JSON.parse(localStorage.getItem('word-list')) || [];
  if(words.length>0) document.getElementById('word-divider').style.display='block';
  words.forEach(item=>renderWord(item));

  const todos=JSON.parse(localStorage.getItem('todo-list')) || [];
  if(todos.length>0) document.getElementById('todo-divider').style.display='block';
  todos.forEach(item=>renderTodo(text));
};

function addItem(type){
  if(type==='quote'){
    const quote=document.getElementById('quote-input').value.trim();
    const author=document.getElementById('author-input').value.trim();
    if(!quote || !author) return;

    const item={quote,author};
    const list=JSON.parse(localStorage.getItem('quote-list')) || [];
    list.push(item);
    localStorage.setItem('quote-list',JSON.stringify(list));
    renderQuote(item);
    document.getElementById('quote-input').value='';
     document.getElementById('author-input').value='';
  }

  if(type==='word'){
     const word = document.getElementById('word-input').value.trim();
    const meaning = document.getElementById('meaning-input').value.trim();
    const example = document.getElementById('example-input').value.trim();
    if (!word || !meaning || !example) return;

    const item = { word, meaning, example };
    const list = JSON.parse(localStorage.getItem('word-list')) || [];
    list.push(item);
    localStorage.setItem('word-list', JSON.stringify(list));
    renderWord(item);
    document.getElementById('word-input').value = '';
    document.getElementById('meaning-input').value = '';
    document.getElementById('example-input').value = '';
  }

  if (type === 'todo') {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    if (!text) return;

    const list = JSON.parse(localStorage.getItem('todo-list')) || [];
    list.push(text);
    localStorage.setItem('todo-list', JSON.stringify(list));
    renderTodo(text);
    input.value = '';
  }
}

function renderQuote(item) {
  document.getElementById('quote-divider').style.display = 'block';
  const ul = document.getElementById('quote-list');
  const li = document.createElement('li');
  li.innerHTML = `
    '${item.quote}'<br>
    <span class="label">— ${item.author}</span>
    <span class="remove">❌</span>
  `;
  li.querySelector('.remove').onclick = function () {
    li.remove();
    let list = JSON.parse(localStorage.getItem('quote-list')) || [];
    list = list.filter(i => i.quote !== item.quote || i.author !== item.author);
    localStorage.setItem('quote-list', JSON.stringify(list));
    if (list.length === 0) document.getElementById('quote-divider').style.display = 'none';
  };
  ul.appendChild(li);
}

function renderWord(item) {
  document.getElementById('word-divider').style.display = 'block';
  const ul = document.getElementById('word-list');
  const li = document.createElement('li');
  li.innerHTML = `
    <span class="label">Word&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</span> ${item.word}<br>
    <span class="label">Meaning&nbsp;:</span> ${item.meaning}<br>
    <span class="label">Example&nbsp;:</span> ${item.example}
    <span class="remove">❌</span>
  `;
  li.querySelector('.remove').onclick = function () {
    li.remove();
    let list = JSON.parse(localStorage.getItem('word-list')) || [];
    list = list.filter(i => i.word !== item.word || i.example !== item.example);
    localStorage.setItem('word-list', JSON.stringify(list));
    if (list.length === 0) document.getElementById('word-divider').style.display = 'none';
  };
  ul.appendChild(li);
}

function renderTodo(text) {
  document.getElementById('todo-divider').style.display = 'block';
  const ul = document.getElementById('todo-list');

  const li = document.createElement('li');
  li.className = 'todo-item';

  const taskText = document.createElement('span');
  taskText.textContent = text;
  taskText.className = 'task-text';

  const iconContainer = document.createElement('span');
  iconContainer.className = 'icon-container';

  const doneBtn = document.createElement('span');
  doneBtn.textContent = '✅';
  doneBtn.className = 'icon';
   doneBtn.onclick = function () {
    if (taskText.textContent.startsWith('~~')) {
      taskText.textContent = taskText.textContent.replace(/^~~(.*)~~$/, '$1');
    } else {
      taskText.textContent = `~~${taskText.textContent}~~`;
    }
  };

  const removeBtn = document.createElement('span');
  removeBtn.textContent = '❌';
  removeBtn.className = 'icon';
  removeBtn.onclick = function () {
    li.remove();
    let list = JSON.parse(localStorage.getItem('todo-list')) || [];
    list = list.filter(item => item !== text);
    localStorage.setItem('todo-list', JSON.stringify(list));
    if (list.length === 0) document.getElementById('todo-divider').style.display = 'none';
  };

  iconContainer.appendChild(doneBtn);
  iconContainer.appendChild(removeBtn);

  li.appendChild(taskText);
  li.appendChild(iconContainer);
  ul.appendChild(li);
}
