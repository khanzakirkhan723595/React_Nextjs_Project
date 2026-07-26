"use client";

import { useState } from "react";
import Button from "./Button";


interface QuestionCardProps{

    question:string;

    currentIndex:number;

    totalQuestions:number;

    onAnswerSubmit:(answer:string)=>void;

}


export default function QuestionCard({

    question,
    currentIndex,
    totalQuestions,
    onAnswerSubmit

}:QuestionCardProps){


    const [answer,setAnswer]=useState("");



    function handleSubmit(e:React.FormEvent){

        e.preventDefault();


        if(answer.trim()=="")
            return;


        onAnswerSubmit(answer);


        setAnswer("");

    }



    return(

        <div className="border rounded-lg p-6 space-y-5">


            <h2 className="text-lg font-bold">

                Question {currentIndex+1} / {totalQuestions}

            </h2>



            <p className="text-xl">

                {question}

            </p>



            <form onSubmit={handleSubmit}>


                <textarea

                rows={5}

                value={answer}

                onChange={(e)=>setAnswer(e.target.value)}

                placeholder="Write your answer..."

                className="border p-3 w-full rounded"

                />



                <Button type="submit">

                    Next Question

                </Button>


            </form>



        </div>

    )

}