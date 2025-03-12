import { useSearchParams } from 'react-router-dom';

export const useFilters = (data) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const filterList = data?.filter_list || [];

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

  const getCheckedValues = (category) => searchParams.getAll(category);

  const removeFilter = (category, value) => {
    const newParams = new URLSearchParams(searchParams);
    const currentValues = newParams.getAll(category);
    newParams.delete(category);
    currentValues.filter((v) => v !== value).forEach((v) => newParams.append(category, v));
    setSearchParams(newParams);
  };

  const clearAllFilters = () => {
    const newParams = new URLSearchParams();
    if (searchParams.has("query")) {
      newParams.set("query", searchParams.get("query"));
    }
    setSearchParams(newParams);
  };

  const isAccordionExpanded = (category) => searchParams.has(`expand-${category}`);

  const toggleAccordionState = (category) => {
    const newParams = new URLSearchParams(searchParams);
    filterList.forEach((filter) => {
      if (filter.name !== category) newParams.delete(`expand-${filter.name}`);
    });

    if (newParams.has(`expand-${category}`)) {
      newParams.delete(`expand-${category}`);
    } else {
      newParams.append(`expand-${category}`, 'true');
    }

    setSearchParams(newParams);
  };

  const filterOptionsBySearch = (category, query) => {
    const filterData = filterList.find((filter) => filter.name === category);
    if (!filterData) return [];

    return filterData.options.filter((option) =>
      option.label.toLowerCase().includes(query.toLowerCase())
    );
  };

  const selectedFilters = filterList.flatMap((filter) =>
    getCheckedValues(filter.name).map((value) => {
      const label = filter.options.find((option) => option.value === value)?.label;
      return { category: filter.name, label, value };
    })
  );

  return {
    searchParams,
    selectedFilters,
    handleCheckboxChange,
    getCheckedValues,
    removeFilter,
    clearAllFilters,
    isAccordionExpanded,
    toggleAccordionState,
    filterOptionsBySearch,
  };
};
