import { Schema, model } from 'mongoose';
import { CustomerInterface } from '../interfaces/customer.interface';
import defaultFields from './default.model';

const CustomerSchema = new Schema<CustomerInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
        },
        email: {
            type: String,
        },
        phone: {
            type: Number,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
            required: true,
        },
        ...defaultFields,
    },
    { versionKey: false }
);

const CustomerModel = model('Customer', CustomerSchema);

export default CustomerModel;
