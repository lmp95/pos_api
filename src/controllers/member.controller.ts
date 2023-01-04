import { NextFunction, Request, Response } from 'express';
import { memberService } from '../services/member.service';

const addNewMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await memberService.addNewMember(req.body, req.user);
        res.send(member);
    } catch (error) {
        next(error);
    }
};

const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await memberService.updateMember(req.params.memberId, req.body, req.user);
        res.send(member);
    } catch (error) {
        next(error);
    }
};

const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const member = await memberService.deleteMember(req.params.memberId);
        res.send(member);
    } catch (error) {
        next(error);
    }
};

const retrieveAllMember = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const filter = req.query.filter?.toString();
        const members = await memberService.getAllMembers(filter as string, req.query.limit as string, req.query.page as string);
        res.send(members);
    } catch (error) {
        next(error);
    }
};

export const memberController = {
    addNewMember,
    updateMember,
    deleteMember,
    retrieveAllMember,
};
