//this is importing all the files needed. Unfortunately there isn't
//a cleaner way to do this as this info is needed at compile time
import bicycle from '../../../assets/images/transport_icons/bicycle.png'
import bus from '../../../assets/images/transport_icons/bus.png'
import car from '../../../assets/images/transport_icons/car.png'
import train from '../../../assets/images/transport_icons/train.png'
import walk from '../../../assets/images/transport_icons/walk.png'

export function getTransportIcon(weather) {
    //--------------------------------------------------------------------
    //this grabs all the weather info needed:
    const ID = weather['weather'][0]['id'];
    const feelsLike = weather['main']['feels_like'];
    const temperature = weather['main']['temp'];
    const windSpeed = weather['wind']['speed'];
    //--------------------------------------------------------------------
    //if it's heavy rain/snow or thunderstorming then take public transport
    if (ID < 300 || (ID <= 511 && ID >= 500) ||
    ID === 522 || ID === 602 || ID === 622 || (ID > 700 && ID <= 781)) {
        //if below freezing, roads could be slippery, so take train
        if (temperature < 0) {return train;}
        //otherwise bus
        else {return bus;}
    }
    //if bad weather and cold, take car
    else if (ID < 700 || feelsLike < 5) {return car;}
    //if clear, comfortable temperature and not windy, cycle!
    else if (ID >= 800 && ID <= 802 && windSpeed < 10 &&
        (feelsLike > 10 && feelsLike < 25)) {
            return bicycle;
        }
    //otherwise just walk
    else {return walk;}
    //--------------------------------------------------------------------
}