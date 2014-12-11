function submitIncident(entry) {
	var request = $.ajax({
	  url: "http://54.148.111.245/api/atrocity",
	  type: "POST",
	  data: { msg : entry.title, lat : 36.1226902, lng :  -115.1701939 },
	  dataType: "json"
	});
	request.done(function( msg ) {
		console.log( 'added new incident report', msg );
	});
}

function atrocityFound(text) {
	if (text.indexOf("shooting") !== -1) return true;
	if (text.indexOf("fatal") !== -1) return true;
	if (text.indexOf("death") !== -1) return true;
	if (text.indexOf("fatality") !== -1) return true;
	if (text.indexOf("fatal") !== -1) return true;
	if (text.indexOf("killed") !== -1) return true;
	if (text.indexOf("dead") !== -1) return true;
}

function jGFeed (url, fnk, num, key){
  // Make sure url to get is defined
  if(url == null) return false;
  // Build Google Feed API URL
  var gurl = "http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q="+url;
  if(num != null) gurl += "&num="+num;
  if(key != null) gurl += "&key="+key;
  // AJAX request the API
  $.getJSON(gurl, function(data){
	if(typeof fnk == 'function')
			  fnk.call(this, data.responseData.feed);
			else
			  return false;
  });
}

var feedURLS = [
	'http://news.google.com/?output=rss',
	'http://news.yahoo.com/rss/mostviewed',
	'http://rss.cnn.com/rss/cnn_topstories.rss'
];

feedURLS.forEach(function(feedUrl) {
	jGFeed(feedUrl,
	function(feeds){
		if(!feeds){
		  return false;
		}
		
		feeds.entries.forEach(function(entry) {
			if (atrocityFound(entry.content)) submitIncident(entry);
		});
	}, 100);
});
