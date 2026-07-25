import Link from "next/link";
import Button from "./Button";



interface InterviewCardProps {


    id: string;

    role: string;

    topic: string;

    experience: string;

    score: number;

    createdAt: string;


}



export default function InterviewCard({

    id,
    role,
    topic,
    experience,
    score,
    createdAt


}: InterviewCardProps) {


    return (


        <div className="
        border
        rounded-lg
        p-5
        space-y-3
        ">


            <h2 className="
            text-xl
            font-bold
            ">

                {role}

            </h2>



            <p>

                Topic:
                <span className="font-medium">
                    {" "}{topic}
                </span>

            </p>



            <p>

                Level:
                <span className="font-medium">
                    {" "}{experience}
                </span>

            </p>



            <p>

                Score:
                <span className="font-medium">
                    {" "}{score}/10
                </span>

            </p>



            <p>

                Date:
                <span className="font-medium">
                    {" "}{createdAt}
                </span>

            </p>




            <Link href={`/history?id=${id}`}>

                <Button>

                    View Details

                </Button>


            </Link>



        </div>


    );

}