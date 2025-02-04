import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Give me a list of Youtube content ideas based on the topic below. Please give ideas that can attract a lot of views.

Topic: 
`;
const generateAction = async (req, res) => {
  // Run first prompt
  try {
    console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`)

    const baseCompletion = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `${basePromptPrefix}${req.body.userInput}`,
      temperature: 0.7,
      max_tokens: 250,
    });
    
    const basePromptOutput = baseCompletion.data.choices.pop();
  
    res.status(200).json({ output: basePromptOutput });
  } catch(err) {
    console.error(err)
  }
};

export default generateAction;