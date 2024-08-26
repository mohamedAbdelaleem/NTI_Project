import { Document } from "mongoose";

interface Category extends Document{
    name: string
}

export default Category;