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

const ProductList = () => {
    const { searchParams } = useFilters();
    const query = searchParams.get("query") || "";
    const filters = Object.fromEntries(
        Array.from(searchParams.entries()).filter(([key]) => key !== "query" && key !== "page")
    );

    const { data, error, isValidating } = useSearch(query, filters); // ✅ FIXED: Use useSearch
    const { paginatedItems, page, setPage, totalItems } = usePaginatedProducts(data);

    if (error) {
        toast.error(`Oops! ${error.message}`, {
            position: "top-right",
            autoClose: 3000,
        });
    }
    console.log(data);

    return (
        <Container fluid className="mt-4 bg-light py-3">
            <Row>
                <Col md={2} className="mb-4">
                    {/* ✅ FIXED: Pass filterList to FilterSidebar */}
                    <FilterSidebar filterList={data?.filter_list || []} />
                </Col>

                <Col md={9}>
                    <SearchBar />
                    <h2 className="mb-4 fw-bold text-primary text-center">Products Page</h2>

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
                                    <Col className="text-center">
                                        <p className="lead fs-4 text-muted py-4">No results found</p>
                                    </Col>
                                )}
                            </Row>

                            <StepperPagination searchParams={searchParams} setPage={setPage} totalItems={totalItems} />
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default ProductList;
