
import categoryModel from "../models/categoryModel";
import Category from "../interfaces/category";
import { createOne, deleteOne, getAll, getOne, updateOne } from "./genericHandler";


export const createCategory = createOne<Category>(categoryModel);

export const listCategories = getAll<Category>(categoryModel, "Category");

export const getCategory = getOne<Category>(categoryModel);

export const updateCategory = updateOne<Category>(categoryModel);

export const deleteCategory = deleteOne<Category>(categoryModel);
