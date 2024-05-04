import { useState } from 'react'

const usePagination = (data: any, itemsPerPage: any) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
  }

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return {
    nextPage,
    prevPage,
    currentItems,
    currentPage,
    totalPages
  }
}

export default usePagination
