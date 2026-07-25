import OpenAI from "openai";


const apiKey = process.env.GROQ_API_KEY;


if(!apiKey){

    throw new Error(
        "GROQ_API_KEY is missing"
    );

}


const ai = new OpenAI({

    apiKey,

    baseURL:
    "https://api.groq.com/openai/v1"

});



export async function generateInterviewQuestions(
    role:string,
    topic:string
){


    const prompt = `
    Generate 5 technical interview questions.

    Role:
    ${role}

    Topic:
    ${topic}

    Return only questions.
    `;



    const response =
    await ai.chat.completions.create({

        model:
        "llama-3.3-70b-versatile",


        messages:[
            {
                role:"user",
                content:prompt
            }
        ]

    });



    return response.choices[0]
    .message.content;

}