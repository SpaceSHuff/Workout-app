import { useState } from 'react'
import { Play, Clock, Flame, ChevronRight, X } from 'lucide-react'
import { workouts } from '../data/workouts'

function Workouts({ userProfile, onCompleteWorkout }) {
  const [selectedWorkout, setSelectedWorkout] = useState(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)

  const availableWorkouts = workouts[userProfile.fitnessLevel] || workouts.beginner

  const startWorkout = (workout) => {
    setSelectedWorkout(workout)
    setCurrentExercise(0)
    setIsWorkoutActive(true)
  }

  const nextExercise = () => {
    if (currentExercise < selectedWorkout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    } else {
      completeWorkout()
    }
  }

  const completeWorkout = () => {
    onCompleteWorkout(selectedWorkout)
    setIsWorkoutActive(false)
    setSelectedWorkout(null)
    setCurrentExercise(0)
    alert('Workout completed! Great job! 💪')
  }

  const closeWorkout = () => {
    if (window.confirm('Are you sure you want to exit this workout?')) {
      setIsWorkoutActive(false)
      setSelectedWorkout(null)
      setCurrentExercise(0)
    }
  }

  if (isWorkoutActive && selectedWorkout) {
    const exercise = selectedWorkout.exercises[currentExercise]
    return (
      <div className="space-y-6 pb-20">
        {/* Workout Header */}
        <div className="bg-white rounded-lg shadow-md p-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-gray-800">{selectedWorkout.name}</h2>
            <button
              onClick={closeWorkout}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Exercise {currentExercise + 1} of {selectedWorkout.exercises.length}</span>
            <span className="font-semibold text-indigo-600">{selectedWorkout.difficulty}</span>
          </div>
        </div>

        {/* Video Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="aspect-video bg-gray-900">
            <iframe
              width="100%"
              height="100%"
              src={exercise.videoUrl}
              title={exercise.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* Exercise Details */}
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <h3 className="text-2xl font-bold text-gray-800">{exercise.name}</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Sets</p>
              <p className="text-xl font-bold text-indigo-600">{exercise.sets}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">Reps</p>
              <p className="text-xl font-bold text-purple-600">{exercise.reps}</p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700 mb-2">Instructions</p>
            <p className="text-gray-600">{exercise.description}</p>
          </div>

          <button
            onClick={nextExercise}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md"
          >
            {currentExercise < selectedWorkout.exercises.length - 1 ? 'Next Exercise' : 'Complete Workout'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Workouts</h2>
        <p className="text-gray-600">
          Showing <span className="font-semibold text-indigo-600">{userProfile.fitnessLevel}</span> level workouts
        </p>
      </div>

      {/* Workout List */}
      <div className="space-y-4">
        {availableWorkouts.map(workout => (
          <div
            key={workout.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{workout.name}</h3>
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                    {workout.difficulty}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-6 mb-4 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{workout.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Flame className="w-4 h-4" />
                  <span>{workout.calories} cal</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{workout.exercises.length} exercises</span>
                </div>
              </div>

              <button
                onClick={() => startWorkout(workout)}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <Play className="w-5 h-5" />
                <span>Start Workout</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Level Progress Info */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-2">Keep Going!</h3>
        <p className="text-sm opacity-90">
          {userProfile.fitnessLevel === 'beginner' && 'Complete 10 workouts to unlock Intermediate level!'}
          {userProfile.fitnessLevel === 'intermediate' && 'Complete 30 total workouts to unlock Advanced level!'}
          {userProfile.fitnessLevel === 'advanced' && 'You\'re at the highest level! Keep crushing it!'}
        </p>
      </div>
    </div>
  )
}

export default Workouts
