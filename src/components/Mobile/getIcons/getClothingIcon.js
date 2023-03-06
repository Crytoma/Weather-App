//this is importing all the files needed. Unfortunately there isn't
//a cleaner way to do this as this info is needed at compile time
import hoodie from '../../../assets/images/clothing_icons/hoodie.png'
import raincoat from '../../../assets/images/clothing_icons/raincoat.png'
import shirt from '../../../assets/images/clothing_icons/shirt.png'
import sunglasses from '../../../assets/images/clothing_icons/sunglasses.png'
import umbrella from '../../../assets/images/clothing_icons/umbrella.png'
import winter_coat from '../../../assets/images/clothing_icons/winter-coat.png'

export function getClothingIcon(weather) {
    //this grabs all the weather info needed:
    const ID = weather['weather'][0]['id'];
    const sunrise = weather['sys']["sunrise"];
    const sunset = weather['sys']["sunset"];
    const now = weather['dt'];
    const temp = weather['main']['feels_like'];
    const windSpeed = weather['wind']['speed'];
    const isNight = (now < sunrise-1800 || now > sunset+1800);

    if (ID < 700) {
        if (temp < 10) {return winter_coat;}
        else {
            if (windSpeed > 10) {return raincoat;}
            else {return umbrella;}
        }
    }
    else if (temp < 5) {return winter_coat;}
    else if (temp < 15) {return hoodie;}
    else if (!isNight && (ID <= 802 && ID >= 800)) {return sunglasses;}
    else {return shirt;}
}