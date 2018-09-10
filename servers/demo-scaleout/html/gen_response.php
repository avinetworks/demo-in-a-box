<?php
	$chunkcount = 10;
	if (isset($_GET['chunkcount'])){
    	$chunkcount = (int)$_GET['chunkcount'];
	}
    $chunksize = 4096;
	if (isset($_GET['chunksize'])){
		$chunksize = (int)$_GET['chunksize'];
	}
    $sleeptime = 10;
	if (isset($_GET['sleeptime'])){
		$sleeptime = (int)$_GET['sleeptime'];
	}
    $type = 'str';
	if (isset($_GET['type'])){
		$type = $_GET['type'];
	}
    $hide = '';
	if (isset($_GET['hide'])){
		$hide = $_GET['hide'];
	}

    function generateBinaryData($length = 4096) {
        $string = '';
        foreach (range( 0x00, 0x1F ) as $i) {
            $string .= chr($i);
        }
        return $string;    
    }
	function generateRandomData($length = 4096) {
    	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    	$randomString = '';
    	for ($i = 0; $i < $length; $i++) {
        	$randomString .= $characters[rand(0, strlen($characters) - 1)];
    	}
    	return $randomString;
	}
	function generateRandomSparseData($length = 4096) {
    	$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    	$randomString = '';
        $indx = rand(0, 5*strlen($characters) - 1);
    	for ($i = 0; $i < $length; $i++) {
            if ($indx < strlen($characters)) {
                $randomString .= $characters[$indx];
            }
            else {
                $randomString .= ' ';
            }
    	}
    	return $randomString;
	}

    $string = '';
    if ($type == 'sparse') {
        $string = generateRandomSparseData($chunksize);
    }
    elseif ($type == 'bin') {
    	$string = generateBinaryData($chunksize);
    }
    else {
        $string = generateRandomData($chunksize);
    }

    if ($type == 'html') {
       if (strpos($hide, 'H') === false) {
           echo '<html>';                
       }
       if (strpos($hide, 'D') === false) {
           echo '<head>';
       }
       echo $string;
       if (strpos($hide, 'd') === false) {
           echo '</head>';     
       }
       if (strpos($hide, 'B') === false) {
           echo '<body>';
       }
       echo flush();     
    }
	$loop = 0;
	while ($loop < $chunkcount)
	{
		echo $string;
		flush();
		$loop ++;
		sleep($sleeptime/1000);
	}

    if ($type == 'html') {
       if (strpos($hide, 'b') === false) {
          echo '</body>';  
       } 
       if (strpos($hide, 'h') === false) {
          echo '</html>';
       }
       echo flush();
    }
?>
