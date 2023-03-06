import styled from 'styled-components';
import React from 'react';

import { getWeatherIcon } from './getIcons/getWeatherIconHourlyForecast'

export default class HourlyForecast extends React.Component {

    constructor(props){
        super(props)
    }
    
    render() {
        console.log("Current API below:");
        console.log(this.props.weather);
        console.log("Forecast API below:");
        console.log(this.props.forecast);

        var hoursArray = [0,0,0,0,0];
        var amOrPm = ["","","","",""];
        for(let i=0;i<5;i++){
            hoursArray[i] = new Date((this.props.forecast['hourly'][i]['dt'])*1000).getHours();
            if (hoursArray[i]>12){
                hoursArray[i]-=12;
                amOrPm[i] = "pm";
            } else if (hoursArray[i] === 0){
                hoursArray[i] = 12;
                var checkNext = new Date((this.props.forecast['hourly'][i+1]['dt'])*1000).getHours();
                if (checkNext>12){
                    amOrPm[i] = "pm";
                } else {
                    amOrPm[i] = "am";
                }
            } else {
                amOrPm[i] = "am";
            }
        }
        
        return (
            <HourlyForecastWrap>
                <Header>
                    <table>
                        <tr>
                            <td>
                                <HourWrap>
                                    {hoursArray[0]+amOrPm[0]}
                                    <br/>
                                    <WeatherIcon src={getWeatherIcon(this.props.forecast['hourly'][0], this.props.weather)}></WeatherIcon>
                                    <br/>
                                    {Math.round(this.props.forecast['hourly'][0]['temp'])}°C
                                </HourWrap>
                            </td>
                            <td>
                                <HourWrap>
                                    {hoursArray[1]+amOrPm[1]}
                                    <br/>
                                    <WeatherIcon src={getWeatherIcon(this.props.forecast['hourly'][1], this.props.weather)}></WeatherIcon>
                                    <br/>
                                    {Math.round(this.props.forecast['hourly'][1]['temp'])}°C
                                </HourWrap>
                            </td>
                            <td>
                                <HourWrap>
                                    {hoursArray[2]+amOrPm[2]}
                                    <br/>
                                    <WeatherIcon src={getWeatherIcon(this.props.forecast['hourly'][2], this.props.weather)}></WeatherIcon>
                                    <br/>
                                    {Math.round(this.props.forecast['hourly'][2]['temp'])}°C
                                </HourWrap>
                            </td>
                            <td>
                                <HourWrap>
                                    {hoursArray[3]+amOrPm[3]}
                                    <br/>
                                    <WeatherIcon src={getWeatherIcon(this.props.forecast['hourly'][3], this.props.weather)}></WeatherIcon>
                                    <br/>
                                    {Math.round(this.props.forecast['hourly'][3]['temp'])}°C
                                </HourWrap>
                            </td>
                            <td>
                                <HourWrap>
                                    {hoursArray[4]+amOrPm[4]}
                                    <br/>
                                    <WeatherIcon src={getWeatherIcon(this.props.forecast['hourly'][4], this.props.weather)}></WeatherIcon>
                                    <br/>
                                    {Math.round(this.props.forecast['hourly'][4]['temp'])}°C
                                </HourWrap>
                            </td>
                        </tr>
                    </table>
                </Header>
            </HourlyForecastWrap>
        )
    }
}

// Styles
const HourlyForecastWrap = styled.section`
    margin:;
    margin-top: 5vh;
    min-height: 12vh;

`;

const Header = styled.header`
    font-size: calc(10px + 2vmin);
    color: white;
`;

const HourWrap = styled.div`
    margin: 1vh;
    width: 15vw;
    height: 5vh;
`;

const WeatherIcon = styled.img`
    width: calc(40px + 2vmin);
    height: calc(40px + 2vmin);
`;

