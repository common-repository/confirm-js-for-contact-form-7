/*
 * Plugin Name: Confirm JS for Contact Form 7
 * Author: milkyfield
 * Author URI: https://milkyfieldcompany.com/
 * License: GPL2
*/
/*
 * WordPress Plugin 'Contact From 7' support confirm phase v0.12
 * http://elearn.jp/wpman/
 *
 * Copyright 2011-2012, Takenori Matsuura
 * Licensed under GPL Version 2 licenses.
 *
 * Date: Thu Dec 16 10:46:00 2012 +0900
 */
jQuery(function(){
	var cjsfcf7_fnReadonly = function(bReadonly) {
		var readonly = "";
		var disabled = "";
		if (bReadonly) {
			readonly = "readonly";
			disabled = "true";
		}
		jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input, .'+CJSFCF7.CLASS_WPCF7_FORM+' textarea').each(function(){
			var jqElm = jQuery(this);
			switch (jqElm.prop('type')) {
				case 'radio':
				case 'checkbox':
					jqElm.prop("disabled", disabled);
					if (jqElm.prop("checked") == false) {
						if (bReadonly) {
							jqElm.closest("span.wpcf7-list-item").hide();
						} else {
							jqElm.closest("span.wpcf7-list-item").show();
						}
					}
					break;
				default:
					jqElm.prop("readonly", readonly);
					break;
			}
			if (bReadonly) {
				jqElm.addClass("confirmview");
			} else {
				jqElm.removeClass("confirmview");
			}
		});
		if (bReadonly) {
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' select').addClass("confirmview").prop( 'disabled', 'disabled' );
		} else {
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' select').removeClass("confirmview").prop( 'disabled', '' );
		}
	}
	var cjsfcf7_fnConfirmCheck = function() {
		jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM).fadeOut("fast", function(){
			jQuery('span.'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE).remove();
			var bValid = true;
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-validates-as-required, textarea.wpcf7-validates-as-required').each( function () {
				if ( jQuery.trim( jQuery(this).val() ) == '' ) {
					tagBR = jQuery(this).get(0).tagName.match( /textarea/i )? '<br />': '';
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+tagBR+CJSFCF7.ERRMSG_EMPTY+'</span>' );
					bValid = false;
				}
			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' select.wpcf7-validates-as-required').each( function () {
				if ( jQuery(this).children('option:selected').val() == SELECT_EMPTY_VALUE ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_EMPTY+'</span>' );
					bValid = false;
				}
			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' span.wpcf7-validates-as-required').each( function () { // for checkbox ( and radio? )
				if ( jQuery(this).find('input:checked').length == 0 ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_EMPTY+'</span>' );
					bValid = false;
				}
			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' .wpcf7-validates-as-email ').each( function () {
				if ( jQuery.trim( jQuery(this).val() ) != '' && !jQuery(this).val().match( /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/ ) ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_INVALIDE_EMAIL_ADDR+'</span>' );
					bValid = false;
				}
				var elmname = this.name;
				if (elmname.match(/.*-confirm$/)) {
					var elm = '.'+CJSFCF7.CLASS_WPCF7_FORM+' .wpcf7-validates-as-email[name="'+elmname.replace('-confirm', "")+'"]';
					if (jQuery(this).val() !== jQuery(elm).val()) {
						jQuery(elm).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_EMAIL_ADDR_UNMATCH+'</span>' );
						jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_EMAIL_ADDR_UNMATCH+'</span>' );
						bValid = false;
					}
				}
			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-validates-as-tel').each( function () { // telnumber
				if ( jQuery.trim( jQuery(this).val() ) != '' && !jQuery(this).val().match( /^[+]?(?:\([0-9]+\)|[0-9]+)(?:[/ -]*(?:\([0-9]+\)|[0-9]+))*$/ ) ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_INVALIDE_TEL +'</span>' );
					bValid = false;
				}
			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-validates-as-number').each( function () { // number
				if ( jQuery.trim( jQuery(this).val() ) != '' && !jQuery(this).val().match( /^[-]?(?:\([0-9]+\)|[0-9]+)/ ) ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_INVALIDE_URL +'</span>' );
					bValid = false;
				}
			} );
// 			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-validates-as-date').each( function () { // date
// 				if ( jQuery.trim( jQuery(this).val() ) != '' && !jQuery(this).val().match( /(\d+)-(\d+)-(\d+)/ ) ) {
// 					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_INVALIDE_DATE +'</span>' );
// 					bValid = false;
// 				}
// 			} );
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-validates-as-url').each( function () { // url
				if ( jQuery.trim( jQuery(this).val() ) != '' && !jQuery(this).val().match( /https?:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+/g ) ) {
					jQuery(this).after( '<span class="'+CJSFCF7.CLASS_WPCF7_ALERT_MESSAGE+'">'+CJSFCF7.ERRMSG_INVALIDE_URL +'</span>' );
					bValid = false;
				}
			} );

			if ( bValid ) {
				jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input#wpc7buttonconfirm').css("display","none");
				jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"], input#wpc7buttonedit').css("display","inline-block");
				jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' .wpcf7-not-valid-tip, .wpcf7-response-output').hide();
				cjsfcf7_fnReadonly(true);
			}
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+'').fadeIn("slow");
			setTimeout(function(){
				var target = jQuery('.wpcf7');
				var position = target.offset().top;
				jQuery("html, body").animate({scrollTop:position});
			}, 10);
		});
	}
	var cjsfcf7_fnConfirmEdit = function() {
		jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+'').fadeOut("fast", function(){
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input#wpc7buttonconfirm').css("display","inline-block");
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"], input#wpc7buttonedit').css("display","none");
			cjsfcf7_fnReadonly(false);
			jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+'').fadeIn("slow"); 
			setTimeout(function(){
				var target = jQuery('.wpcf7');
				var position = target.offset().top;
				jQuery("html, body").animate({scrollTop:position});
			}, 10);
		});
	
	}
	var cjsfcf7_fnConfirmSubmit = function() {
		cjsfcf7_fnReadonly(false);
		jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input#wpc7buttonconfirm').css("display","inline-block");
		jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"], input#wpc7buttonedit').css("display","none");
	}
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"]').before("<input id='wpc7buttonconfirm' type='button' value='"+CJSFCF7.BUTTON_TEXT_CONFIRM+"'>");
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' #wpc7buttonconfirm').on('click', cjsfcf7_fnConfirmCheck);
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"]').before("<input id='wpc7buttonedit' type='button' style='margin-right:1em;' value='"+CJSFCF7.BUTTON_TEXT_TO_CORRECT+"'>");
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' #wpc7buttonedit').on('click', cjsfcf7_fnConfirmEdit);
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"], input#wpc7buttonedit').css("display","none");
	jQuery('.'+CJSFCF7.CLASS_WPCF7_FORM+' input.wpcf7-form-control[type="submit"]').on('click', cjsfcf7_fnConfirmSubmit);
});
