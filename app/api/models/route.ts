import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";


const apiKey = process.env.GEMINI_API_KEY;


const ai = new GoogleGenAI({
    apiKey
});


export async function GET(){

    const models = await ai.models.list();


    return NextResponse.json(models);

}