import { useState } from "react";

function useApi() {
  // API logic here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const get = () => {
    setLoading(true);

    fetch("http://localhost:3000/api/invoices", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const post = (body) => {
    setLoading(true);

    fetch("http://localhost:3000/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        get();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const put = (id, body) => {
    setLoading(true);

    fetch(`http://localhost:3000/api/invoices/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(() => {
        get();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };
  const del = (id) => {
    setLoading(true);

    fetch(`http://localhost:3000/api/invoices/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        get();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  return { loading, error, data, get, post, put, del };
}
export default useApi;
