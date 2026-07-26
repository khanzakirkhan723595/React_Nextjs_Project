import { NextResponse } from "next/server";
import { generateInterviewQuestions } from "@/lib/ai";


export async function GET(){

    try{

        const questions =
        await generateInterviewQuestions(
            "Frontend Developer",
            "Beginner",
            "React",
            5
        );


        return NextResponse.json({
            questions
        });


    }
    catch(error){

        return NextResponse.json({
            error:String(error)
        },{
            status:500
        });

    }

}