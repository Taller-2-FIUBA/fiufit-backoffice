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
    {title: "Users blocked", name: 'user_blocked_count'}
    //TODO agregar acá el resto de métricas que vamos a mostrar
];

async function getMetric(metricName: string): Promise<UsersMetric[]> {
    return doFetch(baseMetricsUrl + `/metrics?name=${metricName}`, false, {
        method: 'GET'
    });
}

export async function getAllMetrics(): Promise<MetricsResponse[]>{
    const miArr: MetricsResponse[] = []
    
    for (const metric of metricsToShow) {
        const m = await getMetric(metric.name)
        const primerElemento = m[0];
        miArr.push({title: metric.title, name: metric.name, value: primerElemento.count})
        console.log(primerElemento);
    }
    console.log("RESULTADO DEL SERVICE", miArr)
    return miArr
}