import type { StoriesResponse } from "../types/realsData.type.ts";

const URL: string = "https://vlv.am/api/stories?login=VlvShopA&password=quHpuW9R0rGRbfW9R7SbNF6vfQ6k";

export const fetchStories = async (): Promise<StoriesResponse> => {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
        }

        const data: StoriesResponse = await response.json();

        console.log("Fetched movies:", data);

        return data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        throw error;
    }
};
