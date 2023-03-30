import { useState, useEffect } from 'react';

export const usePagination = (itemList, itemQuantityPerPage, pagesToShow = 5) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(itemList.length / itemQuantityPerPage);
  const lowerLimit = (currentPage - 1) * itemQuantityPerPage;
  const upperLimit = currentPage * itemQuantityPerPage - 1;
  const listSlice = itemList.slice(lowerLimit, upperLimit + 1);

  const nextPage = () => {
    const newPage = currentPage + 1;
    if (newPage <= totalPages) setCurrentPage(newPage);
  };

  const previousPage = () => {
    const newPage = currentPage - 1;
    if (newPage >= 1) setCurrentPage(newPage);
  };

  const changePageTo = (newPage) => {
    if (newPage < 1) setCurrentPage(1);
    else if (newPage > totalPages) setCurrentPage(totalPages);
    else setCurrentPage(newPage);
  };

  const pages = [];
  const startPage = Math.max(currentPage - Math.floor(pagesToShow / 4), 1);
  const endPage = Math.min(startPage + pagesToShow - 1, totalPages);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  useEffect(() => {
    changePageTo(currentPage);
  }, [itemList, itemQuantityPerPage]);

  return {
    currentPage,
    listSlice,
    pages,
    nextPage,
    previousPage,
    changePageTo,
  };
};