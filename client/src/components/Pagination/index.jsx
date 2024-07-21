import styles from "./styles.module.css";

const Pagination = ({ page, total, limit, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage) => {
    // Only set the page if it's different to avoid unnecessary renders
    if (page !== newPage + 1) {
      setPage(newPage + 1);
    }
  };

  return (
    <div className={styles.container}>
      {totalPages > 1 && // Show pagination only if there are more than 1 page
        [...Array(totalPages)].map((_, index) => (
          <button
            onClick={() => onClick(index)}
            className={
              page === index + 1
                ? `${styles.page_btn} ${styles.active}`
                : styles.page_btn
            }
            key={index} // Ensure key is unique; here it's index, but could use an id if available
          >
            {index + 1}
          </button>
        ))}
    </div>
  );
};

export default Pagination;
