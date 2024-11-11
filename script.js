// Get all the day boxes
const dayBoxes = document.querySelectorAll('.day-box');
const selectedDaysCountSpan = document.getElementById('selected-days-count'); // Span to display the number of selected days

// Store the selected days count
let selectedDays = 0;

// Add event listeners to each day box
dayBoxes.forEach(box => {
    box.addEventListener('click', function() {
        // Toggle the "selected" class on click
        this.classList.toggle('selected');

        // Count how many days are selected
        selectedDays = document.querySelectorAll('.day-box.selected').length;

        // Update the displayed selected days count
        selectedDaysCountSpan.textContent = selectedDays;

        // Enable or disable the button based on selection (you can keep this functionality if needed)
        generateButton.disabled = selectedDays === 0 || !selectedMeal;
    });
});
