import { model, Schema, Types } from 'mongoose';
import { OrderItemInterface } from '../interfaces/orderItem.interface';

const OrderItemSchema = new Schema<OrderItemInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
        orderId: {
            type: Types.ObjectId,
            required: true,
        },
    },
    {
        versionKey: false,
    }
);

const OrderItemModel = model('OrderItems', OrderItemSchema);
export default OrderItemModel;
