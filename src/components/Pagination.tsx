type PaginationProps = {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  onPageChange,
}) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageGroupSize = 10;
  const currentPageGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentPageGroup * pageGroupSize + 1;
  const endPage = Math.min((currentPageGroup + 1) * pageGroupSize, totalPages);

  const handlePageClick = (page: number) => {
    onPageChange(page);
  };

  const handlePreviousClick = () => {
    onPageChange(startPage - 1);
  };

  const handleNextClick = () => {
    onPageChange(endPage + 1);
  };

  return (
    <div className="pagination">
      <ul>
        {currentPageGroup > 0 && (
          <li>
            <p onClick={handlePreviousClick} className="previous">
              Предыдущая
            </p>
          </li>
        )}

        {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
          <li key={index}>
            <p
              onClick={(e) => handlePageClick(startPage + index)}
              className={currentPage === startPage + index ? "active" : ""}
            >
              {startPage + index}
            </p>
          </li>
        ))}

        {endPage < totalPages && (
          <li>
            <p onClick={handleNextClick} className="next">
              Следующая
            </p>
          </li>
        )}
      </ul>

      <div>
        Страницы {startPage}-{endPage} из {totalPages}
      </div>
    </div>
  );
};

export default Pagination;
