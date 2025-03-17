import React from "react";
import { useSearchParams } from "react-router-dom";

const StepperPagination = ({ totalItems, itemsPerPage = 80 }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const totalPages = Math.ceil((totalItems || 0) / itemsPerPage);

    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;

        // ✅ Create a new instance of URLSearchParams to ensure reactivity
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("page", newPage);
        setSearchParams(newSearchParams);

        // Scroll to top when changing page
        window.scrollTo({ top: 0, behavior: "smooth" });
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

    if (totalPages <= 1) return null;

    return (
        <div className="d-flex justify-content-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="btn btn-dark me-2"
            >
                Previous
            </button>

            {getPaginationNumbers().map((page, index) => (
                <button
                    key={index}
                    onClick={() => handlePageChange(page === "..." ? currentPage : page)}
                    className={`btn btn-dark mx-1 ${currentPage === page ? "active" : ""}`}
                    disabled={page === "..."}
                >
                    {page}
                </button>
            ))}

            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="btn btn-dark ms-2"
            >
                Next
            </button>
        </div>
    );
};

export default StepperPagination;
