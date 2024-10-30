<?php
/*
Plugin Name: Confirm JS for Contact Form 7
Plugin URI: 
Description: A Javascript plugin that provides a confirmation screen for the Contact Form 7 plugin. Display a confirmation screen on Contact Form 7 with reCAPTCHA (v3) enabled.
Author: milkyfield
Version: 0.9
Author URI: https://milkyfieldcompany.com/
License: GPL2

Copyright 2021 milkyfield (https://milkyfieldcompany.com/)

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License, version 2, as
published by the Free Software Foundation.

*/
class cjsfcf7 {

	function __construct() {

		load_plugin_textdomain("confirm-js-for-contact-form-7", false, basename(dirname(__FILE__)).'/languages');

		if (is_admin()) {
			// none.
		} else {
			add_action('wp_footer', array( $this, 'fnAddScript' ));
		}
	}

	function fnAddScript() {
?>
		<script type="text/javascript">
			var CJSFCF7 = {
				CLASS_WPCF7_FORM			: 'wpcf7',
				CLASS_WPCF7_ALERT_MESSAGE	: 'wpcf7-not-valid-tip',
				BUTTON_TEXT_CONFIRM			: '<?php _e('Confirm','confirm-js-for-contact-form-7'); ?>',
				BUTTON_TEXT_TO_CORRECT		: '<?php _e('To correct','confirm-js-for-contact-form-7'); ?>',
				ERRMSG_EMPTY				: '<?php _e('Please enter the required items.','confirm-js-for-contact-form-7'); ?>',
				ERRMSG_INVALIDE_EMAIL_ADDR	: '<?php _e('The email address format doesn`t seem to be correct.','confirm-js-for-contact-form-7'); ?>',
				ERRMSG_EMAIL_ADDR_UNMATCH	: '<?php _e('The confirmation email addresses do not match.','confirm-js-for-contact-form-7'); ?>',
				ERRMSG_INVALIDE_URL			: '<?php _e('There is a mistake in the URL.','confirm-js-for-contact-form-7'); ?>',
				ERRMSG_INVALIDE_TEL			: '<?php _e('The phone number is incorrect.','confirm-js-for-contact-form-7'); ?>',
			};
		</script>
<?php
		wp_enqueue_script( 'custom-script', plugins_url("cjsfcf7.js", __FILE__), array( 'jquery' ) );
	}
}
new cjsfcf7();
?>