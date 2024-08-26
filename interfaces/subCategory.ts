import { Document, Schema } from "mongoose";

interface SubCategory extends Document{
    name: string,
    categoryId: Schema.Types.ObjectId
}

export default SubCategory;