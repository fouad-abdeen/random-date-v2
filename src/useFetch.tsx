import React from "react";

const useFetch = (url, ref, initialValue) => {
  const [data, setData] = React.useState(initialValue);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (ref.current) {
      const fetchData = async () => {
        try {
          const res = await fetch(url);
          const json = await res.json();
          setData(json);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
    return () => {
      ref.current = false;
    };
  }, [url, ref]);

  return { data, error, loading };
};

export default useFetch;
