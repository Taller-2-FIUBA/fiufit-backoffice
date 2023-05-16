import { LoggedAdmin } from "../AdminsService";

export function getToken(): string | null {
    const adminInfo = localStorage.getItem('admin');
    return adminInfo ? JSON.parse(adminInfo).token : null;
}

export function setAdminInfo(loggedAdmin: LoggedAdmin) {
    localStorage.setItem('admin', JSON.stringify(loggedAdmin));
}

export function clearAdminInfo() {
    localStorage.removeItem('admin');
    window.location.reload();
}

export function getAdminInfo(): LoggedAdmin | null {
    const adminInfo = localStorage.getItem('admin');
    return adminInfo ? JSON.parse(adminInfo) : null;
}