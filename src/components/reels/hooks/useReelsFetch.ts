import { useEffect, useState } from "react";
import type { StoriesResponse } from "../types/realsData.type";
import { fetchStories } from "../service/fetchReelsData.service";

const useReelsFetch = () => {
    const [stories, setStories] = useState<StoriesResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchData = async () => {
        try {
            const data = await fetchStories();
            console.log(data, "data");
            setStories(data);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { stories, loading, error };
};

export default useReelsFetch;
