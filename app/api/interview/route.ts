import { NextResponse } from "next/server";

import { connectDB } from "@/lib/mongodb";

import Interview from "@/models/Interview";

import { generateInterviewQuestions } from "@/lib/ai";



export async function POST(req:Request){


    try{


        // Get data from frontend

        const {
            role,
            experience,
            topic,
            amount

        } = await req.json();




        // Validation

        if(!role || !experience || !topic || !amount){

            return NextResponse.json(

                {
                    error:"All fields are required"
                },

                {
                    status:400
                }

            )

        }





        // Call AI

        const questions = await generateInterviewQuestions(

            role,

            topic,

            amount

        );





        // Convert questions for database


        const formattedQuestions = questions.map(

            (question:string)=>(

                {

                    question,

                    userAnswer:"",

                    score:0,

                    feedback:{

                        strengths:[],

                        improvements:[]

                    }

                }

            )

        );





        // Connect MongoDB

        await connectDB();





        // Save Interview


        const interview = await Interview.create({

            userId:"guest_user",

            role,

            experience,

            topic,

            questions:formattedQuestions,

            overallScore:0

        });





        return NextResponse.json(

            {

                success:true,

                interviewId:interview._id,

                questions:interview.questions

            },

            {

                status:201

            }

        );



    }

    catch(error:any){


        console.log(error);



        return NextResponse.json(

            {

                error:error.message

            },

            {

                status:500

            }

        )


    }


}