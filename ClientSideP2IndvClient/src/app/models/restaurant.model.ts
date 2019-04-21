import { User } from './user.model';

export interface Restaurant {
    id: string,
    name: string,
    address: string,
    owner: User
}