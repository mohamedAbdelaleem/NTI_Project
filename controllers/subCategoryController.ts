import { NextFunction, Request, Response } from "express";
import SubCategory from "../interfaces/subCategory";
import subCategoryModel from "../models/subCategoryModel";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";


export const setCategoryId = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.categoryId){
        req.body.categoryId = req.params.categoryId;
    }
    next();
}

export const createSubCategory = createOne<SubCategory>(subCategoryModel);

export const listSubCategories = getAll<SubCategory>(subCategoryModel, "SubCategory");

export const getSubCategory = getOne<SubCategory>(subCategoryModel);

export const updateSubCategory = updateOne<SubCategory>(subCategoryModel);

export const deleteSubCategory = deleteOne<SubCategory>(subCategoryModel);