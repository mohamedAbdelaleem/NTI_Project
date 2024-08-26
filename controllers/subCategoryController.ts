import expressAsyncHandler from "express-async-handler";
import {Request, Response, NextFunction}  from "express";
import SubCategory from "../interfaces/subCategory";
import subCategoryModel from "../models/subCategoryModel";
import APIError from "../utils/apiError";


export const createSubCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subCategory: SubCategory = await subCategoryModel.create(req.body);
    console.log(req.body);
    console.log(subCategory);
    res.status(201).send({data: subCategory});
});

export const listSubCategories = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subCategories = await subCategoryModel.find();
    res.status(200).send({data: subCategories});
});

export const getSubCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subCategory = await subCategoryModel.findById(req.params.id);
    if (!subCategory){
        throw new APIError("Not Found", 404);
    }
    res.status(200).send({data: subCategory});
});

export const updateSubCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subCategory = await subCategoryModel.findByIdAndUpdate(req.params.id, req.body);
    if (!subCategory){
        throw new APIError("Not Found", 404);
    }
    res.status(200).send({data: subCategory});
});

export const deleteSubCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const subCategory = await subCategoryModel.findByIdAndDelete(req.params.id);
    if (!subCategory){
        throw new APIError("Not Found", 404);
    }
    res.status(204);
});
