import { model, Schema } from 'mongoose';
import { MemberInterface } from '../interfaces/member.interface';
import defaultFields from './default.model';

const MemberSchema = new Schema<MemberInterface>(
    {
        name: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            default: true,
            required: true,
        },
        ...defaultFields,
    },
    { versionKey: false }
);

const MemberModel = model('Member', MemberSchema);

export default MemberModel;
