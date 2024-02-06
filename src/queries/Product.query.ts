import { FilterQuery, PipelineStage, Types } from "mongoose";
import { paginationLimit, paginationSkip } from "./common";

export function productPaginationQuery({
  match,
  unwind,
  filter,
  perPage,
  currentPage,
}: {
  match: PipelineStage.Match["$match"];
  unwind: PipelineStage.Unwind["$unwind"];
  perPage: number;
  filter: object;
  currentPage: number;
}): PipelineStage[] {
  return [
    {
      $match: {
        ...filter,
        ...match,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category",
      },
    },
    { $unwind: unwind },
    { $sort: { _id: -1 } },
    paginationSkip(perPage, currentPage),
    paginationLimit(perPage),
  ];
}
