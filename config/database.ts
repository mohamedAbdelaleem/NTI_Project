import mongoose from "mongoose";

const databaseSetup = function (){
    mongoose.connect(process.env.DB_CONNECTION!).then(() => {
        console.log(`Database connected to : ${process.env.DB_CONNECTION}`);
    }).catch((err: Error) => {
        console.log(err);
    });
}

export default databaseSetup;