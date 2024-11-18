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
        "Udon noodles": "1 pack",
        "Chinese cabbage": "50 g",
        "Bean sprouts": "30 g",
        "Cloves garlic, minced": "2 cloves",
        "Chicken breast": "1 piece",
        "Eggs": "1 whole",
        "Corn oil": "2 tsp",
        "Light soya sauce": "1 tsp",
        "Sweet soy sauce": "1 tbsp",
        "Sesame oil": "1 tsp"
    },
    "miso-sliced-fish-soup": {
        "Fish fillet": "100 g",
        "Egg tofu": "1 packet",
        "Cabbage": "100 g",
        "Miso paste": "1 tbsp",
        "Carrots": "1 sticks",
        "Celery": "1 stalks",
        "Onions": "2 whole",
        "Ginger": "3 slices"
    },
    "pear-celery-salad": {
        "Celery": "1 stick",
        "Williams pear": "1 whole",
        "Orange": "1 whole",
        "Dried prunes": "60 g",
        "Lemon juice": "1 tbsp",
        "Yoghurt": "60 g",
        "Mustard sauce": "1 tbsp"
    },
    "brown-rice-congee": {
        "Brown Rice": "0.5 cup",
        "Ginger": "1 slice",
        "Chicken thigh": "1 whole",
        "Carrots": "50 g",
        "Mushrooms": "20 g",
        "Sesame oil": "1 tsp",
    },
    "fried-olive-rice": {
        "Garlic": "1 clove",
        "Olives": "3 whole",
        "Long beans": "50 g",
        "Brown rice": "0.5 cup",
        "Cashew nuts": "0.5 tbsp",
        "Olive oil": "0.5 tbsp",
        "Chili (optional)": "1 whole"
    },
    "prosperity-noodles": {
        "Garlic": "1 clove",
        "Yellow flat noodles": "100 g",
        "Chinese cabbage": "20 g",
        "Chye sim": "20 g",
        "Abalone sauce": "0.5 tbsp",
        "Rice bran oil": "0.5 tbsp",
        "Sesame oil": "0.5 tbsp"
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

// Get references to the filter dropdown and recipe items
const cuisineFilter = document.getElementById('cuisine-filter');
const recipeItems = document.querySelectorAll('.recipe-item');

// Event listener for the filter dropdown (Type of Cuisine)
cuisineFilter.addEventListener('change', function() {
    const selectedCuisine = cuisineFilter.value;

    recipeItems.forEach(item => {
        // Get the data-type attribute of the recipe
        const recipeType = item.getAttribute('data-type');

        if (selectedCuisine === 'all') {
            // Show all recipes if 'All' is selected
            item.classList.remove('hidden');
        } else if (selectedCuisine === 'vegetarian' && recipeType === 'vegetarian') {
            // Show only vegetarian recipes
            item.classList.remove('hidden');
        } else if (selectedCuisine === 'japanese' && recipeType === 'japanese') {
            // Show only Japanese recipes
            item.classList.remove('hidden');
        } else if (selectedCuisine === 'chinese' && recipeType === 'chinese') {
            // Show only Chinese recipes
            item.classList.remove('hidden');
        } else {
            // Hide recipes that don't match the selected filter
            item.classList.add('hidden');
        }
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