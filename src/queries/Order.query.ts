import { PipelineStage } from "mongoose";
import { paginationLimit, paginationSkip } from "./common";

export function orderPaginationQuery({
  perPage,
  currentPage,
}: {
  perPage: number;
  currentPage: number;
}): PipelineStage[] {
  return [
    {
      $lookup: {
        from: "orderitems",
        localField: "_id",
        foreignField: "orderId",
        as: "orderedItems",
        pipeline: [
          {
            $group: {
              _id: null,
              totalItems: {
                $sum: 1,
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$orderedItems",
    },
    {
      $unset: "orderedItems._id",
    },
    {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: ["$$ROOT", "$orderedItems"],
        },
      },
    },
    {
      $unset: "orderedItems",
    },
    {
      $sort: { _id: -1 },
    },
    paginationSkip(perPage, currentPage),
    paginationLimit(perPage),
  ];
}
