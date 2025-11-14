import { useState, useEffect } from 'react'
import { Plus, Search, X, Trash2, Check } from 'lucide-react'
import { commonFoods, searchFoods } from '../data/foods'

function FoodDiary({ foodLog, onAddFood, onRemoveFood, dailyCalorieGoal }) {
  const [showAddFood, setShowAddFood] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [selectedFood, setSelectedFood] = useState(null)
  const [servings, setServings] = useState(1)

  useEffect(() => {
    if (searchQuery) {
      setSearchResults(searchFoods(searchQuery))
    } else {
      setSearchResults(commonFoods)
    }
  }, [searchQuery])

  const today = new Date().toDateString()
  const todaysFoods = foodLog.filter(entry =>
    new Date(entry.date).toDateString() === today
  )

  const totals = todaysFoods.reduce((acc, entry) => ({
    calories: acc.calories + entry.calories,
    protein: acc.protein + entry.protein,
    carbs: acc.carbs + entry.carbs,
    fats: acc.fats + entry.fats
  }), { calories: 0, protein: 0, carbs: 0, fats: 0 })

  const caloriesRemaining = dailyCalorieGoal - totals.calories
  const percentConsumed = Math.min((totals.calories / dailyCalorieGoal) * 100, 100)

  const handleAddFood = () => {
    if (selectedFood) {
      const foodEntry = {
        ...selectedFood,
        calories: Math.round(selectedFood.calories * servings),
        protein: Math.round(selectedFood.protein * servings),
        carbs: Math.round(selectedFood.carbs * servings),
        fats: Math.round(selectedFood.fats * servings),
        servings: servings,
        date: new Date().toISOString(),
        id: Date.now()
      }
      onAddFood(foodEntry)
      setShowAddFood(false)
      setSelectedFood(null)
      setServings(1)
      setSearchQuery('')
    }
  }

  return (
    <div className="space-y-4">
      {/* Daily Summary */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-3">Today's Nutrition</h3>

        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>{totals.calories} / {dailyCalorieGoal} calories</span>
            <span className={caloriesRemaining >= 0 ? '' : 'text-red-200'}>
              {caloriesRemaining >= 0 ? caloriesRemaining : 0} remaining
            </span>
          </div>
          <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
            <div
              className={`h-3 rounded-full transition-all ${
                percentConsumed > 100 ? 'bg-red-400' : 'bg-white'
              }`}
              style={{ width: `${percentConsumed}%` }}
            ></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-xs opacity-90">Protein</p>
            <p className="text-xl font-bold">{totals.protein}g</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-xs opacity-90">Carbs</p>
            <p className="text-xl font-bold">{totals.carbs}g</p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-lg p-3">
            <p className="text-xs opacity-90">Fats</p>
            <p className="text-xl font-bold">{totals.fats}g</p>
          </div>
        </div>
      </div>

      {/* Add Food Button */}
      <button
        onClick={() => setShowAddFood(true)}
        className="w-full bg-white border-2 border-dashed border-indigo-300 text-indigo-600 font-semibold py-4 rounded-lg hover:bg-indigo-50 transition-all flex items-center justify-center space-x-2"
      >
        <Plus className="w-5 h-5" />
        <span>Add Food</span>
      </button>

      {/* Food Log */}
      {todaysFoods.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Today's Foods</h3>
          <div className="space-y-3">
            {todaysFoods.map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">{entry.name}</p>
                  <p className="text-sm text-gray-600">
                    {entry.servings && entry.servings !== 1 ? `${entry.servings}x ` : ''}{entry.serving}
                  </p>
                </div>
                <div className="text-right mr-3">
                  <p className="font-bold text-indigo-600">{entry.calories} cal</p>
                  <p className="text-xs text-gray-600">
                    P: {entry.protein}g | C: {entry.carbs}g | F: {entry.fats}g
                  </p>
                </div>
                <button
                  onClick={() => onRemoveFood(entry.id)}
                  className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Food Modal */}
      {showAddFood && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">Add Food</h3>
                <button
                  onClick={() => {
                    setShowAddFood(false)
                    setSelectedFood(null)
                    setSearchQuery('')
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search foods..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Food List */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {searchResults.map((food) => (
                  <button
                    key={food.id}
                    onClick={() => setSelectedFood(food)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      selectedFood?.id === food.id
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{food.name}</p>
                        <p className="text-sm text-gray-600">{food.serving}</p>
                      </div>
                      <div className="text-right mr-2">
                        <p className="font-bold text-indigo-600">{food.calories} cal</p>
                        <p className="text-xs text-gray-600">
                          P: {food.protein}g | C: {food.carbs}g | F: {food.fats}g
                        </p>
                      </div>
                      {selectedFood?.id === food.id && (
                        <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            {selectedFood && (
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex items-center gap-4 mb-4">
                  <label className="text-sm font-medium text-gray-700">Servings:</label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setServings(Math.max(0.5, servings - 0.5))}
                      className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-bold"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      value={servings}
                      onChange={(e) => setServings(Math.max(0.5, parseFloat(e.target.value) || 0.5))}
                      className="w-16 text-center px-2 py-1 border border-gray-300 rounded-lg"
                    />
                    <button
                      onClick={() => setServings(servings + 0.5)}
                      className="w-8 h-8 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-bold"
                    >
                      +
                    </button>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-lg font-bold text-indigo-600">
                      {Math.round(selectedFood.calories * servings)} cal
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleAddFood}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all"
                >
                  Add to Diary
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FoodDiary
