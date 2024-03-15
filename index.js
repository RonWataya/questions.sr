// Importing OpenAI, Express, and body-parser
import OpenAI from 'openai';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors()); // Enable CORS
const port = 3000; // Port where the server will listen


app.use(bodyParser.json());

// Initialize OpenAI with your API key
/*const openai = new OpenAI({
  apiKey: '',
});*/
// Route to generate questions
/*app.post('/', async (req, res) => {
  const { contexts } = req.body; // Assuming the body of the request contains an array of contexts

  try {
    const questionsPromises = contexts.map(async (context) => {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Specify the model you're using
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant."
          },
          {
            role: "user",
            content: `Given the context: "${context}". Generate a relevant question.`
          }
        ],
      });

      // Adjust based on the structure of the response you receive
      return response.data.choices[0].message.content.trim();
    });

    const questions = await Promise.all(questionsPromises);
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error);
    res.status(500).send('Failed to generate questions');
  }
});*/

//Dummy generator functions
function generateRandomQuestion(context) {
  const prefixes = ["What is", "Why", "Who", "How"];
  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  return `${prefix} ${context}?`;
}

// Route to generate questions
app.post('/generate-questions', (req, res) => {
  const { contexts } = req.body;
  let questions = [];

  // Ensure we generate 5 questions
  for (let i = 0; i < 5; i++) {
      const context = contexts[i % contexts.length]; // Cycle through contexts if fewer than 5
      questions.push(generateRandomQuestion(context));
  }

  res.json({ questions });
});
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
