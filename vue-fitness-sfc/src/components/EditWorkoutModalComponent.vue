<script>
import Workout from "@/models/WorkoutModel";

export default {
  name: "EditWorkoutModalComponent",
  data: function () {
    return {
      editedExercise: this.workout.name,
      editedSets: this.workout.sets || "",
      editedReps: this.workout.reps || "",
      editedWeight: this.workout.weight || "",
      editedDuration: this.workout.duration || "",
      editedCategory: this.workout.category || "",
    };
  },
  props: {
    title: {
      type: String,
      default: "Edit Workout",
    },
    workout: {
      type: Object,
      required: true,
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
      this.editedCategory = optgroup ? optgroup.label : "";
    },
    editWorkout() {
      const updatedWorkout = new Workout({
        name: this.editedExercise,
        category: this.editedCategory,
        sets: parseInt(this.editedSets),
        reps: parseInt(this.editedReps),
        weight: parseInt(this.editedWeight),
        duration: parseInt(this.editedDuration) || 0,
      });

      this.$emit("update-workout", updatedWorkout);

      // Close the modal
      this.closeModal();
    },
    closeModal() {
      this.$emit("close");
    },
  },
  computed: {},
  watch: {
    workout: {
      immediate: true,
      handler(newWorkout) {
        if (newWorkout) {
          this.editedExercise = newWorkout.name || "";
          this.editedSets = newWorkout.sets || "";
          this.editedReps = newWorkout.reps || "";
          this.editedWeight = newWorkout.weight || "";
          this.editedDuration = newWorkout.duration || "";
          this.editedCategory = newWorkout.category || "";
        }
      },
    },
  },
};
</script>

<template>
  <div
    class="modal fade"
    id="editModal"
    :class="{ show: visible }"
    :style="{ display: visible ? 'block' : 'none' }"
    tabindex="-1"
    aria-labelledby="editModalLabel"
    aria-hidden="!visible"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editModalLabel">
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
          <form @submit.prevent="editWorkout" id="editWorkoutForm">
            <label for="workoutName" class="form-label mb-1">Exercise:</label>
            <select
              class="form-select mb-2"
              id="exercise-select"
              name="exercise"
              v-model="editedExercise"
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
              v-model="editedDuration"
              class="form-control mb-2"
            />

            <label for="workoutsets" class="form-label">Sets: </label>
            <input
              type="number"
              v-model="editedSets"
              class="form-control mb-2"
            />

            <label for="workoutReps" class="form-label">Reps: </label>
            <input
              type="number"
              v-model="editedReps"
              class="form-control mb-2"
            />

            <label for="workoutWeight" class="form-label">Weight: </label>
            <input
              type="number"
              v-model="editedWeight"
              class="form-control mb-2"
            />

            <!--Button Container-->
            <div class="container mt-2">
              <div class="row justify-content-center">
                <div class="col-4 mx-auto d-grid">
                  <button class="btn btn-primary shadow" type="submit">
                    Save Changes
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
