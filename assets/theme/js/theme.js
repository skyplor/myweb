(function($) {
  "use strict";

  //Run function When Document Ready
  $(document).ready(initialize());

  function initialize() {
    initTooltip();
    initGetHWindow();
    initParallax();
    initNavbarScroll();
    initClickedEvents();
    initEasyChart();
    initLightBox();
    initTyped();
    initBtnFile();
    initMap();
    initHold();
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
      strings: ["The Dancer", "The Software Engineer", "The Android Developer", "The Problem-Solver"],
      // typing speed
      typeSpeed: 80,
      // time before typing starts
      startDelay: 100,
      // backspacing speed
      backSpeed: 50,
      // time before backspacing
      backDelay: 800,
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
      delegate: 'a.gallery-item',
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
  function initNavbarScroll() {
    if ($('.main-header').length > 0) {
      var mainbottom = $('.main-header').offset().top + $('.main-header').height();
      $(window).on('scroll', function() {
        var stopWindow = Math.round($(window).scrollTop()) + $('.menu-area').outerHeight();
        conditionNavbar(stopWindow, mainbottom);
      });
    }
  }

  //Check Navbar Show
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
      'center': '1.2896700, 103.8500700',
      'zoom': 3,
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

  //Tooltip Bootstrap
  function initTooltip() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  //Trigger Custom Btn FIle
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
})(jQuery);
