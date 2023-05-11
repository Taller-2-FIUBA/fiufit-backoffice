import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
    const body = {is_blocked: training.is_blocked};
    try {
        const response = await fetch(baseTrainingsUrl + "/" + training.id, {
            method: 'patch',
            body: JSON.stringify(body),
            headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
          const data = await response.json();
          return data;
        } else {
          throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

async function getTrainings(): Promise<Training[]> {
    const token = localStorage.getItem('token');
    try {
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);
        const response = await fetch(baseTrainingsUrl, {
            method: 'get',
            headers: headers
        })
        if (response.ok) {
            const trainingResponse = await response.json();
            return trainingResponse;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch trainings: ${error.message}`);
    }
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