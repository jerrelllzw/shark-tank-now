let lastCompany = ''; // Keep track of the last company processed
let observer; // Declare the observer variable

function isSharkTankVideo(title) {
	return title.includes('Shark Tank');
}

function extractCompanyName(title) {
	return title;
}

function triggerSearch(company) {
	if (company && company !== lastCompany) {
		// Only trigger if it's a new company
		lastCompany = company; // Update the last company
		chrome.runtime.sendMessage({ action: 'searchCompany', company });
	}
}

function checkVideoTitle() {
	const titleElement = document.querySelector('title');

	if (titleElement) {
		const title = titleElement.innerText;
		if (isSharkTankVideo(title)) {
			const company = extractCompanyName(title);
			triggerSearch(company);
		}
	}
}

// Function to start observing for changes
function startObserving() {
	const titleElement = document.querySelector('title');
	if (titleElement) {
		observer = new MutationObserver(checkVideoTitle);
		observer.observe(titleElement, { childList: true, subtree: true });
		checkVideoTitle(); // Initial check to capture the current title immediately
	}
}

// Function to stop observing
function stopObserving() {
	if (observer) {
		observer.disconnect(); // Stop observing
		observer = null; // Clear the observer
	}
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.action === 'startObserving') {
		startObserving();
	} else if (message.action === 'stopObserving') {
		stopObserving();
	}
});
