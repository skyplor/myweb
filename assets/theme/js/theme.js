(function($) {
  "use strict";

  //Run function When Document Ready
  $(document).ready(initialize());

  function initialize() {
    initTooltip();
    initGetHWindow();
    initParallax();
    initNavbarSrcoll();
    initClickedEvents();
    initEasyChart();
    initLightBox();
    initTyped();
    initBtnFile();
    initMap();
    initHold();
	
	//initBlog();
	//JavaScript.load('http://skyplor.blogspot.com/feeds/posts/default?orderby=published&max-results=3&start-index=1&alt=json-in-script', listEntries);
  }
  
  //Run function When PACE (page loader) hide
  Pace.on('hide', function() {
    $('.wrapper').css('visibility', 'visible').animate({opacity: 1.0}, 2000, function() {
      initCheckNav();
    });
    //check if url contain hash(#)
    if (window.location.hash) {
      $('.link-inpage[href="' + window.location.hash + '"]').first().trigger('click');
    }
  });

  //Run function When WIndow Resize
  $(window).resize(function() {
    initParallax();
  });

  //Typed Animation
  function initTyped() {
    $("#typed").typed({
      strings: ["The Software Engineer", "The Android Developer", "The Dancer", "The Problem-Solver"],
      // typing speed
      typeSpeed: 200,
      // time before typing starts
      startDelay: 100,
      // backspacing speed
      backSpeed: 50,
      // time before backspacing
      backDelay: 1500,
      // loop
      loop: true,
      // false = infinite
      loopCount: false,
      // show cursor
      showCursor: true,
      // character for cursor
      cursorChar: ".",
      // attribute to type (null == text)
      attr: null,
      // either html or text
      contentType: 'html',
      // call when done callback function
      callback: function() {
      },
      // starting callback function before each string
      preStringTyped: function() {
      },
      //callback for every typed string
      onStringTyped: function() {
      },
      // callback for reset
      resetCallback: function() {
      }
    });
  }

  //Lightbox (popup)
  function initLightBox() {
    $('.list-work').magnificPopup({
      delegate: 'a.galery-item',
      type: 'image',
      tLoading: 'Loading image #%curr%...',
      mainClass: 'mfp-img-mobile',
      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
      },
      image: {
        tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
        titleSrc: function(item) {
          return item.el.attr('title');
        }
      }
    });

    $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });
  }

  //Chart
  function initEasyChart() {
    $('.chart').easyPieChart({
      easing: 'easeOutBounce',
      barColor: '#000',
      onStep: function(from, to, percent) {
        $(this.el).find('.percent').text(Math.round(percent));
      }
    });
  }

  //Click Envents
  function initClickedEvents() {
    $('#hireme-tab').click(function() {
      $('#myTab a[href="#tab1"]').tab('show');
    });

    $('#contact-tab').click(function() {
      $('#myTab a[href="#tab0"]').tab('show');
    });

    $('.map-area').click(function() {
      $(this).addClass('show');
    });

    $('.back-to-top').click(function() {
      $('html, body').stop().animate({
        'scrollTop': 0
      }, 1500, 'easeInOutExpo', function() {
      });
      return false;
    });

    $('.link-inpage').click(function(e) {
      var target = this.hash, $target = $(target);
      $('html, body').stop().animate({
        'scrollTop': $target.offset().top - ($('.menu-area').outerHeight() - 1)
      }, 1500, 'easeInOutExpo', function() {
        //window.location.hash = target;
      });
      return false;
    });
  }

  //Navbar Scroll
  function initNavbarSrcoll() {
    if ($('.main-header').length > 0) {
      var mainbottom = $('.main-header').offset().top + $('.main-header').height();
      $(window).on('scroll', function() {
        var stopWindow = Math.round($(window).scrollTop()) + $('.menu-area').outerHeight();
        conditionNavbar(stopWindow, mainbottom);
      });
    }
  }

  //Check Navar Show
  function initCheckNav() {
    if ($('.main-header').length > 0) {
      var mainbottom = $('.main-header').offset().top + $('.main-header').height();
      var stopWindow = Math.round($(window).scrollTop()) + $('.menu-area').outerHeight();
      conditionNavbar(stopWindow, mainbottom);
    }
  }

  //Condition Navbar
  function conditionNavbar(stopWindow, mainbottom) {
    if (stopWindow > mainbottom) {
      $('.menu-area').addClass('nav-fixed');
    } else {
      $('.menu-area').removeClass('nav-fixed nav-white-bg');
    }
    if ((stopWindow) > $('.menu-area').outerHeight()) {
      $('.menu-area').addClass('nav-white-bg');
    }
  }

  //Bg Parallax
  function initParallax() {
    $('.parallax-bg').each(function() {
      $(this).parallax("50%", 0.3);
    });
  }

  //Set header to window
  function initGetHWindow() {
    var wHeight = $(window).height();
    if (wHeight > 600 && !$('.main-header').hasClass('no-window')) {
      $('.main-header, .header-content-fixed').height(wHeight);
    }
  }

  //Map
  function initMap() {
    $('#map-contact').gmap({
      'center': '1.431966, 103.845058',
      'zoom': 15,
      scrollwheel: false,
      'disableDefaultUI': false,
      'callback': function() {
        var self = this;
        self.addMarker({
          'position': this.get('map').getCenter(),
          icon: 'assets/theme/images/marker.png'
        }).click(function() {
          self.openInfoWindow({
            'content': $('.map-contact-body').html()
          }, this);
        });
      }
    });
  }

  function initHold() {
    $('[data-holdwidth]').each(function(index, el) {
      var width = $(el).data('holdwidth');
      $(el).css('width', width);
    });
    $('[data-holdbg]').each(function(index, el) {
      var bg = $(el).data('holdbg');
      $(el).css('background-image', 'url(' + bg + ')');
    });
  }

  //Tooltip Bootrapt
  function initTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //Tigger Custom Btn FIle
  function initBtnFile() {
    $(document).on('change', '.btn-file :file', function() {
      var input = $(this),
              numFiles = input.get(0).files ? input.get(0).files.length : 1,
              label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
      var input = $(this).parents('.input-group').find(':text'),
              log = numFiles > 1 ? numFiles + ' files selected' : label;
      if (input.length) {
        input.val(log);
      } else {
        if (log) {
          console.log(log);
        }
      }
    });
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
	//function initBlog() {
	  // Delete any previous JSON script nodes.
	  //removeOldJSONScriptNodes();
	  // Clear any old content to prepare to display the Loading... message.
	  //removeOldResults();

	  // Show a "Loading..." indicator.
	  //var div = document.getElementById('content');
	  //var p = document.createElement('p');
	  //p.appendChild(document.createTextNode('Loading...'));
	  //div.appendChild(p);
	  
	  

	  // Retrieve the JSON feed.
	  //var script = document.createElement('script');
	  //script.setAttribute('src', 'http://skyplor.blogspot.com/feeds/posts/default?orderby=published&max-results=3&start-index=1&alt=json-in-script&callback=listEntries');
	  //script.setAttribute('id', 'jsonScript');
	  //script.setAttribute('type', 'text/javascript');
	  //document.documentElement.firstChild.appendChild(script);
		
	//}
	// var JavaScript = {
		// load: function(src, callback) {
			// var script = document.createElement('script'),
				// loaded;
			// script.setAttribute('src', src);
			// if (callback) {
				// script.onreadystatechange = script.onload = function() {
					// if (!loaded) {
						// callback(script);
					// }
					// loaded = true;
				// };
			// }
			// document.documentElement.firstChild.appendChild(script);
		// }
	// };
	

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
		var div_blog_content = document.createElement('div');
		div_blog_content.className = "blog-content";
		var h5_blog_title = document.createElement('h5');
		h5_blog_title.className = "text-uppercase color-dark text-bold";
		var title = document.createTextNode(entry.title.$t);
		h5_blog_title.appendChild(title);
		div_blog_content.appendChild(h5_blog_title);
		var div_post_meta = document.createElement('div');
		div_post_meta.className = "post-meta font-alt";
		var span_date = document.createElement('span');
		var i_calendar = document.createElement('i');
		i_calendar.className = "fa fa-calendar";
		// Parsing the date
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
		var p_paragraph = document.createElement('p');
		var paragraph = entry.content.$t;
		var cut_paragraph = paragraph.substring(0,101) + "...";
		var txt_paragraph = document.createTextNode(cut_paragraph);
		p_paragraph.appendChild(txt_paragraph);
		div_blog_content.appendChild(p_paragraph);
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
		div_blog_content.append(a);
		div_box_blog.appendChild(div_blog_content);
		li.appendChild(div_box_blog);

		ul.appendChild(li);
	  }

	  // Install the bullet list of blog posts.
	  document.getElementById('content').appendChild(ul);
	}
  

})(jQuery);
