import { model, Schema, Types } from "mongoose";
import { ProductInterface } from "../../interfaces/product/product.interface";
import defaultFields from "../default.model";
import { ProductAttributeScheme } from "./productAttribute.model";

const ProductScheme = new Schema<ProductInterface>(
  {
    image: {
      type: String,
    },
    path: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    SKU: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
    },
    attributes: {
      type: [ProductAttributeScheme],
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

const ProductModel = model("Product", ProductScheme);
export default ProductModel;
