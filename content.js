chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getVideoDescription') {
		const descriptionElement = document.getElementById('description-inline-expander');
		if (descriptionElement) {
			sendResponse({ description: descriptionElement.innerText });
		}
	}
});
