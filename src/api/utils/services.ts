const baseUsersUrl = `${process.env.REACT_APP_API_URL}`;
const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}`;
const baseGoalssUrl = `${process.env.REACT_APP_API_URL}`;


export const services = [
    {
        item: {
            type: "users",
            name: '/users/login',
            url: baseUsersUrl + '/users/login',
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
            url: baseUsersUrl + '/users',
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
            url: baseUsersUrl + '/users',
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
            url: baseUsersUrl + '/users/usersIDP',
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
            url: baseUsersUrl + '/users/login/usersIDP',
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
            url: baseUsersUrl + "/users/{_id}",
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
            url: baseUsersUrl + "/users/{_id}",
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
            url: baseUsersUrl +  "/users/{user_id}/wallet/",
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
            url: baseUsersUrl + "/users/deposit",
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
        url: baseUsersUrl + "/users/status/{_id}",
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
    url: baseUsersUrl + "/users/recovery/{username}",
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
    url: baseUsersUrl + "/users/{user_id}/followed",
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
    url: baseUsersUrl +  "/users/{user_id}/followers",
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
    url: baseUsersUrl + "/users/{user_id}/followed/{_id}",
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
    url: baseUsersUrl +  "/users/{user_id}/followed/{_id}",
    description: "Delete an user followed by user with specified id.",
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
    url: baseUsersUrl + "/admins",
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
    url: baseUsersUrl + "/admins",
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
    url: baseUsersUrl + "/admins/login",
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
    url: baseGoalssUrl + "/goals/{user_id}",
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
    url: baseGoalssUrl +  "/goals/{user_id}",
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
    url: baseGoalssUrl + "/goals/metrics",
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
    url: baseGoalssUrl + "/goals/{goal_id}",
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
    url: baseGoalssUrl + "/goals/{goal_id}",
    description: "Update goal with goal_id.",
    is_up: true,
    uptime: 0,
    http_method: "PATCH",
    created_date: "01-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/goals/documentation/#/default/_update_goal_goals__goal_id__patch"
}},{
    item: {
    type: "trainings",
    name: "/trainings",
    url: baseTrainingsUrl + "/trainings",
    description: "Get trainings matching a filtering criteria.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/get_trainings_trainings_get"
}},{
    item: {
    type: "trainings",
    name: "/trainings",
    url: baseTrainingsUrl + "/trainings",
    description: "Create a training.",
    is_up: true,
    uptime: 0,
    http_method: "POST",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/create_training_trainings_post"
}
},{
    item: {
    type: "trainings",
    name: "/trainings",
    url: baseTrainingsUrl + "/trainings/{training_id}",
    description: "Get one training.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/"}
},{
    item: {
    type: "trainings",
    name: "/trainings",
    url: baseTrainingsUrl + "/trainings/{training_id}",
    description: "Modify one training.",
    is_up: true,
    uptime: 0,
    http_method: "PATCH",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/modify_training_trainings__training_id__patch"}
},{
    item: {
    type: "trainings",
    name: "/trainings/types",
    url: baseTrainingsUrl + "/trainings/types",
    description: "Get training types.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/get_types_trainings_types__get"
}},{
    item: {
    type: "trainings",
    name: "/trainings/exercises",
    url: baseTrainingsUrl + "/trainings/exercises",
    description: "Get training excercises.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/get_exercises_trainings_exercises__get"
}}
,{
    item: {
    type: "trainings",
    name: "/users/{user_id}/trainings",
    url: baseTrainingsUrl + "/trainings/exercises",
    description: "Return a user favourite trainings.",
    is_up: true,
    uptime: 0,
    http_method: "GET",
    created_date: "21-06-2023",
    documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/get_exercises_trainings_exercises__get"
}}
    ,{
        item: {
        type: "trainings",
        name: "/users/{user_id}/trainings",
        url: baseTrainingsUrl + "/trainings/exercises",
        description: "Save a training in user favourites.",
        is_up: true,
        uptime: 0,
        http_method: "POST",
        created_date: "21-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/save_training_for_user_users__user_id__trainings_post"
    }} 
    ,{
        item: {
        type: "trainings",
        name: "/users/{user_id}/trainings/{training_id}",
        url: baseTrainingsUrl + "/users/{user_id}/trainings/{training_id}",
        description: "Rate a training.",
        is_up: true,
        uptime: 0,
        http_method: "PUT",
        created_date: "21-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/rate_training_users__user_id__trainings__training_id__put"
    }} 
    ,{
        item: {
        type: "trainings",
        name: "/users/{user_id}/trainings/{training_id}",
        url: baseTrainingsUrl + "/users/{user_id}/trainings/{training_id}",
        description: "Delete a training in user favourites.",
        is_up: true,
        uptime: 0,
        http_method: "DELETE",
        created_date: "21-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/delete_training_for_user_users__user_id__trainings__training_id__delete"
    }} 
    ,{
        item: {
        type: "trainings",
        name: "/users/{user_id}/trainings/{training_id}/rating",
        url: baseTrainingsUrl + "/users/{user_id}/trainings/{training_id}/rating",
        description: "Get a training rating by a user.",
        is_up: true,
        uptime: 0,
        http_method: "GET",
        created_date: "21-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/delete_training_for_user_users__user_id__trainings__training_id__delete"
    }} 
    ,{
        item: {
        type: "trainings",
        name: "/users/{user_id}/trainings/{training_id}/rating",
        url: baseTrainingsUrl + "/users/{user_id}/trainings/{training_id}/rating",
        description: "Get a training rating by a user.",
        is_up: true,
        uptime: 0,
        http_method: "GET",
        created_date: "21-06-2023",
        documentation_page: "https://fiufit-ingress-taller2-marianocinalli.cloud.okteto.net/trainings/documentation/#/default/delete_training_for_user_users__user_id__trainings__training_id__delete"
    }} 
 ]