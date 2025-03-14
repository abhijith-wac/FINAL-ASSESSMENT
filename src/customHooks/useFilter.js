import { useSearchParams } from "react-router-dom";

export const useFilters = (filterList = []) => {
  const [searchParams, setSearchParams] = useSearchParams();

<<<<<<< HEAD
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
=======
  const selectedFilters = Object.fromEntries(
    Array.from(searchParams.entries()).filter(
      ([key]) => key !== "query" && key !== "page"
    )
  );
>>>>>>> 200cedc (vite)

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

<<<<<<< HEAD
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
=======
    for (const [key, value] of searchParams.entries()) {
      if (key !== "min_price" && key !== "max_price") {
        newParams.append(key, value);
      }
    }

    if (min !== null) newParams.set("min_price", min);
    if (max !== null) newParams.set("max_price", max);
>>>>>>> 200cedc (vite)

    console.log("🔍 Updated searchParams:", newParams.toString());
    setSearchParams(newParams);
  };

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

    newParams.set("page", "1");

    console.log("🔄 Updated URL params:", newParams.toString());
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
