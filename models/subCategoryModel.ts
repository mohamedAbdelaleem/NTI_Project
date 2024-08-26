import { Schema, model } from "mongoose";
import SubCategory from "../interfaces/subCategory";


const subCategorySchema: Schema = new Schema<SubCategory>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        categoryId: {
            type: Schema.Types.ObjectId,
            required: true,
        }
        
    },
    {
        timestamps: true
    }
);


export default model<SubCategory>("SubCategory", subCategorySchema);