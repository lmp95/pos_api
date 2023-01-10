import { OrderItemInterface } from './orderItem.interface';

export interface OrderInterface {
    _id?: string;
    table: string;
    items: OrderItemInterface[];
    subtotal: number;
    discount: number;
    total: number;
    status: string;
    type: string;
}
