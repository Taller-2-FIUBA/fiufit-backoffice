import { useQuery } from '@tanstack/react-query';

export interface Training {
    id: string,
    title: string,
    description: string,
    type: string,
    difficulty: string,
    media: string,
    goals: Array<string>,
}

const baseTrainingsUrl = `${process.env.REACT_APP_TRAININGS_URL}`;

async function getTrainings(): Promise<Training[]> {
    try {
        const response = await fetch(baseTrainingsUrl);
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

async function getTraining(trainingId?: string): Promise<Training | undefined> {
    try {
        const response = await fetch(baseTrainingsUrl + "/" + trainingId);
        if (response.ok) {
            const trainingResponse = await response.json();
            return trainingResponse;
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}

export function useTrainingsData() {
    return useQuery(['trainings'], () => getTrainings(), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
    });
}

export function useTrainingData(trainingId?: string) {
    return useQuery(['training', trainingId], () => getTraining(trainingId), {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        staleTime: 60000,
    });
}