import WorkoutItemComponent from "./WorkoutItemComponent.js";

const WorkoutListComponent = {
  components: {
    WorkoutItemComponent,
  },

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
    removeWorkout(index) {
      this.workouts.splice(index, 1);
    },
  },

  computed: {
    totalWorkouts() {
      return this.workouts.length;
    },
  },

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
                      <workout-item-component
                        v-for="(workout, index) in workouts"
                        :key="index"
                        :workout="workout"
                        :index="index"
                        @remove-workout="removeWorkout"
                      ></workout-item-component>
                    </ul>
                  </div>
                </div>
              </div>
  `,
};

export default WorkoutListComponent;
