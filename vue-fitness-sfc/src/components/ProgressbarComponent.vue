<script>
import { RANKS, RANK_ORDER } from "@/constants/ranks";
import { WORKOUTS_NEEDED_FOR_NEXT_RANK } from "@/constants/rankThreshold";

export default {
  name: "ProgressbarComponent",
  data: function () {
    return {
      user: {
        name: "Brandon Knorr",
        weight: 198,
        rank: RANKS.NOVICE,
      },
      WORKOUTS_NEEDED_FOR_NEXT_RANK,
    };
  },
  //props Data that are passed into the component
  //can be optional or required
  //objects and arrays are passed by reference
  //primitives are passed by value
  props: {
    title: {
      type: String,
      default: "Progress Until Next Rank",
    },
    WORKOUTS_NEEDED_FOR_NEXT_RANK: {
      type: Number,
    },
    workouts: {
      type: Array,
      default: () => [],
    },
  },

  //methods are usually events triggered by v-on
  methods: {
    rankUp() {
      let currentIndex = RANK_ORDER.indexOf(this.user.rank);
      if (currentIndex < RANK_ORDER.length - 1) {
        this.user.rank = RANK_ORDER[currentIndex + 1];
      }
    },
  },

  //computed properties are values that are cached and only updated when the values they depend on change
  //computed value functions need to return a value
  //Treat these like regular values that you would use in data or props
  computed: {
    progress() {
      const percentage =
        (this.workouts.length / this.WORKOUTS_NEEDED_FOR_NEXT_RANK) * 100;
      return Math.round(percentage);
    },
  },

  //watch properties are used to watch for changes in data
  watch: {
    workouts: {
      handler(newWorkouts) {
        if (this.progress >= 100) {
          this.rankUp();
        }
      },
      deep: true,
    },
  },
};
</script>

<template>
  <div class="container-md">
    <div class="row justify-content-center">
      <div class="col-sm-8">
        <div class="card shadow">
          <div class="label text-center mt-3">
            {{ title }}
          </div>
          <div class="container p-3 mb-2">
            <div class="progress" role="progressbar">
              <div
                class="progress-bar progress-bar-animated progress-bar-striped"
                role="progressbar"
                :style="{ width: progress + '%' }"
                :aria-valuenow="progress"
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {{ progress }}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
