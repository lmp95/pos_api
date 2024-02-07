/* eslint-disable no-useless-escape */
import { genSalt, hash, compare } from "bcryptjs";
import { NextFunction, Response } from "express";
import { unlink, writeFile } from "fs";
import { Error, isValidObjectId } from "mongoose";
import ApiError from "./apiError";
import httpStatus from "http-status";

export const hashPassword = async (password: string): Promise<string> => {
  const salt = await genSalt(10);
  return await hash(password, salt);
};

export const validatePassword = async (enteredPassword: string, password: string): Promise<boolean> => {
  return await compare(enteredPassword, password);
};

export const validateObjectId = (id: string) => {
  return isValidObjectId(id);
};

export const requestHandler = async (fn: Promise<any>, res?: Response, next?: NextFunction) => {
  try {
    const result = await fn;
    res.send(result);
  } catch (error) {
    next(error);
  }
};

export function convertToTreeStructure(nodes: any[]) {
  const map = {};
  const tree = [];

  // Create a mapping of nodes based on their _id
  nodes.forEach((node) => {
    map[node._id] = node;
    node.children = [];
  });

  // Iterate over the nodes to build the tree structure
  nodes.forEach((node) => {
    if (node.parentId) {
      const parent = map[node.parentId];
      parent && parent.children.push(node);
    } else {
      tree.push(node);
    }
  });

  return tree;
}

export function fileRemove(path: string, isRoot = true, filename = null) {
  let fullPath = isRoot ? path : `./public${path}`;
  fullPath = filename ? `${fullPath}/${filename}` : fullPath;
  unlink(fullPath, (err) => {
    if (err) {
      return { error: err };
    }
  });
}

export function getTotalPage(totalItems: number, perPage: number) {
  return Math.ceil(totalItems / perPage);
}

export function saveBase64Image(base64: string, filename: string) {
  const type = base64.split(";")[0].split("/")[1];
  const matches = base64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = { type: null, data: null };

  if (matches.length !== 3) {
    return;
  }
  const name = `${filename}.${type}`;
  const path = "./public/images/products/";

  response.type = matches[1];
  response.data = Buffer.from(matches[2], "base64");

  writeFile(path + name, response.data, function (err) {
    console.log("File Write Error", err);
  });

  return { path, filename: name };
}
