"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";
import InterviewCard from "@/components/InterviewCard";


interface InterviewSession {

    _id:string;

    role:string;

    topic:string;

    experience:string;

    overallScore:number;

    createdAt:string;

}



export default function DashboardPage(){


    const [interviews,setInterviews] = useState<InterviewSession[]>([]);

    const [loading,setLoading] = useState(true);



    useEffect(()=>{


        const fetchInterviews = async()=>{


            try{


                const res = await fetch("/api/history");


                const data = await res.json();


                setInterviews(
                    data.interviews || []
                );


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



        fetchInterviews();



    },[]);





    return (

        <main
        className="
        min-h-screen
        max-w-7xl
        mx-auto
        px-4
        sm:px-6
        lg:px-8
        py-12
        "
        >




            {/* Welcome Section */}


            <section
            className="
            flex
            flex-col
            items-center
            text-center
            space-y-5
            mb-16
            "
            >



                <h1
                className="
                text-4xl
                sm:text-5xl
                font-bold
                tracking-tight
                "
                >

                    Welcome Developer 👋

                </h1>




                <p
                className="
                text-slate-400
                text-lg
                max-w-xl
                "
                >

                    Track your interview preparation,
                    improve your answers and prepare
                    better with AI feedback.

                </p>




                <Link href="/interview">


                    <Button>

                        Start New Interview 🚀

                    </Button>


                </Link>



            </section>







            {/* Recent Interview Section */}



            <section>


                <div
                className="
                flex
                justify-between
                items-center
                mb-8
                "
                >



                    <h2
                    className="
                    text-3xl
                    font-bold
                    "
                    >

                        Recent Interviews

                    </h2>




                    <Link

                    href="/interview"

                    className="
                    hidden
                    sm:block
                    text-blue-400
                    hover:text-blue-300
                    "

                    >

                        + New Interview

                    </Link>


                </div>








                {
                    loading ?


                    (

                        <div
                        className="
                        text-center
                        py-20
                        text-slate-400
                        "
                        >

                            Loading interviews...

                        </div>


                    )



                    :


                    interviews.length===0 ?


                    (

                        <div
                        className="
                        border
                        border-slate-800
                        bg-slate-900
                        rounded-2xl
                        p-10
                        text-center
                        "
                        >


                            <h3
                            className="
                            text-xl
                            font-semibold
                            "
                            >

                                No Interviews Found

                            </h3>



                            <p
                            className="
                            text-slate-400
                            mt-2
                            "
                            >

                                Start your first AI mock interview.

                            </p>



                        </div>


                    )



                    :



                    (

                        <div
                        className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        lg:grid-cols-3
                        gap-6
                        "
                        >



                            {
                                interviews.map((item)=>(


                                    <InterviewCard

                                    key={item._id}

                                    id={item._id}

                                    role={item.role}

                                    topic={item.topic}

                                    experience={item.experience}

                                    score={item.overallScore}

                                    createdAt={item.createdAt}

                                    />


                                ))
                            }



                        </div>


                    )


                }



            </section>






        </main>

    );


}