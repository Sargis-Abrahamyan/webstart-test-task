import React, { memo } from "react";
import type { Story, StoriesResponse } from "./types/realsData.type";

type ReelsCircleProps = Pick<Story, "id" | "title_en" | "main_photo"> &
    Pick<StoriesResponse, "imagesPath"> & {
        handleOpenSlider: (id: Story["id"]) => void;
    };

const ReelsCircle: React.FC<ReelsCircleProps> = ({
    id,
    main_photo,
    imagesPath,
    title_en,
    handleOpenSlider,
}) => {
    return (
        <div className='w-[90px] md:w-[114px] flex flex-col items-center' onClick={() => handleOpenSlider(id)}>
            <div className='rounded-[50%] w-[90px] md:size-[114px] border-3 border-gray-300 p-2.5 cursor-pointer overflow-hidden hover:border-[#e31335] transition'>
                <img
                    src={`${imagesPath}/${main_photo}`}
                    alt={title_en}
                    className='w-full h-full object-cover rounded-full block'
                />
            </div>
            <p className='text-sm text-center'>{title_en}</p>
        </div>
    );
};

export default memo(ReelsCircle);
