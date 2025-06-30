import { useState } from "react";

const API_BASE = "/api";

export function useApi(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (method = "GET", body = null, customEndpoint = null) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}${customEndpoint || endpoint}`, {
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