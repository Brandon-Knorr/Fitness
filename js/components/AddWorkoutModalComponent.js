const AddWorkoutModalComponent = {
  data: function () {
    return {
      newExercise: "",
      newSets: "",
      newReps: "",
      newWeight: "",
      newDuration: "",
      newCategory: "",
    };
  },

  props: {
    title: {
      type: String,
      default: "Add Workout",
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
  },

  computed: {},

  watch: {},

  template: ``,
};
