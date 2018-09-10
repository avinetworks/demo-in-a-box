<?php
	$total_loop = 10;
	if (isset($_GET['duration'])){
		$total_loop = (int)$_GET['duration'];
	}
	function generateRandomString($length = 4096) {
    	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    	$randomString = '';

    	for ($i = 0; $i < $length; $i++) {
        	$randomString .= $characters[rand(0, strlen($characters) - 1)];
    	}
    	return $randomString;
	}
	$string = generateRandomString();
	$loop = 0;
	while ($loop < $total_loop)
	{
		echo $string;
		flush();
		$loop ++;
		sleep(1);
	}
?>
