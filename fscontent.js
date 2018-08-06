var swpfsmod_pos = 0;
var swpfsmod_curKw = '';
var swpfsmod_mode = 'exactly';
var target = "";

document.addEventListener("swpfsmod", function (e) {
	$('mark').eq(swpfsmod_pos).css("background-color", "");
	if (e.detail.kw != swpfsmod_curKw) {
		if (!$('.mark').length)
			$('html > head').append($('<style>.mark { background-color: yellow; }</style>'));
		$('*').unmark();
		$('*').mark(e.detail.kw, {
			accuracy: swpfsmod_mode,
			'separateWordSearch': false
		});
		$('*:hidden').unmark();
		swpfsmod_pos = 0;
	} else {
		swpfsmod_pos++;
	}
	if ($('mark').eq(swpfsmod_pos).length == 0)
		swpfsmod_pos = 0;
	$('mark').eq(swpfsmod_pos).css("background-color", "orange");
	$('html, body').animate({
		scrollTop: $('mark').eq(swpfsmod_pos).offset().top - 100
	}, 500);
	swpfsmod_curKw = e.detail.kw;
});

document.addEventListener("swpfsmod_back", function (e) {
	$('mark').eq(swpfsmod_pos).css("background-color", "");
	swpfsmod_pos--;
	if ($('mark').eq(swpfsmod_pos).length == 0)
		swpfsmod_pos = $('mark').length - 1;
	$('mark').eq(swpfsmod_pos).css("background-color", "orange");
	$('html, body').animate({
		scrollTop: $('mark').eq(swpfsmod_pos).offset().top - 100
	}, 500);
});

document.addEventListener("swpfsmod_mod", function (e) {
	if (swpfsmod_mode == 'partially')
		swpfsmod_mode = 'exactly';
	else
		swpfsmod_mode = 'partially';
	if (swpfsmod_curKw != '') {
		$('mark').eq(swpfsmod_pos).css("background-color", "");
		$('*').unmark();
		$('*').mark(swpfsmod_curKw, {
			'accuracy': swpfsmod_mode,
			'separateWordSearch': false
		});
		$('*:hidden').unmark();
		swpfsmod_pos = 0;
		$('mark').eq(swpfsmod_pos).css("background-color", "orange");
		$('html, body').animate({
			scrollTop: $('mark').eq(swpfsmod_pos).offset().top - 100	
		}, 500);
	}
});

var gettingStoredSettings2 = browser.storage.local.get();
gettingStoredSettings2.then(swpfsmodActOnNewKeywords, onError2);
$(document).ajaxComplete(function () {
	$(".log").text("Triggered ajaxComplete handler.");
});

function onError2(e) {
	console.error(e);
}

function swpfsmodActOnNewKeywords(prefs) {
	for (i = 0; i < 3; i++) {
		if (prefs.url[i] == '')
			continue;
		var re = new RegExp(prefs.url[i]);
		if (!re.test(window.location.href))
			continue;
		var query;
		if (window.location.href.indexOf("yandex.") != -1) { //workaround for yandex that doesn't update the value of the input field
			query = $(document).find("title").text().replace(/—[^—]*$/, ''); // get keywords from the title tag
			// set up an observer for the title element
			if (target == "") {
				target = document.querySelector('head > title');
				MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
				var observer = new MutationObserver(function () {
						swpfsmodActOnNewKeywords(prefs); // call this again on title change
					});
				observer.observe(target, {
					subtree: true,
					characterData: true,
					childList: true
				});
			}
		} else if (window.location.href.indexOf("news.google.") != -1) { //workaround for google news that doesn't update the input field
			if (target == "") {
				target = document.querySelector('body');
				MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
				var observer = new MutationObserver(function (mutations) {
						mutations.forEach(function (mutation) {
							if (mutation.target.className == "v1O7d") {
								swpfsmodSendMessage(getUrlParameter('q'));
							}
						});
					});
				observer.observe(target, {
					subtree: true,
					childList: true
				});
			}
		} else {
			query = $('input:visible').filter(function (index) { // regular case: get keywords from the first prefilled input field
					return ((index >= prefs.no[i]) && ($(this).val != ''));
				}).first().val();
		}
		swpfsmodSendMessage(query);
		break;
	}
}

function swpfsmodSendMessage(query) {
	browser.runtime.sendMessage({
		keywords: query.trim().replace(/\s+/g, ' ').replace(/"(.+?)"/g, function (match, contents) {
			return contents.replace(/ /g, '_swpfsmod_');
		})
	});
}

function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
	sURLVariables = sPageURL.split('&'),
	sParameterName,
	i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}