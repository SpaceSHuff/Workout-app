import { useState, useEffect } from 'react'
import { Home, Dumbbell, Apple, User, TrendingUp, Trophy } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Workouts from './components/Workouts'
import Meals from './components/Meals'
import Profile from './components/Profile'
import Progress from './components/Progress'
import { calculateDailyCalorieGoal } from './data/foods'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('userProfile')
    return saved ? JSON.parse(saved) : {
      name: '',
      age: '',
      weight: '',
      height: '',
      goalWeight: '',
      fitnessLevel: 'beginner',
      weeklyGoal: 'moderate',
      experience: 0,
      workoutsCompleted: 0,
      totalCaloriesBurned: 0
    }
  })

  const [workoutHistory, setWorkoutHistory] = useState(() => {
    const saved = localStorage.getItem('workoutHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [weightHistory, setWeightHistory] = useState(() => {
    const saved = localStorage.getItem('weightHistory')
    return saved ? JSON.parse(saved) : []
  })

  const [foodLog, setFoodLog] = useState(() => {
    const saved = localStorage.getItem('foodLog')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('userProfile', JSON.stringify(userProfile))
  }, [userProfile])

  useEffect(() => {
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory))
  }, [workoutHistory])

  useEffect(() => {
    localStorage.setItem('weightHistory', JSON.stringify(weightHistory))
  }, [weightHistory])

  useEffect(() => {
    localStorage.setItem('foodLog', JSON.stringify(foodLog))
  }, [foodLog])

  const updateUserProfile = (updates) => {
    setUserProfile(prev => ({ ...prev, ...updates }))
  }

  const completeWorkout = (workout) => {
    const newWorkout = {
      ...workout,
      date: new Date().toISOString(),
      completedAt: Date.now()
    }

    setWorkoutHistory(prev => [newWorkout, ...prev])

    // Update user stats and check for level up
    const newWorkoutsCompleted = userProfile.workoutsCompleted + 1
    const newTotalCalories = userProfile.totalCaloriesBurned + workout.calories
    const newExperience = userProfile.experience + 10

    let updates = {
      workoutsCompleted: newWorkoutsCompleted,
      totalCaloriesBurned: newTotalCalories,
      experience: newExperience
    }

    // Adaptive fitness level progression
    if (userProfile.fitnessLevel === 'beginner' && newWorkoutsCompleted >= 10 && newExperience >= 100) {
      updates.fitnessLevel = 'intermediate'
      alert('Congratulations! You\'ve leveled up to Intermediate! 🎉')
    } else if (userProfile.fitnessLevel === 'intermediate' && newWorkoutsCompleted >= 30 && newExperience >= 300) {
      updates.fitnessLevel = 'advanced'
      alert('Amazing! You\'ve reached Advanced level! 🏆')
    }

    updateUserProfile(updates)
  }

  const logWeight = (weight) => {
    const entry = {
      weight: parseFloat(weight),
      date: new Date().toISOString()
    }
    setWeightHistory(prev => [entry, ...prev])
    updateUserProfile({ weight })
  }

  const addFood = (foodEntry) => {
    setFoodLog(prev => [foodEntry, ...prev])
  }

  const removeFood = (foodId) => {
    setFoodLog(prev => prev.filter(entry => entry.id !== foodId))
  }

  const dailyCalorieGoal = calculateDailyCalorieGoal(userProfile)

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'meals', icon: Apple, label: 'Meals' },
    { id: 'progress', icon: TrendingUp, label: 'Progress' },
    { id: 'profile', icon: User, label: 'Profile' }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Trophy className="w-8 h-8" />
              <h1 className="text-2xl font-bold">Fitness & Weight Loss</h1>
            </div>
            <div className="text-right">
              <p className="text-sm opacity-90">Level: {userProfile.fitnessLevel}</p>
              <p className="text-xs opacity-75">XP: {userProfile.experience}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' && (
          <Dashboard
            userProfile={userProfile}
            workoutHistory={workoutHistory}
            weightHistory={weightHistory}
          />
        )}
        {currentPage === 'workouts' && (
          <Workouts
            userProfile={userProfile}
            onCompleteWorkout={completeWorkout}
          />
        )}
        {currentPage === 'meals' && (
          <Meals
            userProfile={userProfile}
            foodLog={foodLog}
            onAddFood={addFood}
            onRemoveFood={removeFood}
            dailyCalorieGoal={dailyCalorieGoal}
          />
        )}
        {currentPage === 'progress' && (
          <Progress
            userProfile={userProfile}
            workoutHistory={workoutHistory}
            weightHistory={weightHistory}
            onLogWeight={logWeight}
          />
        )}
        {currentPage === 'profile' && (
          <Profile
            userProfile={userProfile}
            onUpdateProfile={updateUserProfile}
          />
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map(item => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex flex-col items-center py-3 px-4 transition-colors ${
                    currentPage === item.id
                      ? 'text-indigo-600'
                      : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  <Icon className="w-6 h-6 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default App
