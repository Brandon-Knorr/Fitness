import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import HeaderComponent from "./components/HeaderComponent.js";
import FooterComponent from "./components/FooterComponent.js";
import ProgressbarComponent from "./components/ProgressbarComponent.js";
import WorkoutListComponent from "./components/WorkoutListComponent.js";
import AddWorkoutModalComponent from "./components/AddWorkoutModalComponent.js";

const app = createApp({
  //components are reusable pieces of code that can be used in multiple places
  //components can be imported from other files
  components: {
    HeaderComponent,
    FooterComponent,
    ProgressbarComponent,
    WorkoutListComponent,
    AddWorkoutModalComponent,
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
      rankIcons: {
        Novice: "/assets/trophy_150dp_B89230_FILL0_wght400_GRAD0_opsz48.svg",
        Intermediate:
          "/assets/rewarded_ads_150dp_B89230_FILL0_wght400_GRAD0_opsz48 (1).svg",
        Advanced:
          "/assets/social_leaderboard_150dp_B89230_FILL0_wght400_GRAD0_opsz48.svg",
        Elite:
          "/assets/military_tech_150dp_B89230_FILL0_wght400_GRAD0_opsz48.svg",
      },
    };
  },

  computed: {
    totalWorkouts() {
      return this.workouts.length;
    },
  },

  methods: {
    addWorkout() {
      this.workouts.push(workout);
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
  },
});

export default app;
