"use client";


import {useState} from "react";

import QuestionCard from "@/components/QuestionCard";



export default function InterviewSession(){


const questions=[

    "Explain React Virtual DOM",

    "What is useEffect in React?",

    "Explain Next.js App Router"

];



const [current,setCurrent]=useState(0);



function handleAnswer(answer:string){


    console.log("User Answer:",answer);



    if(current < questions.length-1){

        setCurrent(current+1);

    }

    else{

        alert("Interview Completed");

    }


}




return(


<main className="p-10 max-w-3xl mx-auto">


<h1 className="text-3xl font-bold mb-6">

AI Interview

</h1>



<QuestionCard

question={questions[current]}

currentIndex={current}

totalQuestions={questions.length}

onAnswerSubmit={handleAnswer}


/>



</main>


)


}