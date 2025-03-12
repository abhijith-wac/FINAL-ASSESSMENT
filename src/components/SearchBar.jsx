import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [language, setLanguage] = useState(searchParams.get("lang") || "en");
  const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "1");

  // Handle search query change
  const handleSearchQueryChange = (e) => {
    const newQuery = e.target.value;
    setSearchQuery(newQuery);
    
    // Update URL search params
    const newParams = new URLSearchParams(searchParams);
    if (newQuery) {
      newParams.set("query", newQuery);
    } else {
      newParams.delete("query"); // Remove query if empty
    }
    setSearchParams(newParams);
  };

  // Handle language change
  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);

    // Update URL search params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("lang", newLanguage);
    setSearchParams(newParams);
  };

  // Handle sorting change
  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortBy(newSort);

    // Update URL search params
    const newParams = new URLSearchParams(searchParams);
    newParams.set("sort_by", newSort);
    setSearchParams(newParams);
  };

  return (
    <Form className="d-flex align-items-center mb-4">
      <Form.Control
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        placeholder="Search for products..."
        className="me-3"
        style={{ width: "300px" }}
      />

      <Form.Select
        value={language}
        onChange={handleLanguageChange}
        className="me-3"
        style={{ width: "150px" }}
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </Form.Select>

      <Form.Select
        value={sortBy}
        onChange={handleSortChange}
        className="me-3"
        style={{ width: "150px" }}
      >
        <option value="1">Relevance</option>
        <option value="2">Price High to Low</option>
        <option value="3">Price Low to High</option>
        <option value="4">Newest</option>
      </Form.Select>
    </Form>
  );
};

export default SearchBar;
