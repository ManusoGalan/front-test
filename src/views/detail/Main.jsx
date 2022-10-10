import React from 'react'

import { useParams } from 'react-router-dom'
import Details from './components/Details'
import Options from './components/Options'

const ProductDetails = () => {
  const { id } = useParams()

  const productInfo = JSON.parse(localStorage.getItem(id))

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row align-items-center justify-content-evenly my-5">
        <img
          className="img-fluid w-75 mx-md-5 mb-3 mb-md-0"
          src={productInfo.imgUrl}
          alt={productInfo.model}
        />
        <div className="d-flex flex-column w-75 mx-md-5">
          <h1 className="text-secondary">
            {productInfo.brand} {productInfo.model}
          </h1>
          <p className="fs-2 text-primary fw-bold">
            {productInfo.price}
            <span className="fs-4">€</span>
          </p>
          <Details productInfo={productInfo}></Details>
          <Options
            productId={id}
            colorOptions={productInfo.options.colors}
            storageOptions={productInfo.options.storages}
          ></Options>
        </div>
      </div>
    </div>
  )
}

export default ProductDetails
