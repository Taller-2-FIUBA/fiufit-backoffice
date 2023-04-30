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

const baseUsersUrl = `${process.env.REACT_APP_USERS_URL}`;

export async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(baseUsersUrl);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export async function getUser(userId?: string): Promise<User | undefined> {
    try {
        const response = await fetch(baseUsersUrl + "/" + userId);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}