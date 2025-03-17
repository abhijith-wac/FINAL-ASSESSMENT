import React from "react";
import { Badge, Button } from "react-bootstrap";

const SelectedFilters = ({
  selectedFilters,
  handleRemoveFilter,
  clearAllFilters,
}) => {
  if (selectedFilters.length === 0) return null;

  return (
    <div className="mb-3 border p-2 rounded bg-light">
      <strong>Selected Filters:</strong>
      <div className="d-flex flex-wrap mt-2">
        {selectedFilters.map((filter) => (
          <span
            key={`${filter.attribute}-${filter.value}`}
            onClick={() => handleRemoveFilter(filter.attribute, filter.value)}
            style={{ cursor: "pointer", color: "red", marginRight: "8px" }}
          >
           <small> {filter.value} ❌ </small>
          </span>
        ))}
      </div>
      <Button
        variant="danger"
        size="sm"
        className="mt-2"
        onClick={clearAllFilters}
      >
        Clear All
      </Button>
    </div>
  );
};

export default SelectedFilters;
