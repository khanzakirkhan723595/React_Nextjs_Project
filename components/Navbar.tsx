import Link from "next/link";
import { SignInButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";


export default async function Navbar(){

const {userId}=await auth();


return (

<nav
className="
sticky
top-0
z-50
border-b
border-slate-800
bg-slate-950/80
backdrop-blur
">


<div
className="
max-w-7xl
mx-auto
px-5
h-16
flex
items-center
justify-between
"
>


{/* Logo */}

<Link
href="/"
className="
text-xl
font-bold
tracking-wide
hover:text-blue-400
transition
"
>

<span className="text-blue-500">
AI
</span>
Interview

</Link>



{/* Links */}

<div
className="
hidden
md:flex
gap-8
text-slate-300
"
>


<Link
className="hover:text-blue-400 transition"
href="/dashboard"
>
Dashboard
</Link>


<Link
className="hover:text-blue-400 transition"
href="/interview"
>
Interview
</Link>


<Link
className="hover:text-blue-400 transition"
href="/history"
>
History
</Link>


</div>




{/* Auth */}


{
userId ?

<UserButton/>

:

<SignInButton>

<button
className="
px-5
py-2
rounded-lg
bg-blue-600
hover:bg-blue-700
transition
font-medium
"
>

Sign In

</button>


</SignInButton>

}



</div>


</nav>


)


}