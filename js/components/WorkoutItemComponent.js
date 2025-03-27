const WorkoutItemComponent = {
  data: function () {
    return {};
  },

  props: {
    workout: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      required: true,
    },
  },

  methods: {
    removeWorkout() {
      this.$emit("remove-workout", this.index);
    },
    editWorkout() {
      this.$emit("edit-workout", { index: this.index, workout: this.workout }); // Emit the edit event
    },
  },

  computed: {},

  template: `
     <li class="list-group-item d-flex justify-content-between lh-sm">
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
            @click="editWorkout"
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
    `,
};

export default WorkoutItemComponent;
