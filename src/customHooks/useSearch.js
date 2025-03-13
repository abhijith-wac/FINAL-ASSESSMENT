import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

const fetcher = async ([url, query, sortBy, minPrice, maxPrice, lang, filter]) => {
  const requestBody = {
    search: query,
    size: 80,
    sort_by: sortBy, // ✅ Now `sort_by` is separate
    filter: filter ? JSON.parse(filter) : {}, // ✅ Only valid filters inside
  };

  // ✅ Only include optional filters if they exist
  if (minPrice !== null) requestBody.min_price = minPrice;
  if (maxPrice !== null) requestBody.max_price = maxPrice;
  if (lang !== null) requestBody.lang = lang;

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
  let sortBy = "1"; // Default sorting

  let minPrice = searchParams.get("min_price");
  let maxPrice = searchParams.get("max_price");
  let lang = searchParams.get("lang");

  // ✅ Convert price values to numbers
  if (minPrice) minPrice = Number(minPrice);
  if (maxPrice) maxPrice = Number(maxPrice);

  searchParams.forEach((value, key) => {
    if (key === "sort_by") {
      sortBy = value;
    } else if (key !== "query" && key !== "page" && !["min_price", "max_price", "lang"].includes(key)) {
      filter[key] = filter[key] ? [...filter[key], value] : [value];
    }
  });

  // ✅ Ensure price is inside "filter"
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = [minPrice || 0, maxPrice || 999999]; // Default max if not set
  }

  // ✅ Add language if exists
  if (lang) {
    filter.lang = [lang]; // Ensure it's inside an array
  }

  // 🔍 Log the filter object before sending
  console.log("🛠 Filters Before API Call:", filter);

  const key = query || Object.keys(filter).length
    ? [import.meta.env.VITE_API_URL, query, sortBy, JSON.stringify(filter)]
    : null;

  return useSWR(key, async ([url, query, sortBy, filter]) => {
    const requestBody = {
      search: query,
      size: 80,
      sort_by: sortBy,
      filter: filter ? JSON.parse(filter) : {}, 
    };

    // 🔍 Log the actual request being sent
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
  }, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });
};

export default useSearch;
