// Get references to the necessary DOM elements
const dayBoxes = document.querySelectorAll('.day-box');  // All the day boxes
const mealSelect = document.getElementById('meal-select');  // Meal select dropdown
const generateButton = document.getElementById('generate-grocery-list');  // Generate button
const groceryListDiv = document.getElementById('grocery-list');  // Div to display the grocery list
const selectedDaysDiv = document.getElementById('selected-days');  // Div to show number of selected days

let selectedDays = 0;  // To keep track of selected days
let selectedMeal = '';  // To keep track of the selected meal

// Ingredient lists for each recipe
const ingredients = {
    "chicken-yakiudon": {
        "Udon noodles": "2 packs",
        "Chinese cabbage": "50 g",
        "Bean sprouts": "30 g",
        "Cloves garlic, minced": "2 cloves",
        "Chicken breast": "1 piece",
        "Eggs": "2 whole",
        "Corn oil": "4 tsp",
        "Light soya sauce": "1 tsp",
        "Sweet soy sauce": "2 tbsp",
        "Sesame oil": "1 tsp"
    },
    "miso-sliced-fish-soup": {
        "Fish fillet": "300 g",
        "Egg tofu": "1 packet",
        "Cabbage": "150 g",
        "Miso paste": "1 tbsp",
        "Carrots": "3 sticks",
        "Celery": "3 stalks",
        "Onions": "2 whole",
        "Ginger": "3 slices"
    },
    "pear-celery-salad": {
        "Celery": "160 g",
        "Williams pear": "160 g",
        "Orange": "100 g",
        "Dried prunes": "60 g",
        "Lemon juice": "2 tbsp",
        "Yoghurt": "60 g",
        "Mustard sauce": "30 g"
    }
};

// Event listener for day box clicks (selecting/deselecting days)
dayBoxes.forEach(box => {
    box.addEventListener('click', function() {
        this.classList.toggle('selected');  // Toggle the "selected" class on the clicked box
        selectedDays = document.querySelectorAll('.day-box.selected').length;  // Count the selected days
        selectedDaysDiv.textContent = `Days selected: ${selectedDays}`;  // Update the number of selected days
        generateButton.disabled = selectedDays === 0 || !selectedMeal;  // Enable button if days and meal are selected
    });
});

// Event listener for meal selection
mealSelect.addEventListener('change', function() {
    selectedMeal = mealSelect.value;  // Get the selected meal
    generateButton.disabled = selectedDays === 0 || !selectedMeal;  // Enable button if days and meal are selected
});

// Event listener for "Generate Grocery List" button click
generateButton.addEventListener('click', function() {
    if (selectedMeal) {
        // Get the ingredients for the selected meal
        const mealIngredients = ingredients[selectedMeal];

        // Create a new unordered list to display the ingredients
        const groceryList = document.createElement('ul');

        // Loop through the ingredients and create list items
        for (const ingredient in mealIngredients) {
            const listItem = document.createElement('li');

            // Split ingredient and quantity (in case there are multiple quantities like '2 packs' or '300g')
            const [quantity, unit] = mealIngredients[ingredient].split(' ');

            // Multiply the quantity by the number of selected days
            const totalQuantity = (selectedDays > 1) ? (parseFloat(quantity) * selectedDays) + ' ' + unit : mealIngredients[ingredient];

            // Set the text content of the list item
            listItem.textContent = `${ingredient}: ${totalQuantity}`;

            groceryList.appendChild(listItem);
        }

        // Clear any previous content and add the new list
        groceryListDiv.innerHTML = '';  // Clear previous grocery list
        groceryListDiv.appendChild(groceryList);  // Append the new grocery list
    }
});