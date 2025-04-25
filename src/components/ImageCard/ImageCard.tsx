import { FC } from "react";
import styles from "./ImageCard.module.css";

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

interface ImageCardProps {
  image: UnsplashImage;
  onClick: () => void;
}

const ImageCard: FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={styles.card}>
      <img
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
