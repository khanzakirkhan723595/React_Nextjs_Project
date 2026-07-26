"use client";


import { useEffect, useState } from "react";
import Link from "next/link";

import Button from "@/components/Button";



interface Interview {


    _id:string;

    role:string;

    topic:string;

    experience:string;

    overallScore:number;

    createdAt:string;


}




export default function DashboardPage(){



const [interviews,setInterviews] = useState<Interview[]>([]);

const [loading,setLoading] = useState(true);





useEffect(()=>{


const fetchInterviews = async()=>{


try{


const response = await fetch("/api/history");


const data = await response.json();



setInterviews(
    data.interviews || []
);



}
catch(error){


console.log(
    "Dashboard Error:",
    error
);


}

finally{


setLoading(false);


}



}



fetchInterviews();



},[]);






// Statistics


const totalInterviews = interviews.length;



const averageScore = totalInterviews > 0

?

(
interviews.reduce(
(sum,item)=>sum+item.overallScore,
0
)
/ totalInterviews
).toFixed(1)

:

"0";




const bestScore = totalInterviews > 0

?

Math.max(
    ...interviews.map(
        item=>item.overallScore
    )
)

:

0;





return(



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



{/* Hero Section */}



<section

className="
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
text-white
"

>

Welcome Developer 👋

</h1>



<p

className="
text-slate-400
text-lg
"

>

Prepare for technical interviews with AI powered feedback and evaluation.

</p>



<Link

href="/interview"

className="
inline-block
mt-5
"


>


<Button>

Start New Interview 🚀

</Button>



</Link>



</section>







{/* Statistics Cards */}



<section

className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-3
gap-6
mb-16
"



>



{/* Card 1 */}



<div

className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-blue-500
transition
"



>


<p className="text-slate-400">

Total Interviews

</p>


<h2

className="
text-4xl
font-bold
text-white
mt-3
"

>

{totalInterviews}

</h2>



<p className="text-sm text-slate-500 mt-2">

Completed Sessions

</p>



</div>







{/* Card 2 */}



<div

className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-green-500
transition
"


>


<p className="text-slate-400">

Average Score

</p>



<h2

className="
text-4xl
font-bold
text-green-400
mt-3
"

>


{averageScore}/10


</h2>



<p className="text-sm text-slate-500 mt-2">

Overall Performance

</p>



</div>







{/* Card 3 */}



<div

className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:border-purple-500
transition
"


>


<p className="text-slate-400">

Best Score

</p>



<h2

className="
text-4xl
font-bold
text-purple-400
mt-3
"

>


{bestScore}/10


</h2>



<p className="text-sm text-slate-500 mt-2">

Highest Achievement

</p>



</div>




</section>







{/* Recent Interviews */}



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
text-white
"

>

Recent Interviews

</h2>



<Link

href="/history"

className="
text-blue-400
hover:text-blue-300
"

>

View All →

</Link>



</div>







{

loading ?


(

<p className="text-slate-400">

Loading interviews...

</p>

)



:



interviews.length===0


?

(

<div

className="
border
border-slate-800
bg-slate-900
rounded-xl
p-10
text-center
"


>


<p className="text-slate-400">

No interviews completed yet.

</p>


<Link

href="/interview"

className="
inline-block
mt-5
"


>


<Button>

Start Your First Interview

</Button>


</Link>



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


interviews.slice(0,3).map((item)=>(



<div

key={item._id}

className="
bg-slate-900
border
border-slate-800
rounded-2xl
p-6
hover:-translate-y-1
hover:border-blue-500
transition
"


>



<h3

className="
text-xl
font-bold
text-white
"

>

{item.role}

</h3>



<p className="text-slate-400 mt-2">

Topic: {item.topic}

</p>



<p className="text-slate-400">

Level: {item.experience}

</p>



<div

className="
mt-4
flex
justify-between
items-center
"

>


<span

className="
text-green-400
font-bold
"

>

{item.overallScore}/10

</span>



<Link

href={`/history/${item._id}`}

className="
text-blue-400
hover:underline
"


>

Details →

</Link>



</div>



</div>



))



}



</div>


)



}




</section>




</main>


)


}