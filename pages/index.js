import Head from 'next/head';
import { useState } from 'react';
import Button from '../components/Button.component';


const Home = () => {
  const [userInput, setUserInput] = useState("");
  const [apiOutput, setApiOutput] = useState("");
  const [advancedApiOutput, setAdvancedApiOutput] = useState("");
  const [isBaseGenerating, setisBaseGenerating] = useState(false);
  const [isAdvancedGenerating, setisAdvancedGenerating] = useState(false);

  const callGenerateEndpoint = async () => {
		if (isBaseGenerating || isAdvancedGenerating)
			return;
  	setisBaseGenerating(true);
		setApiOutput("");
		setAdvancedApiOutput("");
	
    const response = await fetch('api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInput: userInput }),
    })
     
    const data = await response.json();
    setApiOutput(data.output.text);
    setisBaseGenerating(false);
	}

	const callMoreDetailsEndpoint = async () => {
		if (isBaseGenerating || isAdvancedGenerating)
			return;
  	setisAdvancedGenerating(true);
	
    const response = await fetch('api/more-details', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userInput: userInput, prompt: apiOutput }),
    })
     
    const data = await response.json();
    setAdvancedApiOutput(data.output.text);
    setisAdvancedGenerating(false);
	}

  const onUserChangedText = (event) => {
		const newInput = event.target.value;
		if(newInput === "")
			setApiOutput("");
    setUserInput(event.target.value);
  }

  return (
    <div className="root">
      <Head>
        <title>Explain like I'm 5</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Explain like I'm 5</h1>
          </div>
          <div className="header-subtitle">
            <h2>Add any topic you'd like to understand in the field below</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea
            placeholder="pointers in C"
            className="prompt-box"
            value={userInput}
            onChange={onUserChangedText}
          />
          <div className="prompt-buttons">
            <Button
              isGenerating={isBaseGenerating}
              generateExplanation={callGenerateEndpoint}
              type="base"
              content="Explain"
            />
          </div>
          {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
                {advancedApiOutput && (
                  <p className="advanced">{advancedApiOutput}</p>
                )}
              </div>
              <div className="output-buttons">
                {!advancedApiOutput && (
                  <Button
                    isGenerating={isAdvancedGenerating}
                    generateExplanation={callMoreDetailsEndpoint}
                    type="advanced"
                    content="More details"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="footer">
        <a
          href="https://openai.com/api"
          target="_blank"
          className={`${isBaseGenerating || isAdvancedGenerating ? "active" : ""} footer-text`}
        >
          Using OpenAI's GPT-3
        </a>
      </div>
    </div>
  );
};

export default Home;
