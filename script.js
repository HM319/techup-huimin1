// Get all the day boxes
const dayBoxes = document.querySelectorAll('.day-box');

// Add event listeners to each day box
dayBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // Toggle the "selected" class on click
        this.classList.toggle('selected');
    });
});

