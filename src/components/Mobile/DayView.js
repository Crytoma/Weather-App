import styled from 'styled-components';
import React from 'react';
import { getWeatherIcon } from './getIcons/getWeatherIconDaily'


export default class DayView extends React.Component {

    constructor(props) {
        super(props)
    }

    Dates(e) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        let d = new Date;
        return days[d.getDay() + e];
    }

    render() {
        return (
            <DayViewWrap>
                <DayWrap>
                    <tr>
                        <DateStyle>{this.Dates(0)}</DateStyle>
                        <Temperature>{(this.props.forecast["daily"][1]["temp"]["day"]).toFixed(0)} / {(this.props.forecast["daily"][1]["temp"]["night"]).toFixed(0)} °C</Temperature>
                        <WeatherIcon src={getWeatherIcon(this.props.forecast, 1)}></WeatherIcon>
                    </tr>
                    <tr>
                        <DateStyle>{this.Dates(1)}</DateStyle>
                        <Temperature>{(this.props.forecast["daily"][2]["temp"]["day"]).toFixed(0)} / {(this.props.forecast["daily"][2]["temp"]["night"]).toFixed(0)} °C</Temperature>
                        <WeatherIcon src={getWeatherIcon(this.props.forecast, 2)}></WeatherIcon>
                    </tr>
                    <tr>
                        <DateStyle>{this.Dates(2)}</DateStyle>
                        <Temperature>{(this.props.forecast["daily"][3]["temp"]["day"]).toFixed(0)} / {(this.props.forecast["daily"][3]["temp"]["night"]).toFixed(0)} °C</Temperature>
                        <WeatherIcon src={getWeatherIcon(this.props.forecast, 3)}></WeatherIcon>
                    </tr>
                    <tr>
                        <DateStyle>{this.Dates(3)}</DateStyle>
                        <Temperature>{(this.props.forecast["daily"][4]["temp"]["day"]).toFixed(0)} / {(this.props.forecast["daily"][4]["temp"]["night"]).toFixed(0)} °C</Temperature>
                        <WeatherIcon src={getWeatherIcon(this.props.forecast, 4)}></WeatherIcon>
                    </tr>
                </DayWrap>
            </DayViewWrap>
        )
    }
}

// Styles
const DayViewWrap = styled.section`
    margin: 4vh;
    margin-top: 4vh;
    margin-bottom: 4vh;
    min-height: 35vh;
`;

const DayWrap = styled.section`
    width: 100%;
    vertical-align: middle;
`;

const DateStyle = styled.td`
    padding: 1vh;
    width: 50%;
    color: white;
    text-align: left;
`;

const Temperature = styled.td`
    width: 45%;
    color: white;
    text-align: right;
`;

const Icon = styled.td`
    padding: 1vh;
    width: 15%;
    color: white;
    text-align: right;
`;

const WeatherIcon = styled.img`
    width: 25px;
    padding-left: 5px;
`;