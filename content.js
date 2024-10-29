chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'getVideoTitle') {
		const titleElement = document.querySelector('title');
		if (titleElement) {
			sendResponse({ title: titleElement.innerText });
		} else {
			sendResponse({ title: null });
		}
	}
});
