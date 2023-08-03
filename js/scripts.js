/*
 * Facebbok Like
 *
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=216941085117385";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

/**/
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=384321775016791";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/*
 *   Google maps
*/
jQuery(document).ready(function() {
		var bodyClass = $("body").attr('class');
		if (bodyClass == "contact") {
			// blore 12.9833, 77.5833
    	var position = new google.maps.LatLng(28.567054, 77.318323);
	    $('.map').gmap({'center': position,'zoom': 16, 'disableDefaultUI':true, 'callback': function() {
	            var self = this;
	            self.addMarker({'position': this.get('map').getCenter() });	
	        }
	    }); 
  	}
});


/*
    Contact form
*/
jQuery(document).ready(function() {
    $('.contact-form form').submit(function() {

        $('.contact-form form .nameLabel').html('Name');
        $('.contact-form form .emailLabel').html('Email');
        $('.contact-form form .messageLabel').html('Message');

        var postdata = $('.contact-form form').serialize();
        $.ajax({
            type: 'POST',
            url: '/actions/sendmail.php',
            data: postdata,
            dataType: 'json',
            success: function(json) {
                if(json.nameMessage != '') {
                    $('.contact-form form .nameLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.nameMessage + '</span>');
                }
                if(json.emailMessage != '') {
                    $('.contact-form form .emailLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.emailMessage + '</span>');
                }
                if(json.messageMessage != '') {
                    $('.contact-form form .messageLabel').append(' - <span class="violet" style="font-size: 13px; font-style: italic"> ' + json.messageMessage + '</span>');
                }
                if(json.nameMessage == '' && json.emailMessage == '' && json.messageMessage == '') {
					var msg_html = '<p class="thnx_msg"><span class="violet">Thanks for contacting!</span> Get back to you very soon. <i><a href="javascript:;" class="send_agn">Send again.</a></i></p>';
					$('.contact-form .msg').html(msg_html);
                    $('.contact-form form').fadeOut('fast', function() {
                        $('.contact-form').append();
                    });
                }
            }
        });
        return false;
    });
	
	$(document).on('click', ".send_agn", function () {
		var msg_html = "Please drop me an email for any query. I would like to help you.";
		$('.contact-form .msg').html(msg_html);
		$('.contact-form form')[0].reset();
		$('.contact-form form').show();
	});
});

