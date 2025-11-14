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

### Advanced Food Tracking & Nutrition
- **Daily Food Diary**: Track everything you eat with detailed nutrition info
- **Barcode Scanner**: Scan product barcodes for instant nutrition lookup (powered by Open Food Facts API)
- **Photo Analysis**: Take photos of your meals for AI-powered nutrition estimation
- **Manual Entry**: Search and add from a database of 30+ common foods
- **Daily Calorie Goals**: Personalized calorie targets based on your profile
- **Real-time Tracking**: Monitor calories, protein, carbs, and fats throughout the day
- **Curated Meal Plans**: Healthy recipes for breakfast, lunch, dinner, and snacks
- **Nutrition Tips**: Evidence-based guidance for weight loss success

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
- **Barcode Scanning**: html5-qrcode library
- **Food Database**: Open Food Facts API
- **AI Features**: Photo-based nutrition estimation (demo mode)
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
**Food Diary (Recommended for daily tracking):**
- Visit the Meals tab and select "Food Diary"
- Add foods using one of three methods:
  - **Manual Entry**: Click "Add Food" to search from 30+ common foods
  - **Barcode Scanner**: Click "Scan Barcode" to use your camera to scan product barcodes
  - **Photo Analysis**: Click "Photo Analysis" to take a picture of your meal for AI estimation
- View real-time calorie tracking with your daily goal
- Monitor protein, carbs, and fats intake
- Review and delete entries as needed

**Meal Plans (For recipe ideas):**
- Switch to "Meal Plans" tab
- Browse healthy recipes for breakfast, lunch, dinner, and snacks
- View detailed nutritional information and macros
- Read step-by-step cooking instructions
- Get pro tips for meal prep and nutrition

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
│   ├── Meals.jsx           # Meal plans and food diary hub
│   ├── FoodDiary.jsx       # Daily food tracking component
│   ├── BarcodeScanner.jsx  # Barcode scanning with camera
│   ├── PhotoNutrition.jsx  # AI photo-based nutrition estimation
│   ├── Progress.jsx        # Progress tracking and analytics
│   └── Profile.jsx         # User profile and settings
├── data/
│   ├── workouts.js         # Workout routines database
│   ├── meals.js            # Meal plans and nutrition data
│   └── foods.js            # Common foods database (30+ items)
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

### Food Tracking System
- **Food Database**: 30+ common foods with complete nutrition data
- **Barcode Scanning**: Real-time product lookup via Open Food Facts API
- **Photo Recognition**: AI-powered nutrition estimation from meal photos (demo)
- **Daily Calorie Calculator**: BMR-based personalized calorie goals
- **Macro Tracking**: Real-time protein, carbs, and fats monitoring
- **Food History**: Complete log of daily food intake

### Meal Planning
- 12 healthy recipes across all meal types
- Detailed macro breakdown (protein, carbs, fats)
- Calorie information for weight loss
- Step-by-step cooking instructions
- Evidence-based nutrition tips and meal timing guidance

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
- Food log and daily nutrition
- Progress statistics

**Note**: Data is stored on your device only. Clearing your browser cache will reset all data.

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

### Adding New Foods to Database

Edit `src/data/foods.js` to add foods to the common foods database:

```javascript
{
  id: 34,
  name: "Food Name (serving size)",
  calories: 200,
  protein: 20,
  carbs: 15,
  fats: 8,
  serving: "1 cup",
  category: "protein" // breakfast, protein, carbs, vegetables, snacks, beverages, condiments
}
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Tips for Success

1. **Be Consistent**: Aim for 3-4 workouts per week
2. **Track Everything**: Log your weight AND food daily for best results
3. **Use the Food Diary**: Track calories to stay within your daily goal
4. **Barcode Scanner is Your Friend**: Quick and accurate for packaged foods
5. **Nutrition is Key**: Weight loss is 70% diet, 30% exercise
6. **Start at Your Level**: Don't rush progression
7. **Stay Hydrated**: Drink water before, during, and after workouts
8. **Rest Days Matter**: Take 1-2 rest days per week for recovery

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
