const WorkoutListComponent = {
  data: function () {
    return {
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
    };
  },

  props: {
    workouts: {
      type: Array,
      default: () => [],
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

  computed: {
    totalWorkouts() {
      return this.workouts.length;
    },
  },

  watch: {},

  template: `
    <div class="container">
                <div class="row justify-content-center">
                  <div class="col-sm col-md col-lg-6 col-xl-6">
                    <div class="row justify-content-center">
                      <div class="col-6">
                        <h4 class="d-flex mb-3 justify-content-between">
                          <span class="text-primary">Your Workouts</span>
                          <span class="badge bg-primary rounded-pill"
                            >{{ totalWorkouts }}</span
                          >
                        </h4>
                      </div>
                    </div>
                    <ul class="list-group mb-5" id="workout-list">
                      <li
                        v-for="(workout, index) in workouts"
                        :key="index"
                        class="list-group-item d-flex justify-content-between lh-sm"
                      >
                        <div>
                          <h6 class="my-0">
                            {{ workout.name }}
                            <!-- Only display category if provided -->
                            <span v-if="workout.category">
                              | {{ workout.category }}</span
                            >
                          </h6>
                          <small class="text-body-secondary me-2">
                            <span v-if="workout.sets"
                              >Sets: {{ workout.sets }}</span
                            >
                            <span v-if="workout.reps"
                              >, Reps: {{ workout.reps }}</span
                            >
                            <span v-if="workout.weight"
                              >, Weight: {{ workout.weight }} lbs</span
                            >
                            <span v-if="workout.duration"
                              >, Duration: {{ workout.duration }} minutes</span
                            >
                          </small>
                        </div>
                        <!-- Remove button for each workout -->
                        <div class="d-grid gap-2 d-md-flex justify-content-end">
                          <button
                            class="btn btn-sm"
                            @click="editWorkout(index)"
                          >
                            <i class="bi bi-pencil-square"></i>
                          </button>
                          <button
                            class="btn btn-sm btn-danger"
                            @click="removeWorkout(index)"
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
  `,
};

export default WorkoutListComponent;
