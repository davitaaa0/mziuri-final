import React from 'react'
import Rating from '../components/Rating.jsx'
import { Link } from 'react-router-dom'

function Product({product}){
  return (
    <div className='product'>
        <div className="image-container">
          <img src={product.image} alt="product" className="main-image" />
          <img src={product.image2} alt="product-hover" className="hover-image" />
        </div>
        <Link className='name' to={`/product/${product._id}`}>{product.title}</Link>
        <h3 className='price'>${product.price}</h3>
        <Rating rating={product.rating} />
    </div>
  )
}

export default Product