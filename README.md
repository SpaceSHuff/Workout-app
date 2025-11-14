# Fitness & Weight Loss App

A comprehensive fitness tracking application designed to help you build a personalized weight loss program with meal planning, video-guided workouts, and adaptive difficulty progression.

## Features

### Personalized Weight Loss Program
- Set your current weight, goal weight, and fitness level
- Track your progress with weight logging
- Visual progress tracking with statistics
- Adaptive difficulty system that adjusts as you improve

### Video-Guided Workouts
- **Beginner Level**: Bodyweight basics and cardio starters
- **Intermediate Level**: Full body strength and HIIT cardio
- **Advanced Level**: Athletic training and extreme challenges
- Embedded YouTube video demonstrations for each exercise
- Detailed instructions for sets, reps, and proper form
- Real-time workout tracking with exercise progression

### Meal Planning & Nutrition
- Curated meal plans for breakfast, lunch, dinner, and snacks
- Detailed nutritional information (calories, protein, carbs, fats)
- Step-by-step recipes with ingredients lists
- Nutrition tips for weight loss success
- Meal timing and hydration guidance

### Progress Tracking
- Dashboard with key statistics
- Workout history with dates and calories burned
- Weight tracking over time
- Weekly and monthly analytics
- Achievement system to celebrate milestones

### Adaptive Fitness System
- Start at your current fitness level
- Earn experience points (XP) for completing workouts
- Automatic level progression:
  - Beginner → Intermediate (10 workouts, 100 XP)
  - Intermediate → Advanced (30 workouts, 300 XP)
- Unlock new, more challenging workouts as you progress

## Technology Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Data Persistence**: Local Storage
- **Video Integration**: YouTube embeds

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Workout-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

### Building for Production

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## How to Use

### 1. Set Up Your Profile
- Navigate to the Profile tab
- Click "Edit" to enter your information
- Set your name, age, height, current weight, and goal weight
- Choose your starting fitness level
- Set your weekly workout goal

### 2. Start Your First Workout
- Go to the Workouts tab
- Browse available workouts for your fitness level
- Click "Start Workout" on any routine
- Watch the video demonstrations
- Follow the exercise instructions
- Complete all exercises to finish the workout

### 3. Track Your Meals
- Visit the Meals tab
- Browse breakfast, lunch, dinner, and snack options
- View detailed nutritional information
- Read cooking instructions and pro tips
- Check out nutrition tips for weight loss guidance

### 4. Monitor Your Progress
- Access the Progress tab to view:
  - Current weight vs. goal weight
  - Total weight change
  - Weekly and monthly workout statistics
  - Calories burned over time
- Log new weight entries to track your journey
- Review your workout history

### 5. Level Up
- Complete workouts to earn experience points
- Reach milestones to unlock higher difficulty levels
- View achievements in your Profile
- Challenge yourself with progressively harder workouts

## App Structure

```
src/
├── components/
│   ├── Dashboard.jsx       # Home dashboard with overview
│   ├── Workouts.jsx        # Workout library and player
│   ├── Meals.jsx           # Meal plans and nutrition tips
│   ├── Progress.jsx        # Progress tracking and analytics
│   └── Profile.jsx         # User profile and settings
├── data/
│   ├── workouts.js         # Workout routines database
│   └── meals.js            # Meal plans and nutrition data
├── App.jsx                 # Main app component with routing
├── main.jsx                # App entry point
└── index.css               # Global styles with Tailwind
```

## Features in Detail

### Workout System
- 6 pre-built workout routines (2 per difficulty level)
- 20+ unique exercises with video tutorials
- Sets, reps, and duration tracking
- Progressive overload system
- Calorie burn estimates

### Meal Planning
- 12 healthy recipes across all meal types
- Macro tracking (protein, carbs, fats)
- Calorie information for weight loss
- Practical cooking instructions
- Evidence-based nutrition tips

### Gamification
- Experience point (XP) system
- Achievement badges
- Level progression
- Workout completion tracking
- Visual progress indicators

## Data Persistence

All your data is stored locally in your browser using Local Storage:
- User profile information
- Workout history
- Weight tracking data
- Progress statistics

**Note**: Data is stored on your device only. Clear your browser cache will reset all data.

## Customization

### Adding New Workouts

Edit `src/data/workouts.js` to add new exercises or routines:

```javascript
{
  id: 7,
  name: "Your Workout Name",
  duration: "30 min",
  calories: 300,
  exercises: [
    {
      name: "Exercise Name",
      sets: 3,
      reps: "10-12",
      videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
      description: "Exercise instructions"
    }
  ],
  difficulty: "beginner" // or "intermediate" or "advanced"
}
```

### Adding New Meals

Edit `src/data/meals.js` to add new recipes:

```javascript
{
  id: 13,
  name: "Meal Name",
  calories: 400,
  protein: 30,
  carbs: 40,
  fats: 15,
  ingredients: ["ingredient 1", "ingredient 2"],
  instructions: "Cooking steps...",
  tips: "Helpful tips..."
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Tips for Success

1. **Be Consistent**: Aim for 3-4 workouts per week
2. **Track Everything**: Log your weight regularly to see trends
3. **Follow Meal Plans**: Nutrition is 70% of weight loss
4. **Start at Your Level**: Don't rush progression
5. **Stay Hydrated**: Drink water before, during, and after workouts
6. **Rest Days Matter**: Take 1-2 rest days per week for recovery

## Future Enhancements

Potential features for future versions:
- Backend API for cloud data sync
- Social features and workout sharing
- Custom workout builder
- Integration with fitness wearables
- Personalized AI meal recommendations
- Progress photos tracking
- Community challenges

## License

This project is available for personal use.

## Support

For issues or questions, please open an issue in the repository.

---

**Start your fitness journey today!** 💪🏃‍♀️🥗
