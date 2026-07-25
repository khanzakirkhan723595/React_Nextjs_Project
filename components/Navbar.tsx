import Link from "next/link";
import Button from "./Button";


export default function Navbar() {

    return (

        <nav className="bg-slate-900 text-white p-4">

            <div className="flex justify-between items-center">


                {/* Website Logo */}

                <Link href="/">
                    <h1 className="text-xl font-bold">
                        AI Interview
                    </h1>
                </Link>



                {/* Navigation Links */}

                <div className="flex gap-5">


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



                {/* Button */}

                <Link href="/dashboard">

                    <Button
                        text="Get Started"
                    />

                </Link>


            </div>

        </nav>

    );

}