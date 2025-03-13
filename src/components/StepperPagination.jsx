import React from "react";
import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

const StepperPagination = ({ totalItems }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const totalPages = Math.ceil((totalItems || 0) / ITEMS_PER_PAGE);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        searchParams.set("page", newPage);
        setSearchParams(searchParams);
    };

    const getPaginationNumbers = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                pages.push(i);
            } else if (pages[pages.length - 1] !== "...") {
                pages.push("...");
            }
        }
        return pages;
    };

    if (totalPages <= 1) return null; // Hide pagination if there's only one page

    return (
        <div className="pagination d-flex justify-content-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-outline-primary me-2"
            >
                Previous
            </button>

            {getPaginationNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page === "..." ? currentPage : page)}
                    className={`btn btn-primary m-1 ${currentPage === page ? "active" : ""}`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-outline-primary ms-2"
            >
                Next
            </button>
        </div>
    );
};

export default StepperPagination;
