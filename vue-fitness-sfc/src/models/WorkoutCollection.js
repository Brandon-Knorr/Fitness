import Workout from "./WorkoutModel";

export default class WorkoutCollection {
  constructor(workouts = []) {
    this.workouts = [];
    for (let i = 0; i < workouts.length; i++) {
      const workout = new Workout(workouts[i]);
      this.workouts.push(workout);
    }
  }

  addWorkout(workoutData) {
    const newWorkout = new Workout(workoutData);
    this.workouts.push(newWorkout);
    return newWorkout;
  }

  removeWorkout(index) {
    if (index >= 0 && index < this.workouts.length) {
      const removedWorkout = this.workouts[index];
      this.workouts.splice(index, 1);
      return removedWorkout;
    }
    return null;
  }

  updateWorkout(index, updatedWorkoutData) {
    if (index >= 0 && index < this.workouts.length) {
      const updatedWorkout = new Workout(updatedWorkoutData);
      this.workouts[index] = updatedWorkout;
      return updatedWorkout;
    }
    return null;
  }

  getAllWorkouts() {
    const workoutsCopy = [];
    for (let i = 0; i < this.workouts.length; i++) {
      workoutsCopy.push(this.workouts[i]);
    }
    return workoutsCopy;
  }

  getTotalWorkouts() {
    return this.workouts.length;
  }
}
