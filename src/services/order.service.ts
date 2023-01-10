import { Types } from 'mongoose';
import { DataTableInterface } from '../interfaces/dataTable.interface';
import { OrderInterface } from '../interfaces/order.interface';
import { UserInterface } from '../interfaces/user.interface';
import ItemModel from '../models/item.model';
import OrderModel from '../models/order.model';
import OrderItemModel from '../models/orderItem.model';
import TableModel from '../models/table.model';
import { ORDER_STATUS } from '../utils/constants';

/**
 * create new order
 * @param {newOrder} newOrder
 * @param {user} user
 * @returns {Promise<OrderInterface>}
 */
const createNewOrder = async (newOrder: OrderInterface, user: UserInterface | any): Promise<OrderInterface> => {
    const lastOrder = await retrieveOrderStatusByTable(newOrder.table);
    let order;
    if (lastOrder.status === ORDER_STATUS.complete) {
        order = await OrderModel.create({
            ...newOrder,
            status: ORDER_STATUS.ongoing,
            createdBy: user.username,
            createdDate: new Date(),
            updatedBy: user.username,
            updatedDate: new Date(),
        });
    } else {
        order = lastOrder;
    }
    const itemList = newOrder.items.map((item) => ({ ...item, _id: new Types.ObjectId(), itemId: item._id, orderId: order._id }));
    const orderItems = await OrderItemModel.insertMany(itemList);
    return { ...order.toObject(), items: orderItems };
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

/**
 * retrieve order status
 * @returns {Promise<OrderInterface>}
 */
const retrieveOrderStatusByTable = async (tableName: string): Promise<OrderInterface> => {
    return await OrderModel.findOne({ table: tableName }).sort({ createdDate: -1 });
};

export const orderService = {
    createNewOrder,
    retrieveAllOrder,
    retrieveOrderDetailById,
};
