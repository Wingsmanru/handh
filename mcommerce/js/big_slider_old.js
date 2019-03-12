(function($){

	$.fn.islider = function(options){
	
		var obj, prev_slide, current_slide, next_slide, screen,
			options = $.extend({
				time: 700,
				current_slide: 0,
				slider_left_button: null,
				slider_right_button: null,
				slides: [],
				id: 'big_slider',
				auto_scroll_timer: null,
				auto_scroll: 5,
				count: 0,
				timer: null,
				auto: 5,
				action: false,
				actionDelay: 800 
		}, options);

		var make = function(){
			obj = $(this);
			
			screen = document.createElement("div");
			$(screen).addClass("screen_shader");
			
			$(obj).append(screen);
			
			setTimeout(function(){
				$(screen).remove();
			}, 1200);
			
			if($(obj).attr("id") != ""){
				options.id = $(obj).attr("id");
			} else {
				options.id = 'big_slider';
			}

			if($(obj).find(".big_slider_slide").length > 0){
				options.count = $(obj).find(".big_slider_slide").length;
				options.slides = $(obj).find(".big_slider_slide");
			}
			
			options.slider_left_button = $(obj).find(".prev_zone");
			options.slider_right_button = $(obj).find(".next_zone");
			
			if(options.count <= 1){
				$(options.slider_left_button).remove();
				$(options.slider_right_button).remove();
			} else {
				$(options.slider_left_button).hover(prev_hover,prev_hover_out);
				$(options.slider_left_button).click(prev_click);
				
				$(options.slider_right_button).hover(next_hover,next_hover_out);
				$(options.slider_right_button).click(next_click);
			}
			
			elem = document.getElementById(options.id);
			
			var mc = new Hammer(elem);

			// listen to events...
			mc.on("swipeleft", function(ev) {
				
				$(options.slider_right_button).click();
			});
			
			// listen to events...
			mc.on("swiperight", function(ev) {
				
				$(options.slider_left_button).click();
			});

			show();
		};

		var show = function(){
			check_slides(null);
			
			if(options.auto > 0){
				options.timer = setInterval(function(){
					next_click();
				}, options.auto * 1000);
			}
		};
		
		var check_slides = function(direction){
		
			$(prev_slide).removeClass("prev_slide main_slide next_slide");
			$(current_slide).removeClass("prev_slide main_slide next_slide");
			$(next_slide).removeClass("prev_slide main_slide next_slide");
		
			if(options.count > 1){
				if(options.count == 2) {
					if(current_slide == 1){
						prev_index = 0;
						next_index = 0;
					} else {
						prev_index = 1;
						next_index = 1;
					}
				}
				
				if(options.count > 2){
					if(options.current_slide == 0){
						prev_index = options.count - 1;
						next_index = 1;
					} else {
						if(options.current_slide > 0 && options.current_slide < (options.count - 1)) {
							prev_index = options.current_slide - 1;
							next_index = options.current_slide + 1;
						} else {
							if(options.current_slide >= (options.count - 1)) {
								prev_index = options.current_slide - 1;
								next_index = 0;
							}
						}
					}
				}
								
				prev_slide = options.slides[prev_index];
				current_slide = options.slides[options.current_slide];
				next_slide = options.slides[next_index];
				
				if(direction == "p"){
					$(prev_slide).addClass("prev_slide nonono");
					$(current_slide).addClass("main_slide");
					$(next_slide).addClass("next_slide");
				} else if(direction == "n"){
					$(prev_slide).addClass("prev_slide");
					$(current_slide).addClass("main_slide");
					$(next_slide).addClass("next_slide nonono");
				} else {
					$(prev_slide).addClass("prev_slide");
					$(current_slide).addClass("main_slide");
					$(next_slide).addClass("next_slide");
				}
				
				
			}
		};

		
		var prev_click = function(){
		
			if(!$(obj).hasClass("moving")){
				$(obj).addClass("moving");

				prev_hover_out();
				

				if(options.current_slide == 0){
					options.current_slide = options.count-1;
				} else {
					options.current_slide = options.current_slide-1;
				}
				
				setTimeout(function(){
					$(obj).removeClass("moving");
					$(prev_slide).removeClass("nonono");
					$(current_slide).removeClass("nonono");
					$(next_slide).removeClass("nonono");
				}, options.actionDelay);
				
				check_slides("p");
			}
			
		};
		
		var prev_hover = function(){
			$(current_slide).addClass("main_hover_prev");
			$(prev_slide).addClass("prev_hover");
			
			if(options.timer != null){
				clearInterval(options.timer);
			}

		};
		
		var prev_hover_out = function(){
			$(current_slide).removeClass("main_hover_prev");
			$(prev_slide).removeClass("prev_hover");
			
			if(options.timer != null){
				clearInterval(options.timer);
			}
			
			if(options.auto > 0){
				options.timer = setInterval(function(){
					next_click();
				}, options.auto * 1000);
			}
		};
		
		
		var next_click = function(){
			if(!$(obj).hasClass("moving")){
				$(obj).addClass("moving");
				
				next_hover_out();	
				
				if(options.current_slide < options.count-1){
					options.current_slide = options.current_slide+1;
				} else {
					options.current_slide = 0;
				}

				setTimeout(function(){
					$(obj).removeClass("moving");
					$(prev_slide).removeClass("nonono");
					$(current_slide).removeClass("nonono");
					$(next_slide).removeClass("nonono");
				}, options.actionDelay);
				
				check_slides("n");
			}
		};
		
		var next_hover = function(){
			$(current_slide).addClass("main_hover_next");
			$(next_slide).addClass("next_hover");
			
			if(options.timer != null){
				clearInterval(options.timer);
			}
		};
		
		var next_hover_out = function(){
			$(current_slide).removeClass("main_hover_next");
			$(next_slide).removeClass("next_hover");
			
			if(options.timer != null){
				clearInterval(options.timer);
			}
			
			if(options.auto > 0){
				options.timer = setInterval(function(){
					next_click();
				}, options.auto * 1000);
			}
		};	
		
		return $(this).each(make);
	}

})(jQuery);


