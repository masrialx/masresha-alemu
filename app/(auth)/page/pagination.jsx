"use client";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-navy hover:text-brand-navy disabled:opacity-40"
      >
        Prev
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`min-w-[40px] rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
            currentPage === page
              ? "bg-brand-navy text-white shadow-md"
              : "border border-slate-200 bg-white text-slate-600 hover:border-brand-navy"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:border-brand-navy hover:text-brand-navy disabled:opacity-40"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
