// components must be PascalCase
// multi word but singular in plurarity
// when using the component in another file, use kebab-case
const ProgressbarComponent = {
  //data slot
  //data is a function that returns an object

  data: function () {
    return {
      user: {
        name: "Brandon Knorr",
        weight: 198,
        rank: "Novice",
      },
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
    workOutsNeededForNextRank: {
      type: Number,
      default: 15,
    },
    totalWorkOuts: {
      type: Number,
      default: 0,
    },
    workouts: {
      type: Array,
      default: () => [],
    },
  },

  //methods are usually events triggered by v-on
  methods: {
    rankUp() {
      const ranks = ["Novice", "Intermediate", "Advanced", "Elite"];
      let currentIndex = ranks.indexOf(this.user.rank);
      if (currentIndex < ranks.length - 1) {
        this.user.rank = ranks[currentIndex + 1];
      }
    },
  },

  //computed properties are values that are cached and only updated when the values they depend on change
  //computed value functions need to return a value
  //Treat these like regular values that you would use in data or props
  computed: {
    progress() {
      const percentage =
        (this.totalWorkouts / this.workoutsNeededForNextRank) * 100;
      return Math.round(percentage);
    },
    totalWorkOuts() {
      return this.workouts.length;
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
  //Template is the html that will be rendered
  //it should consist of one root element
  //you can reference data, props, methods, computed properties, and watch properties using {{}}
  template: `
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
                            :style="{ width: progress + '%'}"
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
    `,
};

//export the component
export default ProgressbarComponent;
