export interface Story {
    id: number;
    title_en: string;
    title_ru: string;
    title_hy: string;
    name_en: string | null;
    name_ru: string | null;
    name_hy: string | null;
    description_en: string | null;
    description_ru: string | null;
    description_hy: string | null;
    url: string | null;
    main_photo: string;
    image: number;
    images: string;
    video: number;
    video_path: string;
    views: number;
    likes: number;
    liked: boolean;
    buy_now: number;
}

interface StoriesTitle {
    id: number;
    title_en: string;
    title_ru: string;
    title_hy: string;
}

export interface StoriesResponse {
    stories: Story[];
    imagesPath: string;
    stories_title: StoriesTitle;
}
