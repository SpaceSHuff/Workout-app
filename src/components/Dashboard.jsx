import { Activity, Flame, Target, TrendingDown } from 'lucide-react'

function Dashboard({ userProfile, workoutHistory, weightHistory }) {
  const recentWorkouts = workoutHistory.slice(0, 3)
  const weeklyWorkouts = workoutHistory.filter(w => {
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    return new Date(w.date).getTime() > weekAgo
  }).length

  const weightChange = weightHistory.length >= 2
    ? (weightHistory[0].weight - weightHistory[weightHistory.length - 1].weight).toFixed(1)
    : 0

  const stats = [
    {
      icon: Activity,
      label: 'Workouts This Week',
      value: weeklyWorkouts,
      color: 'bg-blue-500'
    },
    {
      icon: Flame,
      label: 'Total Calories Burned',
      value: userProfile.totalCaloriesBurned,
      color: 'bg-orange-500'
    },
    {
      icon: Target,
      label: 'Total Workouts',
      value: userProfile.workoutsCompleted,
      color: 'bg-green-500'
    },
    {
      icon: TrendingDown,
      label: 'Weight Change',
      value: `${weightChange > 0 ? '-' : '+'}${Math.abs(weightChange)} lbs`,
      color: 'bg-purple-500'
    }
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Welcome back{userProfile.name ? `, ${userProfile.name}` : ''}!
        </h2>
        <p className="text-gray-600">
          You're on the <span className="font-semibold text-indigo-600">{userProfile.fitnessLevel}</span> level.
          Keep pushing toward your goals!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-4">
              <div className={`${stat.color} w-10 h-10 rounded-lg flex items-center justify-center mb-3`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          )
        })}
      </div>

      {/* Recent Workouts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Workouts</h3>
        {recentWorkouts.length > 0 ? (
          <div className="space-y-3">
            {recentWorkouts.map((workout, index) => (
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
        ) : (
          <p className="text-gray-600 text-center py-4">
            No workouts yet. Start your first workout today!
          </p>
        )}
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-xl font-bold mb-2">Daily Tip</h3>
        <p className="text-sm opacity-90">
          Consistency is key! Try to complete at least 3 workouts this week and track your meals
          to see the best results in your weight loss journey.
        </p>
      </div>
    </div>
  )
}

export default Dashboard
