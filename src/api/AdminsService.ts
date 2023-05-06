import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doFetch } from "./utils/fetchUtils";
import { setLoginInfo } from "./utils/localStorageUtils";

export interface Admin {
    id: string
    username: string,
    password: string,
    email: string,
}

export interface LoggedAdmin {
    id: string,
    token: string
}

export interface LoginRequestData {
    email: string,
    password: string
}

async function createAdmin(admin: Admin): Promise<Admin> {
    const body = {password: admin.password, email: admin.email, username: admin.username};
    return doFetch(`${process.env.REACT_APP_ADMINS_URL}`, false, { 
        method: 'post',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
}

export async function loginAdmin(loginRequestData: LoginRequestData): Promise<LoggedAdmin> {
    const response: LoggedAdmin = await doFetch(`${process.env.REACT_APP_ADMIN_LOGIN}`, false, {
        method: 'post',
        body: JSON.stringify(loginRequestData),
        headers: {'Content-Type': 'application/json'}
    });
    setLoginInfo(response);
    return response;
}


async function getAdmins(): Promise<Admin[]> {
    return doFetch(`${process.env.REACT_APP_ADMINS_URL}`, true, {
        method: 'get'
    });
}

export function useAdminsData() {
    return useQuery(['admins'], () => getAdmins(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
        retry: false
    });
}

export function useCreateAdmin() {
    const queryClient = useQueryClient();
    return useMutation(createAdmin, {
        onSuccess: (data) => {
            queryClient.setQueryData(['admins'], 
                (old: any) => [...old, data]);
        }
    });
}
