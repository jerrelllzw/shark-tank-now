chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getVideoTitle') {
		const descriptionElement = document.getElementById('description-inline-expander');
		if (descriptionElement) {
			sendResponse({ title: descriptionElement.innerText });
		} else {
			sendResponse({ title: null });
		}
	}
});
