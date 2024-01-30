import { model, Schema, Types } from "mongoose";
import defaultFields from "./default.model";
import { InventoryInterface } from "../interfaces/inventory.interface";

const InventorySchema = new Schema<InventoryInterface>(
  {
    parentId: {
      type: Types.ObjectId,
    },
    name: {
      type: String,
      required: true,
    },
    ...defaultFields,
  },
  {
    versionKey: false,
  }
);

const InventoryModel = model("Inventory", InventorySchema);
export default InventoryModel;
