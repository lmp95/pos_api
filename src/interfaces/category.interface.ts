import { ObjectId, SchemaDefinitionProperty, Types } from 'mongoose';
import { DefaultInterface } from './default.interface';

export interface CategoryInterface extends DefaultInterface {
    _id?: string;
    parentId?: Types.ObjectId | SchemaDefinitionProperty<ObjectId>;
    name: string;
}
