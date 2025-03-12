import { useSearchParams } from "react-router-dom";

export const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract selected filters from URL params
  const selectedFilters = Object.fromEntries(
    Array.from(searchParams.entries()).filter(
      ([key]) => key !== "query" && key !== "page"
    )
  );

  // ✅ Handle Checkbox Change (Preserve filters)
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

    setSearchParams(newParams);
  };

  // ✅ Handle Price Change (Preserve existing filters)
  const handlePriceChange = (min, max) => {
    const newParams = new URLSearchParams(searchParams);

    // Preserve existing filters
    for (const [key, value] of searchParams.entries()) {
      if (key !== "min_price" && key !== "max_price") {
        newParams.append(key, value);
      }
    }

    // Update price range
    if (min !== null) newParams.set("min_price", min);
    if (max !== null) newParams.set("max_price", max);

    setSearchParams(newParams);
  };

  // ✅ Clear All Filters (Except query)
  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (searchParams.get("query")) {
      newParams.set("query", searchParams.get("query"));
    }
    setSearchParams(newParams);
  };

  return {
    selectedFilters,
    handleCheckboxChange,
    handlePriceChange,
    clearAllFilters,
    searchParams,
    setSearchParams,
  };
};
