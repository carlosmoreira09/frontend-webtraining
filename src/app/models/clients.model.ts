export interface ClientsModel {
  "id_client": number;
  "fullName": string;
  "age": number;
  "email": string;
  "phone": string;
  "training_type": string;
  "isActive": boolean;
  "ids_sheets": number;
  "updatedAt": string;
  "createdAt": string;
}

export interface AthleteInfo {
  name: string;
  id?: number;
}
