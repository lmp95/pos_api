import { model, Schema, Types } from "mongoose";
import { ItemInterface } from "../interfaces/item.interface";
import defaultFields from "./default.model";

const ItemSchema = new Schema<ItemInterface>(
    {
        name: {
            type: String,
            required: true
        },
        categoryId: {
            type: Types.ObjectId,
            required: true
        },
        price: {
            type: Number,
            required: true,
            min: 1,
        },
        ...defaultFields
    },
    {
        versionKey: false,
    }
)

const ItemModel = model('Item', ItemSchema);
export default ItemModel;