
jQuery(document).ready(function() {
	
    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/bg.jpg");
    
    /*
        Wow
    */
    new WOW().init();
    
    /*
	    Countdown initializer
	*/


	var now = new Date();
	//var countTo = 178 * 24 * 60 * 60 * 1000 + now.valueOf(); 
	var pre =  new Date(Date.now()).getTime();
	var post = new Date('2021/10/01 00:00:00').getTime();
	var countTo = post-pre+ now.valueOf();
   
	$('.timer').countdown(countTo, function(event) {
		$(this).find('.days').text(event.offset.totalDays);
		$(this).find('.hours').text(event.offset.hours);
		$(this).find('.minutes').text(event.offset.minutes);
		$(this).find('.seconds').text(event.offset.seconds);
	});
	
	/*
	    Subscription form
	*/
	$('.success-message').hide();
	$('.error-message').hide();
	
	$('.subscribe form').submit(function(e) {
		e.preventDefault();
	    var postdata = $('.subscribe form').serialize();
	    $.ajax({
	        type: 'POST',
	        contentType: 'application/json',
	        url: 'https://kxee399lb7.execute-api.ap-southeast-1.amazonaws.com/stg/subscription',
	        data: '{\"email\":\"' + $('.subscribe-email').val().trim() + '\"}',
	        dataType: 'json',
	        success: function(json) {
	        	jsonBody = jQuery.parseJSON(json.body);
	            if(jsonBody.errorCode == 0) {
	                $('.success-message').hide();
	                $('.error-message').hide();
	                $('.error-message').html("Subscribe Successfully!");
	                $('.error-message').fadeIn();
	            }
	            else {
	                $('.error-message').hide();
	                $('.success-message').hide();
	                $('.subscribe form').hide();
	                $('.success-message').html(jsonBody.errorMessage);
	                $('.success-message').fadeIn();
	            }
	        }
	    });
	});
});

