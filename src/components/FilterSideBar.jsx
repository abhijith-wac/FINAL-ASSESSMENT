import React, { useState } from "react";
import { Accordion, Badge } from "react-bootstrap";
import FilterOptions from "./FilterOptions";
import SelectedFilters from "./SelectedFilters";
import { useFilters } from "../customHooks/useFilter";

const FilterSidebar = ({ filterList = [] }) => {
  const {
    selectedFilters,
    handleCheckboxChange,
    handlePriceChange,
    searchParams,
    clearAllFilters,
    handleRemoveFilter,
  } = useFilters(filterList);

  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleShowMore = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };
  
  return (
    <div className="p-3 border rounded shadow-sm">
      <h5 className="fw-bold mb-3">Filters</h5>


      <SelectedFilters
        selectedFilters={selectedFilters}
        handleRemoveFilter={handleRemoveFilter}
        clearAllFilters={clearAllFilters}
      />

      <Accordion>
        {filterList.map((filter) => (
          <Accordion.Item eventKey={filter.attribute} key={filter.attribute}>
            <Accordion.Header>
              {filter.label}
              {searchParams.getAll(filter.attribute).length > 0 && (
                <Badge bg="primary" className="ms-2">
                  {searchParams.getAll(filter.attribute).length}
                </Badge>
              )}
            </Accordion.Header>
            <Accordion.Body>
              <FilterOptions
                filter={filter}
                expanded={expandedCategories[filter.attribute]}
                toggleShowMore={() => toggleShowMore(filter.attribute)}
                searchParams={searchParams}
                handleCheckboxChange={handleCheckboxChange}
                handlePriceChange={handlePriceChange}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default FilterSidebar;
