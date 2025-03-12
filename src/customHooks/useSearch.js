import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

const fetcher = async ([url, query, filters]) => {
  const requestBody = {
    search: query,
    size: 80,
    sort_by: "1",
    ...filters,
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-id": import.meta.env.VITE_CLIENT_ID,
      "Secret-key": import.meta.env.VITE_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to fetch data");
  }

  return response.json();
};

const useSearch = () => {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1;

  const filters = {};
  searchParams.forEach((value, key) => {
    if (key !== "query" && key !== "page") {
      filters[key] = value;
    }
  });

  const key = [import.meta.env.VITE_API_URL, query, filters];

  return useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true, 
  });
};

export default useSearch;
