import { useEffect, useState } from 'react'
import axios from 'axios'

import './App.css'
import './index.css'
import './components/WeatherCard.css'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setCoords]=useState()
  const [wheater, setWheater] = useState()
  const [isLoading, setIsLoading] = useState(true)
  const [temp, setTemp] = useState()
  const [obj,setObj]=useState()

  

  const getDataLocation= pos=>{
    const obj ={
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    }
    setCoords(obj)
    
    console.log(pos)
       
  }  

  useEffect(()=>{
    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(getDataLocation)

    
  },[])

  useEffect(()=>{

    if (coords){
      const API_KEY='7dac2439f4fc00cc375e1bab983133d1'
      const {lat, lon}=coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`      

      axios.get(url)
      .then(res =>{
        setWheater(res.data)
        const celsius= (res.data.main.temp-273.15).toFixed(1)
        const obj ={
          celsius: celsius,
          fahrentheit: ((res.data.main.temp-273.15)*(9/5)+32).toFixed(1)
        }
        setTemp(obj);
      })
      .catch(err=>console.log(err))
      .finally(()=>setIsLoading(false))

    }

  },[coords])



  return (
   <div className='app'>
    {
      isLoading
      ? <h2>Loading...</h2>
      :(<WeatherCard
      weather={wheater}
      temp ={temp}
      API_KEY={'7dac2439f4fc00cc375e1bab983133d1'}
      setIsLoading={setIsLoading}
      setTemp={setTemp}
      obj={obj}
      setWheater={setWheater}
      />)
       
    }
   </div>
  )
}

export default App
