import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

const fetcher = async ([url, query, filter]) => {
  const requestBody = {
    search: query,
    size: 80,
    sort_by: "1",
    filter: filter ? JSON.parse(filter) : {}, 
  };

  console.log("✅ API Request Body:", JSON.stringify(requestBody));

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-id": import.meta.env.VITE_CLIENT_ID,
      "Secret-key": import.meta.env.VITE_SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
};

const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";

  const filter = {};
  searchParams.forEach((value, key) => {
    if (key !== "query" && key !== "page") {
      filter[key] = filter[key] ? [...filter[key], value] : [value];
    }
  });

  const key = query || Object.keys(filter).length ? [import.meta.env.VITE_API_URL, query, JSON.stringify(filter)] : null;

  console.log("🔑 SWR Key:", key);

  return useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
};

export default useSearch;