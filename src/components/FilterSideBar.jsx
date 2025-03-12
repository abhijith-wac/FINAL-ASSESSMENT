import React from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const FilterSidebar = ({ filterList }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (attribute, value) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(attribute);

    if (currentValues.includes(value)) {
      newParams.delete(attribute);
      currentValues.filter((v) => v !== value).forEach((v) => newParams.append(attribute, v));
    } else {
      newParams.append(attribute, value);
    }

    setSearchParams(newParams);
  };

  const handlePriceChange = (min, max) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("min_price", min);
    newParams.set("max_price", max);
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="p-3 border rounded shadow-sm">
      <h5 className="fw-bold mb-3">Filters</h5>
      <Accordion alwaysOpen>
        {filterList.map((filter, index) => (
          <Accordion.Item eventKey={index} key={filter.attribute}>
            <Accordion.Header>{filter.label}</Accordion.Header>
            <Accordion.Body>
              {filter.attribute === "price" ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Range
                      min={filter.options.min_price}
                      max={filter.options.max_price}
                      value={searchParams.get("min_price") || filter.options.min_price}
                      onChange={(e) => handlePriceChange(e.target.value, searchParams.get("max_price") || filter.options.max_price)}
                    />
                    <Form.Text className="text-muted">
                      Min: {searchParams.get("min_price") || filter.options.min_price}
                    </Form.Text>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Range
                      min={filter.options.min_price}
                      max={filter.options.max_price}
                      value={searchParams.get("max_price") || filter.options.max_price}
                      onChange={(e) => handlePriceChange(searchParams.get("min_price") || filter.options.min_price, e.target.value)}
                    />
                    <Form.Text className="text-muted">
                      Max: {searchParams.get("max_price") || filter.options.max_price}
                    </Form.Text>
                  </Form.Group>
                </>
              ) : (
                filter.options.map((option) => (
                  <Form.Check
                    key={option.name}
                    type="checkbox"
                    label={`${option.label} (${option.count})`}
                    checked={searchParams.getAll(filter.attribute).includes(option.name)}
                    onChange={() => handleCheckboxChange(filter.attribute, option.name)}
                  />
                ))
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Button variant="danger" className="mt-3 w-100" onClick={clearFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
