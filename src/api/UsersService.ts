import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

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


async function updateUser(user: User): Promise<User> {
    const token = localStorage.getItem('token');
    const body = {is_blocked: user.is_blocked};
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json')
        headers.append("Authorization", `Bearer ${token}`);
        
        const response = await fetch(baseUsersUrl + "/status/" + user.id, {
            mode: 'no-cors',
            method: 'patch',
            body: JSON.stringify(body),
            headers: headers
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

async function getUsers(): Promise<User[]> {
    try {
        const response = await fetch(baseUsersUrl);
        if (response.ok) {
            const userResponse = await response.json();
            return userResponse.items;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export function useUsersData() {
    return useQuery(['users'], () => getUsers(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
        retry: false
    });
}

export function useUserUpdate() {
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onSuccess: (data) => {
            console.log("User updated: ", data)
            queryClient.setQueryData(['users'], (old: User[] | undefined) => {
                if (old) {
                    const index = old.findIndex((user) => user.id === data.id);
                    if (index !== -1) {
                        old[index] = data;
                    }
                }
                return old;
            });
        }
    });
}
