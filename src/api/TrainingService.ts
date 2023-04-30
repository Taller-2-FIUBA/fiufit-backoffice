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

export async function getTrainings(): Promise<Training[]> {
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

export async function getTraining(trainingId?: string): Promise<Training | undefined> {
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