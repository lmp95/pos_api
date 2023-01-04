import { DataTableInterface } from '../interfaces/dataTable.interface';
import { MemberInterface } from '../interfaces/member.interface';
import { UserInterface } from '../interfaces/user.interface';
import MemberModel from '../models/member.model';

/**
 * create new member
 * @param {newMember} newMember
 * @param {user} user
 * @returns {Promise<MemberInterface>}
 */
const addNewMember = async (newMember: MemberInterface, user: UserInterface | any): Promise<MemberInterface> => {
    const member = await MemberModel.create({
        ...newMember,
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
    });
    return member;
};

/**
 * get total member count
 * @returns {Promise<number>}
 */
const getItemTotalCount = async (status?: string): Promise<number> => {
    let filter = {};
    if (status) filter = { status: status };
    return await MemberModel.find(filter).count();
};

/**
 * Get all member
 * @param {filter} filter
 * @param {limit} limit
 * @param {page} page
 * @returns {Promise<DataTableInterface>}
 */
const getAllMembers = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
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
        getItemTotalCount(filter),
        MemberModel.find(filterQuery)
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
 * update member
 * @param {memberId} memberId
 * @param {member} member
 * @param {user} user
 * @returns {Promise<MemberInterface>}
 */
const updateMember = async (memberId: string, member: MemberInterface, user: UserInterface | any): Promise<MemberInterface> => {
    const updatedMember = await MemberModel.findByIdAndUpdate(
        memberId,
        {
            ...member,
            updatedBy: user.username,
            updatedDate: new Date(),
        },
        { new: true }
    );
    return updatedMember;
};

/**
 * delete member
 * @param {memberId} memberId
 * @returns {Promise<MemberInterface>}
 */
const deleteMember = async (memberId: string): Promise<MemberInterface> => {
    return await MemberModel.findByIdAndDelete(memberId);
};

export const memberService = {
    getAllMembers,
    addNewMember,
    updateMember,
    deleteMember,
};
