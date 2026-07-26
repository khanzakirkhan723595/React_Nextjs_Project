"use client";


import {useState} from "react";

import {useRouter} from "next/navigation";

import QuestionCard from "@/components/QuestionCard";



export default function InterviewPage(){


const router = useRouter();



const id = "your_interview_id";



const questions=[

{
question:"Explain React Virtual DOM"
},

{
question:"Difference between useState and useEffect"
},

{
question:"What is Next.js?"
}


];



const [current,setCurrent]=useState(0);


const [answers,setAnswers]=useState<string[]>([]);


const [loading,setLoading]=useState(false);





async function handleAnswerSubmit(answer:string){


const updatedAnswers=[

...answers,

answer

];


setAnswers(updatedAnswers);




if(current < questions.length-1){


    setCurrent(current+1);


}

else{


    setLoading(true);



    const response = await fetch(

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



    const data=await response.json();



    console.log(data);



    router.push("/history");



}



}







return(

<main className="p-10">


<QuestionCard

question={questions[current].question}

currentIndex={current}

totalQuestions={questions.length}

onAnswerSubmit={handleAnswerSubmit}

isSubmitting={loading}

/>



</main>


)


}