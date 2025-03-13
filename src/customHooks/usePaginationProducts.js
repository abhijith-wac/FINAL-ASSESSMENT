import { useSearchParams } from "react-router-dom";

const ITEMS_PER_PAGE = 12;

export const usePaginatedProducts = (data) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const page = parseInt(searchParams.get("page")) || 1;

    // ✅ Pagination Logic - Slice Data
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const paginatedItems = data?.items?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

    // ✅ Set page number
    const setPage = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("page", newPage);
        setSearchParams(newParams);
    };

    return { paginatedItems, page, setPage, totalItems: data?.total || 0 };
};
