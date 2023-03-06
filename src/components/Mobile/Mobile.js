import styled from 'styled-components';
import React from 'react';
import SearchBar from './SearchBar';
import MainBlock from './MainBlock';
import HourlyForecast from './HourlyForecast';
import DayView from './DayView';
import background from "../../assets/images/backgrounds/night-clear.png"
import fade from "../../assets/images/fade.png"

export default class Mobile extends React.Component {

  state = {
    curr_weather: null, // current weather data
    forecast_weather: null, // forecasted weather
    // status of fetches, true once completed
    fetch_current: false,
    fetch_forecast: false
  }

  // Fetch for future forecasts - hourly, daily.
  // Refer to README for param explanation if confused!
  async FetchForecast(lat, lon, excludes){
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludes}&units=metric&appid=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      forecast_weather: data,
      fetch_forecast: true
    });
  }

  // Fetch for current weather information
  async FetchCurrent(city){
    const apiKey = process.env.REACT_APP_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    this.setState({
      curr_weather: data,
      fetch_current: true
    })
  }
  // Once components are mounted (loaded) then the API is called
  componentDidMount() {
    this.FetchCurrent("London");
    // lat/long coordinates for London
    // empty string for excludes (to call all data from api)
    this.FetchForecast("51.5074", "0.1278", ""); 
  }

  render (){
    // As the API call is asynchronous, we want the API fetch status to be true (data exists)
    // so there are no errors. So if it isn't yet, display loading: (will probably style later)
    if (!this.state.fetch_current){
      return(
        "Loading..."
      )
    }
    if (!this.state.fetch_forecast){
      return(
        "Loading..."
      )
    }
    return (
      <MobileWrap style={{backgroundImage: `url(${background})`}}>
        <FadeWrap style={{backgroundImage: `url(${fade})`}}>
        <SearchBar />
        <MainBlock weather={this.state.curr_weather}/>
        <HourlyForecast weather={this.state.curr_weather} forecast={this.state.forecast_weather}/>
        <DayView weather={this.state.curr_weather} forecast={this.state.forecast_weather}/>
        </FadeWrap>
      </MobileWrap>
  
    )
  }
}
// Styles
const MobileWrap = styled.section`
    min-height: 100vh;
    background-position: center;
    background-size: cover;
`;

const FadeWrap = styled.section`
    padding: 0.5vh;
    min-height: 100vh;
    background-size: 100% 100%;
`;