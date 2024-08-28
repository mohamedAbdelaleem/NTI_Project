import APIError from "../utils/apiError";
import multer from "multer";
import {  Request, Response, NextFunction } from "express";
import ImageFiled from "../interfaces/uploadFiles";



const uploadOptions = (): multer.Multer =>  {
    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req: Request, file:any, cb: any) {
    if (file.mimetype.startsWith('image')) { cb(null, true) }
    else { cb(new APIError('File Not an image', 400), false) }
    }
    const upload = multer({ storage: multerStorage, fileFilter: multerFilter })
    return upload;
}

export const uploadMultipleFiles = (fields: ImageFiled[]) => uploadOptions().fields(fields);
export const uploadSingleFile = (fieldName: string) => uploadOptions().single(fieldName)

