export interface Admin {
    id: string;
    username: string,
    password: string,
    email: string,

}
  
const rows: Admin[] = [
    { id: '121', username: 'Valeria123', password: 'vale123', email: 'valeria.mrb@gmail.com'},
    { id: '122', username: 'L4ura', password: 'buenaPassword', email: 'ldiaz@gmail.com'},
    { id: '123', username: 'Lautaro_Gil', password: '123456!', email: 'lautr@gmail.com'}
];

const un_admin: Admin[] = [
    { id: '121', username: 'Valeria123', password: 'vale123', email: 'valeria.mrb@gmail.com'},
];


export async function getAdmins(): Promise<Admin[]> {
    try {
        const response = await fetch('http://localhost:8000/users/admin');
        if (response.ok) {
          const data = await response.json();
          return rows;
        //  return data;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export async function createAdmin(): Promise<Admin[]> {
    const body = {username: 'Valeria123', password: 'vale123', email: 'valeria.mrb@gmail.com'};
    try {
        const response = await fetch('http://localhost:8000/users/admin', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
          const data = await response.json();
          return un_admin;
        //  return data;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}