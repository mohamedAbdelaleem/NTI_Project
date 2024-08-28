import { Document, Schema } from "mongoose";
import Category from "./category";

interface SubCategory extends Document{
    name: string,
    categoryId: Category
}

export default SubCategory;