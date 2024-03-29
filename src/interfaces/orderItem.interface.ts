import { ObjectId } from 'mongoose';

export interface OrderItemInterface {
    _id: string;
    name: string;
    quantity: number;
    amount: number;
    itemId: ObjectId;
    orderId?: ObjectId;
}
