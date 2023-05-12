import { LoggedAdmin } from "../AdminsService";

export function getToken(): string | null {
    const token = localStorage.getItem('token');
    return token;
}

export function setLoginInfo(loggedAdmin: LoggedAdmin) {
    localStorage.setItem('token', loggedAdmin.token);
    localStorage.setItem('admin', loggedAdmin.id);
}