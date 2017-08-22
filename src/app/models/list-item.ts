import { Temperature } from './temperature';
import { Weather }  from './weather';

export interface ListItem {
    clouds: number;
    deg: number;
    dt: number;
    humidity: number;
    pressure: number;
    rain: number;
    speed: number;
    temp: Temperature;
    weather: Weather[];
}
