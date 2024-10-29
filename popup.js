const GEMINI_API_KEY = 'your-api-key';
const GEMINI_API_URL =
	'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

async function extractCompanyName(title) {
	const requestBody = {
		contents: [
			{
				parts: [{ text: `Return only the company name from ${title}` }],
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

document.getElementById('searchButton').addEventListener('click', async () => {
	chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
		chrome.tabs.sendMessage(
			tabs[0].id,
			{ action: 'getVideoTitle' },
			async (response) => {
				if (response.title) {
					const companyName = await extractCompanyName(response.title);
					if (companyName) {
						console.log('Extracted Company Name:', companyName);
						chrome.runtime.sendMessage({
							action: 'searchCompany',
							company: companyName,
						});
					} else {
						console.log('Could not extract a company name.');
					}
				}
			}
		);
	});
});
