var keywords = [];

function redditSearch(term) {
	console.log("http://www.reddit.com/r/news/search.json?" + term);
	var request = $.ajax({
	  url: "http://www.reddit.com/r/news/search.json?" + term,
	  type: "POST",
	  dataType: "json",
	  async: false
	});
	request.done(function( res ) {
		console.log(res.data.children);
		return data;
	});
}

function start() {
	keywords = ["shooting"];
	
	keywords.forEach(function(keyword) {
		var matchingPosts = redditSearch(keyword);

		matchingPosts.foreach(function(post) {
			submitToIncidents(post);
		});
	});
}

