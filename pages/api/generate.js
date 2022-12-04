import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const defaultInput = "pointers in c";
const generatePrompt = (userInput, customPart) => `explain ${userInput} ${customPart}`;

const generateAction = async (req, res) => {
	const input = req.body.userInput ? req.body.userInput : defaultInput;

	const baseCompletion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: generatePrompt(input, 'in simple terms, like Richard Feynman used to do'),
		temperature: 0.6,
		max_tokens: 300,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;