import React from "react";
import { Form, Button } from "react-bootstrap";

const FilterOptions = ({ filter, expanded, toggleShowMore, searchParams, handleCheckboxChange, handlePriceChange }) => {
    const selectedValues = searchParams.getAll(filter.attribute) || [];

    if (filter.attribute === "price") {
        return (
            <>
                <Form.Group className="mb-3">
                    <Form.Label>Min Price</Form.Label>
                    <Form.Range
                        min={filter.options?.min_price || 0}
                        max={filter.options?.max_price || 1000}
                        value={searchParams.get("min_price") || filter.options?.min_price || 0}
                        onChange={(e) =>
                            handlePriceChange(
                                e.target.value,
                                searchParams.get("max_price") || filter.options?.max_price || 1000
                            )
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
                            handlePriceChange(
                                searchParams.get("min_price") || filter.options?.min_price || 0,
                                e.target.value
                            )
                        }
                    />
                </Form.Group>
            </>
        );
    } else if (Array.isArray(filter.options)) {
        return (
            <>
                {filter.options.slice(0, expanded ? filter.options.length : 5).map((option) => (
                    <Form.Check
                        key={option.name}
                        type="checkbox"
                        label={`${option.label} (${option.count})`}
                        checked={selectedValues.includes(option.name)}
                        onChange={() => handleCheckboxChange(filter.attribute, option.name)}
                    />
                ))}

                {filter.options.length > 5 && (
                    <Button variant="link" className="p-0 mt-2" onClick={toggleShowMore}>
                        {expanded ? "Show Less" : "Show More"}
                    </Button>
                )}
            </>
        );
    } else {
        return <p className="text-muted">No options available</p>;
    }
};

export default FilterOptions;
