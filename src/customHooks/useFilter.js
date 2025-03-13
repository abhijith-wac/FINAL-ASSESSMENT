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

    // ✅ Handle Checkbox Change (Preserve filters & Reset Page)
    const handleCheckboxChange = (category, value) => {
        const newParams = new URLSearchParams(searchParams);
        const currentValues = newParams.getAll(category);

        if (currentValues.includes(value)) {
            newParams.delete(category);
            currentValues.filter((v) => v !== value).forEach((v) => newParams.append(category, v));
        } else {
            newParams.append(category, value);
        }

        // ✅ Reset page to 1 when filters change
        newParams.set("page", "1");

        setSearchParams(newParams);
    };

    // ✅ Handle Price Change (Preserve Filters & Reset Page)
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

        // ✅ Reset page to 1 when price changes
        newParams.set("page", "1");

        console.log("🔍 Updated searchParams:", newParams.toString());
        setSearchParams(newParams);
    };

    // ✅ Remove a Specific Filter (Preserve Others & Reset Page)
    const handleRemoveFilter = (attribute, value) => {
        console.log("🔍 Removing:", attribute, value);

        const newParams = new URLSearchParams(searchParams);

        if (attribute === "price") {
            newParams.delete("min_price");
            newParams.delete("max_price");
        } else {
            const currentValues = searchParams.getAll(attribute);
            console.log("✅ Current values before:", currentValues);

            const updatedValues = currentValues.filter((v) => v !== value);
            console.log("✅ Updated values after:", updatedValues);

            newParams.delete(attribute);
            updatedValues.forEach((v) => newParams.append(attribute, v));
        }

        // ✅ Reset page to 1 when a filter is removed
        newParams.set("page", "1");

        console.log("🔄 Updated URL params:", newParams.toString());
        setSearchParams(newParams);
    };

    // ✅ Clear All Filters (Except search query & Reset Page)
    const clearAllFilters = () => {
        const newParams = new URLSearchParams();

        if (searchParams.get("query")) {
            newParams.set("query", searchParams.get("query"));
        }

        // ✅ Reset page to 1 when all filters are cleared
        newParams.set("page", "1");

        setSearchParams(newParams);
    };

    return {
        selectedFilters,
        handleCheckboxChange,
        handlePriceChange,
        handleRemoveFilter,
        clearAllFilters,
        searchParams,
        setSearchParams,
    };
};
