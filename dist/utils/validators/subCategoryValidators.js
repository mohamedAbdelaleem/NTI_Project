"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSubcategoryValidator = exports.getSubcategoryValidator = exports.updateSubcategoryValidator = exports.createSubcategoryValidator = void 0;
const express_validator_1 = require("express-validator");
const validatorMiddleWare_1 = __importDefault(require("../../middlewares/validatorMiddleWare"));
exports.createSubcategoryValidator = [
    (0, express_validator_1.check)('name')
        .notEmpty().withMessage('Subcategory Name is Required')
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
    (0, express_validator_1.check)('category')
        .notEmpty().withMessage('Category is Required')
        .isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleWare_1.default
];
exports.updateSubcategoryValidator = [
    (0, express_validator_1.check)('name').optional()
        .isLength({ min: 2, max: 50 }).withMessage('Name length must be between 2 and 50'),
    (0, express_validator_1.check)('category').optional()
        .isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleWare_1.default
];
exports.getSubcategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleWare_1.default
];
exports.deleteSubcategoryValidator = [
    (0, express_validator_1.check)('id').isMongoId().withMessage('Invalid Mongo Id'),
    validatorMiddleWare_1.default
];
