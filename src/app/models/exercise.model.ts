export interface ExerciseModel {
  id_user?: number;
  id_exercise?: number;
  exercise?: string;
  exercise_desc?: string;
  exercise_type?: string;
  repetition?: string;
  videoName?: string;
}

export interface ReturnMessage {
  message: string;
  status: number;
  id?: any;
}
