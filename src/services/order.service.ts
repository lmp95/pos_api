import { Types } from "mongoose";
import { DataTableInterface } from "../interfaces/dataTable.interface";
import { OrderInterface } from "../interfaces/order.interface";
import { UserInterface } from "../interfaces/user.interface";
import ItemModel from "../models/product.model";
import OrderModel from "../models/order.model";
import OrderItemModel from "../models/orderItem.model";
import TableModel from "../models/table.model";
import { ORDER_STATUS } from "../utils/constants";
import { orderPaginationQuery } from "../queries/Order.query";
import { getTotalPage } from "../utils/utility";

/**
 * create new order
 * check order is on-going or complete
 * on-going order adds items to current order
 * existing items deleted and save new order items
 * @param {newOrder} newOrder
 * @param {user} user
 * @returns {Promise<OrderInterface>}
 */
const createNewOrder = async (newOrder: OrderInterface, user: UserInterface | any): Promise<OrderInterface> => {
  // const lastOrder = await retrieveOrderStatusByTable(newOrder.table);
  // let order;
  // if (!lastOrder || lastOrder.status === ORDER_STATUS.complete) {
  const order = await OrderModel.create({
    ...newOrder,
    status: ORDER_STATUS.ongoing,
    createdBy: user.username,
    createdDate: new Date(),
    updatedBy: user.username,
    updatedDate: new Date(),
  });
  const itemList = newOrder.items.map((item) => ({
    ...item,
    _id: new Types.ObjectId(),
    itemId: item._id,
    orderId: order._id,
  }));
  await OrderItemModel.insertMany(itemList);
  // } else {
  //     // get order items Ids
  //     // delete existing items and save new items with updated qty and amount
  //     for (const newItem of newOrder.items) {
  //         const isUpdated = await OrderItemModel.findOneAndUpdate(
  //             { itemId: newItem._id, orderId: lastOrder._id },
  //             { $inc: { quantity: newItem.quantity, amount: newItem.amount } },
  //             { new: true }
  //         );
  //         if (!isUpdated) {
  //             await OrderItemModel.create({ ...newItem, _id: new Types.ObjectId(), itemId: newItem._id, orderId: lastOrder._id });
  //         }
  //     }
  //     order = await OrderModel.findByIdAndUpdate(
  //         lastOrder._id,
  //         { ...newOrder, subtotal: lastOrder.subtotal + newOrder.subtotal, updatedBy: user.username, updatedDate: new Date() },
  //         { new: true }
  //     );
  // }
  return order;
};

/**
 * retrieve all orders
 * @returns {Promise<DataTableInterface>}
 */
const retrieveAllOrder = async (
  search: string,
  filter: string,
  limit: string,
  page: string
): Promise<DataTableInterface> => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  let filterQuery = {};
  if (filter) filterQuery = { status: filter };
  let data: DataTableInterface = {
    data: [],
    page: currentPage,
    perPage: perPage,
    total: 0,
    totalPage: 1,
  };
  await Promise.all([getOrderTotalCount(), OrderModel.aggregate(orderPaginationQuery({ perPage, currentPage }))]).then(
    (values) => {
      data = {
        data: values[1],
        page: currentPage,
        perPage: perPage,
        total: values[0],
        totalPage: getTotalPage(values[0], perPage),
      };
    }
  );
  return data;
};

/**
 * get total order count
 * @returns {Promise<number>}
 */
const getOrderTotalCount = async (): Promise<number> => await OrderModel.find().count();

/**
 * retrieve order detail by id
 * @returns {Promise<OrderInterface>}
 */
const retrieveOrderDetailById = async (id: string): Promise<OrderInterface> => {
  const order = await OrderModel.findById(id);
  const items = await OrderItemModel.find({ orderId: order._id });
  return { ...order.toObject(), items: items };
};

/**
 * retrieve order status
 * @returns {Promise<OrderInterface>}
 */
const retrieveOrderStatusByTable = async (tableName: string): Promise<OrderInterface | any> => {
  const query = await OrderModel.aggregate([
    {
      $match: { table: tableName },
    },
    {
      $lookup: {
        from: "orderitems",
        localField: "_id",
        foreignField: "orderId",
        as: "items",
      },
    },
    { $sort: { createdDate: -1 } },
    { $limit: 1 },
  ]);
  if (query.length > 0) return query[0];
  return null;
};

export const orderService = {
  createNewOrder,
  retrieveAllOrder,
  retrieveOrderDetailById,
  getOrderTotalCount,
};
