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
    is_blocked: boolean,
}


const data = new Map<String, User>();

export async function getUsers(token: string): Promise<User[]> {
    if (data.size > 0) {
        console.log('Uso la cache, data es: {}', data);
        return Array.from(data.values());
        
    }
    try {
        console.log('Hago la pegada a /users', data);
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const options = {
            method: "GET",
            headers: headers,
          };

        const response = await fetch(`${process.env.REACT_APP_USERS_URL}`,options);
        if (response.ok) {
            const userResponse = await response.json();
            for (const user of userResponse) {
                data.set(user.id, user);
            }
            console.log('data es: {}', data);
            console.log('El tamaño de data es: {}', data.size);
            return Array.from(data.values());
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export async function getUser(token: string,userId?: string): Promise<User | undefined> {
    if (data.size === 0) {
        await getUsers(token);
    }
    return data.get(userId || '');
}