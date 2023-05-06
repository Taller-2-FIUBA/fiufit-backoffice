import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { doFetch } from './utils/fetchUtils';

export interface Training {
    id: string,
    title: string,
    description: string,
    type: string,
    difficulty: string,
    media: string,
    goals: Array<string>,
    is_blocked: boolean,
}

const baseTrainingsUrl = `${process.env.REACT_APP_TRAININGS_URL}`;

async function updateTraining(training: Training): Promise<Training> {
    return doFetch(baseTrainingsUrl, false, { 
        method: 'patch'
    });
}

async function getTrainings(): Promise<Training[]> {
    return doFetch(baseTrainingsUrl, true, {
        method: 'get'
    });
}

export function useTrainingsData() {
    return useQuery(['trainings'], () => getTrainings(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
    });
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