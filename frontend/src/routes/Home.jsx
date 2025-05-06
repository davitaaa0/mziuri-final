import React, { useState, useEffect } from 'react'
import Carousel from '../components/Carousel.jsx'
import car from '../assets/icons/car.png'
import card from '../assets/icons/card.png'
import service from '../assets/icons/service.png'
import { useLoader } from '../context/LoaderContext'

function Home() {
  const [state, setState] = useState()
  const { setLoading } = useLoader()

  useEffect(() => {
 
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => {setState(data); setLoading(false);})
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
    </div>
  )
}

export default Home