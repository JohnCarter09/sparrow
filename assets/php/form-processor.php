<?php

	$error = '';

	if ( array_key_exists('to', $_POST) ){

		$to 		= $_POST['to'];
		unset($_POST['to']);

		$from		= "user@domain.com";
		$name		= "Website User";
		$subject	= "New Email from My Website";
		$reCaptchaSecret = "6Lck1FAUAAAAAIjPn9EAhTE1Z7IiWa0GZpL7hrr4";


		if(isset($_POST['from'])){
			$from 	= $_POST['from'];
			unset($_POST['from']);
		}

		if(isset($_POST['name'])){
			$name 	= $_POST['name'];
			unset($_POST['name']);
		}

		if(isset($_POST['subject'])){
			$subject 	= $_POST['subject'];
			unset($_POST['subject']);
		}

		if(array_key_exists("g-recaptcha-response", $_POST)) {
			if(isset($_POST["g-recaptcha-response"]) && $_POST["g-recaptcha-response"] != '') {
				$recaptcha = $_POST["g-recaptcha-response"];
				// echo $recaptcha;
			} else {
				echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					Please, verify you are a human.
				</div>';
				return;
			}

			$postdata = http_build_query([
				"secret" => $reCaptchaSecret,
				"response" => $recaptcha
			]);
			$opts = ['http' =>
			   [
			       'method'  => 'POST',
			       'header'  => 'Content-type: application/x-www-form-urlencoded',
			       'content' => $postdata
			   ]
			];
			$context  = stream_context_create($opts);
			$result = file_get_contents('https://www.google.com/recaptcha/api/siteverify', false, $context);
			$check = json_decode($result);

			if(!$check->success) {
				header("HTTP/1.1 422 failed");
				echo '<div class="alert alert-danger alert-dismissible fade show" role="alert">
					<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					reCaptcha validation failed!
				</div>';
				return;
			}
		}




		$message = "";
		foreach ($_POST as $field => $data){

	   		$message = "<html><head><title>$subject</title></head><body>\n";
	   		foreach($_POST as $field => $data){
	   			$message .= "<div style='border-bottom:1px solid #dadada; padding-bottom:15px;margin-bottom:15px;'><strong>".ucwords($field)."</strong><br/>".stripslashes($data)."</div>\n";
	   		}
	   		$message .= "</body></html>";

		}


		// To send HTML mail, the Content-type header must be set
		define('HEADER_TRAIL', "\r\n");
	   	$headers  = 'MIME-Version: 1.0' . HEADER_TRAIL;
	   	$headers .= ( ! EMAIL_HTML) ? 'Content-type: text;' . HEADER_TRAIL : 'Content-type: text/html; charset=iso-8859-1' . HEADER_TRAIL ;

	   	// Additional headers
	   	$headers .= "From: ".$name." <".$from.">" . HEADER_TRAIL;


	   	if(!mail($to, $subject, $message, $headers)){
	   		$error =
	   		'<div class="alert alert-danger alert-dismissible fade show" role="alert">
				<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
				Error sending message. Please try again.
			</div>';
	   	}



	} else {
		$error =
		'<div class="alert alert-danger alert-dismissible fade show" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			There is no <strong> "to" </strong> field found in the form. Please follow the documentation.
		</div>';
	}


	if(!empty($error) ){
		header("HTTP/1.1 422 failed");
		echo $error;
	}
	else{
		header("HTTP/1.1 200 OK");
		echo
		'<div class="alert alert-success alert-dismissible fade show" role="alert">
			<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			Your message has been sent successfully.
		</div>';
	}


?>
