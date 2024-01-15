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
  const [hasError, setHasError] = useState(false)
  const [weatherDescription, setWeatherDescription] = useState('');

  useEffect(() => {
    // Actualiza el estado de la descripción del clima cuando cambia
    if (wheater?.weather[0].description) {
      setWeatherDescription(wheater.weather[0].description.toLowerCase());
    }
  }, [wheater?.weather[0].description]);

  const getBackgroundClass = () => {
    // Ejemplo: mapeo de descripciones a clases CSS
    const classMappings = {
      'clear sky': 'clear-sky',
      'few clouds': 'few-clouds',
      'scattered clouds':'scattered-clouds',
      'broken clouds':'broken-clouds',
      'shower rain':'rain',
      'rain':'rain',
      'thunderstorm':'thunderstorm',
      'snow':'',
      'mist':'mist',
      'overcast clouds':'overcast-clouds',
      'light rain':'light-rain',
      'moderate rain':'moderate-rain'

      // Agrega más mapeos según sea necesario
    };

    return classMappings[weatherDescription] || 'default-background';
  };


  

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
    navigator.geolocation.getCurrentPosition(getDataLocation,error)
  },[])

  useEffect(()=>{

    if (coords){
      const API_KEY='7dac2439f4fc00cc375e1bab983133d1'
      const {lat, lon}=coords
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`      

      axios.get(url)
      .then(res =>{
        setWheater(res.data)
        setHasError(false)  
        const celsius= (res.data.main.temp-273.15).toFixed(1)
        const obj ={
          celsius: celsius,
          fahrentheit: ((res.data.main.temp-273.15)*(9/5)+32).toFixed(1)
        }
        setTemp(obj);
      })
      .catch(err=>{
        console.log(err)
      setHasError(true)})
      .finally(()=>setIsLoading(false))

    }

  },[coords])

  const error = err => {
    console.log(err)
    // Agregar lógica para manejo de errores
    setHasError(true)
  }



  return (
   <div className={`app ${getBackgroundClass()}`} >
    {
      hasError 
      ? <h2 className='errorMsg'>Por favor permite al navegador el acceso a tu ubicacion</h2>
      : isLoading
      ? <h2>Loading...</h2>
      :(<WeatherCard
      weather={wheater}
      temp ={temp}
      API_KEY={'7dac2439f4fc00cc375e1bab983133d1'}
      setIsLoading={setIsLoading}
      setTemp={setTemp}
      setWheater={setWheater}
      />)
       
    }
   </div>
  )
}

export default App
