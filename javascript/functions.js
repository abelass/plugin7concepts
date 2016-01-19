/*
 * Ce fichier peut contenir toutes les scripts custom
 * @requires jQuery v1.4 or later
*/
$(document).ready(function() {
	//console.log(document.location.hash);
	var sliderInstance;
	  setTimeout(function(){
	  
		  $('.royalSlider#gallery-1').royalSlider({
		    fullscreen: {
		      enabled: true,
		      nativeFS: true
		    },
		    imgAlignCenter:true,
		    controlNavigation: 'thumbnails',
		    autoScaleSlider: true, 
		    autoScaleSliderWidth: 1200,     
		    autoScaleSliderHeight: 980,
		    imageScaleMode:'fit',
		    imageScalePadding:0,
		    globalCaption:true,
		    imageAlignCenter:false,
		    loop: true,
		    thumbs: {
			spacing: 10,
			firstMargin:false
			},
		    numImagesToPreload:4,
		    arrowsNavAutohide: true,
		    arrowsNavHideOnTouch: true,
		    controlsInside: true,
		    keyboardNavEnabled: true
		  });
		  
		  $('.royalSlider#gallery-2').royalSlider({
		    fullscreen: {
		      enabled: false
		    },
		    imgAlignCenter:true,
		    controlNavigation: 'none',
		    autoScaleSlider: true,   
		    autoScaleSliderWidth: 380,     
		    autoScaleSliderHeight: 300,  
		    imageScaleMode:'fit',
		    imageScalePadding:0,
		    globalCaption:false,
		    imgAlignCenter:true,
		    loop: false,
		    arrowsNavAutohide: true,
		    arrowsNavHideOnTouch: true
		  });
		  	setTimeout(function(){
			  $('.royalSlider#gallery-2').find('.rsSlide').each(function(index, element) {
				  $(this).find('img').css('margin-left', ($(this).innerWidth()-$(this).find('img').width())/2);
				
				});
				
				if($('#gallery-1').length!=0){
					sliderInstance = $('#gallery-1').data('royalSlider');
					sliderInstance.updateSliderSize();
				}
				if($('#gallery-2').length!=0){
					sliderInstance = $('#gallery-2').data('royalSlider');
					sliderInstance.updateSliderSize();
				}
				
			},100);
			
	  },200);
	//Petite fonction pour updater la taille de royalslider en cas d'ouverture de tab, sinon n'apparaît pas...

	$('a[data-toggle="tab"]').on('shown', function (e) {
	
		if($('.tab-pane.active').find(".royalSlider").length!=0){
			setTimeout(function(){	sliderInstance = $('.tab-pane.active').find(".royalSlider").data('royalSlider');
				
				sliderInstance.updateSliderSize();
			},300);
			
			
		}
		  
	});
	
		

	//Cacher les thumbs du slider s'il n'y en a qu'un
	setTimeout(function(){
		$('.rsThumbs').each(function() {
			if($(this).find('.rsThumb').length==1){$(this).hide();}
		});
	},3000);
	
	$('.email-btn').on('click', function(e){
		e.preventDefault();
		$('.formulaire_form_client_mail').slideToggle();
	});
	
	$('.pass-btn').on('click', function(e){
		e.preventDefault();
		$('.formulaire_form_client_pass').slideToggle();
	});
	
	//Tabs
		
	if($('#carousel-home').length!=0) $( '#carousel-home' ).elastislide({
		speed : 500,
		minItems : 4
		
		});
	if($('#carousel-side').length!=0) $( '#carousel-side' ).elastislide({speed : 500,minItems : 1});
	
	//Si on change de sous rubrique on vire le cookie qui retient la tab enregistrée
	$('#submenu').find('a').on('click', function(e){$.cookie('tab', 0, { expires: 7, path: '/' });});
	$('#header-menu').find('a').on('click', function(e){$.cookie('tab', 0, { expires: 7, path: '/' });});
	
	
	//Tabs : cas particulier: products client area
	if($('.c-a-products').length!=0){
		
		$('a[data-toggle="tab"]:first').tab('show');
		$('a[data-toggle="tab"]').on('show', function (e) {
			$('.simpleTabsNavigation').find('li').removeClass('active');
		})
		$('.simpleTabsNavigation').each(function(index) {if(index==0) $(this).css({'display':'block'})});
		$('.open-title').click(function(){
			$('.open-title').removeClass('active-open');
			$(this).next('.simpleTabsNavigation').parent().siblings().find('.simpleTabsNavigation').slideUp();
			$(this).next('.simpleTabsNavigation').slideDown();
			$(this).addClass('active-open');
		});
	
		setTimeout(function(){
		
			$('.simpleTabsNavigation').find('.active').parent().parent().slideDown(100);
			$('.simpleTabsNavigation').find('.active').parent().parent().find('.open-title').addClass('active-open');
			},300);
		
	}
	
	else{
		//On retient la tab ouverte dans une langue => si on change de langue, la tab correspondante est ouverte
		if($('a[data-toggle="tab"]').length!=0){
			
			var lang = window.location.pathname.split( '/' )[1];
			if($.cookie('tab') && $.cookie('oldLang')!=lang){
				
				$('a[data-toggle="tab"]').each(function(index) {
					if (index==$.cookie('tab')){$(this).tab('show');}
					
				});
			
			}
			else {			
				$('a[data-toggle="tab"]:first').tab('show');
			}
			
			if($('.contact').length !=0 && $.cookie('tab-contact')==1){
					$('a[data-toggle="tab"]').each(function(index) {
						if (index==$.cookie('tab')){$(this).tab('show');}
						
					});
			}
			
			$('a[data-toggle="tab"]').each(function(index) {
				if($('.contact').length !=0){
					$(this).on('click', function(e){
						$.cookie('tab-contact', index, { expires: 7, path: '/' });
					});
				}
				$(this).on('click', function(e){
					$.cookie('tab', index, { expires: 7, path: '/' });
				});
			});
			
			$.cookie('oldLang', lang , { expires: 7, path: '/' });
			
							
		}
		$('.simpleTabsNavigation').slideDown();
	}
	
	/*Fancyboxes*/
	
	//1. Suppression reecriture ancres par spip
	var testBool=true;
	var n, str;
	$(".fancybox").each(function(){ 
		str=$(this).attr('href');
		n=str.search("#");
		 $(this).attr('href', str.substring(n));
		});
	
	$('a.fancybox').fancybox({
		'minWidth'	:480,
		'height'	:320,
		'autoResize' : false,
		'transitionIn'	: 'fade',
		'transitionOut'	: 'fade',
		'titlePosition' : 'inside',
		'speedIn'		: 300, 
		'speedOut'		: 300
							   
	});
	$("#accordion").accordion({
		collapsible: true,
		active: false,
		autoHeight: false
	});
	
	//Bug pagination
	if(window.location.hash=='#pagination_AfficherArticles'){$('#content').css({'top':'16px'});}
	
	
		/*Mobile menus*/
	$('.mobile_expand').click(function(){

		if($('.by-cat').length!=0) $('.by-cat').slideToggle();
		if($('.no-cat').length!=0)$('.no-cat').slideToggle();
		$(this).toggleClass('active');
	});


	
	$('.mobile_subnav_exp').click(function(){		
			$('#submenu li:not(.active)').slideToggle();
			$('#tools').slideToggle();
			$(this).toggleClass('active');
			// Maybe use :not(.ui-tabs-selected)
	});	
	
	
	// Debounce(Resize) thx @Paul_Irish! 
(function($,sr){
	 
	  // debouncing function from John Hann
	  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
	  var debounce = function (func, threshold, execAsap) {
	      var timeout;
	 
	      return function debounced () {
	          var obj = this, args = arguments;
	          function delayed () {
	              if (!execAsap)
	                  func.apply(obj, args);
	              timeout = null; 
	          };
	 
	          if (timeout)
	              clearTimeout(timeout);
	          else if (execAsap)
	              func.apply(obj, args);
	 
	          timeout = setTimeout(delayed, threshold || 800); 
	      };
	  }
		// smartresize 
		jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
	 
	})(jQuery,'smartresize');
	 
	 
	// usage:
	$(window).smartresize(function(){  
	  
	});	
	
	// Mobile Nav + subnav Expanders
	if (($('#submenu li.active').length > 0) & ($('.mobile_subnav_exp:not(.active)').css('display') == 'block'))	{
		$('#submenu li:not(.active)').hide();
		}
		else{
		$('#submenu li:not(.active)').show();
		}
		
	if ($(window).width() < 895)	{
		$('#tools').hide();
		}
		else{
		$('#tools').show();
		}
		
	$(window).resize(function(){
	
	if (($('#submenu li.active').length > 0) & ($('.mobile_subnav_exp:not(.active)').css('display') == 'block'))	{
		$('#submenu li:not(.active)').hide();
		}
		else{
		$('#submenu li:not(.active)').show();
		}
		
		if ($(window).width() < 895)	{
		$('#tools').hide();
		}
		else{
		$('#tools').show();
		}
	});
	
	
	/*smart resize*/
(function($,sr){
 
  // debouncing function from John Hann
  // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
  var debounce = function (func, threshold, execAsap) {
      var timeout;
 
      return function debounced () {
          var obj = this, args = arguments;
          function delayed () {
              if (!execAsap)
                  func.apply(obj, args);
              timeout = null; 
          };
 
          if (timeout)
              clearTimeout(timeout);
          else if (execAsap)
              func.apply(obj, args);
 
          timeout = setTimeout(delayed, threshold || 100); 
      };
  }
  
  
	// smartresize 
	jQuery.fn[sr] = function(fn){  return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };
 
})(jQuery,'smartresize');
	
});

//Animation background galerie en fullscreen

(function(d){function m(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function j(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function g(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:m()}});var k=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(k,function(b,a){d.Tween.propHooks[a]={get:function(c){return d(c.elem).css(a)},set:function(c){var e=c.elem.style,i=g(d(c.elem).css(a)),h=g(c.end);c.run=function(f){e[a]=j(i,h,f)}}}});d.Tween.propHooks.borderColor={set:function(b){var a=b.elem.style,c=[],e=k.slice(2,6);d.each(e,function(h,f){c[f]=g(d(b.elem).css(f))});var i=g(b.end);
b.run=function(h){d.each(e,function(f,l){a[l]=j(c[l],i,h)})}}}})(jQuery);
	
