import { Types } from 'mongoose';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { OrderInterface } from '../interfaces/order.interface';
import { UserInterface } from '../interfaces/user.interface';
import ItemModel from '../models/item.model';
import OrderModel from '../models/order.model';
import OrderItemModel from '../models/orderItem.model';
import { ORDER_STATUS } from '../utils/constants';

/**
 * create new order
 * @param {newOrder} newOrder
 * @param {user} user
 * @returns {Promise<OrderInterface>}
 */
const createNewOrder = async (newOrder: OrderInterface, user: UserInterface | any): Promise<OrderInterface> => {
    const createdOrder = await OrderModel.create({
        ...newOrder,
        status: ORDER_STATUS.ongoing,
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
    });
    const itemList = newOrder.items.map((item) => ({ ...item, _id: new Types.ObjectId(), itemId: item._id, orderId: createdOrder._id }));
    const orderItems = await OrderItemModel.insertMany(itemList);
    return { ...createdOrder.toObject(), items: orderItems };
};

/**
 * retrieve all orders
 * @returns {Promise<DataTableInterface>}
 */
const retrieveAllOrder = async (): Promise<DataTableInterface> => {
    const orders = await OrderModel.find().sort({ _id: -1 });
    const data: DataTableInterface = {
        data: orders,
        page: 1,
        perPage: 10,
        total: 100,
    };
    return data;
};

/**
 * retrieve order detail by id
 * @returns {Promise<OrderInterface>}
 */
const retrieveOrderDetailById = async (id: string): Promise<OrderInterface> => {
    const order = await OrderModel.findById(id);
    const items = await OrderItemModel.find({ orderId: order._id });
    return { ...order.toObject(), items: items };
};

export const orderService = {
    createNewOrder,
    retrieveAllOrder,
    retrieveOrderDetailById,
};
