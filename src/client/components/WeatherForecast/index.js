import React from 'react'

import('./styles.css')

export default class WeatherForecast extends React.Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('weather forecast props')
  }

  render () {
    return (
      <div className='weather-container'>
        Weather Forecast
      </div>
    )
  }
}
