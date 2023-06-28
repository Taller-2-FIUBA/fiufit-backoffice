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
    for (const metric of metricsToShow) {
        const primerElemento = m[0];
        miArr.push({title: "Users blocked", name: metric, value: primerElemento.count})
        console.log(primerElemento);
    }
    console.log("RESULTADO DEL SERVICE", miArr)
    return miArr
}