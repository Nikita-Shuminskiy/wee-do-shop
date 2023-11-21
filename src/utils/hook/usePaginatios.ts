import { useState, useCallback } from 'react';

const usePagination = (initialData, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [allDataLoaded, setAllDataLoaded] = useState(false);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = initialData.slice(0, endIndex);

  const nextPage = () => {
    if (endIndex < initialData.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || allDataLoaded) {
      return;
    }
    setLoadingMore(true);
    setCurrentPage((prevPage) => prevPage + 1);
    setLoadingMore(false);

    if (endIndex >= initialData.length) {
      setAllDataLoaded(true);
    }
  }, [loadingMore, allDataLoaded, setCurrentPage, setLoadingMore, endIndex, initialData]);

  const resetPagination = () => {
    setCurrentPage(1);
    setAllDataLoaded(false);
  };

  return {
    currentPage,
    paginatedData,
    nextPage,
    loadMore,
    resetPagination,
    loadingMore,
    allDataLoaded,
  };
};

export default usePagination;
