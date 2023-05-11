import { LoggedAdmin } from "../AdminsService";

export function getToken(): string {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('Token not found');
    }
    return token;
}

export function setLoginInfo(loggedAdmin: LoggedAdmin) {
    localStorage.setItem('token', loggedAdmin.token);
    localStorage.setItem('adminId', loggedAdmin.id);
}