import React, { useEffect, useState } from 'react'
import { useLoader } from '../context/LoaderContext'
import RouteBanner from '../components/RouteBanner.jsx'

function About() {
  const [state, setState] = useState()
  const { setLoading } = useLoader()
    
  useEffect(() => {
     
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(data => {setState(data); setLoading(false);})
  }, [])

  return (
    <div>
      <RouteBanner />
    </div>
  )
}

export default About