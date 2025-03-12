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
                @submit.prevent="addWorkout(newExercise, newSets, newReps, newWeight, newDuration)"
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
                  @change="autoSetCategory"
                >
                  <optgroup label="Strength">
                    <option value="bench-press">Bench Press</option>
                    <option value="squats">Squats</option>
                    <option value="deadlifts">Deadlifts</option>
                    <option value="overhead-press">Overhead Press</option>
                    <option value="barbell-rows">Barbell Rows</option>
                  </optgroup>
                  <optgroup label="Cardio">
                    <option value="running">Running</option>
                    <option value="jumping-jacks">Jumping Jacks</option>
                    <option value="cycling">Cycling</option>
                    <option value="hiit">
                      High-Intensity Interval Training (HIIT)
                    </option>
                    <option value="swimming">Swimming</option>
                  </optgroup>
                  <optgroup label="Mobility">
                    <option value="yoga-flow">Yoga Flow</option>
                    <option value="dynamic-stretching">
                      Dynamic Stretching
                    </option>
                    <option value="foam-rolling">Foam Rolling</option>
                    <option value="joint-mobility">
                      Joint Mobility Exercises
                    </option>
                    <option value="static-stretching">Static Stretching</option>
                  </optgroup>
                  <optgroup label="Core">
                    <option value="plank">Plank</option>
                    <option value="russian-twists">Russian Twists</option>
                    <option value="leg-raises">Leg Raises</option>
                    <option value="crunches">Crunches</option>
                    <option value="mountain-climbers">Mountain Climbers</option>
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
