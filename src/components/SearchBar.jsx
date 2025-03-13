import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

const SearchBar = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
    const [language, setLanguage] = useState(searchParams.get("lang") || "en");
    const [sortBy, setSortBy] = useState(searchParams.get("sort_by") || "1");

    // ✅ Preserve existing filters while updating the query params
    const updateSearchParams = (key, value) => {
        const newParams = new URLSearchParams(searchParams);

        if (value) {
            newParams.set(key, value); // Update the specific key
        } else {
            newParams.delete(key); // Remove if empty
        }

        setSearchParams(newParams);
    };

    // ✅ Prevent form submission on Enter
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page refresh or navigation
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex align-items-center mb-4">
            <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    updateSearchParams("query", e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault(); // Prevent form submission
                        e.target.blur(); // Remove focus from the input field
                    }
                }}
                placeholder="Search for products..."
                className="me-3"
                style={{ width: "300px" }}
            />

            <Form.Select
                value={language}
                onChange={(e) => {
                    setLanguage(e.target.value);
                    updateSearchParams("lang", e.target.value);
                }}
                className="me-3"
                style={{ width: "150px" }}
            >
                <option value="en">English</option>
                <option value="ar">Arabic</option>
            </Form.Select>

            <Form.Select
                value={sortBy}
                onChange={(e) => {
                    setSortBy(e.target.value);
                    updateSearchParams("sort_by", e.target.value);
                }}
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
