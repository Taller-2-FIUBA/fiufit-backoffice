import { clearAdminInfo, getToken } from "./localStorageUtils";

interface FetchOptions {
    method: string,
    body?: any,
    headers?: any,
    mode?: RequestMode
}

function addTokenToRequest(options: FetchOptions) {
    const token = getToken();
    if (!options.headers) {
        options.headers = {};
    }
    options.headers['Authorization'] = `Bearer ${token}`;
}

export const reactQueryDefaultConfig = {
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    staleTime: 60000,
    retry: false
}

export async function doFetch<T>(url: string, useToken: boolean, options: FetchOptions): Promise<T> {
    try {
        if (useToken) {
            addTokenToRequest(options);
        }
        const response = await fetch(url, options);
        if (response.ok) {
            const responseJson = await response.json();
            return responseJson;
        } else if (response.status === 401) {
          clearAdminInfo();
          throw new Error('Unauthorized');
        } else {
            throw new Error(`Request failed with status ${response.status}`);
        }
    } catch (error: any) {
        throw new Error(`Failed to fetch data: ${error.message}`);
    }
}