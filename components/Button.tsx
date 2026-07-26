interface ButtonProps {

    text?:string;

    children?:React.ReactNode;

    type?: "button" | "submit" | "reset";

    disabled?:boolean;

    onClick?:()=>void;

}



export default function Button({

    text,

    children,

    type="button",

    disabled,

    onClick


}:ButtonProps){



return(


<button

type={type}

disabled={disabled}

onClick={onClick}

className="
px-5
py-2
rounded-lg
bg-blue-600
text-white
hover:bg-blue-500
disabled:bg-gray-500
"

>


{
    text || children
}


</button>


)


}