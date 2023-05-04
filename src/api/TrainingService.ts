export interface Training {
    id: string,
    title: string,
    description: string,
    type: string,
    difficulty: string,
    media: string,
    goals: Array<string>,
}


const data = new Map<String, Training>();

export async function getTrainings(): Promise<Training[]> {
    if (data.size > 0) {
        return Array.from(data.values());
        
    }
    try {
        /* const response = await fetch(`${process.env.REACT_APP_USERS_URL}`);
        if (response.ok) {
            const userResponse = await response.json();
            for (const user of userResponse) {
                data.set(user.id, user);
            }
            return Array.from(data.values());
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        } */
        return [{
            id: "001",
            title: "Running",
            description: "Running training",
            type: "running",
            difficulty: "easy",
            media: "http://localhost",
            goals:  ["goal1", "goal2", "goal3"]
        }];
    } catch (error: any) {
        throw new Error(`Failed to fetch trainings: ${error.message}`);
    }
}

export async function getTraining(trainingId?: string): Promise<Training | undefined> {
    if (data.size === 0) {
        await getTraining();
    }
    return data.get(trainingId || '');
}