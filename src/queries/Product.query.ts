import { PipelineStage, Types } from "mongoose";
import { paginationLimit, paginationSkip } from "./common";

export function productPaginationQuery({
  search,
  unwind,
  filter,
  perPage,
  currentPage,
}: {
  search: string;
  unwind: PipelineStage.Unwind["$unwind"];
  perPage: number;
  filter: object;
  currentPage: number;
}): PipelineStage[] {
  return [
    {
      $match: {
        ...filter,
        $or: [{ name: { $regex: search, $options: "i" } }],
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
