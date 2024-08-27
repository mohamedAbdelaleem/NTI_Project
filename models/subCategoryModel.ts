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
            ref: "Category"
        }
        
    },
    {
        timestamps: true
    }
);

subCategorySchema.pre<SubCategory>(/^find/, function(next){
    this.populate({path: "categoryId", select: "name"});
    next();
})

export default model<SubCategory>("SubCategory", subCategorySchema);