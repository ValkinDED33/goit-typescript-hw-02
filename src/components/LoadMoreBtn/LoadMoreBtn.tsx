import { FC } from "react";
import styles from "./LoadMoreBtn.module.css";

interface LoadMoreBtnProps {
  onClick: () => void;
}

const LoadMoreBtn: FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <div className={styles.loadMoreContainer}>
      <button className={styles.button} onClick={onClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
