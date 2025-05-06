import React from 'react'
import Product from './Product.jsx'

function ProductList({products}) {
  return (
    <div className='products'>
    {products ? (
      products?.map((item, index) => {
        return <Product key={index} product={item} />
      })
    ) : (
      <p>Loading</p>
    )}
    </div>
  )
}

export default ProductList