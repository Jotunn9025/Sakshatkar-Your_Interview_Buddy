// Handling AI Assistant Messages
function handleMessage(userMessage) {
    const botMessage = `You said: ${userMessage}`;
     // Replace with real AI logic later
     fetch('http://127.0.0.1:5000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            inputString: userMessage, // Send the user input to the Flask server
        }),
    })
    .then(response => {
        if (!response.ok) {
            // Log the response status and text for better debugging
            console.error('Response status:', response.status);
            return response.text().then(text => { throw new Error(`Network response was not ok: ${text}`) });
        }
        return response.json();
    })
    .then(data => {
        botMessage = data.response || 'Error occurred';
        appendMessage(botMessage, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('There was an error processing your request.', 'bot'); // Error handling
    });
    appendMessage(userMessage, 'user');
    appendMessage(botMessage, 'bot');
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
