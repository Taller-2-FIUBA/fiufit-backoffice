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

export async function createAdmin(admin: Admin): Promise<Admin> {
    const body = {password: admin.password, email: admin.email, username: admin.username};
    try {
        const response = await fetch(`${process.env.REACT_CREATE_ADMIN}`, {
            method: 'post',
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

export async function loginAdmin(email: string ,password: string): Promise<LoggedAdmin> {
    const body = {password: password, email: email};
    try {
        console.log("Login con ", body)
        const response = await fetch(`${process.env.REACT_APP_ADMINS_URL}`, {
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

const data = new Map<String, Admin>();

export async function getAdmins(): Promise<Admin[]> {
    if (data.size > 0) {
        console.log('Uso la cache, data es: {}', data);
        return Array.from(data.values());
    }
    try {
        const response = await fetch(`${process.env.REACT_APP_ADMINS_URL}`)
        console.log(response)
        if (response.ok) {
            const adminResponse = await response.json();
            for (const admin of adminResponse) {
                data.set(admin.id, admin);
            }
            return Array.from(data.values());
      } else {
          throw new Error(`Request failed with status ${response.status}`);
       }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}
