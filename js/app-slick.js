/*app-slick js version 2020-5-12 update*/ 

function initSlick (slick){

	var autoplay = slick.attr("data-autoplay");
	var speed = slick.attr("data-autoplay-speed");
	var dots = slick.attr("data-dots");
	var centerPadding = slick.attr("data-center-padding");
	var isCentered = slick.hasClass("bv-centered-carousel") == true ? true : false;

	autoplay = ( autoplay == "true" ) ? true : false;
	speed = ( speed != undefined && speed.length !== 0 ) ? parseInt(speed) : 5000 ;
	centerPadding = ( centerPadding != undefined && centerPadding.length !== 0 ) ? centerPadding : "60px";
	dots = ( dots == "true" )? true : false
	//console.log(dots,speed)

	var options = {
		dots:dots,
		arrows:true,
		autoplay:autoplay,
		autoplaySpeed:speed,
		draggable:false,
		pauseOnHover:false,
		centerMode:isCentered,
		centerPadding:"60px",
		responsive: [
	    	{
		      breakpoint: 576,
		      settings: {
		        centerPadding:"30px",
		        arrows:false
		      }
	  		}
	    ]
	}

	var hasVideo = slick.find('.video').length != 0 ? true : false;


	if(hasVideo){
		// When the slide is changing
		function playPauseVideo(slick, control){


		  	var currentSlide, startTime, player, video;

			currentSlide = slick.find(".slick-current.slide");

			isVideo = currentSlide.hasClass('video')? true : false

			//console.log("currentSlide:",currentSlide)

		  	if (isVideo) {
		  		slick.slick('slickPause')
			    video = currentSlide.children("video").get(0);
			    if (video != null) {
			      if (control === "play"){
			        video.play();
			      } else {
			        video.pause();
			      }
			    }
			}else{
				slick.slick('slickPlay')
			}

		}

		slick.on("init", function(slick){

			slick = $(slick.currentTarget);

			setTimeout(function(){

			  playPauseVideo(slick,"play");

			  //console.log('oninit')
			}, 1000);

		})

		slick.on("beforeChange", function(event, slick) {

			slick = $(slick.$slider);
			playPauseVideo(slick,"pause");

		});

		slick.on("afterChange", function(event, slick) {
			slick = $(slick.$slider);
			
			playPauseVideo(slick,"play");

		});
	}


	slick.slick(options)

}

document.onreadystatechange = function () {

  	if (document.readyState == "interactive") {

  		const slick = $('.slick');
  		initSlick(slick)

  	}

}
