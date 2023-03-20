import mongoose from "mongoose";
import dotenv from "dotenv";
import UserModel from "./models/User.js";
import { users } from "./mocks/mock-user.js";


dotenv.config();

const {
    APP_LOCALHOST: hostname,
    APP_PORT: port, //8000
    MONGODB_ADDRESS,
    APP_COLLECTION_MONGOOSE
} = process.env;


mongoose.set('strictQuery', false);

// mongoose.connect( `${MONGODB_ADDRESS}/${APP_COLLECTION_MONGOOSE}`);
mongoose.connect( `${MONGODB_ADDRESS}`);

export const init = async () => {
    try{
            await UserModel.deleteMany();
            const resU = await UserModel.insertMany(users);
    }
    catch(err){
        console.log(err);

    }finally {
        mongoose.connection.close()
    }
}

init().then(() => console.log('hydratation is ok'));