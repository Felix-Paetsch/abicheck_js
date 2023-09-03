var btn2 = $('#feedback-btn');
$(window).scroll(function() {
  feedback();
});

$( window ).resize(function() {
  feedback();
});

feedback();

function feedback(){
	if ($(window).scrollTop() +  window.innerHeight > 850) {
	    btn2.addClass('show');
	  } else {
	    btn2.removeClass('show');
	  }
}

function feedbackClicked(){
	$('#feedback-overlay').removeClass('disnone');
}

function overlayClicked(){
	$('#feedback-overlay').addClass('disnone');
}