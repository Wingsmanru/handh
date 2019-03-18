(function($) {

	$.fn.caseSlider = function(options) {

		options = jQuery.extend({
			in_action: false,
			time: 500,
			prev_id: null,
			next_id: null,
			slides: null,
			count: 0,
			current: 0,
			container: null,
			dragEffect: true,
			numericId: 'pag_slider_1',
			sliderImages: null,
			auto: 5,
			timer: null,
			
			show_pags: true,
			pags: null,
			pag_container_class: 'cases_pags',
			pag_class: 'cases_pag',
			
			start_but: null,
			
			init_hammer: true,
			buttons: true
		},options);
		
		elems = this;
		
		function init(){
			
			this.o = new Array();
			jQuery.extend(this.o, options);
			
			var obj = this;
			
			
			this.make = function(){
				var obj = this;
				
				obj.o.slides = $("li", obj);
				obj.o.count = $("li", obj).length;

				$(obj.o.slides).hide();
				
				if(obj.o.show_pags){
					obj.initPags();
				}
				
				if(obj.o.init_hammer){
					var myOptions = new Array();
			
					var hammer = new Hammer(this, myOptions);
						
					hammer.on('swipeleft', 	function(){	obj.next();	});
					hammer.on('swiperight', function(){	obj.prev();	});
				}
				
				if(obj.o.buttons && obj.o.count > 1){
					obj.initButtons();
				}
				
				if(obj.o.start_but != null){
					$("#" + obj.o.start_but).click(function(){
						obj.next();
					});
				}
				
				if(obj.o.auto > 0){
					obj.o.timer = setInterval(function(){obj.next();}, obj.o.auto * 1000);
				}
				
				obj.setSlide(0);
				
			};
			
			this.setSlide = function(num){
				var obj = this;
				
				if(num >= 0 && num < obj.o.count){
					obj.o.current = num
					$(obj.o.slides).hide().removeClass("current").removeClass("fade_slide").removeClass("fade_slide_r");
					$(obj.o.slides[num]).addClass("current").show();
					
					if(obj.o.show_pags){
						$(obj.o.pags).removeClass("active");
						$(obj.o.pags[num]).addClass("active");
					}
				}
				
			};
			
			this.selectSlide = function(num, direction){
				var obj = this;
				
				var nextSlide = obj.o.slides[num];
				var currentSlide = obj.o.slides[obj.o.current];
				if(nextSlide){
					
					if(direction == 'l'){
						$(nextSlide).css("left", "-100%");
					} else {
						$(nextSlide).css("left", "100%");
					}
					
					$(nextSlide).show().addClass('__slide').animate({"left": "0%"}, obj.o.time, function(){
						obj.o.move = false;
						$(obj.o.slides).removeClass("__slide");
						obj.setSlide(num);
					});
					
					if(currentSlide){
						if(direction == 'l'){
							$(currentSlide).addClass("fade_slide_r");
						} else {
							$(currentSlide).addClass("fade_slide");
						}
					}
				}
			};
			
			this.prev = function(){
				var obj = this;
				
				if(!obj.o.move){
					obj.o.move = true;
					
					if(obj.o.auto > 0){
						clearInterval(obj.o.timer);
						obj.o.timer = setInterval(function(){obj.prev();}, obj.o.auto * 1000);
					}
					
					if(obj.o.current > 0){
						obj.selectSlide(obj.o.current - 1, 'l');
					} else {
						obj.selectSlide(obj.o.count - 1, 'l');
					}
				}
			};
			
			this.next = function(){
				var obj = this;
				
				if(!obj.o.move){
					obj.o.move = true;
					
					if(obj.o.auto > 0){
						clearInterval(obj.o.timer);
						obj.o.timer = setInterval(function(){obj.next();}, obj.o.auto * 1000);
					}
					
					if(obj.o.current < obj.o.count-1){
						obj.selectSlide(obj.o.current + 1, 'r');
					} else {
						obj.selectSlide(0, 'r');
					}
				}
			};
			
						
			
			this.initPags = function(){
				var obj = this;
				
				if(obj.o.slides != null && obj.o.slides.length > 0){
					obj.o.pags = new Array();
					
					var s = obj.o.count;
					
					var concon = document.createElement('div');
					var pagcon = document.createElement('div');
					
					$(concon).addClass("concon");
					$(pagcon).addClass(obj.o.pag_container_class).append(concon);
					
					for(var i=0 ; i<s ; i++ ){
						
						pag = document.createElement("a");
						$(pag).addClass(obj.o.pag_class).attr({
							"id"	: 	options.numericId + (i+1),
							"rel"	:	i,
							"href"	:	'javascript:void(0);'
						}).appendTo(concon).click(function(){							
							obj.selectSlide($(this).attr('rel'),'r');
						});

						obj.o.pags.push(pag);
					};	
					
					$(obj).before(pagcon);
				}
			};
			
			this.initButtons = function(){
				var obj = this;
				
				prev = document.createElement("div");
				next = document.createElement("div");
				
				$(prev).addClass("prev_but").click(function(){
					obj.prev();
				});

				$(next).addClass("next_but").click(function(){
					obj.next();
				});

				$(obj).append(prev).append(next);
			};
			

			this.make();
		}
		
		return this.each(init);
	};
})(jQuery);