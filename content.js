function isSharkTankVideo(title) {
	return title.includes('Shark Tank');
}

function extractCompanyName(title) {
	// Example extraction logic: after "Shark Tank", look for company names or key terms.
	let parts = title.split('Shark Tank');
	return parts[1] ? parts[1].trim().split(' ')[0] : '';
}

function triggerSearch(company) {
	chrome.runtime.sendMessage({ action: 'searchCompany', company });
}

function checkVideoTitle() {
	const titleElement = document.querySelector('title');
	if (titleElement) {
		const title = titleElement.innerText;
		if (isSharkTankVideo(title)) {
			const company = extractCompanyName(title);
			if (company) triggerSearch(company);
		}
	} else {
		setTimeout(checkVideoTitle, 500);
	}
}

checkVideoTitle();
