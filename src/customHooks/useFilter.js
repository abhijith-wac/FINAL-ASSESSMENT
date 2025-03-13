import { useSearchParams } from "react-router-dom";

export const useFilters = (filterList = []) => {
    const [searchParams, setSearchParams] = useSearchParams();

    // ✅ Extract selected filters dynamically
    const selectedFilters = [];
    filterList.forEach((filter) => {
        const selectedValues = searchParams.getAll(filter.attribute);
        selectedValues.forEach((value) => {
            selectedFilters.push({ category: filter.label, value, attribute: filter.attribute });
        });
    });

    // ✅ Ensure Price is tracked as a selected filter
    const minPrice = searchParams.get("min_price");
    const maxPrice = searchParams.get("max_price");

    if (minPrice || maxPrice) {
        selectedFilters.push({
            category: "Price",
            value: `KWD ${minPrice || "0"} - KWD ${maxPrice || "Max"}`,
            attribute: "price",
        });
    }

    // ✅ Handle Checkbox Change (Preserve filters)
    const handleCheckboxChange = (category, value) => {
        const newParams = new URLSearchParams(searchParams);
        const currentValues = newParams.getAll(category);

        if (currentValues.includes(value)) {
            newParams.delete(category);
            currentValues.filter((v) => v !== value).forEach((v) => newParams.append(category, v));
        } else {
            newParams.append(category, value);
        }

        setSearchParams(newParams);
    };

    // ✅ Handle Price Change (Preserve All Filters)
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

        console.log("🔍 Updated searchParams:", newParams.toString());
        setSearchParams(newParams);
    };

    // ✅ Remove a Specific Filter
    const handleRemoveFilter = (attribute, value) => {
        console.log("🔍 Removing:", attribute, value);

        const newParams = new URLSearchParams(searchParams);

        if (attribute === "price") {
            newParams.delete("min_price");
            newParams.delete("max_price");
        } else {
            // Get all current values for this attribute
            const currentValues = searchParams.getAll(attribute);
            console.log("✅ Current values before:", currentValues);

            // **BUG FIX**: Make sure to remove only the selected value
            const updatedValues = currentValues.filter((v) => v !== value);
            console.log("✅ Updated values after:", updatedValues);

            // **Remove attribute if no values are left**
            newParams.delete(attribute);
            updatedValues.forEach((v) => newParams.append(attribute, v));
        }

        console.log("🔄 Updated URL params:", newParams.toString());
        setSearchParams(newParams);
    };

    // ✅ Clear All Filters (Except search query)
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
        handleRemoveFilter, // ✅ Use this for price filter click issue
        clearAllFilters,
        searchParams,
        setSearchParams,
    };
};
