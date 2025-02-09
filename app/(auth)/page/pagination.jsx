"use client"; // Add this to ensure the component is treated as a Client Component

import React from 'react';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div  className="flex justify-center items-center mt-6">
      <button
        onClick={handlePrev}
        className="px-4 py-2 mx-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
        disabled={currentPage === 1}
      >
        Prev
      </button>
      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={`px-4 py-2 mx-2 rounded-md ${
            currentPage === page
              ? 'bg-indigo-600 text-white'
              : 'bg-white text-indigo-600 border border-indigo-500'
          } hover:bg-indigo-500 hover:text-white`}
        >
          {page}
        </button>
      ))}
      <button
        onClick={handleNext}
        className="px-4 py-2 mx-2 rounded-md bg-indigo-500 text-white hover:bg-indigo-600"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
