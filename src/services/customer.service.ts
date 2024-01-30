import { CustomerInterface } from "../interfaces/customer.interface";
import { DataTableInterface } from "../interfaces/dataTable.interface";
import { UserInterface } from "../interfaces/user.interface";
import CustomerModel from "../models/customer.model";
import { customerSearchMatch } from "../queries/Customer.query";
import { getTotalPage } from "../utils/utility";

/**
 * create new customer
 * @param {CustomerInterface} newCustomer
 * @param {UserInterface | any} user
 * @returns {Promise<CustomerInterface>}
 */
const addNewCustomer = async (
  newCustomer: CustomerInterface,
  user: UserInterface | any
): Promise<CustomerInterface> => {
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
const getCustomerTotalCount = async (searchQuery?: object): Promise<number> => {
  const search = searchQuery || {};
  return await CustomerModel.find(search).count();
};

/**
 * Get all customers
 * @param {striing} search
 * @param {striing} filter
 * @param {striing} limit
 * @param {striing} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllCustomers = async (
  search: string,
  filter: string,
  limit: string,
  page: string
): Promise<DataTableInterface> => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  let searchQuery = {};
  if (search) searchQuery = customerSearchMatch(search);
  let data: DataTableInterface = {
    data: [],
    page: currentPage,
    perPage: perPage,
    total: 0,
    totalPage: 1,
  };
  await Promise.all([
    getCustomerTotalCount(searchQuery),
    CustomerModel.find(searchQuery)
      .limit(perPage)
      .skip(perPage * (currentPage - 1)),
  ]).then((values) => {
    data = {
      data: values[1],
      page: currentPage,
      perPage: perPage,
      total: values[0],
      totalPage: getTotalPage(values[0], perPage),
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
const updateCustomer = async (
  customerId: string,
  customer: CustomerInterface,
  user: UserInterface | any
): Promise<CustomerInterface> => {
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

/**
 * get customer by Id
 * @param {customerId} customerId
 * @returns {Promise<CustomerInterface>}
 */
const getCustomerById = async (customerId: string): Promise<CustomerInterface> => {
  return await CustomerModel.findById(customerId);
};

export const customerService = {
  getAllCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerById,
};
