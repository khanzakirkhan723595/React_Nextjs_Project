import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;


if(!MONGODB_URI){

    throw new Error("MongoDB URL missing");

}



export async function connectDB(){

    try{

        await mongoose.connect(MONGODB_URI as string);

        console.log("MongoDB Connected");


    }
    catch(error){

        console.log(error);

    }

}