import { City } from './city';
import { ListItem } from './list-item';

export interface Data {
    city: City;
    cnt: number;
    cod: string;
    list: ListItem[];
    message: number;
}
