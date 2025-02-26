import { createApp, ref, reactive, computed, watch } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = createApp({
    setup() {
    // User Info (Reactive State)
        const user = reactive({
            name: "Brandon Knorr",
            weight: 198,
            rank: "Novice",
            activeStreak: 0,
        });
    
        // Workout List
        const workouts = ref([
            { name: "Bench Press", sets: 3, reps: 10, weight: 150 },
            { name: "Barbell Squat", sets: 3, reps: 8, weight: 200 },
            { name: "Military Press", sets: 3, reps: "6-8", weight: 100 },
        ]   );
    
        // Progress toward next rank
        const progress = ref(10); // 10% by default
        const totalWorkouts = computed(() => workouts.value.length);
        const workoutsNeededForNextRank = ref(12); // Example threshold

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
        const addWorkout = (exercise, sets, reps, weight) => {
            if (exercise && sets && reps && weight) {
                workouts.value.push({ name: exercise, sets, reps, weight });
            }
        };
    
        // Function to update user weight
            const updateWeight = (newWeight) => {
                user.weight = newWeight;
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
            };
    },
});
    
// Export the Vue app
export default app;