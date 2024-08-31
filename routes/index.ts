import { Application, Request, Response, NextFunction } from "express";
import categoryRouter from "./categoryRoutes";
import subCategoryRouter from "./subCategoryRoutes";
import productsRouter from "./productRoutes";
import APIError from "../utils/apiError";
import usersRouter from "./usersRoutes";
import authRouter from "./authRoutes";
import reviewRouter from "./reviewRoutes";
import wishlistRouter from "./wishListRoutes";
import couponRouter from "./couponRoutes";
import cartsRouter from "./cartRoutes";


const mountRoutes = function (app: Application){
    app.use("/api/v1/categories", categoryRouter);
    app.use("/api/v1/subcategories", subCategoryRouter);
    app.use('/api/v1/products', productsRouter);
    app.use('/api/v1/reviews', reviewRouter);
    app.use('/api/v1/wishlist', wishlistRouter);
    app.use('/api/v1/users', usersRouter);
    app.use('/api/v1/auth', authRouter);
    app.use('/api/v1/coupons', couponRouter);
    app.use('/api/v1/carts', cartsRouter);
    app.all('*', (req: Request, res: Response, next: NextFunction) => {
        throw new APIError(`The router ${req.originalUrl} is not found`, 400);
    })
}


export default mountRoutes;