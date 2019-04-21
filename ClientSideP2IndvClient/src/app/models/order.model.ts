import { MenuItem } from './menuitem.model';
import { User } from './user.model';

export interface Restaurant {
    id: string,
    name: string,
    customer: User,
    address: string,
    orderItems: MenuItem[],
}