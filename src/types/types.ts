export interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
  user: {
    name: string;
  };
  likes: number;
}

export interface SearchProps {
  onSubmit: (value: string) => void;
}

export interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

export interface ImageModalProps {
  image: Image | null;
  isOpen: boolean;
  onClose: () => void;
}
