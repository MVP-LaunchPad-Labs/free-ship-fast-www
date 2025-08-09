import gradient from 'gradient-string';

export const TITLE_TEXT = `
 ╔═╗╦═╗╔═╗╔═╗  ╔═╗╦ ╦╦╔═╗  ╔═╗╔═╗╔═╗╔╦╗
 ╠╣ ╠╦╝║╣ ║╣   ╚═╗╠═╣║╠═╝  ╠╣ ╠═╣╚═╗ ║ 
 ╚  ╩╚═╚═╝╚═╝  ╚═╝╩ ╩╩╩    ╚  ╩ ╩╚═╝ ╩ 
`;

const darkTheme = {
	charcoal: '#2B2D31',
	darkGray: '#36393F',
	mediumGray: '#4F545C',
	lightGray: '#72767D',
	silver: '#99AAB5',
	purple: '#7289DA',
	darkPurple: '#5865F2',
	blue: '#3498DB',
	darkBlue: '#2C3E50',
};

export const renderTitle = () => {
	const terminalWidth = process.stdout.columns || 80;
	const titleLines = TITLE_TEXT.split('\n');
	const titleWidth = Math.max(...titleLines.map((line) => line.length));

	if (terminalWidth < titleWidth) {
		const simplifiedTitle = `
    ┌─────────────────────┐
    │   Free Ship Fast    │
    └─────────────────────┘
    `;
		console.log(
			gradient([
				darkTheme.darkBlue,
				darkTheme.purple,
				darkTheme.silver,
			]).multiline(simplifiedTitle)
		);
	} else {
		console.log(
			gradient([
				darkTheme.darkBlue,
				darkTheme.purple,
				darkTheme.silver,
			]).multiline(TITLE_TEXT)
		);
	}
};
