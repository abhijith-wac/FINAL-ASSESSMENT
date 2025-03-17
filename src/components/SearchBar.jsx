import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state directly from searchParams
  const lastQuery = searchParams.get("query") || "";
  const [searchQuery, setSearchQuery] = useState(lastQuery);
  const language = searchParams.get("lang") || "en";
  const sortBy = searchParams.get("sort_by") || "1";

  const updateSearchParams = (key, value, resetPage = false) => {
    const newParams = new URLSearchParams(searchParams);

    if (key === "query") {
      if (!value.trim()) {
        setSearchQuery(lastQuery); // Revert to last searched term if cleared
        return;
      }
      setSearchQuery(value); // Update input field
    }

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    if (resetPage) {
      newParams.set("page", "1"); // Reset to first page on language change
    }

    setSearchParams(newParams);
  };

  return (
    <Form className="d-flex align-items-center mb-4">
      {/* Search Input */}
      <Form.Control
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onBlur={() => updateSearchParams("query", searchQuery)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            updateSearchParams("query", searchQuery);
            e.target.blur();
          }
        }}
        placeholder="Search for products..."
        className="me-3"
        style={{ width: "300px" }}
      />

      {/* Language Select */}
      <Form.Select
        value={language}
        onChange={(e) => updateSearchParams("lang", e.target.value, true)} // Reset page on language change
        className="me-3"
        style={{ width: "150px" }}
      >
        <option value="en">English</option>
        <option value="ar">Arabic</option>
      </Form.Select>

      {/* Sort By Select */}
      <Form.Select
        value={sortBy}
        onChange={(e) => updateSearchParams("sort_by", e.target.value)}
        className="me-3"
        style={{ width: "150px" }}
      >
        <option value="1">Relevance</option>
        <option value="4">Newest</option>
      </Form.Select>
    </Form>
  );
};

export default SearchBar;
