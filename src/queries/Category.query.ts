import { PipelineStage } from "mongoose";
import { paginationLimit, paginationSkip } from "./common";

export function categorySearchMatch(search: string): PipelineStage.Match["$match"] {
  return { $and: [{ parentId: null }, { name: { $regex: search, $options: "i" } }] };
}

export function categoryPaginationQuery({
  match,
  perPage,
  currentPage,
}: {
  match: PipelineStage.Match["$match"];
  perPage: number;
  currentPage: number;
}): PipelineStage[] {
  return [
    {
      $match: match,
    },
    {
      $lookup: {
        from: "categories",
        localField: "_id",
        foreignField: "parentId",
        as: "totalSubCategory",
      },
    },
    {
      $set: {
        totalSubCategory: {
          $size: "$totalSubCategory",
        },
      },
    },
    { $sort: { createdDate: -1 } },
    paginationSkip(perPage, currentPage),
    paginationLimit(perPage),
  ];
}

export function allCategoryQuery(): PipelineStage[] {
  return [
    {
      $graphLookup: {
        from: "categories",
        startWith: "$_id",
        connectFromField: "_id",
        connectToField: "parentId",
        as: "children",
      },
    },
  ];
}
