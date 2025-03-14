import React from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import Filter from "../../components/Filter";
import useSearch from "../customHooks/useSearch";
import StepperPagination from "../components/StepperPagination";
import { useFilters } from "../customHooks/useFilter";

const SearchPage = () => {
  const { data, error, searchQuery, setSearchQuery } = useSearch();
  const { selectedFilters, setSelectedFilters, filteredItems } =
    useFilters(data);

  const totalItems = data?.total_items || 0; 

  return (
    <Container className="py-4">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              setSearchQuery(e.target.elements[0].value);
            }}
            className="d-flex border rounded overflow-hidden"
          >
            <Form.Control
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-grow-1 border-0"
            />
            <Button type="submit" variant="primary">
              Search
            </Button>
          </Form>
        </Col>
      </Row>

      <Row>
        <Col md={3}>
          <Filter
            filters={data?.filter_list || []}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        </Col>

        <Col md={9}>
          {error && <Alert variant="danger">Error: {error.message}</Alert>}
          <Row xs={1} md={2} lg={4} className="g-4">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Col key={item.id}>
                  <Card className="h-100 shadow-sm">
                    <Card.Img
                      variant="top"
                      src={item.image_link}
                      alt={item.title}
                      style={{ height: "150px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title className="fs-6">{item.title}</Card.Title>
                      <Card.Text className="text-muted small">
                        {item.brand}
                      </Card.Text>
                      <Card.Text className="text-danger fw-bold">
                        KWD {item.sale_price}
                      </Card.Text>
                      {item.discount_percentage > 0 && (
                        <Card.Text className="text-success small">
                          {item.discount_percentage}% Off
                        </Card.Text>
                      )}
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-100 mt-2"
                      >
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

          <StepperPagination totalItems={totalItems} />
        </Col>
      </Row>
    </Container>
  );
};

export default SearchPage;
