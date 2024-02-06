import { ObjectId } from "mongoose";
import { DefaultInterface } from "../default.interface";
import { ProductAttributeInterface, ProductAttributePayloadInterface } from "./productAttribute.interface";

export interface ProductInterface extends DefaultInterface {
  _id?: string;
  image?: string;
  path?: string;
  name: string;
  attributes?: ProductAttributeInterface[];
  SKU: string;
  stock?: number;
  unit?: string;
  categoryId: ObjectId;
  price: number;
  description: string;
}

export interface ProductPayloadInterface extends DefaultInterface {
  _id?: string;
  image?: string;
  path?: string;
  name: string;
  attributes?: ProductAttributePayloadInterface[];
  stock?: number;
  categoryId: ObjectId;
  price: number;
  description: string;
}
