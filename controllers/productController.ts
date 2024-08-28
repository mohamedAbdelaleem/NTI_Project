import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";
import {  Request, Response, NextFunction } from "express";
import sharp from "sharp";
import {v4 as uuid4} from "uuid";
import { Products } from "../interfaces/product";
import productsModel from "../models/productModels";
import asyncHandler from "express-async-handler";
import { uploadMultipleFiles } from "../middlewares/uploadImages";


export const uploadProductImages = uploadMultipleFiles([
  { name: 'cover', maxCount: 1 },
  { name: 'images', maxCount: 5 }
])

export const resizeAndSave = asyncHandler(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    
  if(req.files){
    if('cover' in req.files){
      const buffer = req.files["cover"][0].buffer;
      const filePath = `product${uuid4()}.jpeg`;
      sharp(buffer)
      .toFormat("jpeg")
      .jpeg({quality:95})
      .toFile(`uploads/products/${filePath}`);
      req.body.cover = filePath;
    }
    if('images' in req.files){
      const images: string[] = [];
      req.files['images'].forEach(image => {
          const buffer = image.buffer;
          const filePath = `product-${uuid4()}.jpeg`;
          sharp(buffer)
          .toFormat("jpeg")
          .jpeg({quality:95})
          .toFile(`uploads/products/${filePath}`);
          images.push(filePath);
      });
      req.body.images = images;
    }

  }
  next();
})
  

export const createProduct = createOne<Products>(productsModel)
export const getProducts = getAll<Products>(productsModel, 'products')
export const getProduct = getOne<Products>(productsModel)
export const updateProduct = updateOne<Products>(productsModel)
export const deleteProduct = deleteOne<Products>(productsModel)