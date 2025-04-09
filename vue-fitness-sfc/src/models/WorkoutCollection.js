import Workout from "./WorkoutModel";

export default class WorkoutCollection {
  constructor(workouts = []) {
    this.workouts = workouts.map((workout) => new Workout(workout));
  }

  addWorkout(workoutData) {
    const newWorkout = new Workout(workoutData);
    this.workouts.push(newWorkout);
    return newWorkout;
  }

  removeWorkout(index) {
    if (index >= 0 && index < this.workouts.length) {
      return this.workouts.splice(index, 1)[0];
    }
    return null;
  }

  updateWorkout(index, updatedWorkoutData) {
    if (index >= 0 && index < this.workouts.length) {
      const updatedWorkout = new Workout(updatedWorkoutData);
      this.workouts.splice(index, 1, updatedWorkout);
      return updatedWorkout;
    }
    return null;
  }

  getAllWorkouts() {
    return this.workouts;
  }

  getTotalWorkouts() {
    return this.workouts.length;
  }
}
