export interface ExerciseModel {
  id_exercise?: number;
  exercise?: string;
  exercise_desc?: string;
  exercise_type?: string;
  repetition?: string;
}

export interface ReturnMessage {
  message: string;
  status: number;
}
