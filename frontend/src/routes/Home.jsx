import React, { useState, useEffect } from 'react'
import { useLoader } from '../context/LoaderContext'
import Carousel from '../components/Carousel.jsx'
import ProductList from '../components/ProductList.jsx'
import car from '../assets/icons/car.png'
import card from '../assets/icons/card.png'
import service from '../assets/icons/service.png'
import * as api from '../api/api.jsx'

function Home() {
  const [products, setProducts] = useState()
  const { setLoading } = useLoader()

  useEffect(() => {
    const fetchProductsData = async () => {
      const data = await api.getProducts()
      console.log(data) 
      if(data?.data) {
        setProducts(data.data.slice(0, 8))
      } else if(data.err) {
        alert(data.err)
      }
      setLoading(false)
    }
  
    fetchProductsData()
  }, [])

  return (
    <div>
        <Carousel />
        <div className='services'>
          <div className='service_shipping service'>
            <div className='img-box'>
              <img src={car} alt="car" />
            </div>
            <div className='text-box'>
              <h3>Free Shipping</h3>
              <p>Capped at $319 per order</p>
            </div>
          </div>
          <div className='service_payment service'>
            <div className='img-box'>
              <img src={card} alt="card" />
            </div>
            <div className='text-box'>
              <h3>Safe Payment</h3>
              <p>With our payment gateway</p>
            </div>
          </div>
          <div className='service_best service'>
            <div className='img-box'>
              <img src={service} alt="service" />
            </div>
            <div className='text-box'>
              <h3>Best Services</h3>
              <p>Friendly & Supper Services</p>
            </div>
          </div>
        </div>
        <div className="products">
          <div  className='products_title'>
            <h1>our products</h1>
          </div>
          <div className='products_filters'>
            <div className='filter active'>Featured</div>
            <div className='filter'>Bestseller</div>
            <div className='filter'>Latest</div>
          </div>
          <div className='product-container'>
            <ProductList products={products} setProducts={setProducts}/>
          </div>
        </div>
    </div>
  )
}

export default Home