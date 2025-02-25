import Vue from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = Vue.createApp({
    setup() {
        const userProfile = ref({
        name: "Brandon Knorr",
        weight: 198,
        rank: "Novice",
        activeStreak: 0,
        progress: 10,
        });
    
        const workouts = ref([
        { name: "Bench Press", sets: 3, reps: 10, weight: 150 },
        { name: "Barbell Squat", sets: 3, reps: 8, weight: 200 },
        { name: "Military Press", sets: 3, reps: "6-8", weight: 100 },
        ]);
    
        const rankProgress = ref({
        totalWorkouts: 3,
        workoutsUntilNextRank: 12,
        activeStreak: 0,
        progress: 10,
        });
    
        const exerciseOptions = ref([
        "Bench Press",
        "Barbell Squat",
        "Military Press",
        "Leg Press",
        "Barbell Curl",
        "Deadlift",
        "Pull-Ups",
        "Push-ups",
        ]);
    
        return { userProfile, workouts, rankProgress, exerciseOptions };
    },
});
    
export default app;
    

