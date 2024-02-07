import httpStatus from "http-status";
import { DataTableInterface } from "../interfaces/dataTable.interface";
import { ProductInterface, ProductPayloadInterface } from "../interfaces/product/product.interface";
import { UserInterface } from "../interfaces/user.interface";
import ApiError from "../utils/apiError";
import { categoryService } from "./category.service";
import ProductModel from "../models/product/product.model";
import { Document, Types } from "mongoose";
import { fileRemove, getTotalPage, saveBase64Image } from "../utils/utility";
import { productPaginationQuery } from "../queries/Product.query";
import { searchRegexMatch } from "../queries/common";
import ShortUniqueId from "short-unique-id";
import { writeFile } from "fs";

const createNewProduct = async (
  image: Express.Multer.File,
  newProduct: ProductInterface,
  user: UserInterface | any
): Promise<ProductInterface> => {
  if (!newProduct?.categoryId) {
    fileRemove(image.path);
    throw new ApiError(httpStatus.BAD_REQUEST, "Category is required");
  }
  const category = await categoryService.checkCategoryExist(newProduct?.categoryId?.toString());
  if (category)
    return await ProductModel.create({
      ...newProduct,
      image: image?.filename,
      path: image?.destination.replace(/\.\/public/, ""),
      createdBy: user.username,
      createdDate: new Date(),
      updatedBy: user.username,
      updatedDate: new Date(),
    });
  else {
    fileRemove(image.path);
    throw new ApiError(httpStatus.BAD_REQUEST, "Fail to create item");
  }
};

const createBulkProduct = async (newProducts: ProductPayloadInterface[], user: UserInterface | any) => {
  const productCat = newProducts[0].categoryId;
  const category = await categoryService.checkCategoryExist(productCat.toString());
  const { randomUUID } = new ShortUniqueId({ length: 10 });

  if (category) {
    const products = newProducts.map((product) => {
      const SKUCode = randomUUID();
      const file = saveBase64Image(product.image, `${SKUCode}_${product.name}`);
      return {
        ...product,
        image: file.filename,
        SKU: SKUCode,
        path: file.path.replace(/\.\/public/, ""),
        createdBy: user.username,
        createdDate: new Date(),
        updatedBy: user.username,
        updatedDate: new Date(),
      };
    });
    return await ProductModel.insertMany(products);
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "Fail to create item");
  }
};

/**
 * get category total count
 * @returns {Promise<number>}
 */
const getProductTotalCount = async (searchQuery?: object): Promise<number> => {
  const result = await ProductModel.aggregate([
    {
      $match: searchQuery || {},
    },
    {
      $count: "total",
    },
  ]);
  return result[0]?.total;
};

const getAllProductWithPagination = async (
  search: string,
  filter: string,
  limit: string,
  page: string
): Promise<DataTableInterface> => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  let objectIds = [];
  let filterQuery = {};
  if (filter) {
    objectIds = filter.split(",").map((id) => new Types.ObjectId(id));
    filterQuery = {
      categoryId: {
        $in: objectIds,
      },
    };
  }

  let data: DataTableInterface = {
    data: [],
    page: currentPage,
    perPage: perPage,
    total: 0,
    totalPage: 1,
  };
  const match = searchRegexMatch({ fields: ["name", "SKU"], search: search });
  await Promise.all([
    getProductTotalCount({ ...match, ...filterQuery }),
    ProductModel.aggregate(
      productPaginationQuery({
        match,
        filter: filterQuery,
        unwind: "$category",
        currentPage: currentPage,
        perPage: perPage,
      })
    ),
  ]).then((values) => {
    data = {
      data: values[1],
      page: currentPage,
      perPage: perPage,
      total: values[0],
      totalPage: getTotalPage(values[0], perPage),
    };
  });
  return data;
};

const getAllProduct = async (filter: string, limit: string, page: string): Promise<DataTableInterface> => {
  const currentPage = parseInt(page);
  const perPage = parseInt(limit);
  let objectIds = [];
  let matchQuery = {};
  if (filter) {
    objectIds = filter.split(",").map((id) => new Types.ObjectId(id));
    matchQuery = {
      categoryId: {
        $in: objectIds,
      },
    };
  }

  let data: DataTableInterface = {
    data: [],
    page: currentPage,
    perPage: perPage,
    total: 0,
    totalPage: 1,
  };
  await Promise.all([
    getProductTotalCount(matchQuery),
    ProductModel.aggregate([
      { $match: matchQuery },
      {
        $sort: {
          categoryId: 1,
          name: 1,
        },
      },
      // {
      //     $limit: perPage,
      // },
      // {
      //     $skip: perPage * currentPage,
      // },
    ]),
  ]).then((values) => {
    data = {
      data: values[1],
      page: currentPage,
      perPage: perPage,
      total: values[0],
      totalPage: getTotalPage(values[0], perPage),
    };
  });
  return data;
};

const getProductById = async (productId: string): Promise<ProductInterface> => {
  return ProductModel.findById(productId);
};

const updateProductById = async (
  image: Express.Multer.File,
  productId: string,
  updateProduct: ProductInterface,
  user: UserInterface | any
): Promise<ProductInterface> => {
  if (image?.filename) {
    fileRemove(updateProduct?.path, false, updateProduct.image);
  }
  return await ProductModel.findByIdAndUpdate(
    productId,
    {
      ...updateProduct,
      image: image?.filename,
      path: image?.destination.replace(/\.\/public/, ""),
      updatedBy: user.username,
      updatedDate: new Date(),
    },
    { new: true }
  );
};

const deleteProductById = async (productId: string): Promise<ProductInterface> => {
  const deletedProduct = await ProductModel.findOneAndDelete({ _id: productId });
  fileRemove(deletedProduct.path, false, deletedProduct?.image);
  return deletedProduct;
};

export const productService = {
  createNewProduct,
  createBulkProduct,
  getAllProduct,
  deleteProductById,
  getAllProductWithPagination,
  getProductById,
  updateProductById,
};
