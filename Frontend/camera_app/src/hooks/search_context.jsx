import { createContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams, Navigate } from "react-router-dom";

export const SearchContext = createContext();

export const SearchContextProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [queryCategory, setQueryCategory] = useState(
    searchParams.get("category") || ""
  );
  const navigate = useNavigate();

  const handleChange = () => {
    setSearchParams({ q: query, category: queryCategory });
    navigate(
      `/search/?q=${encodeURIComponent(query)}&category=${encodeURIComponent(
        queryCategory
      )}`
    );
    if (window.location.href.includes("search")) {
      window.location.reload();
    }
  };
  return (
    <SearchContext.Provider
      value={{ query, setQuery, setQueryCategory, handleChange }}
    >
      {children}
    </SearchContext.Provider>
  );
};
