/**
 * node modules
 */
import { GoogleGenAI } from "@google/genai";

/**
 * environment variables
 */
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

export default genAI;
