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
    
    // if (!isRelatedToExercise(userMessage)) {
    //     return NextResponse.json({ message: "Lo siento, solo puedo responder a temas relacionados con rutinas de ejercicio." })
    // }
    
    const prompt = `Eres un entrenador profesional y tu trabajo es entregar rutinas de 
    entrenamiento a las personas con diferentes finalidades, a continuación vas a recibir 
    una petición de un cliente el cual solicita una rutina de entrenamiento y 
    deberás responder acorde a sus necesidades, el mensaje estará envuelto en 
    llaves, si no está relacionado con rutinas de entrenamiento, deberás responder 
    que solo tienes permitido dar rutinas y no contestar más. La petición del cliente es:
    ` + '{' + userMessage + '}';   
    // prompt de prueba


    const result = await model.generateContent(prompt); // generacion de texto de una vez
    //const result = await chat.sendMessage(userMessage);

    // respuesta de gemini
    const response = result.response;
    const text = response.text();

    // console.log(text)

    return NextResponse.json({ message: text })
}

function isRelatedToExercise(message) {
    //Keywords related with exercise
    const keywords = [
        'ejercicio',
        'rutina',
        'gimnasio',
        'entrenamiento',
        'correr',
        'caminar',
        'yoga',
        'pilates',
        'levantar pesas',
        'flexibilidad',
        'cardio',
        'calistenia',
        'culturismo',
        'fuerza',
        'aeróbicos',
        'anaeróbicos',
        'HIIT',
        'ejercicios de peso corporal',
        'estiramiento',
        'ejercicios de respiración',
        'Zumba',
        'kickboxing',
        'natación',
        'ciclismo',
        'escalada',
        'crossfit',
        'entrenamiento funcional',
        'pérdida de peso',
        'ganancia muscular',
        'salud',
        'bienestar',
        'actividad física',
        'nutrición deportiva',
        'suplementos',
        'motivación',
        'disciplina',
        'recuperación',
        'flexiones',
        'abdominales',
        'sentadillas',
        'burpees',
        'planchas',
        'ejercicios de equilibrio',
        'entrenamiento de intervalos',
        'entrenamiento en circuito',
        'meditación',
        'mindfulness',
        'ejercicios de relajación',
        'ejercicios de estabilidad',
        'pérdida de grasa',
        'ganancia de fuerza',
        'rendimiento deportivo',
        'calorías',
        'actividades al aire libre',
        'ejercicios de rehabilitación',
        'estiramientos dinámicos',
        'actividades recreativas',
        'prensa de banca',
        'dominadas',
        'sentadillas con peso',
        'deadlifts',
        'burpees',
        'sprints',
        'ejercicios de alta intensidad',
        'ejercicios de baja intensidad',
        'ejercicios de resistencia',
        'equilibrio muscular',
        'flexibilidad articular',
        'fuerza central',
        'prevención de lesiones',
        'ejercicios de calentamiento',
        'ejercicios de enfriamiento',
        'ejercicios de movilidad',
        'estiramiento estático',
        'entrenamiento de fuerza',
        'entrenamiento de resistencia',
        'entrenamiento de velocidad',
        'entrenamiento de agilidad',
        'entrenamiento de potencia',
        'entrenamiento de coordinación',
        'entrenamiento de flexibilidad',
        'entrenamiento deportivo',
        'recuperación muscular',
        'nutrición equilibrada',
        'hidratación adecuada',
        'planificación de entrenamiento',
        'objetivos de fitness',
        'actividades grupales',
        'competición deportiva',
        'ejercicio al aire libre',
        'ejercicio en interiores',
        'hábitos saludables',
        'ejercicio cardiovascular',
        'ejercicio de fuerza',
        'ejercicio de resistencia',
        'ejercicio de flexibilidad',
        'ejercicio de equilibrio',
        'ejercicio de coordinación',
        'ejercicio de agilidad',
        'ejercicio de potencia',
        'ejercicio de velocidad',
        'ejercicio de rehabilitación',
        'ejercicio de tonificación',
        'ejercicio de estiramiento',
        'ejercicio de relajación',
        'ejercicio de meditación',
        'ejercicio de mindfulness',
        'ejercicio funcional',
        'ejercicio de alta intensidad',
        'ejercicio de baja intensidad',
        'ejercicio en pareja',
        'ejercicio en grupo',
        'entrenamiento personalizado',
        'entrenamiento en línea',
        'entrenamiento a distancia',
        'entrenamiento virtual',
        'supervisión de entrenamiento',
        'ejercicio en casa',
        'ejercicio en el trabajo',
        'entrenamiento de peso corporal',
        'entrenamiento con pesas',
        'entrenamiento con bandas elásticas',
        'entrenamiento con kettlebells',
        'entrenamiento con TRX',
        'entrenamiento con balón medicinal',
        'entrenamiento con máquinas',
        'entrenamiento con barra',
        'entrenamiento con mancuernas',
        'entrenamiento con poleas',
        'entrenamiento con cuerdas',
        'entrenamiento con escaleras',
        'entrenamiento con neumáticos',
        'entrenamiento con obstáculos',
        'entrenamiento de boxeo'];

    // Convertir el mensaje a minúsculas para hacer la comparación de palabras insensible a mayúsculas y minúsculas
    const lowerCaseMessage = message.toLowerCase();

    // Verificar si alguna de las palabras clave se encuentra en el mensaje
    for (let keyword of keywords) {
        if (lowerCaseMessage.includes(keyword)) {
            return true;
        }
    }

    // Si ninguna de las palabras clave se encuentra en el mensaje, retornar false
    return false;
}