import React from "react";
import { Container, Row, Col, Card, Spinner, Badge, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useSearch from "../customHooks/useSearch";
import FilterSidebar from "./FilterSideBar";
import SearchBar from "./SearchBar";

const ITEMS_PER_PAGE = 28;

const ProductList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  // Extract filters from searchParams
  const filters = Object.fromEntries(
    Array.from(searchParams.entries()).filter(([key]) => key !== "query" && key !== "page")
  );

  // Fetch data with useSearch hook
  const { data, error, isValidating } = useSearch(query, filters);
  
  // Pagination logic
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedItems = data?.items?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];
  const hasNextPage = (data?.items?.length || 0) > startIndex + ITEMS_PER_PAGE;

  // Handle page change and update the URL
  const handlePageChange = (newPage) => {
    if (newPage < 1) return;
    const newParams = new URLSearchParams(searchParams);
    newParams.set("page", newPage);
    setSearchParams(newParams);
  };

  // Handle errors
  if (error) {
    toast.error(`Oops! ${error.message}`, {
      position: "top-right",
      autoClose: 3000,
    });
  }

  return (
    <Container fluid className="mt-4 bg-light py-3">
      <Row>
        <Col md={2} className="mb-4">
          <FilterSidebar filterList={data?.filter_list || []} />
        </Col>

        <Col md={9}>
          <SearchBar />

          <h2 className="mb-4 fw-bold text-primary text-center">
            Products Page
          </h2>

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
                      <Card className="h-100 border-0 shadow-sm position-relative p-2">
                        {!item.in_stock && (
                          <Badge 
                            bg="danger" 
                            className="position-absolute top-0 start-50 translate-middle-x px-3 py-2 rounded-pill fs-6 z-index-1"
                          >
                            Sold Out!
                          </Badge>
                        )}

                        <Card.Img
                          variant="top"
                          src={item.image_link}
                          alt={item.title}
                          className="img-fluid rounded"
                          style={{ 
                            height: "200px", 
                            objectFit: "contain", 
                            padding: "10px",
                            backgroundColor: "#f8f9fa"
                          }}
                        />

                        <Card.Body className="text-center">
                          <Card.Title className="fw-medium fs-6 text-dark mb-3">{item.title}</Card.Title>
                          <Card.Text className="fw-bold text-primary fs-4 mb-1">
                            KWD {item.sale_price}
                          </Card.Text>
                          <Card.Text className="fs-6 mb-2">
                            <span className="text-decoration-line-through me-2 text-muted">
                              KWD {item.original_price}
                            </span>
                            <span className="text-success fw-medium">{item.discount}% off</span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col className="text-center">
                    <p className="lead fs-4 text-muted py-4">No results found</p>
                  </Col>
                )}
              </Row>

              <div className="d-flex justify-content-center mt-4 py-2">
                <Button
                  variant="outline-secondary"
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className="me-3 px-4"
                >
                  ← Previous
                </Button>

                <span className="align-self-center fw-bold fs-5 text-secondary px-3">Page {page}</span>

                <Button
                  variant="outline-primary"
                  onClick={() => handlePageChange(page + 1)}
                  disabled={!hasNextPage}
                  className="ms-3 px-4"
                >
                  Next →
                </Button>
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductList;