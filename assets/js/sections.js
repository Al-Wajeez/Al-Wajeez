// Get all buttons with the "scroll-btn" class
const scrollButtons = document.querySelectorAll('.scroll-btn');

// Loop through each button and add an event listener
scrollButtons.forEach(button => {
    button.addEventListener('click', function() {
        const targetSectionId = this.getAttribute('data-target');
        const targetSection = document.getElementById(targetSectionId);
        
        // Check if the target section exists
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sectionButtons = document.querySelector('.section-buttons');

    document.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const threshold = 50; // Adjust as needed

        // Check if the cursor is close to the left border of the screen
        if (mouseX < threshold) {
            sectionButtons.style.left = '20px'; // Show the buttons
        } else {
            sectionButtons.style.left = '-40px'; // Hide the buttons
        }
    });
});