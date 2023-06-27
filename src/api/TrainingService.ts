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
    limit: number,
    total:number
}
export interface TrainingTypesResponse{
    items: string[],
}

const baseTrainingsUrl = `${process.env.REACT_APP_API_URL}/trainings`;

async function updateTraining(training: Training): Promise<Training> {
    await doFetch(baseTrainingsUrl + `/${training.id}`, true, { 
        method: 'PATCH',
        body: JSON.stringify({blocked: !training.blocked}),
        headers: {'Content-Type': 'application/json'}
    });
    training.blocked = !training.blocked;
    return training;
    
}

async function getTrainings(page:number, rowsPerPage:number, filters?: Filters): Promise<TrainingResponse> { 
    const offset = page * rowsPerPage;

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

        return doFetch(baseTrainingsUrl + `?${new URLSearchParams(queryParams)}&offset=${offset}&limit=${rowsPerPage}`, false, {
            method: 'GET'
        });
    }else{
        return doFetch(baseTrainingsUrl + `?offset=${offset}&limit=${rowsPerPage}`, false, {
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
export function useTrainingsData(page: number, rowsPerPage: number, filters?: Filters) {
    return useQuery(['trainings', page, rowsPerPage], () => getTrainings(page, rowsPerPage, filters), reactQueryDefaultConfig);
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