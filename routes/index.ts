import { Application, Request, Response, NextFunction } from "express";
import categoryRouter from "./categoryRoutes";
import subCategoryRouter from "./subCategoryRoutes";
import productsRouter from "./productRoutes";
import APIError from "../utils/apiError";
import usersRouter from "./usersRoutes";
import authRouter from "./authRoutes";


const mountRoutes = function (app: Application){
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/subcategories", subCategoryRouter);
    app.use('/api/v1/products', productsRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/auth', authRouter);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        throw new APIError(`The router ${req.originalUrl} is not found`, 400);
    })
}


export default mountRoutes;