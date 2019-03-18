var menuApperTime = 200;
var menuOpened = false;
var oldScrollPosition = 0;
var scrollTime = null;

$(function(){
	maincover_img = new Image();
	maincover_img.src = "http://wingsman.ru/img/mainvideo/1.jpg";
	
	maincover_img.onload = function() {
		
		$("#maincover_loader").fadeTo(200,0,function(){
			$(this).remove();
					
			$("#maincover_block").addClass("showblock");
			$("#maincover_block").fadeTo(2000,1);
		});

	}
	
	//Menu
	
	
	$("#back_menu").click(function(){
	
		if($("#menu").hasClass("opened")){

			elems = $(".bigmenu_for_a .bigmenu_a");
			newelems = new Array();
			l = elems.length;
			
			for(i=0; i < l; i++){
				newelems.push(elems[l-1-i]);
			}
			
			$(newelems).each(function(kk,ee){
				setTimeout(function(){$(ee).removeClass("in_use");}, kk*20);
			});

			
			$("#menu").fadeTo(menuApperTime, 0, function(){
				$(this).removeClass("opened").hide();
			});
		}
	});
	
	$("#menu_button").click(function(){
		
		if(!$("#menu").hasClass("opened")){

			$("#menu").addClass("opened").fadeTo(menuApperTime, 1, function(){});
			
			$(".bigmenu_for_a .bigmenu_a").each(function(j,el){
				setTimeout(function(){$(el).addClass("in_use");}, j*20);
			});
		}
	});
	
	$(document).on("scrollstart",function(){
		$("body").addClass("scrolling_on");
	}); 
	
	$(document).on("scrollend",function(){
		$("body").removeClass("scrolling_on");
	}); 

	
	//Выставляем скролл
	
	$(".block_can_appear").each(function(k,e){
		of = $(e).offset();
		
		wh = $(window).scrollTop() + $(window).height()*0.7;
		
		if(wh >= of.top && !$(e).hasClass("shown")){
			$(e).addClass("shown");
		}
	});
	
	oldScrollPosition  = $(window).scrollTop();
	
	$(window).scroll(function(){
		if(oldScrollPosition < $(window).scrollTop()){
			$(".toptop").addClass("__hidden");
		} else {
			$(".toptop").removeClass("__hidden");
		}
		
		oldScrollPosition = $(window).scrollTop();
		
		//Появление блоков
		
		$(".block_can_appear").each(function(k,e){
			of = $(e).offset();
			
			wh = $(window).scrollTop() + $(window).height()*0.85;
			
			if(wh >= of.top && !$(e).hasClass("shown")){
				$(e).addClass("shown");
			}
		});
		
		//цвет топа
		
		$(".toptop").removeClass("__black");
		
		$(".color_point").each(function(k,e){
			of = $(e).offset();
			
			wh = $(window).scrollTop() + $(window).height()*0.1;
			
			if(wh >= of.top){
				if($(e).hasClass("black")){
					$(".toptop").addClass("__black");
				} else {
					$(".toptop").removeClass("__black");
				}
			}
		});
		
		/*
		
		var docHeight = $(document).height();
		var bottomPoint = $(window).scrollTop() + $(window).height();
		
		if(scrollTime != null){
			clearTimeout(scrollTime);
		}
		
		if(docHeight  <= bottomPoint){
			scrollTime = setTimeout(function(){
				$("#whosnext_block").slideDown(700);
				$('body, html').animate( { scrollTop: docHeight+400 }, 700 );
			}, 700);
		}
		*/

	});
	
	
});

function contactsFormSubmit(form){
	$(form).find("input[type='submit']").attr("disabled", "disabled");
	$(".form_errors").remove();
	
	$.ajax({
       type: "POST",
       dataType: 'json',
       url: $(form).attr('action'),
       data: $(form).serialize(),
       success: function(data) {
            if (data.ERRORS) {
				err = document.createElement("div").hide();
				$(err).addClass("form_errors").html(( data.ERRORS instanceof Array ) ? data.ERRORS.join("<br>") : data.ERRORS);
                $(form).before(err);
				$(err).slideDown();
            } else if (data.SUCCESS) {
                res = document.createElement("div");
				$(res).addClass("form_result").html(data.MESSAGE).hide();
				$(form).slideUp(function(){
					$(this).replaceWith(res);
					$(res).slideDown();
				});
				
            }
			
			$(form).find("input[type='submit']").removeAttr("disabled");
            
		},
		error : function(data){
			$(form).find("input[type='submit']").removeAttr("disabled", "disabled");
		}
    }); 
}

function openAdaptMenu(){
	$("#adapt_menu").stop().fadeTo(700,1).addClass("__opened");
	$("#adapt_menu_bg").stop().fadeTo(700,1,function(){});
	
	$(".page_wrapper").attr("data-scroll", $(window).scrollTop()).css("top", -$(window).scrollTop() + "px")
	$(".page_wrapper").addClass("__fixed");
	$("body").addClass("__scroll_auto");
}

function closeAdaptMenu(){
	$("#adapt_menu").removeClass("__opened");
	$("#adapt_menu").stop().fadeTo(700,0,function(){
		$(this).hide();
	});
	$("#adapt_menu_bg").stop().fadeTo(700,0,function(){
		$(this).hide();
		
		$(".page_wrapper").removeClass("__fixed");
		$("body").removeClass("__scroll_auto");
		$(window).scrollTop($(".page_wrapper").attr("data-scroll"));
	});
}

(function ($){
	var
		  ns		= (new Date).getTime()
		, special	= $.event.special
		, dispatch	= $.event.handle || $.event.dispatch
 
		, scroll		= 'scroll'
		, scrollStart	= scroll + 'start'
		, scrollEnd		= scroll + 'end'
		, nsScrollStart	= scroll +'.'+ scrollStart + ns
		, nsScrollEnd	= scroll +'.'+ scrollEnd + ns
	;
 
	special.scrollstart = {
		setup: function (){
			var pid, handler = function (evt/**$.Event*/){
				if( pid == null ){
					evt.type = scrollStart;
					dispatch.apply(this, arguments);
				}
				else {
					clearTimeout(pid);
				}
 
				pid = setTimeout(function(){
					pid = null;
				}, special.scrollend.delay);
 
			};
 
			$(this).bind(nsScrollStart, handler);
		},
 
		teardown: function (){
			$(this).unbind(nsScrollStart);
		}
	};
 
	special.scrollend = {
		delay: 300,
 
		setup: function (){
			var pid, handler = function (evt/**$.Event*/){
				var _this = this, args = arguments;
 
				clearTimeout(pid);
				pid = setTimeout(function(){
					evt.type = scrollEnd;
					dispatch.apply(_this, args);
				}, special.scrollend.delay);
 
			};
 
			$(this).bind(nsScrollEnd, handler);
 
		},
 
		teardown: function (){
			$(this).unbind(nsScrollEnd);
		}
	};
 
 
	$.isScrolled = false;
	$(window).bind(scrollStart+' '+scrollEnd, function (evt/**Event*/){
		$.isScrolled = (evt.type == scrollStart);
		$('body')[$.isScrolled ? 'addClass' : 'removeClass']('is-scrolled');
	});
})(jQuery);
