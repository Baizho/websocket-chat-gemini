const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

const genModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export default genModel;