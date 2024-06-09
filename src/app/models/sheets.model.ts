export interface SheetsModel {
  "id_sheet": number;
  "sheet_desc": string;
  "sheet_details": string;
  "sheet_name": string;
  training_a: any[];
  training_b: any[];
  training_c: any[];
  training_d: any[];
  id_client: any;
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

