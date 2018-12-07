	/* bcom_etaf_scripts 
		E-Mail to A Fiend.  
		Original mess started by rbrennan. 
		11/10/10 rb - trying to clean things up a little.  :/ 
		02/22/11 JN - band-aiding until Methode saves us all (riiigghhttt)
		03/07/11 FD - Checking out this bandaid. I realized that the interpretation of 
		what the window is varies between browsers. When testing be sure to check on different browser window sizes.
		I recomend just having the etaf box appear at cursor position.
	*/ 
	
	
	//This is a band-aid - don't hate me for it (side note: a Firefox specific bug, wtf?!)
	/********************************************/
	function wtfFF() {
	var agt=navigator.userAgent.toLowerCase();
	if (agt.indexOf("firefox") != -1) return 1;
	else return 0;}
	/*******************************************/
	
	function showETOF(pageX, pageY) {
		theETOF = $('#bdc_emailWidget');
		etofHeight = theETOF.height();
		etofWidth = theETOF.width();
		etofXLocation = etofWidth + 100;
		etofYLocation = etofHeight;
		etofYLocation = etofHeight + 10;
		if(etofXLocation < 0) {etofXLocation = 1};
		$(theETOF).css({left: etofXLocation + 'px' , top: etofYLocation + 'px'  }); 
		$("#pointer_top").show(); 
		$("#pointer_bottom").hide(); 
		$("#message").val('');
		$("#theEMTOFForm").show();
		$("#bdc_EMTOF_sent").hide();
		$(theETOF).show() ; 
	}

	function validateEMTOF() { 
    var emailRegexStr = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    var semail = document.getElementById("sender_email");
    var remail = document.getElementById("recipient_email");
    var validatedOK = true;
    var date = new Date();
    var curDate = null;
    var remailList = remail.value.split(/ *, */); 
    for(var i = 0; i < remailList.length; ++i) {
	if ( emailRegexStr.test(remailList[i]) == false ){
	    remail.className = 'error'; validatedOK = false;
	    break;
	} else { 
	    remail.className = 'noerr';
	} 
} 
    
    if ( emailRegexStr.test(semail.value) == false ){
	semail.className = 'error'; validatedOK = false;
    } else { 
	semail.className = 'noerr';
    } 
    
    return validatedOK;
}


	/// Init JQuery event listener, form submit etc 
	$(function() {
		
		// reset email input field onclick, but only the first time. 
		$("#recipient_email").focus(function(e) {
			recEmail = document.getElementById("recipient_email") ;
			if (recEmail.defaultValue == recEmail.value ) {  
					recEmail.value = '' ;  
			} 
				} ) 
				$("#recipient_email").blur() ; 

		//default
		$(".etaf").click(function(e){
			thisPageX = e.pageX ; 
			thisPageY = e.pageY ; 
			showETOF(e.pageX, e.pageY);
		})
				
		// submit form 
		$("#bdc_emailWidget .form-button").click(function() {
			valid = validateEMTOF() ; 
			if(valid ) { 
				var dataString = 'sender_name='+ $("#sender_name").val() + '&sender_email=' + $("#sender_email").val() + '&recipient_email=' + $("#recipient_email").val() + '&message=' + $("#message").val() + '&story_url=' + encodeURIComponent($("#story_url").val())   ;
				$.ajax({
					type: "POST",
					url: "/emtaf/",
					data: dataString,
					success: function(){
						$('#theEMTOFForm').hide();
						$('#bdc_EMTOF_sending').show();
						$('#bdc_EMTOF_sending').fadeOut(3000, function(){ 
							$('#bdc_emailWidget').fadeOut(3000);
							$('#bdc_EMTOF_sent').show();
						});
					} 
				}); 
			 } 
			return false;
		});
	});











