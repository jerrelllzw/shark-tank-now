chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'searchCompany') {
		chrome.storage.sync.get('enabled', function (data) {
			if (data.enabled !== undefined && data.enabled) {
				const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
					message.company + ' Shark Tank company update'
				)}`;

				// Create a new tab with the search URL and do not switch to it
				chrome.tabs.create({
					url: searchUrl,
					active: false, // Set this to false to not switch to the new tab
				});
			}
		});
	}
});
