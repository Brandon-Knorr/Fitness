import { createApp, ref, reactive, computed, watch, nextTick } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
  setup() {
    // User Info (Reactive State)
    const user = reactive({
      name: "Brandon Knorr",
      weight: 198,
      rank: "Novice",
    });

    // Workout List
    const workouts = ref([
      { name: "Bench Press", category: "Strength", sets: 3, reps: 10, weight: 150, duration: 25 },
      { name: "Barbell Squat", category: "Strength", sets: 3, reps: 8, weight: 200, duration: 5 },
      { name: "Military Press", category: "Strength", sets: 3, reps: 8, weight: 100, duration: 60 },
    ]);

    // Progress toward next rank
    const totalWorkouts = computed(() => workouts.value.length);
    const workoutsNeededForNextRank = ref(15); // Example threshold
    const progress = computed(() => {
      const percentage = (totalWorkouts.value / workoutsNeededForNextRank.value) * 100;
      return Math.round(percentage);
    });

    // Mapping exercises to categories
    const exerciseCategories = {
      "bench-press": "Strength",
      "squats": "Strength",
      "deadlifts": "Strength",
      "overhead-press": "Strength",
      "barbell-rows": "Strength",
      "running": "Cardio",
      "jumping-jacks": "Cardio",
      "cycling": "Cardio",
      "hiit": "Cardio",
      "swimming": "Cardio",
      "yoga-flow": "Mobility",
      "dynamic-stretching": "Mobility",
      "foam-rolling": "Mobility",
      "joint-mobility": "Mobility",
      "static-stretching": "Mobility",
      "plank": "Core",
      "russian-twists": "Core",
      "leg-raises": "Core",
      "crunches": "Core",
      "mountain-climbers": "Core",
    };

    // Rank icons mapping
    const rankIcons = {
      "Novice": "assets/images/rank-novice.png",
      "Intermediate": "assets/images/rank-intermediate.png",
      "Advanced": "assets/images/rank-advanced.png",
      "Elite": "assets/images/rank-elite.png",
    };

    // Refs for new workout and weight
    const newExercise = ref("");
    const newSets = ref("");
    const newReps = ref("");
    const newWeight = ref("");
    const newDuration = ref("");
    const newUserWeight = ref("");

    // Auto-set category when an exercise is chosen
    const autoSetCategory = () => {
      // newCategory is derived from the selected exercise
      newCategory.value = exerciseCategories[newExercise.value] || "";
    };

    // Reactive variable to hold the category (set automatically)
    const newCategory = ref("");

    // Function to add a new workout
    const addWorkout = () => {
      // Only add the workout if required fields are provided
      if (newExercise.value && newSets.value && newReps.value && newWeight.value) {
        workouts.value.push({
          name: newExercise.value,
          category: newCategory.value,
          sets: newSets.value,
          reps: newReps.value,
          weight: newWeight.value,
          duration: newDuration.value || null, // include duration if provided
        });

        // Reset form fields after submission 
        newExercise.value = "";
        newSets.value = "";
        newReps.value = "";
        newWeight.value = "";
        newDuration.value = "";
        newCategory.value = "";

        // After adding a workout, close the workout modal and switch to the Workouts tab.
        nextTick(() => {
          const workoutModal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop"));
          if (workoutModal) {
            workoutModal.hide();
          }
          // Switch tab to Workouts
          const workoutsTab = document.querySelector("#pills-workouts-tab");
          if (workoutsTab) {
            workoutsTab.click();
          }
        });
      }
    };

    // Function to update user weight and close the modal
    const updateWeightAndClose = () => {
      if (newUserWeight.value) {
        updateWeight(newUserWeight.value);
        newUserWeight.value = "";
        const weightModal = bootstrap.Modal.getInstance(document.getElementById("staticBackdrop2"));
        if (weightModal) {
          weightModal.hide();
        }
      }
    };

    // Function to update user weight
    const updateWeight = (weight) => {
      user.weight = weight;
    };

    // Function to remove a workout from the list
    const removeWorkout = (index) => {
      workouts.value.splice(index, 1);
    };

    // Function to rank up
    const rankUp = () => {
      const ranks = ["Novice", "Intermediate", "Advanced", "Elite"];
      let currentIndex = ranks.indexOf(user.rank);
      if (currentIndex < ranks.length - 1) {
        user.rank = ranks[currentIndex + 1];
        // Optionally, reset progress or handle any additional logic here
      }
    };

    // Watcher: Automatically rank up when progress reaches 100%
    watch(totalWorkouts, (newCount) => {
      if (progress.value >= 100) {
        rankUp();
      }
    });

    return {
      user,
      workouts,
      progress,
      totalWorkouts,
      workoutsNeededForNextRank,
      addWorkout,
      updateWeight,
      updateWeightAndClose,
      removeWorkout,
      newExercise,
      newSets,
      newReps,
      newWeight,
      newDuration,
      newUserWeight,
      autoSetCategory,
      rankIcons,
    };
  },
});

// Export the Vue app
export default app;
