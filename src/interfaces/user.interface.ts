import { DefaultInterface } from './default.interface';

export interface UserInterface extends DefaultInterface {
    username: string;
    password: string;
    role: string;
    email: string;
    status: boolean;
}
