import { useQuery } from '@tanstack/react-query';
import { doFetch, reactQueryDefaultConfig } from './utils/fetchUtils';

export interface ServiceItem {
    type: string,
    name: string,
    url: string,
    description: string,
    is_up: boolean,
    uptime: number,
    http_method: string,
    created_date: string,
    documentation_page: string
}
export interface ServiceResponse {
    uptime: number,
}
const baseUsersUrl = `${process.env.REACT_APP_API_URL}/users/`;
const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}/trainings/`;
const baseGoalssUrl = `${process.env.REACT_APP_API_URL}/goals/`;

async function getUsersService(): Promise<ServiceResponse> {
    return doFetch(baseUsersUrl + 'healthcheck/', false, {
        method: 'GET'
    });
}
 async function getGoalsService(): Promise<ServiceResponse> {
    return doFetch(baseGoalssUrl + 'healthcheck/', false, {
        method: 'GET'
    });
}
async function getTrainingService(): Promise<ServiceResponse> {
    return doFetch(baseTrainingsUrl + 'healthcheck/', false, {
        method: 'GET'
    });
}
export function useServiceUsersData() {
    return useQuery(['userservices'], () => getUsersService(), reactQueryDefaultConfig);
}
export function useServiceGoalsData() {
    return useQuery(['goalsservices'], () => getGoalsService(), reactQueryDefaultConfig);
}
export function useServiceTrainingsData() {
    return useQuery(['trainingsservices'], () => getTrainingService(), reactQueryDefaultConfig);
}

