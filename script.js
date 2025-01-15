
function handleMessage(userMessage) {
    appendMessage(userMessage, 'user');

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
            console.error('Response status:', response.status);
            return response.text().then(text => { throw new Error(`Network response was not ok: ${text}`) });
        }
        return response.json();
    })
    .then(data => {
        const botMessage = data.response || 'Error occurred';
        appendMessage(botMessage, 'bot');
    })
    .catch(error => {
        console.error('Error:', error);
        appendMessage('There was an error processing your request.', 'bot'); // Error handling
    });    
}

function appendMessage(message, sender) {
    if (message.trim()==='' )
        return;
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

// Toggle the dropdown content and load text into the textarea
// Get all dropdown buttons
const dropdownButtons = document.querySelectorAll('.dropdown-button');

dropdownButtons.forEach(button => {
    button.addEventListener('click', function() {
        const dropdownContent = this.nextElementSibling;
        const leetcodeItem = this.closest('.leetcode-item'); 
        const problemId = leetcodeItem.getAttribute('data-id'); 
        const allContents = document.querySelectorAll('.dropdown-content');
        allContents.forEach(content => {
            if (content !== dropdownContent) {
                content.classList.remove('active');
            }
        });
        dropdownContent.classList.toggle('active');

        loadProblemDescription(problemId);
    });
});

function loadProblemDescription(problemId) {
    const filePath = `Assets/sample codes/${problemId}.txt`; 
    const codeArea = document.getElementById('code-area'); 

    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load file');
            }
            return response.text();
        })
        .then(text => {
            codeArea.value = text;
        })
        .catch(error => {
            console.error('Error loading file:', error);
            codeArea.value = 'Error loading problem description.';
        });
}