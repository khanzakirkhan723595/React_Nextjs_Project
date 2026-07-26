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


<div

className="
group
bg-slate-900/70
border
border-slate-800
rounded-2xl
p-6
hover:border-blue-500
hover:-translate-y-1
transition
duration-300
shadow-lg
"


>



    {/* Header */}


    <div
    className="
    flex
    justify-between
    items-start
    "
    >


        <h3
        className="
        text-xl
        font-bold
        group-hover:text-blue-400
        transition
        "
        >

            {role}

        </h3>



        <span
        className="
        bg-green-500/10
        text-green-400
        text-sm
        px-3
        py-1
        rounded-full
        "
        >

            {score}/10

        </span>



    </div>







    {/* Details */}


    <div
    className="
    mt-6
    space-y-3
    text-slate-400
    "
    >


        <p>

            <span className="text-slate-200">
                Topic:
            </span>

            {" "}

            {topic}

        </p>



        <p>

            <span className="text-slate-200">
                Experience:
            </span>

            {" "}

            {experience}

        </p>




        <p>

            <span className="text-slate-200">
                Date:
            </span>

            {" "}

            {new Date(createdAt)
            .toLocaleDateString()}

        </p>



    </div>







    {/* Button */}


    <Link

    href={`/history/${id}`}

    className="
    inline-block
    mt-6
    text-blue-400
    hover:text-blue-300
    font-medium
    "

    >

        View Details →

    </Link>





</div>



)



}