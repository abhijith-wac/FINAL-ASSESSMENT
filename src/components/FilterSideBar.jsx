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

<<<<<<< HEAD
  return (
    <div className="p-3 border rounded shadow-sm">
      <h5 className="fw-bold mb-3">Filters</h5>
=======
  const renderSelectedFilters = () => {
    const selectedFilterItems = Object.keys(selectedFilters).map((filterKey) => {
      const selectedValues = selectedFilters[filterKey];
  
      const valuesToRender = Array.isArray(selectedValues) ? selectedValues : [selectedValues];
  
      return (
        valuesToRender.length > 0 && (
          <div key={filterKey}>
            <h6>{filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}:</h6>
            <ul>
              {valuesToRender.map((value, idx) => (
                <li key={idx}>{value}</li>
              ))}
            </ul>
          </div>
        )
      );
    });
  
    return selectedFilterItems.length > 0 ? (
      <div className="mb-3">
        <h5 className="fw-bold">Selected Filters</h5>
        {selectedFilterItems}
      </div>
    ) : null;
  };

  return (
    <div className="p-3 border rounded shadow-sm">
      {renderSelectedFilters()}

      <h5 className="fw-bold mb-3">Filters</h5>
      <Accordion>
        {filterList.map((filter, index) => (
          <Accordion.Item eventKey={index} key={filter.attribute}>
            <Accordion.Header>{filter.label}</Accordion.Header>
            <Accordion.Body>
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
>>>>>>> 200cedc (vite)

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
