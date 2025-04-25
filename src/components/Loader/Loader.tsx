import { FC } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Loader.module.css";

const Loader: FC = () => {
  return (
    <div className={styles.loader}>
      <ClipLoader size={50} />
    </div>
  );
};

export default Loader;
