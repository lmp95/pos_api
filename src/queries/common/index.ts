import { PipelineStage } from 'mongoose';

export function searchRegexMatch({ search, field }: { search: string; field: string }): PipelineStage.Match['$match'] {
    return { $or: [{ [field]: { $regex: search, $options: 'i' } }] };
}

export function paginationSkip(perPage: number, currentPage: number): PipelineStage.Skip {
    return { $skip: currentPage * perPage };
}

export function paginationLimit(perPage: number): PipelineStage.Limit {
    return { $limit: perPage };
}
