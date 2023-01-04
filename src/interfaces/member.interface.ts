import { DefaultInterface } from './default.interface';

export interface MemberInterface extends DefaultInterface {
    _id?: string;
    name: string;
    status: boolean;
}
