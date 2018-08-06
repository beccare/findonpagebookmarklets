browser.runtime.onMessage.addListener(request => {
	if(request.keywords) {
		browser.bookmarks.getSubTree("toolbar_____").then(ar => {
			ar[0].children.forEach(bm => {
				if(bm.url) {
					if (bm.url.includes('8a56585e1a07f0f16c1a096fb81c65e1')) {
						browser.bookmarks.remove(bm.id)
					}
				}
			});
		},onRejected);
		browser.bookmarks.create({
			title: '◧',
			url: 'javascript:/*__partial_match__*/(function(){document.dispatchEvent(new CustomEvent("swpfsmod_mod"))})()//8a56585e1a07f0f16c1a096fb81c65e1',
			parentId: "toolbar_____"
		})
		browser.bookmarks.create({
			title: '▲',
			url: 'javascript:/*__previous_occurrence__*/(function(){document.dispatchEvent(new CustomEvent("swpfsmod_back"))})()//8a56585e1a07f0f16c1a096fb81c65e1',
			parentId: "toolbar_____"
		})
		request.keywords.split(' ').reverse().forEach(kw => {
			browser.bookmarks.create({
				title: kw.replace("_swpfsmod_"," "),
				url: 'javascript:/*__next_occurrence__*/(function(){document.dispatchEvent(new CustomEvent("swpfsmod",{detail:{kw:"'+kw.replace("_swpfsmod_"," ")+'"}}))})()//8a56585e1a07f0f16c1a096fb81c65e1',
				parentId: "toolbar_____"
			})
		});
	}
});


function onRejected(error) {
  console.log('An error: ${error}');
}