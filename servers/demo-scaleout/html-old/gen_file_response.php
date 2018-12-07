<?php
$chunksize = 128;
if (isset($_GET['chunksize'])){
    $chunksize = (int)$_GET['chunksize'];
}
$sleeptime = 10;
if (isset($_GET['sleeptime'])){
    $sleeptime = (int)$_GET['sleeptime'];
}
$filename = "/usr/share/nginx/www/script.py";
if (isset($_GET['filename'])) {
    $filename = $_GET['filename'];
}

$file_contents = file_get_contents($filename);
$file_len = strlen($file_contents);
$chunkcount = $file_len / $chunksize;
$last_chunk_sz = $file_len % $chunksize;
$chunk_i = 0;
	while ($chunk_i < $chunkcount)
	{
        $to_send = substr($file_contents, $chunk_i * $chunksize, $chunksize);
		echo $to_send;
		flush();
		$chunk_i++;
		sleep($sleeptime/1000);
	}
    
$to_send = substr($file_contents, $chunk_i * $chunksize, $last_chunk_sz);
echo $to_send;
flush();
?>
