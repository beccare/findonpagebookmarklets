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
			url: 'javascript:(function(){var event=new CustomEvent("swpfsmod_mode");document.dispatchEvent(event)})()//8a56585e1a07f0f16c1a096fb81c65e1',
			parentId: "toolbar_____"
		})
		browser.bookmarks.create({
			title: '▲',
			url: 'javascript:(function(){var event=new CustomEvent("swpfsmod_back");document.dispatchEvent(event)})()//8a56585e1a07f0f16c1a096fb81c65e1',
			parentId: "toolbar_____"
		})
		request.keywords.split(' ').reverse().forEach(kw => {
			browser.bookmarks.create({
				title: kw,
				url: 'javascript:(function(){var event=new CustomEvent("swpfsmod",{detail:{kw:"'+kw+'"}});document.dispatchEvent(event)})()//8a56585e1a07f0f16c1a096fb81c65e1',
				parentId: "toolbar_____"
			})
		});
	}
});


function onRejected(error) {
  console.log('An error: ${error}');
}