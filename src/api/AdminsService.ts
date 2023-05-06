import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

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

async function createAdmin(admin: Admin): Promise<Admin> {
    const body = {password: admin.password, email: admin.email, username: admin.username};
    try {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const response = await fetch(`${process.env.REACT_APP_ADMINS_URL}`, {
            method: 'post',
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

export async function loginAdmin(email: string ,password: string): Promise<LoggedAdmin> {
    const body = {password: password, email: email};
    try {
        const response = await fetch(`${process.env.REACT_APP_ADMIN_LOGIN}`, {
            method: 'post',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        console.log(response)
        if (response.ok) {
          const data = await response.json();
          console.log("Response del login ",data)
          return data;
        } else {
            console.log("Response error: ", response)
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        console.log(error)
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}


async function getAdmins(): Promise<Admin[]> {
    const token = localStorage.getItem('token');
    try {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        const response = await fetch(`${process.env.REACT_APP_ADMINS_URL}`, {
            method: 'get',
            headers: headers
        })
        if (response.ok) {
            const adminResponse = await response.json();
            return adminResponse;
      } else {
          throw new Error(`Request failed with status ${response.status}`);
       }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
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
