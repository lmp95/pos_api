import { OrderItemInterface } from './orderItem.interface';

export interface OrderInterface {
    _id?: string;
    table: number;
    items: OrderItemInterface[];
    subtotal: number;
    discount: number;
    total: number;
}
