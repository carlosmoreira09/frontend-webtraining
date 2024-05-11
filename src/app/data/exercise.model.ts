export interface ExerciseModel {
  id_exercise?: number | undefined;
  exercise: string;
  exercise_desc: string;
  exercise_type: string;
  repetition: string;
  training_type?: string;
}

export interface returnMessage {
  message: string;
  status: number;
}
