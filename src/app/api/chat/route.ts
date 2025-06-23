import { GoogleGenerativeAI } from '@google/generative-ai';

// This line is important! It makes sure our mailman can run super fast.
export const runtime = 'edge';

// This is the function that runs when your chat page sends a message.
export async function POST(req: Request) {
  try {
    // 1. Get the chat history and resume info from the chat room.
    const { messages, resumeContext } = await req.json();

    // 2. Get the secret password from the secret box (.env.local).
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

    // 3. Pick the AI brain model we want to use (Gemini 1.5 Flash is fast and smart).
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 4. Write the big instruction for the AI brain.
    const systemPrompt = `You are a friendly and expert-level AI Interview Coach. Your goal is to help a user prepare for their job interviews.

    Here is some information from the user's resume:
    ${resumeContext || "The user has not provided a resume. You should start by asking them what job role or skills they want to practice for."}

    Your instructions:
    - Engage the user in a realistic and helpful mock interview.
    - Ask relevant technical or behavioral questions based on their skills, experience, and projects.
    - If they ask for a solution, provide a clear, step-by-step answer and explain the reasoning behind it.
    - If they provide an answer, give them constructive feedback.
    - Keep your responses concise and conversational.
    - If the user's resume context is available, use it to tailor your questions. For example, if they list "React" as a skill, ask them a React-specific question.
    - Never say you are an AI. Interact as a human coach.
    `;

    // 5. Format the chat history so the AI can understand it.
    const filteredHistory = messages
      .slice(0, -1)
      .filter((msg: { role: string }) => msg.role === 'user' || msg.role === 'model');

    // Ensure the first message is from the user
    while (filteredHistory.length > 0 && filteredHistory[0].role !== 'user') {
      filteredHistory.shift();
    }

    const history = filteredHistory.map((msg: { role: string; content: string }) => ({
      role: msg.role,
      parts: [{ text: msg.content }],
    }));

    const lastUserMessage = messages[messages.length - 1]?.content;

    // 6. Start the chat with the AI, giving it the history and the big instruction.
    const chat = model.startChat({
      history: history,
      systemInstruction: {
          role: "system",
          parts: [{text: systemPrompt}]
      }
    });

    // 7. Send the user's newest message and get the AI's response as a stream (like a live TV show).
    const result = await chat.sendMessageStream(lastUserMessage);

    // 8. Send the AI's response back to the chat room, piece by piece.
    const stream = new ReadableStream({
      async start(controller) {
        for await (const chunk of result.stream) {
          const chunkText = chunk.text();
          controller.enqueue(new TextEncoder().encode(chunkText));
        }
        controller.close();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });

  } catch (error) {
    console.error("Error in AI API route:", error);
    return new Response("An error occurred. The AI brain might be sleeping. Please check your secret password (API Key) and try again.", { status: 500 });
  }
}
