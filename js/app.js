import { createApp, ref, reactive, computed, watch } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

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
            { name: "Bench Press", sets: 3, reps: 10, weight: 150 },
            { name: "Barbell Squat", sets: 3, reps: 8, weight: 200 },
            { name: "Military Press", sets: 3, reps: 8, weight: 100 },
        ]   );
    
        // Progress toward next rank
        const progress =computed(() => workoutsNeededForNextRank.value - workouts.value.length);
        const totalWorkouts = computed(() => workouts.value.length);
        const workoutsNeededForNextRank = ref(15); // Example threshold

        //ref variables to store my new workout list item
        const newExercise = ref("");
        const newSets = ref("");
        const newReps = ref("");
        const newWeight = ref("");
    
        // Watcher: Updates rank progress based on total workouts
        watch(totalWorkouts, (newCount) => {
            progress.value = (newCount / workoutsNeededForNextRank.value) * 100;
                if (progress.value >= 100) {
                    rankUp();
                }
        });
    
        // Function to add a new workout
        const addWorkout = () => { // if all things have a value then push values to array
            if (newExercise.value && newSets.value && newReps.value && newWeight.value) {
                workouts.value.push({
                    name: newExercise.value,
                    sets: newSets.value,
                    reps: newReps.value,
                    weight: newWeight.value,
                });

                // Reset form fields after submission 
                newExercise.value = "";
                newSets.value = "";
                newReps.value = "";
                newWeight.value = "";

                updateProgress();
            }
        };
    
        // Function to update user weight
            const updateWeight = (newUserWeight) => {
                user.weight = newUserWeight;
            };
    
        // Function to rank up
            const rankUp = () => {
            const ranks = ["Novice", "Intermediate", "Advanced", "Elite"];
            let currentIndex = ranks.indexOf(user.rank);
            if (currentIndex < ranks.length - 1) {
                user.rank = ranks[currentIndex + 1];
                progress.value = 0; // Reset progress after ranking up
            }
        };
    
            return {
                user,
                workouts,
                progress,
                totalWorkouts,
                addWorkout,
                updateWeight,
                workoutsNeededForNextRank,
                newExercise,
                newSets,
                newReps,
                newWeight,
            };
    },
});
    
// Export the Vue app
export default app;