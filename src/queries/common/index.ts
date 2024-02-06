import { PipelineStage } from "mongoose";

export function searchRegexMatch({
  search,
  fields,
}: {
  search: string;
  fields: string[];
}): PipelineStage.Match["$match"] {
  const searchFields = fields.map((field) => ({ [field]: { $regex: search, $options: "i" } }));
  return { $or: searchFields };
}

export function paginationSkip(perPage: number, currentPage: number): PipelineStage.Skip {
  return { $skip: (currentPage - 1) * perPage };
}

export function paginationLimit(perPage: number): PipelineStage.Limit {
  return { $limit: perPage };
}
