export default function Footer() {

    return (

        <footer className="bg-slate-900 text-white p-4 mt-10">


            <div className="text-center">


                <p>
                    © {new Date().getFullYear()} AI Interview Platform
                </p>


                <p className="text-sm text-gray-400">
                    Powered by Gemini AI
                </p>


            </div>


        </footer>

    );

}