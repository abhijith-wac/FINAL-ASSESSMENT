import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('query') || ''; // Get query from URL

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search-page?query=${searchQuery}`);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100">
      <h1 className="mb-4">Search Your Product</h1>
      <form onSubmit={handleSearch} className="w-50 d-flex">
        <input
          type="text"
          defaultValue={searchQuery} // Use defaultValue to avoid controlled component issues
          onChange={(e) => setSearchParams({ query: e.target.value }, { replace: true })} // Update URL params instantly
          placeholder="Search for products..."
          className="form-control me-2"
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default Home;
