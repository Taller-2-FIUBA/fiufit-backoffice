import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doFetch, reactQueryDefaultConfig } from './utils/fetchUtils';


export interface Excercise {
    name: string,
    type: string,
    count: number,
    series: number
}
export interface Training {
    id: string,
    trainer_id: string,
    tittle: string,
    description: string,
    type: string,
    difficulty: string,
    media: string,
    exercises: Excercise[],
    blocked: boolean,
    rating: number
}

export interface TrainingResponse {
    items: Training[],
    offset: number,
    limit: number
}

const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}/trainings`;

async function updateTraining(training: Training): Promise<Training> {
    return doFetch(baseTrainingsUrl + `/${training.id}`, true, { 
        method: 'patch',
        body: JSON.stringify({blocked: !training.blocked}),
    });
}

async function getTrainings(filters?: any): Promise<TrainingResponse> {
    if(filters){
        console.log("BUSQUEDA CON FILTROS")
        console.log(filters)
        
        const queryParams = "training_type=Cardio";
        return doFetch(baseTrainingsUrl + `?${new URLSearchParams(queryParams)}`, false, {
            method: 'get'
        });
    }else{
        return doFetch(baseTrainingsUrl, false, {
            method: 'get'
        });
    }
    
}

export function useTrainingsData(filters?: any) {
    return useQuery(['trainings'], () => getTrainings(filters), reactQueryDefaultConfig);
}


export function useTrainingUpdate() {
    const queryClient = useQueryClient();
    return useMutation(updateTraining, {
        onSuccess: (data) => {
            queryClient.setQueryData(['trainings'], (old: Training[] | undefined) => {
                if (old) {
                    const index = old.findIndex((training) => training.id === data.id);
                    if (index !== -1) {
                        old[index] = data;
                    }
                }
                return old;
            });
        }
    });
}