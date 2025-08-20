import { useState, useRef, useCallback } from "react";
import type { Story } from "../types/realsData.type";

const useVideoPlayer = () => {
    const videoRefs = useRef<Record<Story["id"], HTMLVideoElement | null>>({});

    const [mutedMap, setMutedMap] = useState<Record<Story["id"], boolean>>({});
    const [playingMap, setPlayingMap] = useState<Record<Story["id"], boolean>>({});

    const toggleMute = useCallback((id: Story["id"]) => {
        setMutedMap((prev) => {
            const newMuted = !prev[id];
            const video = videoRefs.current[id];
            if (video) video.muted = newMuted;
            return { ...prev, [id]: newMuted };
        });
    }, []);

    const togglePlayPause = useCallback((id: Story["id"]) => {
        const video = videoRefs.current[id];
        if (!video) return;

        if (video.paused) {
            video.play();
            setPlayingMap((prev) => ({ ...prev, [id]: true }));
        } else {
            video.pause();
            setPlayingMap((prev) => ({ ...prev, [id]: false }));
        }
    }, []);

    const registerVideoRef = useCallback((id: Story["id"], ref: HTMLVideoElement | null) => {
        if (!ref) return;
        videoRefs.current[id] = ref;

        setMutedMap((prev) => (id in prev ? prev : { ...prev, [id]: true }));
        setPlayingMap((prev) => (id in prev ? prev : { ...prev, [id]: true }));
    }, []);

    return {
        videoRefs,
        mutedMap,
        playingMap,
        toggleMute,
        togglePlayPause,
        registerVideoRef,
        setPlayingMap,
        setMutedMap,
    };
};

export default useVideoPlayer;
