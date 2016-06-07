<?php
	$lang = $_GET['lang'];
	$titolare = $_GET['titolare'];
	$indirizzo = $_GET['indirizzo'];
	$sitoweb = $_GET['sitoweb'];
	$email = $_GET['email'];
	$text = file_get_contents("cookie-policy-{$lang}.html");
	$text = str_replace('TITOLARE',$titolare,$text);
	$text = str_replace('INDIRIZZO',$indirizzo,$text);
	$text = str_replace('SITOWEB',$sitoweb,$text);
	$text = str_replace('EMAIL',$email,$text);
	echo $text;
?>