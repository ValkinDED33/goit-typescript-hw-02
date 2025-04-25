import { useState, ChangeEvent, KeyboardEvent, FC } from "react";
import { toast } from "react-hot-toast";
import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ onSubmit }) => {
  const [query, setQuery] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (query.trim() === "") {
        toast.error("Please enter a search query.");
      } else {
        onSubmit(query);
        setQuery("");
      }
    }
  };

  return (
    <header className={styles.header}>
      <form className={styles.form}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.input}
        />
      </form>
    </header>
  );
};

export default SearchBar;
