import React from 'react'

import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Breadcrumb from './Breadcrumb'

const Header = () => {
  const productsCount = useSelector((state) => state.products.count)
  const currentLocation = useLocation()

  return (
    <>
      <nav className="navbar navbar-light bg-light px-5">
        <Link className="navbar-brand mb-0 h1" to="/">
          The Phone Home
        </Link>
        <Link className="cart position-relative d-inline-flex" to="#">
          <i className="bi bi-bag-fill fs-3 text-dark"></i>
          <span
            className="cart-basket position-absolute text-light fw-semibold mt-1"
            style={{
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%'
            }}
          >
            {productsCount}
          </span>
        </Link>
      </nav>

      <div className="container mt-4">
        <nav aria-label="breadcrumb mt-4">
          <ol className="breadcrumb">
            {[...new Set(currentLocation.pathname.split('/'))].map(
              (locationPart, index, locationParts) => {
                switch (locationPart) {
                  case '': {
                    return (
                      locationParts.length === index + 1
                        ? (
                            <Breadcrumb key="home-breadcrumb" isActive={false} linkPath={'/'}>
                              <i className="bi bi-house-fill"></i>
                            </Breadcrumb>
                          )
                        : (
                            <Breadcrumb key="home-breadcrumb" isActive={true} linkPath={'/'}>
                              <i className="bi bi-house-fill"></i>
                            </Breadcrumb>
                          )
                    )
                  }
                  default: {
                    const currentItem = JSON.parse(
                      localStorage.getItem(locationPart)
                    )
                    return (
                      <Breadcrumb key="product-breadcrumb" isActive={false} linkPath={'/'}>
                        {`${currentItem.brand} ${currentItem.model}`}
                      </Breadcrumb>
                    )
                  }
                }
              }
            )}
          </ol>
        </nav>
      </div>
    </>
  )
}

export default Header
