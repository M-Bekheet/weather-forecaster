import React from 'react'
import '../styles/components/home.scss';

export default function Home(props) {
  return (
    <div className={`home ${props.visible ? 'active' : ''}`}>
      <div className="home-info">
        <a className="App-brand" href="/#" rel="noopener noreferrer">Forecaster</a>
        <p>Forecast your weather instantly<br /> from anywhere at anytime</p>
      </div>
    </div>
  )
}
