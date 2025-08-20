import "swiper/css";

import { useMemo } from "react";
import useReelsFetch from "./hooks/useReelsFetch";
import useVideoPlayer from "./hooks/useVideoPlayer";
import Modal from "../modal/Modal";
import useShowReels from "./hooks/useShowReels";
import ReelsCircle from "./ReelsCircle";
import ReelsSlider from "./ReelsSlider";

const Reels = () => {
    const { loading, error, stories } = useReelsFetch();
    const {
        videoRefs,
        mutedMap,
        playingMap,
        toggleMute,
        togglePlayPause,
        registerVideoRef,
        setPlayingMap,
        setMutedMap,
    } = useVideoPlayer();

    const { isOpen, handleOpenSlider, handleCloseSlider, initialSlideIndex, handleSlideChange, swiperRef } =
        useShowReels({ videoRefs, setPlayingMap, setMutedMap, stories });

    const memoizedCircles = useMemo(
        () =>
            stories?.stories.map(({ id, main_photo, title_en }) => (
                <ReelsCircle
                    key={id}
                    id={id}
                    title_en={title_en}
                    main_photo={main_photo}
                    imagesPath={stories.imagesPath}
                    handleOpenSlider={handleOpenSlider}
                />
            )),
        [stories, handleOpenSlider]
    );

    if (loading) return <div className=' text-gray-500'>Loading reels...</div>;
    if (error) return <div className='text-red-500'>Error reels</div>;
    return (
        <section className='w-full max-w-6xl mx-auto px-4 py-8'>
            <h2 className='text-lg sm:text-2xl lg:text-3xl font-bold mb-6 uppercase'>Reels</h2>

            {/* Circles row */}
            <div className='reels-scroll'>{memoizedCircles}</div>
            {/* Modal with Swiper */}
            <Modal isOpen={isOpen}>
                <ReelsSlider
                    stories={stories}
                    videoRefs={videoRefs}
                    mutedMap={mutedMap}
                    playingMap={playingMap}
                    toggleMute={toggleMute}
                    togglePlayPause={togglePlayPause}
                    registerVideoRef={registerVideoRef}
                    setPlayingMap={setPlayingMap}
                    handleCloseSlider={handleCloseSlider}
                    initialSlideIndex={initialSlideIndex}
                    handleSlideChange={handleSlideChange}
                    swiperRef={swiperRef}
                />
            </Modal>
        </section>
    );
};

export default Reels;
