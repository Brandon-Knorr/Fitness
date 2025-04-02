import WorkoutItemComponent from "./WorkoutItemComponent.js";
import AddWorkoutModalComponent from "./AddWorkoutModalComponent.js";
import EditWorkoutModalComponent from "./EditWorkoutModalComponent.js";

const WorkoutListComponent = {
  components: {
    WorkoutItemComponent,
    AddWorkoutModalComponent,
    EditWorkoutModalComponent,
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
      selectedWorkout: null,
      selectedWorkoutIndex: null,
      isEditModalVisible: false,
      isAddModalVisible: false,
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
    addWorkout(newWorkout) {
      this.workouts.push(newWorkout);
    },
    openAddWorkoutModal() {
      this.isAddModalVisible = true;
    },
    closeAddWorkoutModal() {
      this.isAddModalVisible = false;
    },
    handleEditWorkout({ index, workout }) {
      this.selectedWorkout = { ...workout }; // Clone the workout to avoid direct mutation
      this.selectedWorkoutIndex = index;

      // Show the modal
      this.isEditModalVisible = true;
    },
    updateWorkout(updatedWorkout) {
      // Update the workout in the list
      if (this.selectedWorkoutIndex !== null) {
        this.workouts.splice(this.selectedWorkoutIndex, 1, updatedWorkout);
      }

      // Reset the selected workout
      this.selectedWorkout = null;
      this.selectedWorkoutIndex = null;
      this.isEditModalVisible = false;

      this.resetModal();
    },
    resetModal() {
      this.selectedWorkout = null;
      this.selectedWorkoutIndex = null;
      this.isEditModalVisible = false;
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
                          <span class="badge rounded-pill"
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
                        @editWorkout="handleEditWorkout"
                      ></workout-item-component>
                    </ul>
                  </div>
                </div>
      
                <add-workout-modal-component
                  :visible="isAddModalVisible"
                  @add-workout="addWorkout"
                  @close="closeAddWorkoutModal"
                  :exercise-categories="exerciseCategories">
                </add-workout-modal-component>

                  <!-- Include the EditWorkoutModalComponent -->
      <edit-workout-modal-component
        v-if="selectedWorkout"
        :visible="isEditModalVisible"
        :workout="selectedWorkout"
        @update-workout="updateWorkout"
        @close="isEditModalVisible = false"
      ></edit-workout-modal-component>
              </div>
  `,
};

export default WorkoutListComponent;
