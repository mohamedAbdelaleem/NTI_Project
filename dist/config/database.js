"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const databaseSetup = function () {
    mongoose_1.default.connect(process.env.DB_CONNECTION).then(() => {
        console.log(`Database connected to : ${process.env.DB_CONNECTION}`);
    }).catch((err) => {
        console.log(err);
    });
};
exports.default = databaseSetup;
