import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Pagination } from "react-bootstrap";
import Filter from "../../components/Filter";
import useSearch from "../customHooks/useSearch";

const SearchPage = () => {
  const { handleSearch, data, error, searchQuery, setSearchQuery } = useSearch();
  const { selectedFilters, setSelectedFilters, filteredItems } = useFilter(data);
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  return (
    <Container className="py-4">
   
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form onSubmit={handleSearch} className="d-flex border rounded overflow-hidden">
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow-1 border-0"
            />
            <Button type="submit" variant="primary">Search</Button>
          </Form>
        </Col>
      </Row>

     
      <Row>
        <Col md={3}>
          <Filter filters={data?.filter_list || []} selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters} />
        </Col>

        <Col md={9}>
          {error && <Alert variant="danger">Error: {error.message}</Alert>}
          <Row xs={1} md={2} lg={4} className="g-4">
            {currentItems.length > 0 ? (
              currentItems.map((item) => (
                <Col key={item.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img variant="top" src={item.image_link} alt={item.title} style={{ height: "150px", objectFit: "cover" }} />
                    <Card.Body>
                      <Card.Title className="fs-6">{item.title}</Card.Title>
                      <Card.Text className="text-muted small">{item.brand}</Card.Text>
                      <Card.Text className="text-danger fw-bold">KWD {item.sale_price}</Card.Text>
                      {item.discount_percentage > 0 && (
                        <Card.Text className="text-success small">
                          {item.discount_percentage}% Off
                        </Card.Text>
                      )}
                      <Button variant="primary" size="sm" className="w-100 mt-2">
                        Add to Compare
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <p>No products found</p>
            )}
          </Row>
 
          {totalPages > 1 && (
            <div className="d-flex justify-content-center mt-4">
              <Pagination>
                <Pagination.First onClick={() => setCurrentPage(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages)].map((_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} />
              </Pagination>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;