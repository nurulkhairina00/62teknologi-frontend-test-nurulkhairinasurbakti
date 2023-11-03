import React from "react";
import { Pagination } from "react-bootstrap";

export default function PaginationComponent(props) {
  const { currentPage, totalPages, onPageChange } = props;
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );
  return (
    <div className="my-5">
      <Pagination>
        <Pagination.First onClick={() => onPageChange(1)} />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />

        {pageNumbers.map((pageNumber) => (
          <Pagination.Item
            key={pageNumber}
            active={pageNumber === currentPage}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </Pagination.Item>
        ))}

        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last onClick={() => onPageChange(totalPages)} />
      </Pagination>
    </div>
  );
}
