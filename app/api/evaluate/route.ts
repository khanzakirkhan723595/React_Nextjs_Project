import { NextResponse } from "next/server";

import {connectDB} from "@/lib/mongodb";

import Interview from "@/models/Interview";

import {evaluateAnswer} from "@/lib/ai";




export async function POST(req:Request){


    try{


        const {
            interviewId,
            userAnswers

        } = await req.json();




        if(!interviewId || !userAnswers){

            return NextResponse.json(
                {
                    error:"Missing data"
                },
                {
                    status:400
                }
            )

        }




        await connectDB();




        const interview = await Interview.findById(interviewId);



        if(!interview){


            return NextResponse.json({

                error:"Interview not found"

            })

        }





        let totalScore=0;



        const updatedQuestions = await Promise.all(

            interview.questions.map(

                async(q:any,index:number)=>{


                    const result = await evaluateAnswer(

                        q.question,

                        userAnswers[index],

                        interview.role,

                        interview.experience

                    );



                    totalScore += result.score;



                    return {


                        question:q.question,


                        userAnswer:userAnswers[index],


                        score:result.score,


                        feedback:{


                            strengths:result.strengths,


                            improvements:result.improvements


                        }


                    }


                }

            )

        );






        interview.questions = updatedQuestions;


        interview.overallScore = Math.round(

            totalScore / updatedQuestions.length

        );



        await interview.save();





        return NextResponse.json({

            success:true,


            score:interview.overallScore


        })



    }

    catch(error:any){


        console.log(error);


        return NextResponse.json({

            error:error.message

        },

        {

            status:500

        })

    }


}