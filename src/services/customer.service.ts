import httpStatus from 'http-status';
import { CustomerInterface } from '../interfaces/customer.interface';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { UserInterface } from '../interfaces/user.interface';
import CustomerModel from '../models/customer.model';
import ApiError from '../utils/apiError';

/**
 * create new customer
 * @param {newCustomer} newCustomer
 * @param {user} user
 * @returns {Promise<CustomerInterface>}
 */
const addNewCustomer = async (newCustomer: CustomerInterface, user: UserInterface | any): Promise<CustomerInterface> => {
    const customer = await CustomerModel.create({
        ...newCustomer,
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
    });
    return customer;
};

/**
 * get total customer count
 * @returns {Promise<number>}
 */
const getCustomerTotalCount = async (status?: string): Promise<number> => {
    let filter = {};
    if (status) filter = { status: status };
    return await CustomerModel.find(filter).count();
};

/**
 * Get all customers
 * @param {filter} filter
 * @param {limit} limit
 * @param {page} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllCustomers = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
    const currentPage = parseInt(page);
    const perPage = parseInt(limit);
    let filterQuery = {};
    if (filter) filterQuery = { status: filter };
    let data: DataTableInterface = {
        data: [],
        page: currentPage,
        perPage: perPage,
        total: 0,
    };
    await Promise.all([
        getCustomerTotalCount(filter),
        CustomerModel.find(filterQuery)
            .limit(perPage)
            .skip(perPage * currentPage),
    ]).then((values) => {
        data = {
            data: values[1],
            page: currentPage,
            perPage: perPage,
            total: values[0],
        };
    });
    return data;
};

/**
 * update customer
 * @param {customerId} customerId
 * @param {customer} customer
 * @param {user} user
 * @returns {Promise<CustomerInterface>}
 */
const updateCustomer = async (customerId: string, customer: CustomerInterface, user: UserInterface | any): Promise<CustomerInterface> => {
    const updatedCustomer = await CustomerModel.findByIdAndUpdate(
        customerId,
        {
            ...customer,
            updatedBy: user.username,
            updatedDate: new Date(),
        },
        { new: true }
    );
    return updatedCustomer;
};

/**
 * delete customer
 * @param {customerId} customerId
 * @returns {Promise<CustomerInterface>}
 */
const deleteCustomer = async (customerId: string): Promise<CustomerInterface> => {
    return await CustomerModel.findByIdAndDelete(customerId);
};

export const customerService = {
    getAllCustomers,
    addNewCustomer,
    updateCustomer,
    deleteCustomer,
};
