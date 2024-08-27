import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import APIError from '../utils/apiError';
// import { FilterData } from '../interfaces/filterData';
import QueryParamsHandler from '../utils/queryParamsHandler';

export const getAll = <modelType>(model: mongoose.Model<any>, modelName: string) => asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const {mongooseQuery, paginationResult } = await new QueryParamsHandler(model.find({...req.params}), req.query)
  .filter()
  .search(modelName)
  .sort()
  .limitFields()
  .pagination()
  
  const documents = await mongooseQuery;
  res.status(200).send({length: documents.length, data: documents, pagination: paginationResult});
})

export const getOne = <modelType>(model: mongoose.Model<any>) => asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const document = await model.findById(req.params.id);
  if (!document) {
    throw new APIError("Not Found", 404);
  }
  res.status(200).json({ data: document });
})

export const createOne = <modelType>(model: mongoose.Model<any>) => asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const document: modelType = await model.create(req.body);
  res.status(201).json({ data: document });
})

export const updateOne = <modelType>(model: mongoose.Model<any>) => asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const document = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!document) {
    throw new APIError("Not Found", 404);
  }
  res.status(200).json({ data: document });
})

export const deleteOne = <modelType>(model: mongoose.Model<any>) => asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const document = await model.findByIdAndDelete(req.params.id);
  if (!document) {
    throw new APIError("Not Found", 404);
  }
  res.status(204).json({ data: document });
})