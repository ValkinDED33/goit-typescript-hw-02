import { FC } from "react";
import styles from "./ErrorMessage.module.css";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className={styles.error}>
      {message || "Oops! Something went wrong. Please try again later!"}
    </div>
  );
};

export default ErrorMessage;
