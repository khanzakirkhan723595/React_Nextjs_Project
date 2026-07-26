"use client";

import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";


export default function InterviewPage() {

    const router = useRouter();


    const [role,setRole] = useState("Frontend Developer");
    const [experience,setExperience] = useState("Beginner");
    const [topic,setTopic] = useState("React");
    const [amount,setAmount] = useState(5);
    const [loading,setLoading] = useState(false);



    const generateInterview = async()=>{

        try{

            setLoading(true);


            const res = await fetch("/api/interview",{

                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },


                body:JSON.stringify({

                    role,
                    experience,
                    topic,
                    amount

                })

            });


            const data = await res.json();


            console.log(data);


            if(data.interviewId){

                router.push(`/interview/${data.interviewId}`);

            }



        }
        catch(error){

            console.log(error);

        }
        finally{

            setLoading(false);

        }


    }



    return (


        <main className="
        min-h-screen
        bg-slate-950
        text-white
        flex
        justify-center
        items-start
        px-4
        py-10
        ">


            <div className="
            w-full
            max-w-xl
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            shadow-xl
            ">


                <h1 className="
                text-3xl
                font-bold
                mb-2
                ">

                    Setup Interview

                </h1>


                <p className="
                text-slate-400
                mb-8
                ">

                    Select your interview preferences

                </p>




                {/* Role */}

                <div className="mb-6">


                    <label className="
                    block
                    mb-2
                    text-sm
                    text-slate-300
                    ">

                        Role

                    </label>



                    <select

                    value={role}

                    onChange={(e)=>setRole(e.target.value)}

                    className="
                    w-full
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-lg
                    px-4
                    py-3
                    text-white
                    outline-none
                    focus:border-blue-500
                    "

                    >


                        <option>
                            Frontend Developer
                        </option>


                        <option>
                            Backend Developer
                        </option>


                        <option>
                            Full Stack Developer
                        </option>


                        <option>
                            Software Engineer
                        </option>


                    </select>


                </div>





                {/* Experience */}

                <div className="mb-6">


                    <label className="
                    block
                    mb-3
                    text-sm
                    text-slate-300
                    ">

                        Experience

                    </label>



                    <div className="
                    flex
                    gap-3
                    ">


                    {
                        ["Beginner","Intermediate","Senior"].map((level)=>(


                            <button

                            key={level}

                            onClick={()=>setExperience(level)}

                            className={`
                            px-4
                            py-2
                            rounded-lg
                            border
                            transition
                            ${
                                experience===level
                                ?
                                "bg-blue-600 border-blue-500"
                                :
                                "border-slate-700 hover:bg-slate-800"
                            }
                            `}

                            >

                                {level}


                            </button>


                        ))
                    }


                    </div>



                </div>







                {/* Topic */}


                <div className="mb-6">


                    <label className="
                    block
                    mb-2
                    text-sm
                    text-slate-300
                    ">

                        Topic

                    </label>



                    <select

                    value={topic}

                    onChange={(e)=>setTopic(e.target.value)}


                    className="
                    w-full
                    bg-slate-800
                    border
                    border-slate-700
                    rounded-lg
                    px-4
                    py-3
                    text-white
                    "

                    >


                        <option>
                            React
                        </option>

                        <option>
                            JavaScript
                        </option>

                        <option>
                            Next.js
                        </option>

                        <option>
                            Node.js
                        </option>


                        <option>
                            DSA
                        </option>



                    </select>



                </div>





                {/* Question count */}


                <div className="mb-8">


                    <div className="
                    flex
                    justify-between
                    mb-2
                    ">


                        <span>
                            Questions
                        </span>


                        <span className="text-blue-400">
                            {amount}
                        </span>


                    </div>



                    <input

                    type="range"

                    min="3"

                    max="10"

                    value={amount}

                    onChange={(e)=>setAmount(Number(e.target.value))}


                    className="
                    w-full
                    accent-blue-500
                    "


                    />


                </div>






                <Button

                onClick={generateInterview}

                disabled={loading}

                >

                {
                    loading
                    ?
                    "Generating..."
                    :
                    "Generate Interview"
                }


                </Button>



            </div>


        </main>


    )

}