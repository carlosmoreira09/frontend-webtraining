export const Atletas: AtletasModel[] = [{
  "name": "Carlos",
  "position": "FrontEnd",
  "status": "onLine",
  "id": 1
},
{
"name": "Maria",
"position": "FrontEnd",
"status": "offline",
"id": 3
},
{
"name": "Joao",
"position": "Back",
"status": "onLine",
"id": 2
}];

export interface AtletasModel {
  name: string,
  position: string,
  status: string,
  id: number
}