import { useState } from 'react'
import { TrendingDown, Calendar, Flame, Target, Plus } from 'lucide-react'

function Progress({ userProfile, workoutHistory, weightHistory, onLogWeight }) {
  const [showWeightForm, setShowWeightForm] = useState(false)
  const [newWeight, setNewWeight] = useState('')

  const handleLogWeight = (e) => {
    e.preventDefault()
    if (newWeight && !isNaN(newWeight)) {
      onLogWeight(newWeight)
      setNewWeight('')
      setShowWeightForm(false)
    }
  }

  const last7Days = workoutHistory.filter(w => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return new Date(w.date).getTime() > weekAgo
  })

  const last30Days = workoutHistory.filter(w => {
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000
    return new Date(w.date).getTime() > monthAgo
  })

  const weeklyCalories = last7Days.reduce((sum, w) => sum + w.calories, 0)
  const monthlyCalories = last30Days.reduce((sum, w) => sum + w.calories, 0)

  const weightChange = weightHistory.length >= 2
    ? (weightHistory[0].weight - weightHistory[weightHistory.length - 1].weight).toFixed(1)
    : 0

  const currentWeight = weightHistory.length > 0 ? weightHistory[0].weight : userProfile.weight
  const goalWeight = userProfile.goalWeight || 'Not set'
  const remainingWeight = userProfile.goalWeight
    ? (currentWeight - parseFloat(userProfile.goalWeight)).toFixed(1)
    : 0

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Progress</h2>
        <p className="text-gray-600">Track your journey to reaching your goals</p>
      </div>

      {/* Weight Progress Card */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Weight Progress</h3>
          <TrendingDown className="w-6 h-6" />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm opacity-90 mb-1">Current Weight</p>
            <p className="text-3xl font-bold">{currentWeight || '--'} lbs</p>
          </div>
          <div>
            <p className="text-sm opacity-90 mb-1">Goal Weight</p>
            <p className="text-3xl font-bold">{goalWeight} lbs</p>
          </div>
        </div>

        <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-90">Total Change</p>
              <p className="text-2xl font-bold">
                {weightChange > 0 ? '-' : '+'}{Math.abs(weightChange)} lbs
              </p>
            </div>
            {userProfile.goalWeight && (
              <div className="text-right">
                <p className="text-sm opacity-90">Remaining</p>
                <p className="text-2xl font-bold">
                  {remainingWeight > 0 ? remainingWeight : '0'} lbs
                </p>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={() => setShowWeightForm(!showWeightForm)}
          className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Log New Weight</span>
        </button>

        {showWeightForm && (
          <form onSubmit={handleLogWeight} className="mt-4">
            <div className="flex gap-2">
              <input
                type="number"
                step="0.1"
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                placeholder="Enter weight in lbs"
                className="flex-1 px-4 py-2 rounded-lg text-gray-800"
                required
              />
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-blue-500" />
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{last7Days.length}</p>
          <p className="text-sm text-gray-600">Workouts</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-8 h-8 text-orange-500" />
            <span className="text-xs text-gray-500">Last 7 days</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{weeklyCalories}</p>
          <p className="text-sm text-gray-600">Calories</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-8 h-8 text-green-500" />
            <span className="text-xs text-gray-500">Last 30 days</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{last30Days.length}</p>
          <p className="text-sm text-gray-600">Workouts</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-2">
            <Flame className="w-8 h-8 text-red-500" />
            <span className="text-xs text-gray-500">Last 30 days</span>
          </div>
          <p className="text-3xl font-bold text-gray-800">{monthlyCalories}</p>
          <p className="text-sm text-gray-600">Calories</p>
        </div>
      </div>

      {/* Weight History */}
      {weightHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Weight History</h3>
          <div className="space-y-3">
            {weightHistory.slice(0, 10).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600">
                  {new Date(entry.date).toLocaleDateString()}
                </span>
                <span className="font-bold text-gray-800">{entry.weight} lbs</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Workouts */}
      {workoutHistory.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Workouts</h3>
          <div className="space-y-3">
            {workoutHistory.slice(0, 10).map((workout, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{workout.name}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(workout.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-indigo-600">{workout.calories} cal</p>
                  <p className="text-sm text-gray-600">{workout.duration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Motivational Message */}
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Keep It Up!</h3>
        <p className="text-sm opacity-90">
          Every workout counts. Stay consistent and you'll reach your goals!
        </p>
      </div>
    </div>
  )
}

export default Progress
