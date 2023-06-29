import { doFetch } from "./utils/fetchUtils";

export interface UsersMetric {
    label: string,
    count: number,
}

export interface MetricsResponse {
    title: string,
    value: UsersMetric[]
}

const baseMetricsUrl = `${process.env.REACT_APP_API_URL}`;

const metricsToShow = [
    {title: "Users blocked", name: 'user_blocked_count', options: []},
    {title: "Users Recovery password", name: 'user_password_recovery_count', options: []},
    {title: "Login count", name: 'user_login_count', options: ['using_email_password', 'using_idp']},
    {title: "Created count ", name: 'user_created_count', options: ['using_idp','using_email_password']},
    {title: "User by location", name: 'user_by_region_count', options: []}
];

async function getMetric(metricName: string): Promise<UsersMetric[]> {
    return doFetch(baseMetricsUrl + `/metrics?name=${metricName}`, false, {
        method: 'GET'
    });
}

export async function getAllMetrics(): Promise<MetricsResponse[]>{

console.log("llamada uno")
    var miArr: MetricsResponse[] = []
    
    for (var metric of metricsToShow) {
        console.log("metric name", metric.name)
        
        const response: UsersMetric[] = await getMetric(metric.name)
        var lista:UsersMetric[] = []

        for(var i=0 ; i <= response.length; i++){
            console.log("elemento", response)

            const element = response[i];

            if(element){ //Esto pasa porque a veces viene undefines
                console.log("Estoy guardando", element);               
                lista.push({
                    label: element.label,
                    count:  element? element.count : 0

                })
            }
            
        }
        miArr.push({
            title: metric.title, 
            //name: metric.name, 
            value: lista
        })
    }
    console.log("RESULTADO DEL SERVICE", miArr)
    return miArr
}