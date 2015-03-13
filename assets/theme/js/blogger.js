/**
 * Lists blog entries from the specified JSON feed
 * by creating a new 'ul' element in the DOM.  Each
 * bullet is the title of one blog entry, and contains
 * a hyperlink to that entry's URL.
 *
 * @param {JSON} json is the JSON object pulled from the Blogger service.
 */
function listEntries(json) {
  // Clear any information displayed under the "content" div.
  removeOldResults();
  var ul = document.createElement('ul');
  ul.className = "list-unstyled list-blog";

  for (var i = 0; i < json.feed.entry.length; i++) {
    var entry = json.feed.entry[i];

    var li = document.createElement('li');
	var div_box_blog = document.createElement('div');
	div_box_blog.className = "clearfix box-blog";
	var div_blog_title = document.createElement('div');
	div_blog_title.className = "blog-title";
	var span_blog_title = document.createElement('span');
	span_blog_title.className = "span-blog-title"
	var h3_blog_title = document.createElement('h3');
	h3_blog_title.className = "text-center text-capitalize color-dark text-light";
	var title = document.createTextNode(entry.title.$t);
    h3_blog_title.appendChild(title);
	span_blog_title.appendChild(h3_blog_title);
	div_blog_title.appendChild(span_blog_title);
	div_box_blog.appendChild(div_blog_title);
	var div_blog_content = document.createElement('div');
	div_blog_content.className = "blog-content";
	var div_post_meta = document.createElement('div');
	div_post_meta.className = "post-meta font-alt";
	var span_date = document.createElement('span');
	var i_calendar = document.createElement('i');
	i_calendar.className = "fa fa-calendar";
	/* Parsing the date */
	var date = entry.published.$t;
	var month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
	var month2 = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var day = date.split("-")[2].substring(0, 2);
	var m = date.split("-")[1];
	var year = date.split("-")[0];
	for (var u2 = 0; u2 < month.length; u2++) {
		if (parseInt(m) == month[u2]) {
			m = month2[u2];
			break;
		}
	}
	date = day + ' ' + m + ' ' + year;
	var txt_date = document.createTextNode(date);
	span_date.appendChild(i_calendar);
	span_date.appendChild(txt_date);
	div_post_meta.appendChild(span_date);
	div_blog_content.appendChild(div_post_meta);
	var p = document.createElement('p');
	var txt_paragraph = entry.content.$t;
	var wanted_count = 300;
	var output = cutHtmlString(txt_paragraph, wanted_count) + "...";
	p.innerHTML = output;
	div_blog_content.appendChild(p);
    var alturl;
    for (var k = 0; k < entry.link.length; k++) {
      if (entry.link[k].rel == 'alternate') {
        alturl = entry.link[k].href;
        break;
      }
    }	
    var a = document.createElement('a');
    a.href = alturl;
	a.className = "btn btn-xs btn-flat-solid primary-btn";
	var txt_readmore = document.createTextNode("Read More");
	a.appendChild(txt_readmore);
	div_blog_content.appendChild(a);
	div_box_blog.appendChild(div_blog_content);
    li.appendChild(div_box_blog);

    ul.appendChild(li);
  }

  // Install the bullet list of blog posts. 
  document.getElementById('content').appendChild(ul);
}

/**
 * Called when the user clicks the 'Search' button to
 * retrieve a blog's JSON feed.  Creates a new script
 * element in the DOM whose source is the JSON feed
 * 'query'.blogspot.com, and specifies that the callback
 * function is 'listEntries' (above).
 *
 * @param {String} query is the blog to be retrieved, specified
 *     as a prefix of ".blogspot.com".
 */
function initBlog() {
  // Delete any previous JSON script nodes. 
  removeOldJSONScriptNodes();
  // Clear any old content to prepare to display the Loading... message. */
  removeOldResults();

  // Show a "Loading..." indicator. 
  var div = document.getElementById('content');
  var p = document.createElement('p');
  p.appendChild(document.createTextNode('Loading...'));
  div.appendChild(p);

  // Retrieve the JSON feed.
  var script = document.createElement('script');
  script.setAttribute('src', 'http://skyplor.blogspot.com/feeds/posts' +
                      '/default??orderby=published&max-results=3&start-index=1&alt=json-in-script&callback=listEntries');
  script.setAttribute('id', 'jsonScript');
  script.setAttribute('type', 'text/javascript');
  document.documentElement.firstChild.appendChild(script);
}

/**
 * Deletes any old script elements which have been created by previous calls
 * to search().
 */
function removeOldJSONScriptNodes() {
  var jsonScript = document.getElementById('jsonScript');
  if (jsonScript) {
    jsonScript.parentNode.removeChild(jsonScript);
  }
}

/**
 * Deletes pre-existing children of the content div from the page. The content div 
 * may contain a "Loading..." message, or the results of a previous query. 
 * This old content should be removed before displaying new content.
 */
function removeOldResults() {
  var div = document.getElementById('content');
  if (div.firstChild) {
    div.removeChild(div.firstChild);
  }  
}
/*jsl:option explicit*/
/*jsl:declare document*/
/*
This class is used to cut the string which is having html tags. 
It does not count the html tags, it just count the string inside tags and keeps
the tags as it is.

ex: If the string is "welcome to <b>JS World</b> <br> JS is bla". and If we want to cut the string of 12 charaters then output will be "welcome to <b>JS</b>". 

Here while cutting the string it keeps the tags for the cutting string and skip the rest and without distorbing the div structure.

USAGE:
 var obj = new cutString("welcome to <b>JS World</b> <br> JS is",12);
 var newCutString = obj.cut();
*/
function CutString(string,limit){
    // temporary node to parse the html tags in the string 
    this.tempDiv = document.createElement('div');
    this.tempDiv.id = "TempNodeForTest";
    this.tempDiv.innerHTML = string;
    // while parsing text no of characters parsed 
    this.charCount = 0;
    this.limit = limit;

}
CutString.prototype.cut = function(){
    var newDiv = document.createElement('div');
    this.searchEnd(this.tempDiv, newDiv);
    return newDiv.innerHTML;
};

CutString.prototype.searchEnd = function(parseDiv, newParent){
    var ele;
    var newEle;
    for(var j=0; j< parseDiv.childNodes.length; j++){
        ele = parseDiv.childNodes[j];
        // not text node 
        if(ele.nodeType != 3){
            newEle = ele.cloneNode(true);
            newParent.appendChild(newEle);
            if(ele.childNodes.length === 0)
                continue;
            newEle.innerHTML = '';
            var res = this.searchEnd(ele,newEle);
            if(res)
                return res;
            else{
                continue;
            }
        }

        // the limit of the char count reached 
        if(ele.nodeValue.length + this.charCount >= this.limit){
            newEle = ele.cloneNode(true);
            newEle.nodeValue = ele.nodeValue.substr(0, this.limit - this.charCount);
            newParent.appendChild(newEle);
            return true;
        }
        newEle = ele.cloneNode(true);
        newParent.appendChild(newEle);
        this.charCount += ele.nodeValue.length;
    }
    return false;
};

function cutHtmlString($string, $limit){
    var output = new CutString($string,$limit);
    return output.cut();
}