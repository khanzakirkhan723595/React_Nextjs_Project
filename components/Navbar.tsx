import Link from "next/link";

import {
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

import { auth } from "@clerk/nextjs/server";

import Button from "./Button";


export default async function Navbar() {


    const { userId } = await auth();


    return (

        <nav className="
        border-b 
        border-slate-800 
        bg-slate-900
        ">


            <div className="
            max-w-7xl
            mx-auto
            px-6
            h-16
            flex
            items-center
            justify-between
            ">


                {/* Logo */}

                <Link
                    href="/"
                    className="text-xl font-bold"
                >

                    AI Interview

                </Link>




                {/* Navigation */}

                <div className="
                flex
                gap-6
                "
                >

                    <Link href="/dashboard">
                        Dashboard
                    </Link>


                    <Link href="/interview">
                        Interview
                    </Link>


                    <Link href="/history">
                        History
                    </Link>


                </div>





                {/* Authentication */}

                <div>


                    {
                        userId ? (

                            <UserButton />

                        ) : (

                            <SignInButton>

                                <button
                                    className="
                                    px-4
                                    py-2
                                    rounded-lg
                                    bg-blue-600
                                    text-white
                                    "
                                >

                                    Sign In

                                </button>

                            </SignInButton>

                        )
                    }


                </div>


            </div>


        </nav>

    );

}