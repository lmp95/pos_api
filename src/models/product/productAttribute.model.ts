import { model, Schema } from "mongoose";
import { ProductAttributeInterface } from "../../interfaces/product/productAttribute.interface";

export const ProductAttributeScheme = new Schema<ProductAttributeInterface>(
  {
    name: {
      type: String,
      required: true,
    },
    value: {
      type: String || Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

const ProductAttributeModel = model("ProductAttribute", ProductAttributeScheme);
export default ProductAttributeModel;
