import { ObjectId } from 'mongoose';
import { DefaultInterface } from './default.interface';

export interface ProductInterface extends DefaultInterface {
    _id?: string;
    name: string;
    categoryId: ObjectId;
    price: number;
    description: string;
}
