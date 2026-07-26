"use client";


import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

import Button from "@/components/Button";
import InterviewCard from "@/components/InterviewCard";



interface Feedback {

    strengths:string[];

    improvements:string[];

}



interface Question {


    question:string;

    userAnswer:string;

    score:number;

    feedback:Feedback;


}



interface InterviewSession {


    _id:string;

    role:string;

    topic:string;

    experience:string;

    overallScore:number;

    createdAt:string;

    questions:Question[];

}




export default function HistoryPage(){



    const searchParams = useSearchParams();


    const selectedId = searchParams.get("id");



    const [interviews,setInterviews]=useState<InterviewSession[]>([]);



    const [selectedSession,setSelectedSession]=
    useState<InterviewSession | null>(null);



    const [loading,setLoading]=useState(true);





    useEffect(()=>{


        async function fetchHistory(){


            try{


                const response = await fetch(
                    "/api/history"
                );



                const data = await response.json();



                console.log(
                    "History Data:",
                    data
                );



                setInterviews(
                    data.interviews || []
                );




                if(selectedId){


                    const found = 
                    (data.interviews || [])
                    .find(
                        (item:InterviewSession)=>
                        item._id.toString() === selectedId
                    );



                    if(found){

                        setSelectedSession(found);

                    }


                }



            }
            catch(error){


                console.log(
                    "History Error:",
                    error
                );


            }
            finally{


                setLoading(false);

            }


        }



        fetchHistory();



    },[selectedId]);





    if(loading){


        return(

            <main className="p-10 text-center">

                Loading History...

            </main>

        )

    }






    // ============================
    // DETAIL PAGE
    // ============================


    if(selectedSession){


        return(


            <main className="max-w-4xl mx-auto p-8">


                <Link
                href="/history"
                className="text-blue-500"
                >

                    ← Back To History

                </Link>




                <div className="mt-6">


                    <h1 className="text-3xl font-bold text-white">

                        {selectedSession.role}

                    </h1>



                    <p className="text-gray-400 mt-2">

                        Topic : {selectedSession.topic}

                    </p>



                    <p className="text-gray-400">

                        Experience : {selectedSession.experience}

                    </p>



                    <h2 className="mt-5 text-xl">

                        Overall Score :

                        <span className="text-blue-400">

                            {" "}
                            {selectedSession.overallScore}/10

                        </span>

                    </h2>



                </div>





                <div className="mt-8 space-y-5">



                {
                    selectedSession.questions.map(
                    (q,index)=>(


                        <div
                        key={index}
                        className="border p-5 rounded-lg bg-slate-900"
                        >



                            <h2 className="font-bold text-white">

                                Q{index+1}. {q.question}

                            </h2>




                            <div className="mt-4">


                                <p className="text-gray-400">

                                    Your Answer:

                                </p>


                                <p>

                                    {q.userAnswer ||
                                    "No answer submitted"}

                                </p>


                            </div>





                            <p className="mt-4">

                                Score:

                                <span className="text-blue-400">

                                {" "}
                                {q.score}/10

                                </span>

                            </p>






                            <div className="mt-4">


                                <p className="text-green-400">

                                    Strengths

                                </p>



                                {
                                    q.feedback?.strengths?.map(
                                    (s,i)=>(

                                        <p key={i}>
                                            • {s}
                                        </p>

                                    ))
                                }



                            </div>






                            <div className="mt-4">


                                <p className="text-yellow-400">

                                    Improvements

                                </p>



                                {
                                    q.feedback?.improvements?.map(
                                    (s,i)=>(

                                        <p key={i}>
                                            • {s}
                                        </p>

                                    ))
                                }



                            </div>





                        </div>


                    ))

                }



                </div>



            </main>


        )

    }








    // ============================
    // HISTORY LIST PAGE
    // ============================


    return(


        <main className="max-w-7xl mx-auto p-8">



            <h1 className="text-3xl font-bold text-white">

                Interview History

            </h1>




            {
                interviews.length===0 ?


                (

                    <div className="mt-10">

                        No Interviews Found

                    </div>

                )


                :


                (

                <div className="grid md:grid-cols-3 gap-6 mt-8">


                {
                    interviews.map(
                    (item)=>(


                        <div
                        key={item._id}
                        className="border p-5 rounded-lg bg-slate-900"
                        >



                            <h2 className="text-xl font-bold">

                                {item.role}

                            </h2>



                            <p>

                                {item.topic}

                            </p>



                            <p>

                                Score:
                                {item.overallScore}/10

                            </p>




                            <Link

                            className="text-blue-500 mt-4 inline-block"

                            href={`/history?id=${item._id}`}

                            >

                                View Details

                            </Link>



                        </div>


                    ))

                }


                </div>

                )

            }



        </main>


    )


}