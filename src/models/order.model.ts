import { model, Schema, Types } from 'mongoose';
import { OrderInterface } from '../interfaces/order.interface';
import { ORDER_STATUS, ORDER_TYPE } from '../utils/constants';
import defaultFields from './default.model';

const OrderSchema = new Schema<OrderInterface>(
    {
        table: {
            type: String,
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
        status: {
            type: String,
            default: ORDER_STATUS.ongoing,
            enum: [ORDER_STATUS.ongoing, ORDER_STATUS.complete, ORDER_STATUS.cancelled],
            required: true,
        },
        type: {
            type: String,
            enum: [ORDER_TYPE.dineIn, ORDER_TYPE.takeaway],
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
