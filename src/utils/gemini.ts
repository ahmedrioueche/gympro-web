import { GoogleGenerativeAI } from '@google/generative-ai';
import { chatBotStartPrompt } from './constants';

const API_KEY: string | undefined = process.env.REACT_APP_GEMINI_KEY;
const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;
const model = genAI?.getGenerativeModel({ model: 'gemini-1.5-flash' });

export const geminiGetAnswer = async (prompt: string) => {
  const result = await model?.generateContent(prompt);

  return result?.response.text();
};

export const getGeminiCBReply = async (firstInput: string) => {
  const prompt = chatBotStartPrompt + '//user input starts now//: ' + firstInput;
  const response = await geminiGetAnswer(prompt);
  return response;
};
