import { FC } from "react";
import Modal from "react-modal";
import styles from "./ImageModal.module.css";

Modal.setAppElement("#root");

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

interface ImageModalProps {
  isOpen: boolean;
  image: UnsplashImage | null;
  onRequestClose: () => void;
}

const ImageModal: FC<ImageModalProps> = ({ isOpen, image, onRequestClose }) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <button className={styles.closeBtn} onClick={onRequestClose}>
        ✖
      </button>
      <img src={image.urls.regular} alt={image.alt_description} />
    </Modal>
  );
};

export default ImageModal;
