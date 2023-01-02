import { UserInterface } from '../interfaces/user.interface';
import UserModel from '../models/user.model';
import ApiError from '../utils/apiError';
import { hashPassword } from '../utils/utils';

/**
 * Create user
 * @param {UserInterface} data
 * @returns {Promise<UserInterface>}
 */
const createUser = async (user: UserInterface): Promise<UserInterface> => {
    const existUser = await getUserByEmail(user.email);
    if (!existUser) {
        user = {
            ...user,
            password: await hashPassword(user.password),
            createdBy: user.username,
            createdDate: new Date(),
            updatedBy: user.username,
            updatedDate: new Date(),
        };
        return await UserModel.create(user);
    } else throw new ApiError(400, 'Email already exist');
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<UserInterface>}
 */
const getUserByEmail = async (email: string): Promise<UserInterface> => {
    return await UserModel.findOne({ email: email });
};

/**
 * Get user list
 * @returns {UserInterface[]}
 */
const getUsers = async (): Promise<UserInterface[]> => {
    return await UserModel.find();
};

export const UserServices = {
    createUser,
    getUserByEmail,
    getUsers,
};
