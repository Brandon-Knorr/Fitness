<script>
import Workout from "@/models/WorkoutModel";
export default {
  name: "AddWorkoutModalComponent",
  return: {
    newExercise: "",
    newSets: "",
    newReps: "",
    newWeight: "",
    newDuration: "",
    newCategory: "",
    isAddModalVisible: false,
  },

  props: {
    title: {
      type: String,
      default: "Add Workout",
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },

  methods: {
    autoSetCategory(event) {
      const selectedOption = event.target.options[event.target.selectedIndex];
      const optgroup = selectedOption.closest("optgroup");
      this.newCategory = optgroup ? optgroup.label : "";
    },
    addWorkout() {
      if (this.newExercise && this.newSets && this.newReps && this.newWeight) {
        // Create a new Workout instance
        const newWorkout = new Workout({
          name: this.newExercise,
          category: this.newCategory,
          sets: parseInt(this.newSets),
          reps: parseInt(this.newReps),
          weight: parseInt(this.newWeight),
          duration: parseInt(this.newDuration) || 0,
        });

        this.$emit("add-workout", newWorkout);

        this.newExercise = "";
        this.newSets = "";
        this.newReps = "";
        this.newWeight = "";
        this.newDuration = "";
        this.newCategory = "";

        this.closeModal();
      }
    },
    closeModal() {
      this.$emit("close");
    },
    openModal() {
      this.isAddModalVisible = true;
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    :class="{ show: visible }"
    :style="{ display: visible ? 'block' : 'none' }"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="!visible"
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
            @click="closeModal"
            aria-label="Close"
          ></button>
        </div>
        <!--CONTENTS OF MODAL BODY-->
        <div class="modal-body">
          <form @submit.prevent="addWorkout" id="workout">
            <label for="workoutName" class="form-label mb-1">Exercise:</label>
            <select
              class="form-select mb-2"
              id="exercise-select"
              name="exercise"
              v-model="newExercise"
              @change="autoSetCategory($event)"
            >
              <optgroup label="Strength">
                <option value="Bench-press" data-category="Strength">
                  Bench Press
                </option>
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
                <option value="Dynamic-stretching">Dynamic Stretching</option>
                <option value="Foam-rolling">Foam Rolling</option>
                <option value="Joint-mobility">Joint Mobility Exercises</option>
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
            <input type="number" v-model="newSets" class="form-control mb-2" />

            <label for="workoutReps" class="form-label">Reps: </label>
            <input type="number" v-model="newReps" class="form-control mb-2" />

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
          <button type="button" class="btn btn-secondary" @click="closeModal">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
