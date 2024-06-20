import {SheetsModel} from "./sheets.model";

export interface ClientsModel {
  id_client: number;
  fullName: string;
  age: number;
  email: string;
  phone: string;
  training_type: string;
  isActive: boolean;
  id_sheets?: SheetsModel;
  updatedAt: string;
  createdAt: string;
}

export interface AthleteInfo {
  name: string;
  id?: number;
}
