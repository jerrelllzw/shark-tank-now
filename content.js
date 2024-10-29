function triggerSearch() {
	const title = document.querySelector('title').innerText;
	chrome.runtime.sendMessage({ action: 'searchCompany', company: title });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'searchCompany') {
		triggerSearch();
	}
});
