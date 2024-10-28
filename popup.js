document.addEventListener('DOMContentLoaded', function () {
	const toggle = document.getElementById('toggle');

	// Load the current state from storage
	chrome.storage.sync.get('enabled', function (data) {
		toggle.checked = data.enabled !== undefined ? data.enabled : true; // Default to true
		if (toggle.checked) {
			startObserving(); // Start observing if enabled
		}
	});

	// Add an event listener to save the state when toggled
	toggle.addEventListener('change', function () {
		chrome.storage.sync.set({ enabled: toggle.checked });
		if (toggle.checked) {
			startObserving(); // Start observing if enabled
		} else {
			stopObserving(); // Stop observing if disabled
		}
	});
});

// Function to start observing for video title changes
function startObserving() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: 'startObserving' });
	});
}

// Function to stop observing for video title changes
function stopObserving() {
	chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
		chrome.tabs.sendMessage(tabs[0].id, { action: 'stopObserving' });
	});
}
