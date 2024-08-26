import { Schema, model } from "mongoose";
import Category from "../interfaces/category"


const categorySchema: Schema = new Schema<Category>(
    {
        name: {
            type: String,
            unique: true,
            required: true,
            trim: true
        }
    },
    {
        timestamps: true
    }
);


export default model<Category>("Category", categorySchema);