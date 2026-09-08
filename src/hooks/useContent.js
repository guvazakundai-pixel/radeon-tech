import { useState, useEffect, useCallback } from "react";
import * as defaultData from "../content/data.js";

const cache = {};

export function useContent(key) {
  const [data, setDataValue] = useState(() => {
    if (cache[key]) return cache[key];
    return defaultData[key] || null;
  });
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`/api/content/${key}`);
      if (res.ok) {
        const json = await res.json();
        if (json.value) {
          cache[key] = json.value;
          setDataValue(json.value);
        }
      }
    } catch {
      if (!cache[key] && defaultData[key]) {
        setDataValue(defaultData[key]);
      }
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const setData = (val) => {
    cache[key] = val;
    setDataValue(val);
  };

  return { data, loading, refetch: fetchData, setData };
}

export function saveContent(key, value) {
  cache[key] = value;
}

export async function saveContentToServer(key, value, token) {
  const res = await fetch(`/api/content/${key}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ value }),
  });
  if (!res.ok) throw new Error("Failed to save");
  cache[key] = value;
  return await res.json();
}
