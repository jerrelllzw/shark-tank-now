chrome.action.onClicked.addListener((tab) => {
	chrome.tabs.sendMessage(
		tab.id,
		{ action: 'getVideoDescription' },
		async (response) => {
			if (response && response.description) {
				const companyName = await extractCompanyName(response.description);
				if (companyName) {
					console.log('Extracted Company Name:', companyName);
					chrome.tabs.create({
						url: `https://www.google.com/search?q=${encodeURIComponent(
							companyName.trim() + ' shark tank update'
						)}`,
						active: false,
					});
				} else {
					console.log('Could not extract company name.');
				}
			}
		}
	);
});

async function extractCompanyName(description) {
	const GEMINI_API_URL =
		'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
	const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key

	const requestBody = {
		contents: [
			{
				parts: [
					{
						text: `Return only the company name and nothing else from "${description}"`,
					},
				],
			},
		],
	};

	try {
		const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestBody),
		});

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.json();
		return data.candidates[0].content.parts[0].text;
	} catch (error) {
		console.error('Error extracting company name:', error);
		return null;
	}
}
