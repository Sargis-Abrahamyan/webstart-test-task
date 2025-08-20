import { useCallback, useMemo, useState, useRef } from "react";
import type { StoriesResponse, Story } from "../types/realsData.type";
import type { Swiper as SwiperType } from "swiper/types";

export interface UseShowReelsProps {
    videoRefs: React.MutableRefObject<Record<Story["id"], HTMLVideoElement | null>>;
    setPlayingMap: React.Dispatch<React.SetStateAction<Record<Story["id"], boolean>>>;
    setMutedMap: React.Dispatch<React.SetStateAction<Record<Story["id"], boolean>>>;
    stories: StoriesResponse | null;
}

const useShowReels = ({ videoRefs, setPlayingMap, setMutedMap, stories }: UseShowReelsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedStoryId, setSelectedStoryId] = useState<Story["id"] | null>(null);

    const swiperRef = useRef<SwiperType | null>(null);

    const handleOpenSlider = useCallback(
        (id: Story["id"]) => {
            setSelectedStoryId(id);
            setIsOpen(true);

            setPlayingMap((prev) => ({ ...prev, [id]: true }));
            setMutedMap((prev) => ({ ...prev, [id]: false }));
            requestAnimationFrame(() => {
                const video = videoRefs.current[id];
                if (video) {
                    video.currentTime = 0;
                    video.play();
                    video.muted = false;
                }
            });
        },
        [setPlayingMap, videoRefs]
    );
    const handleCloseSlider = useCallback(() => {
        setIsOpen(false);
        stories?.stories.forEach((story) => {
            const video = videoRefs.current[story.id];
            if (video) {
                video.pause();
                video.currentTime = 0;
                video.src = "";
            }
        });
        setPlayingMap({});
        setMutedMap({});
        setSelectedStoryId(null);
    }, [stories, videoRefs, selectedStoryId]);

    const initialSlideIndex = useMemo(() => {
        if (!stories || !selectedStoryId) return 0;
        return stories.stories.findIndex((s) => s.id === selectedStoryId) ?? 0;
    }, [stories, selectedStoryId]);

    const handleSlideChange = useCallback(() => {
        if (!swiperRef.current) return;

        const currentIndex = swiperRef.current.activeIndex;
        const currentStory = stories?.stories[currentIndex];
        if (!currentStory) return;

        stories?.stories.forEach((story) => {
            const video = videoRefs.current[story.id];
            if (!video) return;

            if (story.id === currentStory.id) {
                video.currentTime = 0;
                video.play().catch(() => {});
                setPlayingMap((prev) => ({ ...prev, [story.id]: true }));
                setMutedMap((prev) => ({ ...prev, [story.id]: false }));
            } else {
                video.pause();
                video.currentTime = 0;
                setPlayingMap((prev) => ({ ...prev, [story.id]: false }));
                setMutedMap((prev) => ({ ...prev, [story.id]: true }));
            }
        });
    }, [stories, videoRefs, setPlayingMap, setMutedMap]);

    return {
        isOpen,
        swiperRef,
        initialSlideIndex,
        handleOpenSlider,
        handleCloseSlider,
        handleSlideChange,
    };
};

export default useShowReels;
