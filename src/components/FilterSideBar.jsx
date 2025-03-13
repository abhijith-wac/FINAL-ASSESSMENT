import React, { useState } from "react";
import { Accordion, Form, Button } from "react-bootstrap";
import { useFilters } from "../customHooks/useFilter";

const FilterSidebar = ({ filterList }) => {
  const {
    handleCheckboxChange,
    handlePriceChange,
    searchParams,
    clearAllFilters,
  } = useFilters();

  const [expandedCategories, setExpandedCategories] = useState({});

  // ✅ Toggle "Show More / Show Less"
  const toggleShowMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <div className="p-3 border rounded shadow-sm">
      <h5 className="fw-bold mb-3">Filters</h5>
      <Accordion>
        {filterList.map((filter, index) => (
          <Accordion.Item eventKey={index} key={filter.attribute}>
            <Accordion.Header>{filter.label}</Accordion.Header>
            <Accordion.Body>
              {/* ✅ Price Filter */}
              {filter.attribute === "price" ? (
                <>
                  <Form.Group className="mb-3">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Range
                      min={filter.options?.min_price || 0}
                      max={filter.options?.max_price || 1000}
                      value={searchParams.get("min_price") || filter.options?.min_price || 0}
                      onChange={(e) =>
                        handlePriceChange(e.target.value, searchParams.get("max_price") || filter.options?.max_price || 1000)
                      }
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Max Price</Form.Label>
                    <Form.Range
                      min={filter.options?.min_price || 0}
                      max={filter.options?.max_price || 1000}
                      value={searchParams.get("max_price") || filter.options?.max_price || 1000}
                      onChange={(e) =>
                        handlePriceChange(searchParams.get("min_price") || filter.options?.min_price || 0, e.target.value)
                      }
                    />
                  </Form.Group>
                </>
              ) : (
                // ✅ Checkbox Filters with "Show More / Show Less"
                Array.isArray(filter.options) ? (
                  <>
                    {filter.options
                      .slice(0, expandedCategories[filter.attribute] ? filter.options.length : 5)
                      .map((option) => (
                        <Form.Check
                          key={option.name}
                          type="checkbox"
                          label={`${option.label} (${option.count})`}
                          checked={searchParams.getAll(filter.attribute).includes(option.name)}
                          onChange={() => handleCheckboxChange(filter.attribute, option.name)}
                        />
                      ))}

                    {filter.options.length > 5 && (
                      <Button
                        variant="link"
                        className="p-0 mt-2"
                        onClick={() => toggleShowMore(filter.attribute)}
                      >
                        {expandedCategories[filter.attribute] ? "Show Less" : "Show More"}
                      </Button>
                    )}
                  </>
                ) : (
                  <p className="text-muted">No options available</p>
                )
              )}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <Button variant="danger" className="mt-3 w-100" onClick={clearAllFilters}>
        Clear Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
