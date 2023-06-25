import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { doFetch, reactQueryDefaultConfig } from './utils/fetchUtils';


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
    total: number, 
    page: number, 
    size: number, 
    pages: number
}

const baseUsersUrl = `${process.env.REACT_APP_API_URL}/users`;


async function updateUser(user: UserItem): Promise<UserItem> {
    return doFetch(baseUsersUrl + `/status/${user.id}` , true, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'}
    });
}

async function getUsers(page: number, limit:number): Promise<UserResponse> {
    const offset = page * limit;
    const url = baseUsersUrl + "?offset=" + offset + "&limit=" + limit;
    return doFetch(url, false, {
        method: 'GET'
    });
}

export function useUsersData(page: number, rowsPerPage: number) {
    console.log("ROWS PER PAGE", rowsPerPage);
    console.log("PAGE", page);

    return useQuery(['users', page, rowsPerPage], () => getUsers(page,rowsPerPage), reactQueryDefaultConfig);
}

export function useUserUpdate() {
    const queryClient = useQueryClient();
    return useMutation(updateUser, {
        onSuccess: (data) => {
            console.log("User updated: ", data);
            queryClient.invalidateQueries(['users']);
        }
    });
}
