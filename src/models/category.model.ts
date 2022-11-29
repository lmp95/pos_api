import { model, Schema } from "mongoose";
import { CategoryInterface } from "../interfaces/category.interface";
import defaultFields from "./default.model";

const CategorySchema = new Schema<CategoryInterface>(
    {
        name: {
            type: String,
            required: true
        },
        ...defaultFields
    },
    {
        versionKey: false
    }
)

const CategoryModel = model('Category', CategorySchema)
export default CategoryModel;