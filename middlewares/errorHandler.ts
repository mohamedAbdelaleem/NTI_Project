import { Request, Response, NextFunction } from "express";
import { APIError } from "../interfaces/Errors";


const errorHandler = function(error: APIError, req: Request, res: Response, next: NextFunction){
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Error";

    if(process.env.NODE_ENV === "Development"){
        res.status(error.statusCode).json(
            {
                status: error.status,
                message: error.message,
                stack: error.stack
            }
        )
    }
    else{
        res.status(error.statusCode).json(
            {
                status: error.status,
                message: error.message,
            }
        )
    }

}

export default errorHandler;