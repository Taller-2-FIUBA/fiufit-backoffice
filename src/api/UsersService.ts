export interface User {
    id: string;
    username: string,
    surname: string,
    email: string,
    registration_date: string,
    height?: number,
    weight?: number,
    location?: string,
    birth_date?: string,
    name: string,
    is_athlete: boolean,
    avatar?: string
}


const data = new Map<String, User>();

export async function getUsers(): Promise<User[]> {
    if (data.size > 0) {
        console.log('Uso la cache, data es: {}', data);
        return [...data.values()];
        
    }
    try 
        console.log('Hago la pegada a /users', data);
        const response = await fetch(`${process.env.REACT_APP_USERS_URL}`);
        if (response.ok) {
            const userResponse = await response.json();
            for (const user of userResponse) {
                data.set(user.id, user);
            }
            console.log('data es: {}', data);
            console.log('El tamaño de data es: {}', data.size);
            return [...data.values()];
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export async function getUser(userId?: string): Promise<User | undefined> {
    if (data.size === 0) {
        await getUsers();
    }
    return data.get(userId || '');
}


/* const testMap = new Map<string, User>([
    ["123", { id: '123', username: 'VRocha',  name: 'Valeria', surname: 'Rocha', email: 'valeria.mrb@gmail.com', registration_date: '1/04/2023', role: 'trainer' }],
    ["124", { id: '124', username: 'LDiaz', name: 'Laura', surname: 'Diaz', email: 'ldiaz@gmail.com', registration_date: '1/04/2023', role: 'trainer' }],
    ["125", { id: '125', username: 'LReact', name: 'Lautaro', surname: 'React', email: 'lautr@gmail.com', registration_date: '1/04/2023', role: 'athlete' }],
    ["126", { id: '126', username: 'MPaz', name: 'Mario', surname: 'Paz', email: 'mpaz@gmail.com', registration_date: '1/04/2023', role: 'athlete' }],
    ["127", { id: '127', username: 'GLara', name: 'Gimena', surname:'Lara', email: 'glara@gmail.com', registration_date: '1/04/2023', role: 'athlete' }],
]); */

/* */



