//import axios from 'axios';

export interface User {
    firstName: string,
    lastName: string,
    email: string,
    registrationDate: string,
    role: string,
    avatar? : string,
    bio? : string
}
  
const rows: User[] = [
    { firstName: 'Valeria', lastName: 'Rocha', email: 'valeria.mrb@gmail.com', registrationDate: '1/04/2023', role: 'trainer' },
    { firstName: 'Laura', lastName: 'Diaz', email: 'ldiaz@gmail.com', registrationDate: '1/04/2023', role: 'trainer' },
    { firstName: 'Lautaro', lastName: 'React', email: 'lautr@gmail.com', registrationDate: '1/04/2023', role: 'athlete' },
    { firstName: 'Mario', lastName: 'Paz', email: 'mpaz@gmail.com', registrationDate: '1/04/2023', role: 'athlete' },
    { firstName: 'Gimena', lastName:'Lara', email: 'glara@gmail.com', registrationDate: '1/04/2023', role: 'athlete' },
];

/* export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch('/api/users');
        if (response.ok) {
          const data = await response.json();
          //return data;
          return rows;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
} */

export async function getUsers(): Promise<User[]> {
    return rows;
}