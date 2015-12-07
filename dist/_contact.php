<?php
		if ($_POST)
	{
		$name = $_POST['name'];
		$eMail = $_POST['email'];
		$phone = $_POST['phone'];
		$message = $_POST['message'];
		$title = "Eightfold received an inquiry from ".$name;
		
		$message = "$message\r\nEmail: $eMail\r\nPhone: $phone";
		if(mail('hello@eightfold-creative.com',$title,$message,"FROM: $name <$eMail>")){
			echo 1;
		}else{
			echo 0;
		}
	}else{
		echo 0;
	};
?>