chrome.runtime.onMessage.addListener((message) => {
	if (message.action === 'searchCompany') {
		const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(
			message.company + ' Shark Tank update'
		)}`;

		chrome.windows.create({
			url: searchUrl,
			type: 'normal',
			width: 800,
			height: 600,
		});
	}
});
