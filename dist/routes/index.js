"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const categoryRoutes_1 = __importDefault(require("./categoryRoutes"));
const subCategoryRoutes_1 = __importDefault(require("./subCategoryRoutes"));
const mountRoutes = function (app) {
    app.use("/api/v1/categories", categoryRoutes_1.default);
    app.use("/api/v1/subcategories", subCategoryRoutes_1.default);
};
exports.default = mountRoutes;
