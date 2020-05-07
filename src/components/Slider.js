import React, { useState } from 'react'
import Home from './Home'
import WatherForecast from './WeatherForecast'
import '../styles/components/slider.scss';

export default function Slider (props) {
  const [homeIsVisible, setHomeIsVisible] = useState('true')

  const handleSlideVisibility = (e, hideHome) => {
    e.preventDefault();
    setHomeIsVisible(hideHome)
  }

  return (
    <div className="slider">
      <div className="slider-buttons">
        <header className="header">
          <ul>
            <li><a href="/#" onClick={e => handleSlideVisibility(e, true)}>Home</a></li>
            <li><a href="/#" onClick={e => handleSlideVisibility(e, false)}>Weather</a></li>
          </ul>
        </header>
        <div className="slider-indicators">
          <ul>
            {homeIsVisible ? (
              <>
                <li><button className="active"></button></li>
                <li><button onClick={e => handleSlideVisibility(e, false)}></button></li>
              </>
              ) : (
              <>
                <li><button onClick={e => handleSlideVisibility(e, true)}></button></li>
                <li><button className="active"></button></li>
              </>
            )}
          </ul>
        </div>
      </div>
      <Home visible={homeIsVisible} />
      <WatherForecast visible={!homeIsVisible} />
    </div>
  )
}
