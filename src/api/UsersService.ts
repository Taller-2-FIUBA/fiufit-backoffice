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
    const body = {is_blocked: user.is_blocked};
    try {
        const response = await fetch(baseUsersUrl + "/" + user.id, {
            method: 'patch',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
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
            return userResponse;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

async function getUser(userId?: string): Promise<User | undefined> {
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

export function useUsersData() {
    return useQuery(['users'], () => getUsers(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
    });
}

export function useUserData(userId?: string) {
    return useQuery(['users', userId], () => getUser(userId), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
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
