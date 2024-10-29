chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'searchCompany' && message.company) {
		const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
			message.company.trim() + ' shark tank update'
		)}`;
		chrome.tabs.create({ url: searchUrl, active: false });
	}
});
