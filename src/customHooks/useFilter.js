import { useSearchParams } from "react-router-dom";
import { useState } from "react";

export const useFilters = (filterList = []) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expandedFilters, setExpandedFilters] = useState({});

  const selectedFilters = [];
  filterList.forEach((filter) => {
    const selectedValues = searchParams.getAll(filter.attribute);
    selectedValues.forEach((value) => {
      selectedFilters.push({
        category: filter.label,
        value,
        attribute: filter.attribute,
      });
    });
  });

  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  if (minPrice || maxPrice) {
    selectedFilters.push({
      category: "Price",
      value: `KWD ${minPrice || "0"} - KWD ${maxPrice || "Max"}`,
      attribute: "price",
    });
  }

  const handleCheckboxChange = (category, value) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(category);

    if (currentValues.includes(value)) {
      newParams.delete(category);
      currentValues
        .filter((v) => v !== value)
        .forEach((v) => newParams.append(category, v));
    } else {
      newParams.append(category, value);
    }

    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  const handlePriceChange = (min, max) => {
    const newParams = new URLSearchParams(searchParams);
    if (min != null) {
      newParams.set("min_price", String(min));
    } else {
      newParams.delete("min_price");
    }
    if (max != null) {
      newParams.set("max_price", String(max));
    } else {
      newParams.delete("max_price");
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const handleRemoveFilter = (attribute, value) => {
    const newParams = new URLSearchParams(searchParams);

    if (attribute === "price") {
      newParams.delete("min_price");
      newParams.delete("max_price");
    } else {
      const updatedValues = searchParams.getAll(attribute).filter((v) => v !== value);
      newParams.delete(attribute);
      updatedValues.forEach((v) => newParams.append(attribute, v));
    }

    newParams.set("page", "1");
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();

    if (searchParams.get("query")) {
      newParams.set("query", searchParams.get("query"));
    }

    newParams.set("page", "1");

    setSearchParams(newParams);
  };

  const toggleShowMore = (attribute) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [attribute]: !prev[attribute],
    }));
  };

  return {
    selectedFilters,
    handleCheckboxChange,
    handlePriceChange,
    handleRemoveFilter,
    clearAllFilters,
    searchParams,
    setSearchParams,
    expandedFilters,
    toggleShowMore, 
  };
};
