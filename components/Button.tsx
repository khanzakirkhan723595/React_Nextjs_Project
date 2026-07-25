import React from "react";


interface ButtonProps {

    children: React.ReactNode;
    onClick?: () => void;

}


export default function Button({

    children,
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
            font-medium
            hover:bg-blue-500
            transition
            "

        >

            {children}

        </button>

    );

}