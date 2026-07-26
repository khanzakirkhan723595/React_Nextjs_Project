"use client";


import { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";



export default function InterviewPage(){

    const router = useRouter();

    const [formData,setFormData] = useState({

        role:"Frontend Developer",

        experience:"Beginner",

        topic:"React",

        amount:5

    });



    const [loading,setLoading] = useState(false);




    const roles=[

        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer"

    ];



    const topics=[

        "React",
        "Next.js",
        "JavaScript",
        "Node.js"

    ];



    const experience=[

        "Beginner",
        "Intermediate",
        "Senior"

    ];




    async function handleSubmit(e:React.FormEvent){


    e.preventDefault();


    setLoading(true);



    try{


        const response = await fetch(

            "/api/interview",

            {

                method:"POST",

                headers:{

                    "Content-Type":"application/json"

                },


                body:JSON.stringify(formData)

            }

        );





        const data = await response.json();





        if(!response.ok){

            throw new Error(data.error);

        }





        console.log(data);



        router.push(
            `/interview/${data.interviewId}`
        );




    }

    catch(error:any){

    console.log("FRONTEND ERROR:", error.message);

    alert(error.message);

    }

    finally{

        setLoading(false);

    }


}




    return(


        <main className="p-10 max-w-xl mx-auto">


            <h1 className="text-3xl font-bold">

                Setup Interview

            </h1>


            <p className="mt-2">

                Select your interview preferences

            </p>



            <form 
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
            >



                {/* Role */}

                <div>


                <label>
                    Role
                </label>


                <select

                className="border p-2 w-full"

                value={formData.role}

                onChange={(e)=>
                    
                    setFormData({

                        ...formData,

                        role:e.target.value

                    })

                }

                >


                {
                    roles.map((role)=>(

                        <option key={role}>

                            {role}

                        </option>

                    ))
                }


                </select>


                </div>





                {/* Experience */}


                <div>


                <label>
                    Experience
                </label>


                <div className="flex gap-3 mt-2">


                {
                    experience.map((exp)=>(


                        <button

                        type="button"

                        key={exp}


                        onClick={()=>


                        setFormData({

                            ...formData,

                            experience:exp

                        })


                        }


                        className="border p-2 rounded"


                        >

                        {exp}

                        </button>


                    ))
                }


                </div>


                </div>






                {/* Topic */}


                <div>


                <label>
                    Topic
                </label>



                <select


                className="border p-2 w-full"


                value={formData.topic}


                onChange={(e)=>

                    setFormData({

                        ...formData,

                        topic:e.target.value

                    })

                }


                >


                {
                    topics.map((topic)=>(

                        <option key={topic}>

                            {topic}

                        </option>

                    ))
                }


                </select>


                </div>






                {/* Question Amount */}



                <div>


                <label>

                Questions:
                {formData.amount}

                </label>


                <input


                type="range"

                min="3"

                max="10"


                value={formData.amount}


                onChange={(e)=>

                    setFormData({

                        ...formData,

                        amount:Number(e.target.value)

                    })

                }


                />


                </div>







                <Button

                    type="submit"

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



            </form>


        </main>


    )


}