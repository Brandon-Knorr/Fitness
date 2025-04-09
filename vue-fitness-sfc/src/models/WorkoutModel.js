export default class Workout {
  constructor({
    name,
    category,
    sets = 0,
    reps = 0,
    weight = 0,
    duration = 0,
  }) {
    this.name = name; // Name of the workout (e.g., "Bench Press")
    this.category = category; // Category (e.g., "Strength", "Cardio", etc.)
    this.sets = sets; // Number of sets
    this.reps = reps; // Number of reps per set
    this.weight = weight; // Weight used (in lbs or kg)
    this.duration = duration; // Duration of the workout (in minutes)
  }
}
