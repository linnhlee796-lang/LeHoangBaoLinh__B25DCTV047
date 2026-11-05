import { useState, useEffect } from "react";

function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;
    setLoading(true);

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Không tải được dữ liệu");
        return res.json();
      })
      .then((json) => {
        if (!ignore) {
          setData(json);
          setError("");
        }
      })
      .catch((err) => {
        if (!ignore) setError(err.message);
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });

    return () => {
      ignore = true;
    };
  }, [url]);

  async function addItem(item) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error("Thêm thất bại");
      const created = await res.json();
      setData((prev) => [...prev, created]);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  async function removeItem(id) {
    try {
      const res = await fetch(url + "/" + id, { method: "DELETE" });
      if (!res.ok) throw new Error("Xóa thất bại");
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  return { data, loading, error, addItem, removeItem };
}

export default useFetch;
