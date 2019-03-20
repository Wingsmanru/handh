/*
 *	jQuery dragSlider Plugin
 *	How to use it : 
 * 
 *	<div id="slider" class="slider">
 * 		<div>
 *			<ul>
 *				<li><img src="" alt=""/></li>
 *				<li><img src="" alt=""/></li>
 *				<li><img src="" alt=""/></li>
 *			</ul>
 *		</div>
 *	</div>
 *
 *	<script type="text/javascript">
 *	$(function(){
 *		$('#slider').dragSlider({
 *			numericId:'controlsSlider1',// unique name of the control element
 *			width : 450,				// width of the slider
 *			height : 250,				// height of the slider
 *			dragEffect : true,			// if true enables the drag effect
 *			autoCenter : true,			// if true center the slider horizontally
 *			imageAutoFit : false,		// if true fit the image to the slider size
 *			speed : 200,				// animation's speed
 *			useArrow : false,			// if true use arrow to navigate
 *		});
 *	});
 *	</script>
 */
(function($) {

	$.fn.dragSlider = function(options){
	  
		// default configuration properties
		var defaults = {
			numericId : 'controls', 	// unique name of the control element
			dragEffect : true,			// if true enables the drag effect
			autoCenter : true,			// if true center the slider horizontally
			imageAutoFit : false,		// if true fit the image to the slider size
			speed : 200,				// animation's speed
			useArrow : false,			// if true use arrow to navigate
		}; 
		
		var options = $.extend(defaults, options);  
		var obj = $(this);
		var w = $(obj).width();
		var h = $(obj).height();
		var s = $("li", obj).length; // number of slides
		var clickable = true;
		var timeout;
		var t = 0;
		var html = '<div class="cases_pags"><div class="concon" id="'+ options.numericId +'" class="controls"></div> </div>';	// the control element
		
		if(options.autoCenter)
			$(obj).css('margin', '0 auto'); 
			
		$("li", obj).width($(obj).width());
		$("li", obj).height($(obj).height());
		$("ul", obj).width(s*w);

		$(window).resize(function(){
			w = $(obj).width();
			h = $(obj).height();
			
			$("li", obj).width($(obj).width());
			$("li", obj).height($(obj).height());
			$("ul", obj).width(s*w);
		});
						
		$(".container", obj).before(html);
										
		for(var i=0;i<s;i++){				// populate the control element
			$(document.createElement("a"))
				.attr({
					"id"	: 	options.numericId + (i+1),
					"rel"	:	i,
					"href"	:	'javascript:void(0);'
				})
				.appendTo($("#"+ options.numericId))
				.click(function(){							
					changeSlide($("a",$(this)).attr('rel'),true);
				}); 												
		};	
		
		function setCurrentSlide(i){
			i = parseInt(i)+1;
			$("li", "#" + options.numericId).removeClass("current");
			$("li#" + options.numericId + i).addClass("current");
		};
		
		function adjust(){
			clickable = true;
			setCurrentSlide(t);
		};
		
		function changeSlide(dir,clicked){
			if (clickable){
				clickable = false;
				var ot = t;
				t = parseInt(dir);
				var diff = Math.abs(ot-t);
				var speed = 1000;		
				p = (t*w*-1);
				$("ul",obj).animate(
					{ marginLeft: p }, 
					{ queue:false, duration:speed, complete:adjust }
				);											
				if(clicked) clearTimeout(timeout);
			};
		};
		
		if(options.dragEffect){
			$(obj).mousedown(function(event) {
				$(this).bind("mousemove");
				var x_origine = event.pageX;
				
				$(this).mousemove(function(event){
					var x_diff = x_origine - event.pageX;
					var leftMargin = (t*w + x_diff)*-1;
					if(leftMargin<0 && leftMargin>(s-1)*w*-1){
						$("ul",$(this)).css(
							{ marginLeft: leftMargin}
						);
					}				
				});
			});
			
			$(obj).mouseleave(function() {
				$(this).unbind("mousemove");
				var left = parseInt($("ul",obj).css("margin-left").replace("px",""));
				var t = parseInt(Math.round(left/w*-1));
				changeSlide(t,true);
			  });
			
			$(obj).mouseup(function(event) {
				$(this).unbind("mousemove");
				var left = parseInt($("ul",obj).css("margin-left").replace("px",""));
				var t = parseInt(Math.round(left/w*-1));
				changeSlide(t,true);
			});
		}
		
		document.ondragstart = function () { return false; };// disable image dragging default action
		setCurrentSlide(0);
	};

})(jQuery);



