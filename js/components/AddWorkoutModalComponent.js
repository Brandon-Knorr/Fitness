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
    autoSetCategory(event) {
      const selectedOption = event.target.options[event.target.selectedIndex];
      console.log(event.target);
      const optgroup = selectedOption.closest("optgroup");
      this.newCategory = optgroup ? optgroup.label : "";
    },
    addWorkout() {
      if (this.newExercise && this.newSets && this.newReps && this.newWeight) {
        const newWorkout = {
          name: this.newExercise,
          category: this.newCategory,
          sets: this.newSets,
          reps: this.newReps,
          weight: this.newWeight,
          duration: this.newDuration || null,
        };

        this.$emit("add-workout", newWorkout);

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

  template: `
         <div
          class="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabindex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="staticBackdropLabel">
                  {{ title }}
                </h1>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <!--CONTENTS OF MODAL BODY-->
              <div class="modal-body">
                <form
                  @submit.prevent="addWorkout"
                  id="workout"
                >
                  <label for="workoutName" class="form-label mb-1"
                    >Exercise:</label
                  >
                  <select
                    class="form-select mb-2"
                    id="exercise-select"
                    name="exercise"
                    v-model="newExercise"
                    @change="autoSetCategory($event)"
                  >
                    <optgroup label="Strength">
                      <option value="Bench-press" data-category="Strength">Bench Press</option>
                      <option value="Squats">Squats</option>
                      <option value="Deadlifts">Deadlifts</option>
                      <option value="Overhead-press">Overhead Press</option>
                      <option value="Barbell-rows">Barbell Rows</option>
                    </optgroup>
                    <optgroup label="Cardio">
                      <option value="Running">Running</option>
                      <option value="Jumping-jacks">Jumping Jacks</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Hiit">
                        High-Intensity Interval Training (HIIT)
                      </option>
                      <option value="Swimming">Swimming</option>
                    </optgroup>
                    <optgroup label="Mobility">
                      <option value="Yoga-flow">Yoga Flow</option>
                      <option value="Dynamic-stretching">
                        Dynamic Stretching
                      </option>
                      <option value="oam-rolling">Foam Rolling</option>
                      <option value="Joint-mobility">
                        Joint Mobility Exercises
                      </option>
                      <option value="Static-stretching">Static Stretching</option>
                    </optgroup>
                    <optgroup label="Core">
                      <option value="Plank">Plank</option>
                      <option value="Russian-twists">Russian Twists</option>
                      <option value="Leg-raises">Leg Raises</option>
                      <option value="Crunches">Crunches</option>
                      <option value="Mountain-climbers">Mountain Climbers</option>
                    </optgroup>
                  </select>
  
                  <!-- New Duration Input -->
                  <label for="workoutDuration" class="form-label"
                    >Duration (minutes):
                  </label>
                  <input
                    type="number"
                    v-model="newDuration"
                    class="form-control mb-2"
                  />
  
                  <label for="workoutsets" class="form-label">Sets: </label>
                  <input
                    type="number"
                    v-model="newSets"
                    class="form-control mb-2"
                  />
  
                  <label for="workoutReps" class="form-label">Reps: </label>
                  <input
                    type="number"
                    v-model="newReps"
                    class="form-control mb-2"
                  />
  
                  <label for="workoutWeight" class="form-label">Weight: </label>
                  <input
                    type="number"
                    v-model="newWeight"
                    class="form-control mb-2"
                  />
  
                  <!--Button Container-->
                  <div class="container mt-2">
                    <div class="row justify-content-center">
                      <div class="col-4 mx-auto d-grid">
                        <button class="btn btn-primary shadow" type="submit">
                          Add Workout
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
    `,
};

export default AddWorkoutModalComponent;
