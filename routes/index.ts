import { Application } from "express";
import categoryRouter from "./categoryRoutes";
import subCategoryRouter from "./subCategoryRoutes";


const mountRoutes = function (app: Application){
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/subcategories", subCategoryRouter);
}


export default mountRoutes;