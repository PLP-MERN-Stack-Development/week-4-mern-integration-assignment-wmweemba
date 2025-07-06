import { useState } from "react";

const API_BASE = "/api";

function buildQueryString(params) {
  if (!params) return "";
  const esc = encodeURIComponent;
  return (
    "?" +
    Object.keys(params)
      .map((k) => esc(k) + "=" + esc(params[k]))
      .join("&")
  );
}

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (method = "GET", body = null, customEndpoint = null, query = null) => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE}${customEndpoint || endpoint}`;
      if (method === "GET" && query) {
        url += buildQueryString(query);
      }
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...(body && { body: JSON.stringify(body) }),
        ...options,
      });
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setData(json);
      return json;
    } catch (err) {
      setError(err.message || "Unknown error");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, setData };
} 