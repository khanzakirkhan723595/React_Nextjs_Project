import Link from "next/link";

import Button from "@/components/Button";

import InterviewCard from "@/components/InterviewCard";



const interviews = [


{
id:"1",
role:"Frontend Developer",
topic:"React",
experience:"Beginner",
score:8,
createdAt:"26 July 2026"
},


{
id:"2",
role:"Full Stack Developer",
topic:"JavaScript",
experience:"Intermediate",
score:7,
createdAt:"25 July 2026"
},


{
id:"3",
role:"Next.js Developer",
topic:"Next.js",
experience:"Advanced",
score:9,
createdAt:"24 July 2026"
}


]




export default function Dashboard(){


return (

<main className="p-10">


<h1 className="text-3xl font-bold">

Welcome Developer

</h1>


<p className="mt-2">

Track your interview preparation

</p>



<Link href="/interview">


<Button>

Start New Interview

</Button>


</Link>




<h2 className="text-2xl font-bold mt-10">

Recent Interviews

</h2>




<div className="grid md:grid-cols-3 gap-5 mt-5">


{
interviews.map((item)=>(


<InterviewCard

key={item.id}

{...item}

/>


))
}



</div>



</main>


)


}