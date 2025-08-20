import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ReelsButton from "./ReelsButton";
import type { Story } from "./types/realsData.type";
import type { UseShowReelsProps } from "./hooks/useShowReels";
import type { Swiper as SwiperType } from "swiper";

type VideoActions = {
    toggleMute: (id: Story["id"]) => void;
    togglePlayPause: (id: Story["id"]) => void;
    registerVideoRef: (id: Story["id"], el: HTMLVideoElement | null) => void;
} & Omit<UseShowReelsProps, "setMutedMap">;

interface ReelsSliderProps extends VideoActions {
    mutedMap: Record<string, boolean>;
    playingMap: Record<string, boolean>;
    handleCloseSlider: () => void;
    initialSlideIndex: number;
    handleSlideChange: (swiper: SwiperType) => void;
    swiperRef: React.MutableRefObject<SwiperType | null>;
    videoRefs: React.MutableRefObject<Record<Story["id"], HTMLVideoElement | null>>;
}

const ReelsSlider = ({
    stories,
    mutedMap,
    playingMap,
    toggleMute,
    togglePlayPause,
    registerVideoRef,
    setPlayingMap,
    handleCloseSlider,
    initialSlideIndex,
    handleSlideChange,
    swiperRef,
}: ReelsSliderProps) => {
    if (!stories?.stories?.length) return null;

    return (
        <div className='h-full w-full bg-black'>
            <Swiper
                direction='vertical'
                pagination={{ clickable: true }}
                spaceBetween={0}
                slidesPerView={1}
                initialSlide={initialSlideIndex}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                onSlideChange={handleSlideChange}
                className='h-full w-full'
            >
                {stories?.stories.map(({ id, video_path }) => (
                    <SwiperSlide
                        key={id}
                        className='relative flex justify-center items-center bg-black h-full w-full'
                    >
                        {video_path && (
                            <div className='relative w-full h-full'>
                                {/* Close button */}
                                <div className='absolute right-5 top-4 z-10'>
                                    <ReelsButton onClick={handleCloseSlider} aria-label='Close video'>
                                        X
                                    </ReelsButton>
                                </div>

                                {/* Video */}
                                <video
                                    ref={(el) => registerVideoRef(id, el)}
                                    src={`${stories.imagesPath}/${video_path}`}
                                    className='object-cover w-full h-full'
                                    muted={mutedMap[id] ?? true}
                                    autoPlay
                                    playsInline
                                    preload='auto'
                                    webkit-playsinline='true'
                                    onPlay={() => setPlayingMap((prev) => ({ ...prev, [id]: true }))}
                                    onPause={() => setPlayingMap((prev) => ({ ...prev, [id]: false }))}
                                    onEnded={() => swiperRef.current?.slideNext()}
                                />

                                {/* Controls */}
                                <div className='absolute right-4 bottom-10 flex flex-col items-center space-y-4 text-white z-10'>
                                    <ReelsButton aria-label='muted video' onClick={() => toggleMute(id)}>
                                        {mutedMap[id] ? "🔇" : "🔊"}
                                    </ReelsButton>
                                    <ReelsButton aria-label='play video' onClick={() => togglePlayPause(id)}>
                                        {playingMap[id] ? "⏸️" : "▶️"}
                                    </ReelsButton>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default memo(ReelsSlider);
