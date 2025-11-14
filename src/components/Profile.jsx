import { useState } from 'react'
import { User, Target, Award, Save } from 'lucide-react'

function Profile({ userProfile, onUpdateProfile }) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(userProfile)

  const handleSubmit = (e) => {
    e.preventDefault()
    onUpdateProfile(formData)
    setIsEditing(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const achievements = [
    {
      name: 'First Workout',
      achieved: userProfile.workoutsCompleted >= 1,
      icon: '🎯'
    },
    {
      name: '5 Workouts',
      achieved: userProfile.workoutsCompleted >= 5,
      icon: '💪'
    },
    {
      name: '10 Workouts',
      achieved: userProfile.workoutsCompleted >= 10,
      icon: '🔥'
    },
    {
      name: '25 Workouts',
      achieved: userProfile.workoutsCompleted >= 25,
      icon: '⭐'
    },
    {
      name: 'Intermediate Level',
      achieved: userProfile.fitnessLevel !== 'beginner',
      icon: '📈'
    },
    {
      name: 'Advanced Level',
      achieved: userProfile.fitnessLevel === 'advanced',
      icon: '🏆'
    }
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold">
              {userProfile.name || 'Your Profile'}
            </h2>
            <p className="text-sm opacity-90">Level: {userProfile.fitnessLevel}</p>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-indigo-600">
            {userProfile.workoutsCompleted}
          </div>
          <div className="text-sm text-gray-600 mt-1">Workouts</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-orange-600">
            {userProfile.totalCaloriesBurned}
          </div>
          <div className="text-sm text-gray-600 mt-1">Calories</div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 text-center">
          <div className="text-3xl font-bold text-green-600">
            {userProfile.experience}
          </div>
          <div className="text-sm text-gray-600 mt-1">XP</div>
        </div>
      </div>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-indigo-600 font-semibold hover:text-indigo-700"
            >
              Edit
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Age"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Height (inches)
                </label>
                <input
                  type="number"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Height"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Current weight"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Goal Weight (lbs)
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="goalWeight"
                  value={formData.goalWeight}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Goal weight"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fitness Level
              </label>
              <select
                name="fitnessLevel"
                value={formData.fitnessLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weekly Goal
              </label>
              <select
                name="weeklyGoal"
                value={formData.weeklyGoal}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="light">Light (1-2 workouts/week)</option>
                <option value="moderate">Moderate (3-4 workouts/week)</option>
                <option value="intense">Intense (5+ workouts/week)</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false)
                  setFormData(userProfile)
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Name:</span>
              <span className="font-semibold text-gray-800">
                {userProfile.name || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Age:</span>
              <span className="font-semibold text-gray-800">
                {userProfile.age || 'Not set'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Height:</span>
              <span className="font-semibold text-gray-800">
                {userProfile.height ? `${userProfile.height} inches` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Current Weight:</span>
              <span className="font-semibold text-gray-800">
                {userProfile.weight ? `${userProfile.weight} lbs` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Goal Weight:</span>
              <span className="font-semibold text-gray-800">
                {userProfile.goalWeight ? `${userProfile.goalWeight} lbs` : 'Not set'}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Fitness Level:</span>
              <span className="font-semibold text-gray-800 capitalize">
                {userProfile.fitnessLevel}
              </span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Weekly Goal:</span>
              <span className="font-semibold text-gray-800 capitalize">
                {userProfile.weeklyGoal}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-800">Achievements</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg text-center transition-all ${
                achievement.achieved
                  ? 'bg-gradient-to-br from-yellow-100 to-yellow-200 border-2 border-yellow-400'
                  : 'bg-gray-100 opacity-50'
              }`}
            >
              <div className="text-3xl mb-2">{achievement.icon}</div>
              <div className="text-xs font-semibold text-gray-800">
                {achievement.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress to Next Level */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg shadow-md p-6 text-white">
        <h3 className="text-lg font-bold mb-3">Progress to Next Level</h3>
        {userProfile.fitnessLevel === 'beginner' && (
          <div>
            <p className="text-sm opacity-90 mb-2">
              Complete {10 - userProfile.workoutsCompleted} more workouts to reach Intermediate
            </p>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${Math.min((userProfile.workoutsCompleted / 10) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        {userProfile.fitnessLevel === 'intermediate' && (
          <div>
            <p className="text-sm opacity-90 mb-2">
              Complete {30 - userProfile.workoutsCompleted} more workouts to reach Advanced
            </p>
            <div className="w-full bg-white bg-opacity-30 rounded-full h-3">
              <div
                className="bg-white rounded-full h-3 transition-all"
                style={{ width: `${Math.min((userProfile.workoutsCompleted / 30) * 100, 100)}%` }}
              ></div>
            </div>
          </div>
        )}
        {userProfile.fitnessLevel === 'advanced' && (
          <p className="text-sm opacity-90">
            You've reached the highest level! Keep maintaining your fitness journey!
          </p>
        )}
      </div>
    </div>
  )
}

export default Profile
