import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";


export async function GET(){

    try{

        await connectDB();


        const interviews = await Interview.find({})
        .sort({
            createdAt:-1
        });



        return NextResponse.json({

            interviews

        });


    }
    catch(error){

        console.log(error);


        return NextResponse.json({

            error:"Failed to fetch history"

        },
        {
            status:500
        });


    }

}