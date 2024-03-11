import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// configuraciones del modelo
const generationConfig = {
    maxOutputTokens: 200,
    temperature: 0.9,
    topP: 0.1,
    topK: 16,
};

// creacion del modelo, aqui van las configuraciones
const model = genAI.getGenerativeModel({ model: "gemini-pro" });


// // chat para el modelo, mantiene contexto
const chat = model.startChat({
    history: [
        {
            role: "user",
            parts: "Hola como estas?",
        },
        {
            role: "model",
            parts: "Bien, gracias. ¿Y tú?",
        },
    ],
    generationConfig: {
        maxOutputTokens: 100,
    },
});


export async function POST(request) {

    const body = await request.json();
    const userMessage = body.message;
    
    const prompt = "Write a story about a magic backpack."   // prompt de prueba

    const result = await model.generateContent(userMessage); // generacion de texto de una vez
    //const result = await chat.sendMessage(userMessage);

    // respuesta de gemini
    const response = result.response;
    const text = response.text();

    // console.log(text)

    return NextResponse.json({ message: text })
}