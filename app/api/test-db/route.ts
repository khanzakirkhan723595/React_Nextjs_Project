import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";


export async function GET(){

    try{

        console.log("Testing MongoDB...");


        await connectDB();


        console.log("MongoDB connected successfully");


        return NextResponse.json({

            message:"Database connected successfully"

        });


    }
    catch(error:any){


        console.log("DATABASE ERROR:",error.message);


        return NextResponse.json(

            {
                error:error.message
            },

            {
                status:500
            }

        );


    }

}