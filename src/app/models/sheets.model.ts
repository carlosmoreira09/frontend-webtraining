import {ExerciseModel} from "./exercise.model";
import {ClientsModel} from "./clients.model";

export interface SheetsModel {
  "id_sheet": number;
  "sheet_desc": string;
  "sheet_details": string;
  "sheet_name": string;
  training_a: ExerciseModel[];
  training_b: ExerciseModel[];
  training_c: ExerciseModel[];
  training_d: ExerciseModel[];
  id_client: ClientsModel;
}
export interface createNewSheet {
  sheet_name: string;
  sheet_desc: string;
  sheet_details: string;
  training_a: string;
  training_b: string;
  training_c: string;
  training_d: string;
  id_client?: number,
}

