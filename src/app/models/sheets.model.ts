import {ExerciseModel} from "./exercise.model";
import {ClientsModel} from "./clients.model";

export interface SheetsModel {
  id_sheet?: number;
  sheet_desc: string;
  sheet_details: string;
  sheet_name: string;
  training_quantity: number;
  training_a: ExerciseModel[];
  training_b: ExerciseModel[];
  training_c: ExerciseModel[];
  training_d: ExerciseModel[];
  training_e: ExerciseModel[];
  training_f: ExerciseModel[];
  id_client: ClientsModel | null;
}

export interface createNewSheet {
  id_sheet?: number;
  sheet_name: string;
  sheet_desc: string;
  training_quantity: number;
  sheet_details: string;
  training_a: string;
  training_b: string;
  training_c: string;
  training_d: string;
  training_e: string;
  training_f: string;
  id_client?: number,
}

export interface Modalidade {
  name: string;
  abbrev: string;
}

