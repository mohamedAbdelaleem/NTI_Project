import expressAsyncHandler from "express-async-handler";
import {Request, Response, NextFunction}  from "express";
import categoryModel from "../models/categoryModel";
import Category from "../interfaces/category";
import APIError from "../utils/apiError";


export const createCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category: Category = await categoryModel.create(req.body);
    console.log(req.body);
    console.log(category);
    res.status(201).send({data: category});
});

export const listCategories = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const categories = await categoryModel.find();
    res.status(200).send({data: categories});
});

export const getCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryModel.findById(req.params.id);
    if (!category){
        throw new APIError("Not Found", 404);
    }
    res.status(200).send({data: category});
});


export const updateCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const category = await categoryModel.findByIdAndUpdate(req.params.id, req.body);
    if (!category){
        throw new APIError("Not Found", 404);
    }
    res.status(200).send({data: category});
});


export const deleteCategory = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log("1233");
    const category = await categoryModel.findByIdAndDelete(req.params.id);
    if (!category){
        throw new APIError("Not Found", 404);
    }
    console.log("1233");
    res.status(204);
});
