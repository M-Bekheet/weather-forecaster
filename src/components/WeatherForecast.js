import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import '../styles/components/weather.scss';

export default  function WeatherForecast(props) {

  const [city, setCity] = useState('');
  const [weatherInfo, setWeatherInfo] = useState();
  const [hasFetchedData, sethasFetchedData] = useState(false);
  const [hasLocalInfo, setHasLocalInfo] = useState(false);
  const [currentPosition, setCurrentPosition] =  useState({})
  const [error, setError] = useState('');

  const cityRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(cityRef.current.value)
  }

  useEffect(() => {
    const source = axios.CancelToken.source();
    let url = '';
    setError('');
    if(city){
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=6eb65a66b730e9f86203db9662bbb047&units=metric`;
    } else if(!city && currentPosition.longitude && currentPosition.latitude ){
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${currentPosition.latitude}&lon=${currentPosition.longitude}&appid=6eb65a66b730e9f86203db9662bbb047&units=metric`;
    } 

    console.log(city, url)
    if(url){
      axios.get(url)
        .then(res => {
          if (res.status === 200) {
            setWeatherInfo(res.data)
            setHasLocalInfo(true)
            sethasFetchedData(false);
          }
        })
        .catch((err) => {
          console.log('catching', !err.response)
          if (!err.response) { return ''; }
          console.log('catching1')
          if (err.response.status === 404) {
            console.log('404')
            setHasLocalInfo(false);
            setError('This city cannot be found. Kindly write it correctly')
            console.log(error)
          } else {
            setError('Something went wrong, kindly check your network connection')
            console.log(error)
          }
        });
    }

    
    return () => {
      source.cancel();
    }
  }, [city, currentPosition])

  useEffect(() => {

    async function getPosition(){
      if (navigator.geolocation) { //fetching current location if available in browser
        navigator.geolocation.getCurrentPosition(async position => {
          const latitude = await position.coords.latitude;
          const longitude = await position.coords.longitude;
          if(latitude && longitude) {
            setCurrentPosition({latitude, longitude});
          }
        });
      }
    }

    getPosition();

  }, [])


  return (
    <section className={`weather-forecast ${props.visible ? 'active' : ''}`}>
      <h2>Just type the city name</h2>
      <p className="spell-note">you must spell it correctly</p>
      <form className="weather-form" onSubmit={handleSubmit}>
        <input  
          type="search" 
          placeholder="your city name" 
          ref={cityRef}
        ></input>
        <input type="submit" value="find"></input>
      </form>

      <div className="weather-info">
        {
          hasFetchedData ? (
            <p>
              Loading your weather info
            </p>
          ) : (
            hasLocalInfo ? (
            <>
              <p className="location">{weatherInfo.name}, {weatherInfo.sys.country}</p>
              <img className={`weather-icon`} src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="weather-icon" />
              <p className="weather-main">{weatherInfo.weather[0].main}</p>
              <p className="weather-temp">{weatherInfo.main.temp}&deg; </p>
              <p className="weather-temp-range">
                <span>{weatherInfo.main.temp_min}&deg; &nbsp;</span>
                <span>{weatherInfo.main.temp_max}&deg;</span>
              </p>
              <p className="weather-description">{weatherInfo.weather[0].description}</p>
            </>
            ) : (
                error ? (
                  <div>{error}</div>
                ):(
                  <div> Kindly check your city name</div>
                )
              )
        )}
      </div>
    </section>
  )
}
