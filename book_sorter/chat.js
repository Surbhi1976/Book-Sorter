const socket = io('http://localhost:5000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const chatArea = document.querySelector('.chat-area');

window.addEventListener('DOMContentLoaded', () => {
    let savedMessages = JSON.parse(localStorage.getItem('chat-messages')) || [];
    if (savedMessages.length > 30) {
        savedMessages = savedMessages.slice(-30);
    }
    savedMessages.forEach(obj => append(obj.message, obj.position));
});
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message', position);
    chatArea.append(messageElement);
    const messages = JSON.parse(localStorage.getItem('chat-messages')) || [];
    messages.push({ message, position });
    localStorage.setItem('chat-messages', JSON.stringify(messages));
    chatArea.scrollTop=chatArea.scrollHeight;
};
let name = localStorage.getItem('chat-username');
if (!name) {
    name = prompt('Enter Your Name To Join:');
    localStorage.setItem('chat-username', name);
}
socket.emit('new-user-joined', name);

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (!message) return;

    append(`You: ${message}`, 'right');
    socket.emit('send', { message: message, name: name });
    messageInput.value = '';
});

socket.on('user-joined', (name) => {
    append(`${name} joined the chat`, 'left');
});

socket.on('receive', (data) => {
    append(`${data.name}: ${data.message}`, 'left');
});
