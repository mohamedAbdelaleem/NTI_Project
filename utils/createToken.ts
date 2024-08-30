import Jwt from "jsonwebtoken";

export const createToken = (payload: {}) => Jwt.sign(payload, process.env.PRIVATE_KEY!, { expiresIn: process.env.JWT_EXPIRED_TIME });
export const createResetToken = (payload: {}) => Jwt.sign(payload, process.env.PRIVATE_KEY!, { expiresIn: process.env.JWT_RESET_EXPIRED_TIME })