/*




$(function(){
	
	$(".big_slider").each(function(counter, slider){
	
		$(slider).attr("action","false");
		
		$(slider).find(".big_slider_slide:nth-child(2)").addClass("next_slide");
		$(slider).find(".big_slider_slide:first-child").addClass("main_slide");
		$(slider).find(".big_slider_slide:last-child").addClass("prev_slide");
		
		//clicks
		
		$(slider).find(".prev_zone").click(function(){
			first = $(slider).find(".main_slide");
			prev = $(slider).find(".prev_slide");
			next = $(slider).find(".next_slide");
		
			$(next).removeClass("next_slide");
			$(first).removeClass("main_slide").removeClass("main_hover_prev").addClass("next_slide");
			$(prev).removeClass("prev_hover").removeClass("prev_slide").addClass("main_slide");
			
		});
			
		$(slider).find(".next_zone").click(function(){
			
		});
		
		// hovers
		
		$(slider).find(".prev_zone").hover(
			function(){
				first = $(slider).find(".main_slide");
				prev = $(slider).find(".prev_slide");
				
				$(first).addClass("main_hover_prev");
				$(prev).addClass("prev_hover");
			},
			function(){
				first = $(slider).find(".main_slide");
				prev = $(slider).find(".prev_slide");
				
				$(first).removeClass("main_hover_prev");
				$(prev).removeClass("prev_hover");
			}
		);
			
		$(slider).find(".next_zone").hover(
			function(){
				first = $(slider).find(".main_slide");
				next = $(slider).find(".next_slide");
				
				$(first).addClass("main_hover_next");
				$(next).addClass("next_hover");
				
			},
			function(){
				first = $(slider).find(".main_slide");
				next = $(slider).find(".next_slide");
				
				$(first).removeClass("main_hover_next");
				$(next).removeClass("next_hover");
			}
		);

	});
	
	
});

*/