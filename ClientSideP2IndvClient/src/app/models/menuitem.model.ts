import { Restaurant } from './restaurant.model';

export interface MenuItem {
    id: string,
    name: string,
    price: number,
    restaurant: Restaurant
}