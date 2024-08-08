import { useState } from "react";

const useSort = (initialData, initialKey = null, initialOrder = "asc") => {
  const [data, setData] = useState(initialData);
  const [sortKey, setSortKey] = useState(initialKey);
  const [sortOrder, setSortOrder] = useState(initialOrder);

  const sortData = (key, order) => {
    const sortedData = [...data].sort((a, b) => {
      if (order === "asc") {
        if (a[key] < b[key]) return -1;
        if (a[key] > b[key]) return 1;
        return 0;
      } else {
        if (a[key] < b[key]) return 1;
        if (a[key] > b[key]) return -1;
        return 0;
      }
    });

    setData(sortedData);
    setSortKey(key);
    setSortOrder(order);
  };

  const toggleSort = (key) => {
    if (key === sortKey) {
      // Toggle the sorting order if the same key is clicked
      const newOrder = sortOrder === "asc" ? "desc" : "asc";
      sortData(key, newOrder);
    } else {
      // Sort in ascending order by default when a new key is clicked
      sortData(key, "asc");
    }
  };

  return {
    data,
    sortKey,
    sortOrder,
    toggleSort,
  };
};

export default useSort;
