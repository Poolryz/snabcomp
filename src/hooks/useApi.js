import { useState } from "react";

function useApi({ baseUrl, endpoints, headers, method, body }) {
  // API logic here
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  function fetchFunc() {
    setLoading(true);
    fetch(`${baseUrl}/${endpoints}`, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((result) => {
        setData(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { loading, error, data };
}
