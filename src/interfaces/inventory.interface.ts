import { ObjectId, SchemaDefinitionProperty, Types } from "mongoose";
import { DefaultInterface } from "./default.interface";

export interface InventoryInterface extends DefaultInterface {
  _id?: string;
  parentId?: Types.ObjectId | SchemaDefinitionProperty<ObjectId>;
  name: string;
}
