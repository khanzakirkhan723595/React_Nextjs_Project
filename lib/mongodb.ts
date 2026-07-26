import mongoose from "mongoose";


const MONGODB_URI = process.env.MONGODB_URI;


console.log("Mongo URI:", MONGODB_URI);



if(!MONGODB_URI){

    throw new Error(
        "MongoDB URI missing"
    );

}



let cached = (global as any).mongoose;



if(!cached){

    cached = (global as any).mongoose = {

        conn:null,

        promise:null

    };

}





export async function connectDB(){


    if(cached.conn){

        return cached.conn;

    }



    if(!cached.promise){


        cached.promise = mongoose.connect(
            MONGODB_URI as string
        )
        .then((mongoose)=>{


            console.log(
                "MongoDB Connected"
            );


            return mongoose;


        });


    }



    cached.conn = await cached.promise;


    return cached.conn;


}