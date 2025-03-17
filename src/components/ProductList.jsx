import React from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FilterSidebar from "./FilterSideBar";
import SearchBar from "./SearchBar";
import StepperPagination from "./StepperPagination";
import useSearch from "../customHooks/useSearch";
import { useFilters } from "../customHooks/useFilter";
import { usePaginatedProducts } from "../customHooks/usePaginationProducts";
import ProductCard from "./ProductCard";
import NoResults from "./NoResults";

const ProductList = () => {
    const { searchParams } = useFilters();
    const query = searchParams.get("query") || "";
    const filters = Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "query" && key !== "page")
    );

    const { data, error, isValidating } = useSearch(query, filters);
    const { paginatedItems, page, setPage, totalItems } = usePaginatedProducts(data);

    if (error) {
        toast.error(`Oops! ${error.message}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }

    return (
        <Container fluid className="mt-4 bg-light py-3">
            <Row>
                {/* Sidebar Filter */}
                <Col md={2} className="mb-4">
                    <FilterSidebar filterList={data?.filter_list || []} />
                </Col>

                {/* Main Content */}
                <Col md={9}>
                    {/* ✅ Add SearchBar Here */}
                    <SearchBar />

                    {/* Page Title */}
                    <h2 className="mb-4 text-3xl font-extrabold text-blue-600 text-center uppercase tracking-wide bg-blue-100 py-3 rounded-lg shadow-md">
                        SHOPPING CART
                    </h2>

                    {/* Loading Spinner */}
                    {isValidating ? (
                        <div className="text-center py-4">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    ) : error ? null : (
                        <>
                            <Row xs={1} md={2} lg={4} className="g-3">
                                {paginatedItems.length > 0 ? (
                                    paginatedItems.map((item) => (
                                        <Col key={item.id}>
                                            <ProductCard item={item} />
                                        </Col>
                                    ))
                                ) : (
                                    <Col xs={12} className="d-flex justify-content-center w-100 min-vh-100">
                                        <NoResults query={query} />
                                    </Col>
                                )}
                            </Row>

                            {/* Pagination */}
                            <StepperPagination searchParams={searchParams} setPage={setPage} totalItems={totalItems} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
