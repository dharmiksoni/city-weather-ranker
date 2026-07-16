import axios from "axios";


// exponential backoff with retry
export async function fetchWithRetry(url: string, params: any, retries = 3): Promise<any> {
    for (let i = 0; i < retries; i++) {
        try {
            const response = await axios.get(url, { params });
            return response;
        } catch (error) {
            if (i === retries - 1) throw error;
            const delay = Math.pow(2, i) * 1000; // 1s, 2s, 4s
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}