// Handling AI Assistant Messages
function handleMessage(userMessage) {
    const botResponse = `You said: ${userMessage}`; // Replace with real AI logic later
    appendMessage(userMessage, 'user');
    appendMessage(botResponse, 'bot');
}

function appendMessage(message, sender) {
    const messageContainer = document.querySelector('.message-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Chat Input Handling
const chatInput = document.querySelector('.chat-input');
const submitButton = document.querySelector('.submit-button');

submitButton.addEventListener('click', () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
        handleMessage(userMessage);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        submitButton.click();
    }
});

// Code Editor Logic
const runCodeButton = document.getElementById('run-code');
const codeArea = document.getElementById('code-area');

runCodeButton.addEventListener('click', () => {
    const userCode = codeArea.value;
    alert(`Running your code:\n\n${userCode}`); // Placeholder for code execution logic
});
