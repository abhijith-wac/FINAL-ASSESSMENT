import useSWR from "swr";
import { useSearchParams } from "react-router-dom";

const fetcher = async ([
  url,
  query,
  sortBy,
  minPrice,
  maxPrice,
  lang,
  filter,
  page,
]) => {
  const requestBody = {
    search: query,
    size: 80, 
    page, 
    sort_by: sortBy,
    lang,
    filter: filter ? JSON.parse(filter) : {},
  };

  if (minPrice !== null) requestBody.min_price = minPrice;
  if (maxPrice !== null) requestBody.max_price = maxPrice;

  const CLIENT_ID =
    lang === "ar"
      ? import.meta.env.VITE_CLIENT_ID_QA_AR
      : import.meta.env.VITE_CLIENT_ID_QA_EN;

  const SECRET_KEY =
    lang === "ar"
      ? import.meta.env.VITE_SECRET_KEY_QA_AR
      : import.meta.env.VITE_SECRET_KEY_QA_EN;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Client-id": CLIENT_ID,
      "Secret-key": SECRET_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  return response.json();
};

const useSearch = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const page = parseInt(searchParams.get("page")) || 1; 
  const filter = {};
  let sortBy = "1";

  let minPrice = searchParams.get("min_price");
  let maxPrice = searchParams.get("max_price");
  let lang = searchParams.get("lang") || "en";

  if (minPrice) minPrice = Number(minPrice);
  if (maxPrice) maxPrice = Number(maxPrice);

  searchParams.forEach((value, key) => {
    if (key === "sort_by") {
      sortBy = value;
    } else if (
      !["query", "page", "min_price", "max_price", "lang"].includes(key)
    ) {
      filter[key] = filter[key] ? [...filter[key], value] : [value];
    }
  });

  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = [minPrice || 0, maxPrice || 999999];
  }

  const key =
    query || Object.keys(filter).length
      ? [
          import.meta.env.VITE_API_URL,
          query,
          sortBy,
          minPrice,
          maxPrice,
          lang,
          JSON.stringify(filter),
          page, 
        ]
      : null;

  return useSWR(key, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true, 
    dedupingInterval: 60000, 
  });
};

export default useSearch;
