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
    balance?: number
}
export interface TransactionItem {
    sender: string,
    receiver: string, 
    amount: number, 
    date: string
}
export interface UserResponse {
    items: UserItem[],
    total: number, 
    page: number, 
    size: number, 
    pages: number
}

export interface BalanceResponse {
    balance: Balance
}
export interface Balance {
    balance: number
}
export interface TransactionsResponse {
    items: TransactionItem[],
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

export async function addFundsToUser(user: UserItem, amount: string): Promise<UserItem> {
    
    return doFetch(baseUsersUrl + `/${user.id}/wallet/balance` , true, {
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

export async function getBalance(user: UserItem): Promise<BalanceResponse> {
    const url = baseUsersUrl + `/${user.id}/wallet/balance`;
    return doFetch(url, true, {
        method: 'GET'
    });
}
export function useUsersData(page: number, rowsPerPage: number) {
    return useQuery(['users', page, rowsPerPage], () => getUsers(page,rowsPerPage), reactQueryDefaultConfig);
}

export function useTransactionsData(page: number, rowsPerPage: number) {
    return useQuery(['transactions', page, rowsPerPage], () => getUsersTransactions(page,rowsPerPage), reactQueryDefaultConfig);
}

export function getUsersTransactions(page: number, limit:number): Promise<TransactionsResponse> {
    const offset = page * limit;
    const url = baseUsersUrl + "/transactions?offset=" + offset + "&limit=" + limit;
    return doFetch(url, true, {
        method: 'GET'
    });
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