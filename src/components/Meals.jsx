import { useState } from 'react'
import { Coffee, Sun, Moon, Cookie, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react'
import { mealPlans, nutritionTips } from '../data/meals'

function Meals() {
  const [selectedCategory, setSelectedCategory] = useState('breakfast')
  const [expandedMeal, setExpandedMeal] = useState(null)
  const [showTips, setShowTips] = useState(true)

  const categories = [
    { id: 'breakfast', icon: Coffee, label: 'Breakfast' },
    { id: 'lunch', icon: Sun, label: 'Lunch' },
    { id: 'dinner', icon: Moon, label: 'Dinner' },
    { id: 'snacks', icon: Cookie, label: 'Snacks' }
  ]

  const currentMeals = mealPlans[selectedCategory] || []

  const toggleMeal = (mealId) => {
    setExpandedMeal(expandedMeal === mealId ? null : mealId)
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Meal Plans</h2>
        <p className="text-gray-600">Healthy recipes to support your weight loss goals</p>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-lg shadow-md p-2">
        <div className="grid grid-cols-4 gap-2">
          {categories.map(category => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center py-3 px-2 rounded-lg transition-all ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-xs font-medium">{category.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Meal Cards */}
      <div className="space-y-4">
        {currentMeals.map(meal => (
          <div
            key={meal.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => toggleMeal(meal.id)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800 pr-4">{meal.name}</h3>
                {expandedMeal === meal.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                )}
              </div>

              <div className="grid grid-cols-4 gap-2 text-center">
                <div className="bg-blue-50 rounded p-2">
                  <p className="text-xs text-gray-600">Calories</p>
                  <p className="text-sm font-bold text-blue-600">{meal.calories}</p>
                </div>
                <div className="bg-green-50 rounded p-2">
                  <p className="text-xs text-gray-600">Protein</p>
                  <p className="text-sm font-bold text-green-600">{meal.protein}g</p>
                </div>
                <div className="bg-yellow-50 rounded p-2">
                  <p className="text-xs text-gray-600">Carbs</p>
                  <p className="text-sm font-bold text-yellow-600">{meal.carbs}g</p>
                </div>
                <div className="bg-orange-50 rounded p-2">
                  <p className="text-xs text-gray-600">Fats</p>
                  <p className="text-sm font-bold text-orange-600">{meal.fats}g</p>
                </div>
              </div>
            </button>

            {expandedMeal === meal.id && (
              <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                <div className="pt-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Ingredients</h4>
                  <ul className="space-y-1">
                    {meal.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start">
                        <span className="text-indigo-600 mr-2">•</span>
                        <span>{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Instructions</h4>
                  <p className="text-sm text-gray-600">{meal.instructions}</p>
                </div>

                <div className="bg-indigo-50 rounded-lg p-3">
                  <h4 className="font-semibold text-indigo-800 mb-1 text-sm">💡 Pro Tip</h4>
                  <p className="text-sm text-indigo-700">{meal.tips}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Nutrition Tips Section */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <button
          onClick={() => setShowTips(!showTips)}
          className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-2">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-bold text-gray-800">Nutrition Tips</h3>
          </div>
          {showTips ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </button>

        {showTips && (
          <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
            {nutritionTips.map((section, index) => (
              <div key={index} className="pt-4">
                <h4 className="font-semibold text-gray-800 mb-3">{section.category}</h4>
                <ul className="space-y-2">
                  {section.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-sm text-gray-600 flex items-start">
                      <span className="text-indigo-600 mr-2">✓</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Meals
