"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const subCategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    }
}, {
    timestamps: true
});
exports.default = (0, mongoose_1.model)("SubCategory", subCategorySchema);
