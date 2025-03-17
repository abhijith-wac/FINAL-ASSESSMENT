import React from "react";
import { Form, Button } from "react-bootstrap";
import Slider from "@mui/material/Slider";
import { Box, Typography } from "@mui/material";
import { useFilters } from "../customHooks/useFilter";

const FilterOptions = ({ filter }) => {
    const { searchParams, expandedFilters, toggleShowMore, handleCheckboxChange, handlePriceChange } = useFilters();

    const selectedValues = searchParams.getAll(filter.attribute) || [];
    

    if (filter.attribute === "price") {
        const minPrice = filter.options?.min_price ?? 0;
        const maxPrice = filter.options?.max_price ?? 1000;
        const selectedMinPrice = Number(searchParams.get("min_price")) || minPrice;
        const selectedMaxPrice = Number(searchParams.get("max_price")) || maxPrice;

        const handleSliderChange = (_, newValue) => {
            handlePriceChange(newValue[0], newValue[1]);
        };

        return (
            <Box sx={{ width: "100%", padding: 2 }}>
                <Typography variant="subtitle1" sx={{ fontSize: "0.85rem" }} gutterBottom>
                    Price Range: KWD {selectedMinPrice} - KWD {selectedMaxPrice}
                </Typography>
                <Slider
                    value={[selectedMinPrice, selectedMaxPrice]}
                    onChange={handleSliderChange}
                    min={minPrice}
                    max={maxPrice}
                    step={10} 
                    valueLabelDisplay="auto"
                    sx={{
                        color: "#007bff",
                        "& .MuiSlider-thumb": {
                            backgroundColor: "#007bff",
                            "&:hover, &.Mui-focusVisible": {
                                boxShadow: "0px 0px 8px rgba(0, 123, 255, 0.5)",
                            },
                        },
                    }}
                />
            </Box>
        );
    } else if (Array.isArray(filter.options)) {
        return (
            <>
                {filter.options.slice(0, expandedFilters[filter.attribute] ? filter.options.length : 5).map((option) => (
                    <Form.Check
                        key={option.name}
                        type="checkbox"
                        label={`${option.label} (${option.count})`}
                        checked={selectedValues.includes(option.name)}
                        onChange={() => handleCheckboxChange(filter.attribute, option.name)}
                    />
                ))}

                {filter.options.length > 5 && (
                    <Button variant="link" className="p-0 mt-2" onClick={() => toggleShowMore(filter.attribute)}>
                        {expandedFilters[filter.attribute] ? "Show Less" : "Show More"}
                    </Button>
                )}
            </>
        );
    } else {
        return <p className="text-muted">No options available</p>;
    }
};

export default FilterOptions;
