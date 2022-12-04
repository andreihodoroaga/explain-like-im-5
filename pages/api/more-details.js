import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const defaultInput = "pointers in c";
const generateAdvancedPrompt = (userInput, prompt) =>
`
	Here's what I already know about ${userInput}:

	${prompt}

	Add some more details, so I can understand it better.
`

const generateAction = async (req, res) => {
	const input = req.body.userInput ? req.body.userInput : defaultInput;
	const prompt = req.body.prompt;

	const advancedCompletion = await openai.createCompletion({
		model: 'text-davinci-003',
		prompt: generateAdvancedPrompt(input, prompt),
		temperature: 0.4,
		max_tokens: 400,
	});

	const advancedPromptOutput = advancedCompletion.data.choices.pop();

  res.status(200).json({ output: advancedPromptOutput });
};

export default generateAction;