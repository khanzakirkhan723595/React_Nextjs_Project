import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Interview from "@/models/Interview";


export async function GET(
    req:Request,
    context:{
        params:Promise<{id:string}>
    }
){

    try{


        const {id}= await context.params;


        await connectDB();



        const interview = await Interview.findById(id);



        if(!interview){

            return NextResponse.json(
                {
                    error:"Interview not found"
                },
                {
                    status:404
                }
            );

        }



        return NextResponse.json(
            {
                success:true,
                interview
            },
            {
                status:200
            }
        );



    }
    catch(error){


        console.log(error);


        return NextResponse.json(
            {
                error:"Server error"
            },
            {
                status:500
            }
        );

    }


}