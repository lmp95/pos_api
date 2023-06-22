import { NextFunction, Request, Response } from 'express';
import { memberService } from '../services/member.service';
import { requestHandler } from '../utils/utility';

const addNewMember = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(memberService.addNewMember(req.body, req.user), next);
    res.send(member);
};

const updateMember = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(memberService.updateMember(req.params.memberId, req.body, req.user), next);
    res.send(member);
};

const deleteMember = async (req: Request, res: Response, next: NextFunction) => {
    const member = await requestHandler(memberService.deleteMember(req.params.memberId), next);
    res.send(member);
};

const retrieveAllMember = async (req: Request, res: Response, next: NextFunction) => {
    const filter = req.query.filter?.toString();
    const members = await requestHandler(memberService.getAllMembers(filter as string, req.query.limit as string, req.query.page as string), next);
    res.send(members);
};

export const memberController = {
    addNewMember,
    updateMember,
    deleteMember,
    retrieveAllMember,
};
