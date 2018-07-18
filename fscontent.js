var swpfsmod_pos = 0;
var swpfsmod_curKw = '';
var swpfsmod_mode = 'partially';
document.addEventListener("swpfsmod", function(e){
	$('mark').eq(swpfsmod_pos).css("background-color","");
	if(e.detail.kw != swpfsmod_curKw) {
		if (!$('.mark').length) $('html > head').append($('<style>.mark { background-color: yellow; }</style>'));	
		$('*').unmark();
		$('*').mark(e.detail.kw,{accuracy : swpfsmod_mode});
		$('*:hidden').unmark();
		swpfsmod_pos = 0;
	}
	else {
		swpfsmod_pos++;
	}
	if($('mark').eq(swpfsmod_pos).length == 0) swpfsmod_pos = 0;
	$('mark').eq(swpfsmod_pos).css("background-color","orange");
	$('html, body').animate({scrollTop: $('mark').eq(swpfsmod_pos).offset().top}, 500);
	swpfsmod_curKw = e.detail.kw;
});

document.addEventListener("swpfsmod_back", function(e){
	$('mark').eq(swpfsmod_pos).css("background-color","");
	swpfsmod_pos--;
	if($('mark').eq(swpfsmod_pos).length == 0) swpfsmod_pos = $('mark').length - 1;
	$('mark').eq(swpfsmod_pos).css("background-color","orange");
	$('html, body').animate({scrollTop: $('mark').eq(swpfsmod_pos).offset().top}, 500);
});

document.addEventListener("swpfsmod_mode", function(e){
	if (swpfsmod_mode == 'partially') 
		swpfsmod_mode = 'exactly';
	else
		swpfsmod_mode = 'partially';
	if(swpfsmod_curKw != '') {
		$('mark').eq(swpfsmod_pos).css("background-color","");
		$('*').unmark();
		$('*').mark(swpfsmod_curKw,{'accuracy' : swpfsmod_mode});
		$('*:hidden').unmark();
		swpfsmod_pos = 0;
		$('mark').eq(swpfsmod_pos).css("background-color","orange");
		$('html, body').animate({scrollTop: $('mark').eq(swpfsmod_pos).offset().top}, 500);
	}
});

if ( $('#lst-ib').length ) swpfsmodSendMessage($('#lst-ib'))  // Google
if ( $('#sb_form_q').length ) swpfsmodSendMessage($('#sb_form_q'));  // Bing
if ( $('#search_form_input').length ) swpfsmodSendMessage($('#search_form_input'));  // DuckDuckGo
if ( $('#query_top').length ) swpfsmodSendMessage($('#query_top'));  // Startpage


function swpfsmodSendMessage(query) {
	browser.runtime.sendMessage({
		keywords: query.val().replace(/\s+/g,' ').trim()
	});
}