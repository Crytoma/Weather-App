import styled from 'styled-components';
import React from 'react';
import Grid from '@mui/material/Grid';
import { getWeatherIcon } from './getIcons/getWeatherIcon'
import { getClothingIcon } from './getIcons/getClothingIcon'
import { getTransportIcon } from './getIcons/getTransportIcon'
import degrees from '../../assets/images/weather_icons/degrees.png'


export default class MainBlock extends React.Component {

    constructor(props){
        super(props)
    }
    
    render() {
        return (
            <MainBlockWrap>
                <Grid   
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <Location>
                            {this.props.weather['name']}
                        </Location>
                    </Grid>
                    <Grid item>
                        <Grid   
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                        >
                            <Grid item>
                                <Temperature>
                                    {Math.round(this.props.weather['main']['temp'])}
                                </Temperature>
                                <br/>
                            </Grid>
                            <Grid item>
                                <Grid   
                                    container
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"   
                                    spacing="100"
                                >
                                    <Grid item>
                                        <DegreesIcon src={degrees}></DegreesIcon>
                                    </Grid>
                                    <Grid item>
                                        <WeatherIcon src={getWeatherIcon(this.props.weather)}></WeatherIcon>
                                    </Grid>
                                </Grid>
                                
                                
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item><Padding><br/></Padding></Grid>
                    <Grid item>
                        <ClothingIcon src={getClothingIcon(this.props.weather)}></ClothingIcon>
                    </Grid>
                    <Grid item><Padding><br/></Padding></Grid>
                    <Grid item>
                        <TransportIcon src={getTransportIcon(this.props.weather)}></TransportIcon>
                    </Grid>
                </Grid>
            </MainBlockWrap>
        )
    }
}

// Styles
const MainBlockWrap = styled.section`
    margin: 4vh;
    margin-top: 4vh;
    min-height: 45vh;
;`

const Location = styled.header`
    font-size: calc(10px + 2vmin);
    color: white;
    fontFamily: roboto-regular;
`;


const Temperature = styled.text`
    font-size: calc(90px + 2vmin);
    color: white;
    line-height: 40px;
`;

const Padding = styled.text`
    font-size: calc(2px + 2vmin);
    color: white;
    fontFamily: roboto-regular;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

const DegreesIcon = styled.img`
    width: calc(20px + 2vmin);
    height: calc(20px + 2vmin);
`;

const WeatherIcon = styled.img`
    width: calc(40px + 2vmin);
    height: calc(40px + 2vmin);
`;

const ClothingIcon = styled.img`
    width: calc(100px + 2vmin);
    height: calc(100px + 2vmin);
`;

const TransportIcon = styled.img`
    width: calc(100px + 2vmin);
    height: calc(100px + 2vmin);
`;