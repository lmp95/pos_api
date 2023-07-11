import { PipelineStage } from 'mongoose';

export function customerSearchMatch(search: string): PipelineStage.Match['$match'] {
    return { $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }] };
}
