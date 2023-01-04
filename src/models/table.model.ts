import { model, Schema } from 'mongoose';
import { TableInterface } from '../interfaces/table.interface';
import { TABLE_STATUS } from '../utils/constants';
import defaultFields from './default.model';

const TableSchema = new Schema<TableInterface>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        status: {
            type: String,
            default: TABLE_STATUS.available,
            required: true,
        },
        ...defaultFields,
    },
    {
        versionKey: false,
    }
);

const TableModel = model('Table', TableSchema);
export default TableModel;
