function storeSettings() {
	browser.storage.local.set({
		"url": [document.querySelector('#url1').value, document.querySelector('#url2').value, document.querySelector('#url3').value],
		"no": [document.querySelector('#no1').value, document.querySelector('#no2').value, document.querySelector('#no3').value]
	});
}

function updateUI(prefs) {
	//defaults
	document.querySelector('#url1').value = "\\.google\\.";
	document.querySelector('#url2').value = "(\\.duckduckgo\\.com|www\\.bing\\.|yandex\\.)";
	document.querySelector('#url3').value = "";
	document.querySelector('#no1').value = "0";
	document.querySelector('#no2').value = "0";
	document.querySelector('#no3').value = "0";

	if ("url" in prefs) {
		if ("0" in prefs.url)
			document.querySelector('#url1').value = prefs.url[0];
		if ("1" in prefs.url)
			document.querySelector('#url2').value = prefs.url[1];
		if ("2" in prefs.url)
			document.querySelector('#url3').value = prefs.url[2];
	}
	if ("no" in prefs) {
		if ("0" in prefs.no)
			document.querySelector('#no1').value = prefs.no[0];
		if ("1" in prefs.no)
			document.querySelector('#no2').value = prefs.no[1];
		if ("2" in prefs.no)
			document.querySelector('#no3').value = prefs.no[2];
	}
	storeSettings()
}

function onError(e) {
	console.error(e);
}

/*
On opening the options page, check stored settings and update the UI with them.
*/
const gettingStoredSettings = browser.storage.local.get();
gettingStoredSettings.then(updateUI, onError);

/*
On blur, save the currently selected settings.
 */
$('#url1').on("blur", storeSettings);
$('#url2').on("blur", storeSettings);
$('#url3').on("blur", storeSettings);
$('#no1').on("blur", storeSettings);
$('#no2').on("blur", storeSettings);
$('#no3').on("blur", storeSettings);