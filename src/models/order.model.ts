import { model, Schema, Types } from 'mongoose';
import { OrderInterface } from '../interfaces/order.interface';
import defaultFields from './default.model';

const OrderSchema = new Schema<OrderInterface>(
    {
        table: {
            type: Number,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            required: false,
        },
        total: {
            type: Number,
            required: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);

const OrderModel = model('Order', OrderSchema);
export default OrderModel;
