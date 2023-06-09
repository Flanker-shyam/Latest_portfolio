const typingText = document.getElementById('typing-text');
            const sentences = ['A Web Developer.',"Working on Machine Learning.", 'A Cyber Security Enthusiast.'];
            let index = 0;

            function typeNextSentence() {
            typingText.textContent = '';
            if (index >= sentences.length) {
                index = 0; // Reset to the first sentence
            }

            const sentence = sentences[index];
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                typingText.textContent += sentence.charAt(charIndex);
                charIndex++;
                if (charIndex === sentence.length) {
                clearInterval(typingInterval);
                setTimeout(deleteText, 1500); // Delay before deleting the text
                }
            }, 70); // Typing speed in milliseconds
            index++;
            }

            function deleteText() {
            const sentence = typingText.textContent;
            let charIndex = sentence.length - 1;
            const deletingInterval = setInterval(() => {
                typingText.textContent = sentence.substring(0, charIndex);
                charIndex--;
                if (charIndex < 0) {
                clearInterval(deletingInterval);
                setTimeout(typeNextSentence, 1500); // Delay before typing the next sentence
                }
            }, 50); // Deleting speed in milliseconds
            }

            // Start the typing animation
            typeNextSentence();