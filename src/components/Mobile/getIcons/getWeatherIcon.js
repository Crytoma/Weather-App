//this is importing all the files needed. Unfortunately there isn't
//a cleaner way to do this as this info is needed at compile time
import clear_day from '../../../assets/images/weather_icons/clear-day.png'
import clear_night from '../../../assets/images/weather_icons/clear-night.png'
import clear_sunrise_sunset from '../../../assets/images/weather_icons/clear-sunrise-sunset.png'
import cloudy_night from '../../../assets/images/weather_icons/cloudy-night.png'
import cloudy from '../../../assets/images/weather_icons/cloudy.png'
import drizzle_night from '../../../assets/images/weather_icons/drizzle-night.png'
import drizzle_partly_cloudy from '../../../assets/images/weather_icons/drizzle-partly-cloudy.png'
import drizzle from '../../../assets/images/weather_icons/drizzle.png'
import misty from '../../../assets/images/weather_icons/misty.png'
import partly_clear from '../../../assets/images/weather_icons/partly-clear.png'
import partly_cloudy from '../../../assets/images/weather_icons/partly-cloudy.png'
import rain_heavy_night from '../../../assets/images/weather_icons/rain-heavy-night.png'
import rain_heavy from '../../../assets/images/weather_icons/rain-heavy.png'
import rain_night from '../../../assets/images/weather_icons/rain-night.png'
import rain_partly_cloudy from '../../../assets/images/weather_icons/rain-partly-cloudy.png'
import rain_partly_sunny from '../../../assets/images/weather_icons/rain-partly-sunny.png'
import rain from '../../../assets/images/weather_icons/rain.png'
import snow_partly_cloudy from '../../../assets/images/weather_icons/snow-partly-cloudy.png'
import snow_sleet from '../../../assets/images/weather_icons/snow-sleet.png'
import snow from '../../../assets/images/weather_icons/snow.png'
import thunderstorm_drizzle from '../../../assets/images/weather_icons/thunderstorm-drizzle.png'
import thunderstorm_night from '../../../assets/images/weather_icons/thunderstorm-night.png'
import thunderstorm from '../../../assets/images/weather_icons/thunderstorm.png'

export function getWeatherIcon(weather) {
    //--------------------------------------------------------------------------------------------
    //this grabs all the weather info needed:
    const ID = weather['weather'][0]['id'];
    const clouds = weather['clouds'];
    const isPartlyCloudy = clouds <= 25;
    const isScatteredClouds = clouds <= 50;
    const sunrise = weather['sys']["sunrise"];
    const sunset = weather['sys']["sunset"];
    const now = weather['dt'];
    const isNight = (now < sunrise-1800 || now > sunset+1800);
    //--------------------------------------------------------------------------------------------
    //this makes a 2D array of the file names, with indices corresponding to the ID values.
    //The blank items correspond to the gaps in the ID that aren't used:
    const fileList =    [[],[],
                        [thunderstorm, thunderstorm_night, thunderstorm_drizzle],
                        [drizzle, drizzle_night, drizzle_partly_cloudy],
                        [],
                        [rain, rain_night, rain_partly_cloudy, rain_partly_sunny],
                        [rain_heavy, rain_heavy_night],
                        [snow, snow_sleet, snow_partly_cloudy],
                        [misty],
                        [clear_day, clear_night, clear_sunrise_sunset],
                        [cloudy, cloudy_night, partly_cloudy, partly_clear]];
    //--------------------------------------------------------------------------------------------
    //this gets the basic weather type (e.g rain), corresponding to the first index in
    //the 2D array:
    var weather_type = Math.round((ID/100));
    if (ID > 800) {weather_type = 10;}
    else if (weather_type >= 6) {weather_type += 1;}
    else if (ID <= 504 && ID >= 502) {weather_type = 6;}
    //--------------------------------------------------------------------------------------------
    //this then gets the weather sub-type (e.g rain_partly_sunny), corresponding to the 
    //second index in the 2D array:
    const weather_subtype = findWeatherSubtype( weather_type, ID, isNight, 
                                                isPartlyCloudy, isScatteredClouds, 
                                                sunrise, sunset, now);
    //--------------------------------------------------------------------------------------------
    //finally this returns the element from the array using the information collected
    return fileList[weather_type][weather_subtype];
    //--------------------------------------------------------------------------------------------
    //this finds the weather sub-type
    function findWeatherSubtype(type, ID, isNight, isPartlyCloudy, isScatteredClouds, 
                                sunrise, sunset, now) {
        var tempVal = 0;
        switch (type) {
            //thunderstorm:
            case 2:
                return defaultWeatherSubtype(ID >= 230, isNight);
            //drizzle:
            case 3:
                return defaultWeatherSubtype(isScatteredClouds, isNight);
            //rain:
            case 5:
                tempVal = defaultWeatherSubtype(isScatteredClouds, isNight);
                if (tempVal === 2 && !isNight && isPartlyCloudy) {return 3}
                return tempVal;
            //heavy-rain:
            case 6:
                if (isNight) {return 1}
                return 0;
            //snow:
            case 7:
                if (ID >= 611 && ID <= 616) {return 1}
                if (isScatteredClouds) {return 2}
                return 0;
            //clear:
            case 9:
                return defaultWeatherSubtype((now > sunrise-1800 && now < sunrise+1800) ||
                                            (now > sunset-1800 && now < sunset+1800), isNight);
            //cloudy:
            case 10:
                if (!isNight && isPartlyCloudy) {return 3;}
                return defaultWeatherSubtype(isScatteredClouds, isNight);
            //default (for misty):
            default:
                return 0;
        }
    }
    //--------------------------------------------------------------------------------------------
    //this is the final function that returns 2 for the first conditions and 1 for the second.
    //This helps reduce the amount of code and the order of conditions is based on the priority
    //set up through the array
    function defaultWeatherSubtype(firstCondition, secondCondition) {
        if (firstCondition) {return 2;}
        else if (secondCondition) {return 1;}
        return 0;
    }
    //--------------------------------------------------------------------------------------------
}