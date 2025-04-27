export interface Project {
    id: string;
    name: string;
    slug: string;
    description: string;
    isPublished: boolean;
    likes: string[];
    likesTotal: number;
    mainImage: Media[];
    media: Media[]; 
    students: string[]; 
    studentCount: number;
    technologies: string[];
    technologyCount: number;
    createdAt: string; 
    updatedAt: string;
}

  
export interface Media {
    filename: string;
    height: number;
    width: number;
    id: string;
    size: number;
    thumbnails: MediaThumbnails;
    type: string;
    url: string;
}

export interface MediaThumbnails {
    small: {
        url: string;
        width: number;
        height: number;
    };
    large: {
        url: string;
        width: number;
        height: number;
    };
    full: {
        url: string;
        width: number;
        height: number;
    };
}
  