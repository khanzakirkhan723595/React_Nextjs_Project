import Link from "next/link";
import Button from "@/components/Button";


export default function Home() {


    const features = [

        {
            title: "AI Question Generation",
            description: "Generate interview questions using AI based on your role."
        },


        {
            title: "AI Feedback",
            description: "Get feedback and suggestions to improve your answers."
        },


        {
            title: "Interview History",
            description: "Track your previous interviews and performance."
        }

    ];



    return (

        <main className="p-8">


            {/* Hero Section */}

            <section className="text-center">


                <h1 className="text-4xl font-bold text-white">

                    AI Interview Platform

                </h1>


                <p className="mt-4 text-gray-400">

                    Practice technical interviews with AI and improve your skills.

                </p>



                <div className="mt-6 flex justify-center gap-4">


                    <Link href="/interview">

                        <Button
                            text="Start Interview"
                        />

                    </Link>



                    <Link href="/dashboard">

                        <Button
                            text="Dashboard"
                        />

                    </Link>


                </div>


            </section>




            {/* Features Section */}


            <section className="mt-16 grid md:grid-cols-3 gap-6">


                {
                    features.map((feature,index)=>(


                        <div
                            key={index}
                            className="p-5 bg-slate-800 rounded-lg"
                        >


                            <h2 className="text-xl font-bold text-white">

                                {feature.title}

                            </h2>



                            <p className="mt-2 text-gray-400">

                                {feature.description}

                            </p>


                        </div>


                    ))
                }


            </section>



        </main>

    );

}