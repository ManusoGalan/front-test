import React from 'react'
import PropTypes from 'prop-types'

const Pagination = ({ currentPage, currentPageSetter, numberOfPages }) => {
  const getPaginationItems = (page, pageSetter, numberOfPages) => {
    switch (page) {
      case 0:
        return (
          <>
            <li className="page-item">
              <a
                className="page-link active"
                href="#"
                onClick={() => pageSetter(page)}
              >
                {page + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page + 1)}
              >
                {page + 1 + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page + 2)}
              >
                {page + 1 + 2}
              </a>
            </li>
          </>
        )
      case numberOfPages:
        return (
          <>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page - 2)}
              >
                {page + 1 - 2}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page - 1)}
              >
                {page + 1 - 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link active"
                href="#"
                onClick={() => pageSetter(page + 2)}
              >
                {page + 1}
              </a>
            </li>
          </>
        )
      default:
        return (
          <>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page - 1)}
              >
                {page + 1 - 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link active"
                href="#"
                onClick={() => pageSetter(page)}
              >
                {page + 1}
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                href="#"
                onClick={() => pageSetter(page + 1)}
              >
                {page + 1 + 1}
              </a>
            </li>
          </>
        )
    }
  }

  return (
    <nav aria-label="Products list navigation">
      <ul className="pagination justify-content-center">
        <li className="page-item">
          <a
            className={`page-link ${currentPage === 0 ? 'disabled' : ''}`}
            href="#"
            aria-label="Previous"
            onClick={() =>
              currentPage > 0 ? currentPageSetter(currentPage - 1) : false
            }
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {getPaginationItems(currentPage, currentPageSetter, numberOfPages)}
        <li className="page-item">
          <a
            className={`page-link ${
              currentPage === numberOfPages ? 'disabled' : ''
            }`}
            href="#"
            aria-label="Next"
            onClick={() =>
              currentPage < numberOfPages
                ? currentPageSetter(currentPage + 1)
                : false
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: PropTypes.number,
  currentPageSetter: PropTypes.func,
  numberOfPages: PropTypes.number
}

export default Pagination
