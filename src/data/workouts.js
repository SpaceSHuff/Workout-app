export const workouts = {
  beginner: [
    {
      id: 1,
      name: "Bodyweight Basics",
      duration: "20 min",
      calories: 150,
      exercises: [
        {
          name: "Push-ups",
          sets: 3,
          reps: "8-10",
          videoUrl: "https://www.youtube.com/embed/IODxDxX7oi4",
          description: "Start with knees on ground if needed. Focus on form over quantity."
        },
        {
          name: "Squats",
          sets: 3,
          reps: "12-15",
          videoUrl: "https://www.youtube.com/embed/aclHkVaku9U",
          description: "Keep your back straight, knees behind toes. Go as low as comfortable."
        },
        {
          name: "Plank",
          sets: 3,
          reps: "20-30 sec",
          videoUrl: "https://www.youtube.com/embed/pSHjTRCQxIw",
          description: "Keep your body in a straight line. Engage your core throughout."
        },
        {
          name: "Walking Lunges",
          sets: 3,
          reps: "10 each leg",
          videoUrl: "https://www.youtube.com/embed/QOVaHwm-Q6U",
          description: "Step forward and lower your back knee toward the ground."
        }
      ],
      difficulty: "beginner"
    },
    {
      id: 2,
      name: "Cardio Starter",
      duration: "15 min",
      calories: 120,
      exercises: [
        {
          name: "Marching in Place",
          sets: 3,
          reps: "1 min",
          videoUrl: "https://www.youtube.com/embed/cZnsLVArIt8",
          description: "Lift knees high, pump your arms. Warm up your body."
        },
        {
          name: "Step Touches",
          sets: 3,
          reps: "1 min",
          videoUrl: "https://www.youtube.com/embed/g_tea8ZNk5A",
          description: "Step side to side, touch foot. Keep moving at a comfortable pace."
        },
        {
          name: "Arm Circles",
          sets: 2,
          reps: "30 sec each direction",
          videoUrl: "https://www.youtube.com/embed/5kN_H1RgNYE",
          description: "Small controlled circles, gradually increase size."
        }
      ],
      difficulty: "beginner"
    }
  ],
  intermediate: [
    {
      id: 3,
      name: "Full Body Strength",
      duration: "30 min",
      calories: 250,
      exercises: [
        {
          name: "Burpees",
          sets: 3,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/embed/TU8QYVW0gDU",
          description: "Full body exercise. Modify by stepping back instead of jumping."
        },
        {
          name: "Jump Squats",
          sets: 3,
          reps: "12-15",
          videoUrl: "https://www.youtube.com/embed/CVaEhXotL7M",
          description: "Explosive power movement. Land softly with bent knees."
        },
        {
          name: "Mountain Climbers",
          sets: 3,
          reps: "20",
          videoUrl: "https://www.youtube.com/embed/nmwgirgXLYM",
          description: "Keep hips level, drive knees toward chest. Maintain plank position."
        },
        {
          name: "Pike Push-ups",
          sets: 3,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/embed/x4YAz7x0AJQ",
          description: "Targets shoulders. Keep hips high in inverted V position."
        }
      ],
      difficulty: "intermediate"
    },
    {
      id: 4,
      name: "HIIT Cardio Blast",
      duration: "25 min",
      calories: 300,
      exercises: [
        {
          name: "High Knees",
          sets: 4,
          reps: "45 sec",
          videoUrl: "https://www.youtube.com/embed/8opcQdC-V-U",
          description: "Drive knees up high, pump arms. Maximum effort."
        },
        {
          name: "Jumping Jacks",
          sets: 4,
          reps: "45 sec",
          videoUrl: "https://www.youtube.com/embed/c4DAnQ6DtF8",
          description: "Classic cardio move. Jump feet out, raise arms overhead."
        },
        {
          name: "Skater Hops",
          sets: 4,
          reps: "45 sec",
          videoUrl: "https://www.youtube.com/embed/qBEVIylUdO0",
          description: "Lateral movement. Jump side to side, touch ground with opposite hand."
        }
      ],
      difficulty: "intermediate"
    }
  ],
  advanced: [
    {
      id: 5,
      name: "Advanced Athletic Training",
      duration: "45 min",
      calories: 450,
      exercises: [
        {
          name: "Pistol Squats",
          sets: 4,
          reps: "8-10 each leg",
          videoUrl: "https://www.youtube.com/embed/qDcniqddTeE",
          description: "Single leg squat. Use support if needed. Advanced balance and strength."
        },
        {
          name: "Clap Push-ups",
          sets: 4,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/embed/YCEHi-Xs5YA",
          description: "Explosive chest and arm power. Push hard enough to clap mid-air."
        },
        {
          name: "Box Jumps",
          sets: 4,
          reps: "12-15",
          videoUrl: "https://www.youtube.com/embed/NBY9-kTuHEk",
          description: "Jump onto elevated surface. Land softly, step down carefully."
        },
        {
          name: "Handstand Push-ups",
          sets: 3,
          reps: "5-8",
          videoUrl: "https://www.youtube.com/embed/tQhrk6WMcKw",
          description: "Against wall. Lower head to ground and push back up. Ultimate shoulder strength."
        }
      ],
      difficulty: "advanced"
    },
    {
      id: 6,
      name: "Extreme HIIT Challenge",
      duration: "40 min",
      calories: 500,
      exercises: [
        {
          name: "Burpee Box Jumps",
          sets: 5,
          reps: "10-12",
          videoUrl: "https://www.youtube.com/embed/PTKUY7_9GO0",
          description: "Burpee followed by box jump. Ultimate cardio challenge."
        },
        {
          name: "Tuck Jumps",
          sets: 5,
          reps: "15",
          videoUrl: "https://www.youtube.com/embed/KZComNikt94",
          description: "Jump high, bring knees to chest. Explosive leg power."
        },
        {
          name: "Spider Push-ups",
          sets: 4,
          reps: "12-15",
          videoUrl: "https://www.youtube.com/embed/9qwYxxBW9Ps",
          description: "Bring knee to elbow while lowering. Combines core and chest work."
        }
      ],
      difficulty: "advanced"
    }
  ]
};
