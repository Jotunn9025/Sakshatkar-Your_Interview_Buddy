document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.querySelector('.chat-input');
    const submitButton = document.querySelector('.submit-button');

    document.querySelectorAll('.recommended-questions button').forEach((button) => {//cant submit another until loading done
        button.addEventListener('click', () => {
            chatInput.value = button.textContent;
            chatInput.focus();
            if (!submitButton.classList.contains('active')) {
                submitButton.classList.add('active');
            }
        });
    });

    chatInput.addEventListener('input', () => {//only active when text is in
        if (chatInput.value.trim() !== '') {
            submitButton.classList.add('active');
        } else {
            submitButton.classList.remove('active');
        }
    });

    submitButton.addEventListener('click', () => {//send message
        handleMessageSubmit();
    });

    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim() !== '') {
            e.preventDefault();
            handleMessageSubmit();//enter key + button do same thing
        }
    });

    function handleMessageSubmit() {
        const inputValue = chatInput.value.trim();
        if (inputValue === '') return;

        appendMessage(inputValue, 'user');//adds ur message to the messagebox

        submitButton.classList.add('loading');
        submitButton.classList.remove('active');

        const delay = Math.random() * 3000 + 2000;//delay timer currently hardcoded
        setTimeout(() => {
            submitButton.classList.remove('loading');
            submitButton.classList.add('active');

            chatInput.value = ''; 

            setTimeout(() => {
                const botMessage = 'This is a bot response!';//bot response placeholder
                appendMessage(botMessage, 'bot');//send message
            }, 500); //takes 500 ms to do so

        }, delay);
    }

    function appendMessage(messageText, sender) {
        const messageContainer = document.querySelector('.message-container');

        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        messageDiv.textContent = messageText;
        
        messageContainer.appendChild(messageDiv);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }
    var cursor = {//funny cursor code
        delay: 5,
        _x: 0,
        _y: 0,
        endX: (window.innerWidth / 2),
        endY: (window.innerHeight / 2),
        cursorVisible: true,
        cursorEnlarged: false,
        $dot: document.querySelector('.cursor-dot'),
        $outline: document.querySelector('.cursor-dot-outline'),
        
        init: function() {
            // Set up element sizes
            this.dotSize = this.$dot.offsetWidth;
            this.outlineSize = this.$outline.offsetWidth;
            
            this.setupEventListeners();
            this.animateDotOutline();
        },
        
    //     updateCursor: function(e) {
    //         var self = this;
            
    //         console.log(e)
            
    //         // Show the cursor
    //         self.cursorVisible = true;
    //         self.toggleCursorVisibility();
    
    //         // Position the dot
    //         self.endX = e.pageX;
    //         self.endY = e.pageY;
    //         self.$dot.style.top = self.endY + 'px';
    //         self.$dot.style.left = self.endX + 'px';
    //     },
        
        setupEventListeners: function() {
            var self = this;
            
            // Anchor hovering
            document.querySelectorAll('a').forEach(function(el) {
                el.addEventListener('mouseover', function() {
                    self.cursorEnlarged = true;
                    self.toggleCursorSize();
                });
                el.addEventListener('mouseout', function() {
                    self.cursorEnlarged = false;
                    self.toggleCursorSize();
                });
            });
            
            // Click events
            document.addEventListener('mousedown', function() {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            document.addEventListener('mouseup', function() {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
      
      
            document.addEventListener('mousemove', function(e) {
                // Show the cursor
                self.cursorVisible = true;
                self.toggleCursorVisibility();
    
                // Position the dot
                self.endX = e.pageX;
                self.endY = e.pageY;
                self.$dot.style.top = self.endY + 'px';
                self.$dot.style.left = self.endX + 'px';
            });
            
            // Hide/show cursor
            document.addEventListener('mouseenter', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            });
            
            document.addEventListener('mouseleave', function(e) {
                self.cursorVisible = true;
                self.toggleCursorVisibility();
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            });
        },
        
        animateDotOutline: function() {
            var self = this;
            
            self._x += (self.endX - self._x) / self.delay;
            self._y += (self.endY - self._y) / self.delay;
            self.$outline.style.top = self._y + 'px';
            self.$outline.style.left = self._x + 'px';
            
            requestAnimationFrame(this.animateDotOutline.bind(self));
        },
        
        toggleCursorSize: function() {
            var self = this;
            
            if (self.cursorEnlarged) {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
            } else {
                self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
                self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        },
        
        toggleCursorVisibility: function() {
            var self = this;
            
            if (self.cursorVisible) {
                self.$dot.style.opacity = 1;
                self.$outline.style.opacity = 1;
            } else {
                self.$dot.style.opacity = 0;
                self.$outline.style.opacity = 0;
            }
        }
    }
    
    cursor.init();
});
