// Common foods database for quick logging
export const commonFoods = [
  // Breakfast
  { id: 1, name: "Scrambled Eggs (2 large)", calories: 180, protein: 13, carbs: 2, fats: 14, serving: "2 eggs", category: "breakfast" },
  { id: 2, name: "Oatmeal (1 cup cooked)", calories: 150, protein: 5, carbs: 27, fats: 3, serving: "1 cup", category: "breakfast" },
  { id: 3, name: "Banana (medium)", calories: 105, protein: 1, carbs: 27, fats: 0, serving: "1 medium", category: "breakfast" },
  { id: 4, name: "Greek Yogurt (plain, 1 cup)", calories: 130, protein: 23, carbs: 9, fats: 0, serving: "1 cup", category: "breakfast" },
  { id: 5, name: "Whole Wheat Toast (1 slice)", calories: 80, protein: 4, carbs: 14, fats: 1, serving: "1 slice", category: "breakfast" },
  { id: 6, name: "Avocado (1/2 medium)", calories: 120, protein: 1, carbs: 6, fats: 11, serving: "1/2 avocado", category: "breakfast" },

  // Protein Sources
  { id: 7, name: "Chicken Breast (4 oz grilled)", calories: 185, protein: 35, carbs: 0, fats: 4, serving: "4 oz", category: "protein" },
  { id: 8, name: "Salmon (4 oz baked)", calories: 230, protein: 25, carbs: 0, fats: 14, serving: "4 oz", category: "protein" },
  { id: 9, name: "Ground Turkey (4 oz lean)", calories: 160, protein: 22, carbs: 0, fats: 8, serving: "4 oz", category: "protein" },
  { id: 10, name: "Tuna (5 oz can in water)", calories: 120, protein: 26, carbs: 0, fats: 1, serving: "1 can", category: "protein" },
  { id: 11, name: "Lean Beef (4 oz)", calories: 210, protein: 28, carbs: 0, fats: 10, serving: "4 oz", category: "protein" },
  { id: 12, name: "Tofu (1/2 cup)", calories: 90, protein: 10, carbs: 2, fats: 5, serving: "1/2 cup", category: "protein" },

  // Carbs
  { id: 13, name: "Brown Rice (1 cup cooked)", calories: 215, protein: 5, carbs: 45, fats: 2, serving: "1 cup", category: "carbs" },
  { id: 14, name: "Sweet Potato (medium)", calories: 105, protein: 2, carbs: 24, fats: 0, serving: "1 medium", category: "carbs" },
  { id: 15, name: "Quinoa (1 cup cooked)", calories: 220, protein: 8, carbs: 39, fats: 4, serving: "1 cup", category: "carbs" },
  { id: 16, name: "Whole Wheat Pasta (1 cup)", calories: 180, protein: 7, carbs: 37, fats: 1, serving: "1 cup", category: "carbs" },
  { id: 17, name: "Apple (medium)", calories: 95, protein: 0, carbs: 25, fats: 0, serving: "1 medium", category: "carbs" },

  // Vegetables
  { id: 18, name: "Broccoli (1 cup steamed)", calories: 55, protein: 4, carbs: 11, fats: 0, serving: "1 cup", category: "vegetables" },
  { id: 19, name: "Spinach (1 cup cooked)", calories: 40, protein: 5, carbs: 7, fats: 0, serving: "1 cup", category: "vegetables" },
  { id: 20, name: "Mixed Salad Greens (2 cups)", calories: 20, protein: 2, carbs: 4, fats: 0, serving: "2 cups", category: "vegetables" },
  { id: 21, name: "Carrots (1 cup)", calories: 50, protein: 1, carbs: 12, fats: 0, serving: "1 cup", category: "vegetables" },
  { id: 22, name: "Bell Peppers (1 cup)", calories: 30, protein: 1, carbs: 7, fats: 0, serving: "1 cup", category: "vegetables" },

  // Snacks
  { id: 23, name: "Almonds (1/4 cup)", calories: 170, protein: 6, carbs: 6, fats: 15, serving: "1/4 cup", category: "snacks" },
  { id: 24, name: "Protein Shake (1 scoop)", calories: 120, protein: 24, carbs: 3, fats: 1, serving: "1 scoop", category: "snacks" },
  { id: 25, name: "Apple with Peanut Butter (2 tbsp)", calories: 285, protein: 8, carbs: 32, fats: 16, serving: "1 apple + 2 tbsp", category: "snacks" },
  { id: 26, name: "String Cheese (1 stick)", calories: 80, protein: 6, carbs: 1, fats: 6, serving: "1 stick", category: "snacks" },
  { id: 27, name: "Protein Bar", calories: 200, protein: 20, carbs: 22, fats: 8, serving: "1 bar", category: "snacks" },

  // Beverages
  { id: 28, name: "Coffee (black)", calories: 2, protein: 0, carbs: 0, fats: 0, serving: "8 oz", category: "beverages" },
  { id: 29, name: "Almond Milk (unsweetened, 1 cup)", calories: 30, protein: 1, carbs: 1, fats: 3, serving: "1 cup", category: "beverages" },
  { id: 30, name: "Protein Shake (ready-to-drink)", calories: 160, protein: 30, carbs: 4, fats: 3, serving: "11 oz", category: "beverages" },

  // Condiments & Additions
  { id: 31, name: "Olive Oil (1 tbsp)", calories: 120, protein: 0, carbs: 0, fats: 14, serving: "1 tbsp", category: "condiments" },
  { id: 32, name: "Almond Butter (1 tbsp)", calories: 98, protein: 3, carbs: 3, fats: 9, serving: "1 tbsp", category: "condiments" },
  { id: 33, name: "Honey (1 tbsp)", calories: 64, protein: 0, carbs: 17, fats: 0, serving: "1 tbsp", category: "condiments" }
];

// Helper function to search foods
export const searchFoods = (query) => {
  if (!query) return commonFoods;
  const lowerQuery = query.toLowerCase();
  return commonFoods.filter(food =>
    food.name.toLowerCase().includes(lowerQuery) ||
    food.category.toLowerCase().includes(lowerQuery)
  );
};

// Calculate daily calorie goal based on user profile
export const calculateDailyCalorieGoal = (userProfile) => {
  // Basic calculation using Mifflin-St Jeor Equation
  // This is a simplified version
  const weight = parseFloat(userProfile.weight) || 150;
  const height = parseFloat(userProfile.height) || 66; // inches
  const age = parseFloat(userProfile.age) || 30;

  // Convert weight to kg and height to cm
  const weightKg = weight * 0.453592;
  const heightCm = height * 2.54;

  // BMR calculation (assuming male for this example - you could add gender field)
  let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;

  // Activity multiplier based on weekly goal
  let activityMultiplier = 1.2; // Sedentary
  if (userProfile.weeklyGoal === 'moderate') activityMultiplier = 1.55; // Moderate
  if (userProfile.weeklyGoal === 'intense') activityMultiplier = 1.725; // Active

  const maintenanceCalories = Math.round(bmr * activityMultiplier);

  // For weight loss, subtract 500 calories (1 lb per week)
  return Math.round(maintenanceCalories - 500);
};
