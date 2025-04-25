import { FC } from "react";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css";

interface UnsplashImage {
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

interface ImageGalleryProps {
  images: UnsplashImage[];
  onImageClick: (image: UnsplashImage) => void;
}

const ImageGallery: FC<ImageGalleryProps> = ({ images, onImageClick }) => {
  return (
    <ul className={styles.gallery}>
      {images.map((image) => (
        <li key={image.id} className={styles.item}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
