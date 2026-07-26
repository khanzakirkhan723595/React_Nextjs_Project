"use client";


interface ButtonProps {

    children?:React.ReactNode;

    text?:string;

    type?:
    | "button"
    | "submit"
    | "reset";

    variant?:
    | "primary"
    | "secondary"
    | "outline";

    disabled?:boolean;

    onClick?:()=>void;

}




export default function Button({

    children,

    text,

    type="button",

    variant="primary",

    disabled,

    onClick


}:ButtonProps){



const styles={


primary:

"bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20",



secondary:

"bg-slate-700 hover:bg-slate-600 text-white",



outline:

"border border-slate-600 hover:border-blue-500 hover:text-blue-400 text-slate-300"


};



return (

<button

type={type}

disabled={disabled}

onClick={onClick}

className={`
px-5 py-2.5
rounded-xl
font-medium
duration-300
disabled:opacity-50
disabled:cursor-not-allowed
${styles[variant]}
`}

>


{
children || text
}


</button>


)


}