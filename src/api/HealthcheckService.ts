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
            http_method: "POST",
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_users_login_post"
        }
    },
    {
        item: {
            type: "users",
            name: '/users',
            url: baseUsersUrl,
            description: "Retrieve details for all users currently present in the database.",
            is_up: false,
            uptime: 0,
            http_method: "GET",
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_all_users_get"
        }
    },
    {
        item: {
            type: "users",
            name: "/users",
            url: baseUsersUrl,
            description: "Create new user in Firebase, add it to the database if successful.",
            is_up: true,
            uptime: 0,
            http_method: "POST",
            created_date: "19-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/create_users_post"
        }
    },
    {
        item: {
            type: "users",
            name: "/users/usersIDP",
            url: baseUsersUrl,
            description: "Create new user with federated identity in database.",
            is_up: true,
            uptime: 0,
            http_method: "POST",
            created_date: "19-06-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/create_idp_user_users_usersIDP_post"
        }
    },
    {
        item: {
            type: "users",
            name: "/users/login/usersIDP",
            url: baseUsersUrl,
            description: "Verify user is logged in through IDP and return token.",
            is_up: true,
            uptime: 0,
            http_method: "POST",
            created_date: "19-06-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/login_idp_users_login_usersIDP_post"
        }
    },{
        item: {
            type: "users",
            name: "/users/{_id}",
            url: baseUsersUrl,
            description: "Retrieve details for users with specified id.",
            is_up: true,
            uptime: 0,
            http_method: "GET",
            created_date: "04-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_one_users___id__get"
        }
    },{
        item: {
            type: "users",
            name: "/users/{_id}",
            url: baseUsersUrl,
            description: "Update user data.",
            is_up: true,
            uptime: 0,
            http_method: "PATCH",
            created_date: "04-05-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/patch_user_users___id__patch" 
        }
    },{
        item: {
            type: "users",
            name: "/users/{user_id}/wallet/",
            url: baseUsersUrl,
            description: "Retrieve wallet for users with specified id.",
            is_up: true,
            uptime: 0,
            http_method: "GET",
            created_date: "04-06-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_user_wallet_users__user_id__wallet__get"
        }},{
            item: {
            type: "users",
            name: "/users/deposit",
            url: baseUsersUrl,
            description: "Transfer specified money amount between specified users.",
            is_up: true,
            uptime: 0,
            http_method: "POST",
            created_date: "04-06-2023",
            documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/make_payment_users_deposit_post"
        }
    },{
        item: {
        type: "users",
        name: "/users/status/{_id}",
        url: baseUsersUrl,
        description: "Invert blocked status of a user.Only admins allowed, can't block other admins",
        is_up: true,
        uptime: 0,
        http_method: "PATCH",
        created_date: "04-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/change_status_users_status___id__patch"
    }
},{
    item: {
    type: "users",
    name: "/users/recovery/{username}",
    url: baseUsersUrl,
    description: "Request auth service to start password recovery for user_id.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "04-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/password_recovery_users_recovery__username__post"
}
},{
    item: {
    type: "users",
    name: "/users/{user_id}/followed",
    url: baseUsersUrl,
    description: "Retrieve all users followed by user with specified id.",    
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "04-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_followed_users_users__user_id__followed_get"
}
},{
    item: {
    type: "users",
    name: "/users/{user_id}/followers",
    url: baseUsersUrl,
    description: "Retrieve all users followed by user with specified id.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "04-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_user_followers_users__user_id__followers_get"
}
},{
    item: {
    type: "users",
    name: "/users/{user_id}/followed/{_id}",
    url: baseUsersUrl,
    description: "Retrieve all users followed by user with specified id.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "04-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/follow_user_users__user_id__followed___id__post"
}
},{
    item: {
    type: "users",
    name: "/users/{user_id}/followed/{_id}",
    url: baseUsersUrl,
    description: "Retrieve all users followed by user with specified id.",
    is_up: true,
    uptime: 0,
    http_method: "DELETE",
    created_date: "04-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/stop_following_user_users__user_id__followed___id__delete"
}
},{
    item: {
    type: "users",
    name: "/admins",
    url: baseUsersUrl,
    description: "Return all administrators.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "06-05-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/get_admins_admins_get"
}
},{
    item: {
    type: "users",
    name: "/admins",
    url: baseUsersUrl,
    description: "Create an admin.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "06-05-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/add_admin_admins_post"
}
},{
    item: {
    type: "users",
    name: "/admins/login",
    url: baseUsersUrl,
    description: "Login as administrator. Return token if successful.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "06-05-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/users/documentation/#/default/admin_login_admins_login_post"
}
},{
    item: {
    type: "goals",
    name: "/goals/{user_id}",
    url: baseUsersUrl,
    description: "Return all goals in database.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/get_goals_goals__user_id__get"
}
},{
    item: {
    type: "goals",
    name: "/goals/{user_id}",
    url: baseUsersUrl,
    description: "Create a new goal for user_id.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/add_goal_for_user_goals__user_id__post"
}
},{
    item: {
    type: "goals",
    name: "/goals/metrics",
    url: baseUsersUrl,
    description: "Return all metrics in database.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/get_metrics_goals_metrics_get"}
},{
    item: {
    type: "goals",
    name: "/goals/{goal_id}",
    url: baseUsersUrl,
    description: "Delete goal with goal_id.",
    is_up: true,
    uptime: 0,
    http_method: "DELETE",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/delete_user_goal_goals__goal_id__delete"
}},{
    item: {
    type: "goals",
    name: "/goals/{goal_id}",
    url: baseUsersUrl,
    description: "Update goal with goal_id.",
    is_up: true,
    uptime: 0,
    http_method: "PATCH",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/_update_goal_goals__goal_id__patch"
}}
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

