import React, { useRef, useState } from 'react'
import axios from 'axios'

const WeatherCard = ({weather , temp, API_KEY, setIsLoading,setTemp,setWheater }) => {


    const [isCelsius, setIsCelsius] = useState(true)
    
    


    const handleChangeTemp=()=>{

        setIsCelsius(state=>!state)
        
    }
    const inputCity = useRef()
    const searchCity =e=>{
        e.preventDefault()
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.current.value}&appid=${API_KEY}`)
        
      .then(res =>{
        setWheater(res.data)

        console.log(res.data)
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

    
    
 

  return (
    <article className='weather'>
        <h1 className='weather__title'>Weather App</h1>
        <h2 className='weather__subtitle'>{weather?.name}, {weather?.sys.country}</h2>
        <section className='weather__body'>
            <header className='weather__img__container'>
                <img className='weather__icon' src={weather && `https://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png` } alt='imagen del clima'/>
            </header>
            <article className='weather__info'>
                <h3 className='weather__info__title'>"{weather?.weather[0].description}"</h3>
                <ul className='weather__list'>
                    <li className='weather__item'>
                        <span className='weather__label'>Wind Speed</span>
                        <span className='weather__value'> {weather?.wind.speed} m/s</span>
                    </li>
                    <li className='weather__item'>
                        <span className='weather__label'>Pressure</span>
                        <span className='weather__value'> {weather?.main.pressure} hPa</span>
                    </li>
                    <li className='weather__item'>
                        <span className='weather__label'>Clouds</span>
                        <span className='weather__value'> {weather?.wind.speed} %</span>
                    </li>
                </ul>
            </article>
        </section>
        <footer className='weather__footer'>
            <h2 className='weather__temp'>{isCelsius
                ?`${temp?.celsius} °C`
                : `${temp?.fahrentheit} °F`}
            </h2>
            <button className='weather__btn' onClick={handleChangeTemp}>Change Temperature</button>
            <form  onSubmit={searchCity}>
                <input ref={inputCity} placeholder='Ingresar Ciudad'/>
                <button type='submit'>Consultar</button>
            </form>
        </footer>
    </article>
  )
}

export default WeatherCard