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
