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
				auto: 10,
				action: false,
				actionDelay: 400 
		}, options);

		var make = function(){
			obj = $(this);
			
			screen = document.createElement();
			$(screen).addClass("screen_shader");
			
			$(obj).append(screen);
			
			if(this.id != ""){
				options.id = this.id;
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

			show();
		};

		var show = function(){
			check_slides();
			
			/*
			if(options.auto > 0){
				options.timer = setInterval(function(){
					next_click();
				}, options.auto * 1000);
			}
			*/
		};
		
		var check_slides = function(){
			current_slide = options.slides[options.current_slide];

			$(current_slide).addClass("main_slide");
		};

		
		var prev_click = function(){
		
			if(!$(obj).hasClass("moving")){
				$(obj).addClass("moving");

				if(options.timer != null && options.auto > 0){
					clearInterval(options.timer);
					options.timer = setInterval(function(){
						//next_click();
					}, options.auto * 1000);
				}
			
				
				
				$(current_slide).addClass("main_move_prev");
				$(prev_slide).addClass("main_slide");
				
				setTimeout(function(){
					$(obj).removeClass("moving");
					$(current_slide).removeClass("main_slide").css({"left": "0px", "margin-left": "0px"});
					current_slide = prev_slide; 
					$(current_slide).addClass("main_slide").removeClass();
				}, options.actionDelay);
			}
			
		};
		
		var prev_hover = function(){
			
			prev_slide = options.slides[options.count - 1];
			$(current_slide).addClass("main_hover_prev");
			$(prev_slide).addClass("prev_slide prev_hover");
			
			
			if(options.timer != null && options.auto > 0){
				clearInterval(options.timer);
			}
		};
		
		var prev_hover_out = function(){
			$(current_slide).removeClass("main_hover_prev");
			$(prev_slide).removeClass("prev_hover");

			if(options.auto > 0){
				options.timer = setInterval(function(){
					//next_click();
				}, options.auto * 1000);
			}
		};
		
		
		var next_click = function(){
			if(!$(obj).hasClass("moving")){
				$(obj).addClass("moving");
				
				setTimeout(function(){
					$(obj).removeClass("moving")
				}, options.actionDelay);
				
				
				if(options.timer != null && options.auto > 0){
					clearInterval(options.timer);
					options.timer = setInterval(function(){
						next_click();
					}, options.auto * 1000);
				}
			
				next_hover_out();
				
				if(options.current_slide < options.count-1){
					options.current_slide = options.current_slide+1;
				} else {
					options.current_slide = 0;
				}
				
				$(prev_slide).addClass("m1");
				$(prev_slide).addClass("m2");

			
				check_slides();
			}
		};
		
		var next_hover = function(){
			$(current_slide).addClass("main_hover_next");
			$(next_slide).addClass("next_hover");
			
			if(options.timer != null && options.auto > 0){
				clearInterval(options.timer);
			}
		};
		
		var next_hover_out = function(){
			$(current_slide).removeClass("main_hover_next");
			$(next_slide).removeClass("next_hover");
			
			if(options.auto > 0){
				options.timer = setInterval(function(){
					//next_click();
				}, options.auto * 1000);
			}
		};	
		
		return $(this).each(make);
	}

})(jQuery);