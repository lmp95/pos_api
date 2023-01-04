import { DefaultInterface } from './default.interface';

export interface TableInterface extends DefaultInterface {
    _id?: string;
    name: string;
    status: string;
}
