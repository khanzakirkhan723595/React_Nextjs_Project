import Link from "next/link";


interface InterviewCardProps {

    id:string;
    role:string;
    topic:string;
    experience:string;
    score:number;
    createdAt:string;

}



export default function InterviewCard({

    id,
    role,
    topic,
    experience,
    score,
    createdAt

}:InterviewCardProps){


    return (

        <div className="border rounded-lg p-5 bg-slate-900">


            <h2 className="text-xl font-bold text-white">
                {role}
            </h2>


            <p className="text-gray-400">
                Topic: {topic}
            </p>


            <p className="text-gray-400">
                Experience: {experience}
            </p>


            <p className="text-gray-400">
                Score: {score}/10
            </p>


            <p className="text-gray-400">
                Date: {new Date(createdAt).toLocaleDateString()}
            </p>



            <Link

                href={`/history?id=${id}`}

                className="inline-block mt-4 text-blue-400 hover:underline"

            >

                View Details

            </Link>


        </div>

    );


}