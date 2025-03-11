import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import HeaderComponent from "./components/HeaderComponent.js";

const app = createApp({
  //components are reusable pieces of code that can be used in multiple places
  //components can be imported from other files
  components: {
    HeaderComponent,
  },

  data() {
    return {
      user: {
        name: "Brandon Knorr",
        weight: 198,
        rank: "Novice",
      },
      workouts: [
        {
          name: "Bench Press",
          category: "Strength",
          sets: 3,
          reps: 10,
          weight: 150,
          duration: 25,
        },
        {
          name: "Barbell Squat",
          category: "Strength",
          sets: 3,
          reps: 8,
          weight: 200,
          duration: 5,
        },
        {
          name: "Military Press",
          category: "Strength",
          sets: 3,
          reps: 8,
          weight: 100,
          duration: 60,
        },
      ],
      workoutsNeededForNextRank: 15,
      newExercise: "",
      newSets: "",
      newReps: "",
      newWeight: "",
      newDuration: "",
      newUserWeight: "",
      newCategory: "",
      exerciseCategories: {
        "bench-press": "Strength",
        squats: "Strength",
        deadlifts: "Strength",
        "overhead-press": "Strength",
        "barbell-rows": "Strength",
        running: "Cardio",
        "jumping-jacks": "Cardio",
        cycling: "Cardio",
        hiit: "Cardio",
        swimming: "Cardio",
        "yoga-flow": "Mobility",
        "dynamic-stretching": "Mobility",
        "foam-rolling": "Mobility",
        "joint-mobility": "Mobility",
        "static-stretching": "Mobility",
        plank: "Core",
        "russian-twists": "Core",
        "leg-raises": "Core",
        crunches: "Core",
        "mountain-climbers": "Core",
      },
      rankIcons: {
        Novice: "assets/images/rank-novice.png",
        Intermediate: "assets/images/rank-intermediate.png",
        Advanced: "assets/images/rank-advanced.png",
        Elite: "assets/images/rank-elite.png",
      },
    };
  },
  computed: {
    totalWorkouts() {
      return this.workouts.length;
    },
    progress() {
      const percentage =
        (this.totalWorkouts / this.workoutsNeededForNextRank) * 100;
      return Math.round(percentage);
    },
  },
  watch: {
    totalWorkouts(newCount) {
      if (this.progress >= 100) {
        this.rankUp();
      }
    },
  },
  methods: {
    autoSetCategory() {
      this.newCategory = this.exerciseCategories[this.newExercise] || "";
    },
    addWorkout() {
      if (this.newExercise && this.newSets && this.newReps && this.newWeight) {
        this.workouts.push({
          name: this.newExercise,
          category: this.newCategory,
          sets: this.newSets,
          reps: this.newReps,
          weight: this.newWeight,
          duration: this.newDuration || null,
        });

        this.newExercise = "";
        this.newSets = "";
        this.newReps = "";
        this.newWeight = "";
        this.newDuration = "";
        this.newCategory = "";

        this.$nextTick(() => {
          const workoutModal = bootstrap.Modal.getInstance(
            document.getElementById("staticBackdrop")
          );
          if (workoutModal) {
            workoutModal.hide();
          }
          const workoutsTab = document.querySelector("#pills-workouts-tab");
          if (workoutsTab) {
            workoutsTab.click();
          }
        });
      }
    },
    updateWeight(weight) {
      this.user.weight = weight;
      this.showToast("Weight updated successfully!");
    },
    updateWeightAndClose() {
      if (this.newUserWeight) {
        this.updateWeight(this.newUserWeight);
        this.newUserWeight = "";
        const weightModal = bootstrap.Modal.getInstance(
          document.getElementById("staticBackdrop2")
        );
        if (weightModal) {
          weightModal.hide();
        }
      }
    },
    showToast(message) {
      const toast = document.getElementById("toast");
      toast.className = "toast live-toast show text-white bg-success ";
      toast.innerText = message;
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 3000);
    },
    removeWorkout(index) {
      this.workouts.splice(index, 1);
    },
    rankUp() {
      const ranks = ["Novice", "Intermediate", "Advanced", "Elite"];
      let currentIndex = ranks.indexOf(this.user.rank);
      if (currentIndex < ranks.length - 1) {
        this.user.rank = ranks[currentIndex + 1];
      }
    },
  },
});

export default app;
