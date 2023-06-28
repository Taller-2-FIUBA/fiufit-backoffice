import { doFetch } from "./utils/fetchUtils";

export interface UsersMetric {
    label: string,
    count: number,
}

export interface MetricsResponse {
    title: string,
    name: string,
    value: number
}

const baseMetricsUrl = `${process.env.REACT_APP_API_URL}`;

const metricsToShow = [
    'user_blocked_count'
];

async function getMetric(metricName: string): Promise<UsersMetric[]> {
    return doFetch(baseMetricsUrl + `/metrics?name=${metricName}`, false, {
        method: 'GET'
    });
}

export async function getAllMetrics(): Promise<MetricsResponse[]>{
    const miArr: MetricsResponse[] = []
    
    const m = await getMetric('user_blocked_count')

        const primerElemento = m[0];
        miArr.push({title: "Users blocked", name: 'user_blocked_count', value: primerElemento.count})
        console.log(primerElemento);
      
    console.log("RESULTADO DEL SERVICE", miArr)
    return miArr
}
/*
export async function getUsersMetrics(): Promise<UsersMetric[]> {
    //try {
        //const response = await fetch(`${process.env.REACT_APP_USERS_METRICS_URL}`);
        //if (response.ok) {
        //    const usersMetricsResponse = await response.json();
            const metrics = [
                { id: '01', name: 'Blocked users', value: 100 },
                { id: '02', name: 'Usuarios utilizando identidad federada', value: 50 },
                { id: '03', name: 'Login con mail y contraseña', value: 200 },
                { id: '04', name: 'Login con identidad federada', value: 75 },
                { id: '05', name: 'Usuarios bloqueados', value: 10 },
                { id: '06', name: 'Recupero de contraseña', value: 20 },
                { id: '07', name: 'Usuarios por zona geográfica', value: 150 },
              ];
              return metrics;
     /*    } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch users metrics: ${error.message}`);
    } */
/*}*/