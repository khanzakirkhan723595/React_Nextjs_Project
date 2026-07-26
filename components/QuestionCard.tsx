"use client";


import {useState} from "react";
import Button from "./Button";


interface Props{

question:string;

currentIndex:number;

totalQuestions:number;

onAnswerSubmit:(answer:string)=>void;

isSubmitting:boolean;

}



export default function QuestionCard({

question,

currentIndex,

totalQuestions,

onAnswerSubmit,

isSubmitting=false


}:Props){


const [answer,setAnswer]=useState("");



function handleSubmit(e:React.FormEvent){


e.preventDefault();


if(!answer.trim())
return;



onAnswerSubmit(answer);



setAnswer("");



}



return(

<div className="border rounded-lg p-6 space-y-5">


<h3 className="font-bold">

Question {currentIndex+1}/{totalQuestions}

</h3>



<h2 className="text-xl">

{question}

</h2>



<form onSubmit={handleSubmit}>


<textarea

rows={6}

value={answer}

onChange={(e)=>setAnswer(e.target.value)}

className="border w-full p-3 rounded"

/>



<Button

type="submit"

disabled={isSubmitting}

>


{
isSubmitting?
"Saving..."
:
currentIndex+1===totalQuestions?
"Submit"
:
"Next"
}



</Button>



</form>


</div>


)

}