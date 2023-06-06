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
    title: string,
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
export interface TrainingTypesResponse{
    items: string[],
}

const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}/trainings`;

async function updateTraining(training: Training): Promise<Training> {
    return doFetch(baseTrainingsUrl + `/${training.id}`, true, { 
        method: 'PATCH',
        body: JSON.stringify({blocked: !training.blocked}),
        headers: {'Content-Type': 'application/json'}
    });
}

async function getTrainings(filters?: Filters): Promise<TrainingResponse> { 
    var queryParams = ""
    var connection = ""
    if(filters?.trainer_id){
        queryParams += connection + "trainer_id=" + filters.trainer_id;
    }
    if(filters?.type && filters?.difficulty){
        connection = "&"
    } else { connection = ""}
    if(filters?.type){
        queryParams += connection + "training_type=" + filters.type;
    if(filters?.difficulty){
        queryParams += connection + "difficulty=" + filters.difficulty;
    }
        return doFetch(baseTrainingsUrl + `?${new URLSearchParams(queryParams)}`, false, {
            method: 'GET'
        });
    }else{
        return doFetch(baseTrainingsUrl, false, {
            method: 'GET'
        });
    }
    
}

export function useTrainingTypes() {
    return useQuery<TrainingTypesResponse>(['trainingTypes'], getTrainingTypes);
}

export async function getTrainingTypes(): Promise<TrainingTypesResponse> {
    return doFetch(baseTrainingsUrl + `/types/`, false, {
        method: 'GET'
    });
}
export interface Filters {
    title: string, 
    trainer_id: string,
    type: string;
    difficulty: string;
  }
export function useTrainingsData(filters?: Filters) {
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