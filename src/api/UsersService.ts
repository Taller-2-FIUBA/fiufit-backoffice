import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doFetch } from './utils/fetchUtils';


export interface UserItem {
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
export interface UserResponse {
    items: UserItem[],
}

const baseUsersUrl = `${process.env.REACT_APP_USERS_URL}`;


async function updateUser(user: UserItem): Promise<UserItem> {
    return doFetch(baseUsersUrl, true, {
        method: 'patch'
    });
}

async function getUsers(): Promise<UserResponse> {
    return doFetch(baseUsersUrl, false, {
        method: 'get'
    });
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
            queryClient.setQueryData(['users'], (old: UserResponse | undefined) => {
                if (old && old.items) {
                    const index = old.items.findIndex((user) => user.id === data.id);
                    if (index !== -1) {
                        old.items[index] = data;
                    }
                }
                return old;
            });
        }
    });
}
