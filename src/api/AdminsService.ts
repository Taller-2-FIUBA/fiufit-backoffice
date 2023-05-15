import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { doFetch, reactQueryDefaultConfig } from "./utils/fetchUtils";
import { setAdminInfo } from "./utils/localStorageUtils";

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

const baseAdminsUrl = `${process.env.REACT_APP_API_URL}/admins`;

async function createAdmin(admin: Admin): Promise<Admin> {
    const body = {password: admin.password, email: admin.email, username: admin.username};
    return doFetch(baseAdminsUrl, false, { 
        method: 'POST',
        body: JSON.stringify(body),
        headers: {'Content-Type': 'application/json'}
    });
}

export async function loginAdmin(loginRequestData: LoginRequestData): Promise<LoggedAdmin> {
    const response: LoggedAdmin = await doFetch(baseAdminsUrl + "/login", false, {
        method: 'POST',
        body: JSON.stringify(loginRequestData),
        headers: {'Content-Type': 'application/json'}
    });
    setAdminInfo(response);
    return response;
}


async function getAdmins(): Promise<Admin[]> {
    return doFetch(baseAdminsUrl, true, {
        method: 'get'
    });
}

export function useAdminsData() {
    return useQuery(['admins'], () => getAdmins(), reactQueryDefaultConfig);
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
