const Button = ({ isGenerating, generateExplanation, type, content }) => {
	const classes = `${isGenerating ? 'generate-button loading' : 'generate-button'} ${type}`;
	return (
		<a
			className={classes}
			onClick={generateExplanation}
		>
			<div className="generate">
				{isGenerating ? <span className="loader"></span> : <p>{ content }</p>}
			</div>
		</a>
	)
}

export default Button;