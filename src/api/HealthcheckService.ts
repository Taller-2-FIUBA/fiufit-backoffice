import { useQuery } from '@tanstack/react-query';
import { doFetch, reactQueryDefaultConfig } from './utils/fetchUtils';


export interface ServiceItem {
    type: string,
    name: string,
    url: string,
    description: string,
    is_up: boolean,
    uptime: number,
    created_date: string,
    documentation_page: string
}
export interface ServiceResponse {
    uptime: number,
}
const baseUsersUrl = `${process.env.REACT_APP_API_URL}/users/`;
const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}/trainings/healthcheck/`;
const baseGoalssUrl = `${process.env.REACT_APP_API_URL}/goals/healthcheck/`;

export const services = [
    {
        item: {
            type: "users",
            name: '/users/login',
            url: baseUsersUrl + 'login',
            description: "Log in to Firebase with email, password. Return token if successful.",
            is_up: false,
            uptime: 0,
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_users_login_post"
        }
    },
    {
        item: {
            type: "users",
            name: '/users/',
            url: baseUsersUrl,
            description: "Retrieve details for all users currently present in the database.",
            is_up: false,
            uptime: 0,
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_users_login_post"
        }
    },
    {
        item: {
            type: "users",
            name: "/users/",
            url: baseUsersUrl,
            description: "Create new user in Firebase, add it to the database if successful.",
            is_up: true,
            uptime: 0,
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_users_login_post"
        }
    },
    {
        item: {
            type: "users",
            name: "/users/",
            url: baseUsersUrl,
            description: "Create new user with federated identity in database.",
            is_up: true,
            uptime: 0,
            created_date: "19-06-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_users_login_post"
        }
    },
]

async function getUsersService(): Promise<ServiceResponse> {
    return doFetch(baseUsersUrl + 'healthcheck/', false, {
        method: 'GET'
    });
}/*
 async function getTrainingsService(): Promise<ServiceResponse> {
    return doFetch(baseTrainingsUrl, false, {
        method: 'GET'
    });
}*/
export function useServiceUsersData() {
    return useQuery(['userservices'], () => getUsersService(), reactQueryDefaultConfig);
}/*
export function useServiceTrainingsData() {
    return useQuery(['trainingservices'], () => getTrainingsService(), reactQueryDefaultConfig);
}*/

