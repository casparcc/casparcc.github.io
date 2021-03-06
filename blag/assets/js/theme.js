/**
 * Initialize theme scripts
 */

jQuery( document ).ready( function( $ ) {

	"use strict";

	/************** Tob-bar Height **************/

	$( window ).bind( "scroll", function() {
		if ( $ ( this ).scrollTop() > 10 ) {
			$( ".top-bar" ).removeClass( "tb-large" ).addClass( "tb-small" );
		} else {
			$( ".top-bar" ).removeClass( "tb-small" ).addClass( "tb-large" );
		}
	});

	/************** Menu Effect **************/

	var theToggle = document.getElementById('toggle');

	// based on Todd Motto functions
	// http://toddmotto.com/labs/reusable-js/

	// hasClass
	function hasClass(elem, className) {
		return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
	}
	// addClass
	function addClass(elem, className) {
	    if (!hasClass(elem, className)) {
	    	elem.className += ' ' + className;
	    }
	}
	// removeClass
	function removeClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
		if (hasClass(elem, className)) {
	        while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
	            newClass = newClass.replace(' ' + className + ' ', ' ');
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    }
	}
	// toggleClass
	function toggleClass(elem, className) {
		var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, " " ) + ' ';
	    if (hasClass(elem, className)) {
	        while (newClass.indexOf(" " + className + " ") >= 0 ) {
	            newClass = newClass.replace( " " + className + " " , " " );
	        }
	        elem.className = newClass.replace(/^\s+|\s+$/g, '');
	    } else {
	        elem.className += ' ' + className;
	    }
	}

	theToggle.onclick = function() {
	   toggleClass(this, 'on');
	   $( "#menu" ).fadeToggle('fast');
	   return false;
	}

	/************** Init Masonry **************/

	var $blocks = $( ".js-masonry" );

	$blocks.imagesLoaded( function(){
		$blocks.masonry({
			itemSelector: '.js-item'
		});
	});

	// Rearrange masonry on resize
	$( window ).resize( function() {
		$blocks.masonry();
	});

	// Init infinite scroll compatibility - Buggy! Not quite ready for prime-time yet
	var $infinite_count = 0;

	$( document.body ).on( "post-load", function () {

		$infinite_count = $infinite_count + 1;

		// Hide new posts so we can fade them in
		var $newItems = $( '#infinite-view-' + $infinite_count + '.js-item' ).css( { opacity: 0 } );

		// Once images are loaded, add the new posts via masonry
		$blocks.imagesLoaded( function() {
			$newItems.animate( { opacity: 1 } );
			$blocks.masonry( "appended", $newItems ).masonry( 'reload' );
		});

	});

	/************** Gallery Masonry Init **************/

	var galleries = document.querySelectorAll('.gallery');
	for ( var i=0, len = galleries.length; i < len; i++ ) {
	  var gallery = galleries[i];
	  initMasonry( gallery );
	}
	function initMasonry( container ) {
	  var imgLoad = imagesLoaded( container, function() {
	    new Masonry( container, {
	      itemSelector: '.gallery-item',
	      columnWidth: '.gallery-item'
	    });
	  });
	}

	/************** Image Lightbox Init **************/

	$(".entry-content a").attr('data-imagelightbox', '');

	// Overlay
	var overlayOn = function() {
		$( '<div id="imagelightbox-overlay"></div>' ).appendTo( 'body' );
	},
	overlayOff = function() {
		$( '#imagelightbox-overlay' ).remove(); 
	}

	// Init with Overlay
	$( 'a[data-imagelightbox]' ).imageLightbox({
		onStart: 	 function() { overlayOn(); },
		onEnd:	 	 function() { overlayOff(); }		
	});

});