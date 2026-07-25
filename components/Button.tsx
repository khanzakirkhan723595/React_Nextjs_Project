interface ButtonProps {
    text: string;
    onClick?: () => void;
}


export default function Button({
    text,
    onClick
}: ButtonProps) {


    return (

        <button
            onClick={onClick}
            className="
            px-5 
            py-2 
            rounded-lg 
            bg-blue-600 
            text-white
            hover:bg-blue-500
            "
        >

            {text}

        </button>

    );

}