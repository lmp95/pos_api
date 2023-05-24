import { model, Schema, Types } from 'mongoose';
import { ProductInterface } from '../interfaces/product.interface';
import defaultFields from './default.model';

const ProductScheme = new Schema<ProductInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        categoryId: {
            type: Types.ObjectId,
            required: true,
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        description: {
            type: String,
            required: false,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);

const ProductModel = model('Product', ProductScheme);
export default ProductModel;
