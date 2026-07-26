"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import QuestionCard from "@/components/QuestionCard";


interface QuestionItem {

    question:string;

}



export default function InterviewSessionPage(){


    const router = useRouter();

    const params = useParams();

    const id = params.id as string;



    const [questions,setQuestions] = useState<QuestionItem[]>([]);

    const [currentIndex,setCurrentIndex] = useState(0);


    const [answers,setAnswers] = useState<string[]>([]);


    const [loading,setLoading] = useState(true);


    const [isSubmitting,setIsSubmitting] = useState(false);





    useEffect(()=>{


const fetchInterview = async()=>{


try{


const res = await fetch(
    `/api/interview/${id}`
);



const data = await res.json();



console.log("Interview Data:",data);



setQuestions(
    data.interview.questions || []
);



}
catch(error){

console.log(error);

}


finally{

setLoading(false);

}


}



fetchInterview();



},[id]);







    async function handleAnswerSubmit(answer:string){


        setIsSubmitting(true);



        const updatedAnswers=[

            ...answers,

            answer

        ];



        setAnswers(updatedAnswers);





        if(currentIndex < questions.length-1){


            setCurrentIndex(prev=>prev+1);


            setIsSubmitting(false);


        }

        else{


            try{


                const res = await fetch(

                    "/api/evaluate",

                    {

                        method:"POST",

                        headers:{

                            "Content-Type":"application/json"

                        },


                        body:JSON.stringify({

                            interviewId:id,

                            userAnswers:updatedAnswers

                        })

                    }

                );



                const data = await res.json();



                console.log(data);



                router.push(
                    `/history?id=${id}`
                );



            }

            catch(error){


                console.log(error);


            }

            finally{


                setIsSubmitting(false);


            }


        }


    }







    if(loading){


        return(

            <h1 className="text-center mt-20">

                Loading Interview...

            </h1>

        )

    }





    return(


        <main className="max-w-3xl mx-auto mt-10">


            <QuestionCard

                question={
                    questions[currentIndex]?.question
                }

                currentIndex={
                    currentIndex
                }

                totalQuestions={
                    questions.length
                }

                onAnswerSubmit={
                    handleAnswerSubmit
                }

                isSubmitting={
                    isSubmitting
                }


            />


        </main>


    )


}