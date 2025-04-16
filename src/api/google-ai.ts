/**
 * custom modules
 */
import genAI from "@/lib/google-ai";

/**
 * types
 */
import { Type } from "@google/genai";

const generateProjectTasks = async (prompt: string) => {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-1.5-flash",
      contents: `
        Generate and return a list of tasks based on the provided prompt: ${prompt};
        requirements:
          1. ensure the tasks align with the prompt.
          2. set the 'due_date' relative to today's date: ${new Date()}.
          3. only return the list of tasks, no other text or comments.
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: {
                type: Type.STRING,
                description: "Description of the task",
                nullable: false,
              },
              due_date: {
                type: Type.STRING,
                description: "Due date of the task",
                nullable: true,
              },
            },
            required: ["content", "due_date"],
          },
          propertyOrdering: ["content", "due_date"],
        },
      },
    });

    return result.text;
  } catch (error) {
    console.log("error generating tasks", error);
  }
};

export default generateProjectTasks;
