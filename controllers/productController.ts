import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";
import {  Request } from "express";
import multer from "multer";
import { Products } from "../interfaces/product";
import productsModel from "../models/productModels";
import APIError from "../utils/apiError";

const multerStorage = multer.diskStorage({
  destination: function (req: Request, file: any, cb: any) {
    cb(null, 'uploads')
    console.log(file);
  },
  filename: function (req: Request, file: any, cb: any) {
    const ext = file.mimetype.split('/')[1];
    const fileName = `Product-${Date.now()}-cover.jpg`;
    cb(null, fileName)
  }
})

const multerFilter = function (req: Request, file:any, cb: any) {
  if (file.mimetype.startsWith('image')) { cb(null, true) }
  else { cb(new APIError('File Not an image', 400), false) }
}
export const upload = multer({ storage: multerStorage, fileFilter: multerFilter })


export const createProduct = createOne<Products>(productsModel)
export const getProducts = getAll<Products>(productsModel, 'products')
export const getProduct = getOne<Products>(productsModel)
export const updateProduct = updateOne<Products>(productsModel)
export const deleteProduct = deleteOne<Products>(productsModel)