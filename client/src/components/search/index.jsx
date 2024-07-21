import styles from "./styles.module.css";

const Search = ({ setSearch }) => {
  return (
    <input
      type="text"
      name="search"
      className={styles.search}
      placeholder="Search for movies"
      onChange={({ currentTarget: input }) => {
        setSearch(input.value);
      }}
    />
  );
};

export default Search;
