<?php
define( 'LAST_MODIFIED_STRING', 'Sat, 09 Sep 2000 22:00:00 GMT' );

$arg_et = 10;
$et = 'PT10S';
if( isset( $_GET['et'] ) and $_GET['et'] !== '' )
{
    $arg_et = $_GET['et'];
    $et = 'PT' . $arg_et . 'S';
}

$lmts = LAST_MODIFIED_STRING;
if( isset( $_GET['mt'] ) and $_GET['mt'] !== '' )
{
    $arg_mt = $_GET['mt'];
    $mt = 'PT' . $arg_mt . 'S';
    $lmt_date = new DateTime(LAST_MODIFIED_STRING);
	$lmt_date->add(new DateInterval($mt));
	$lmts = toUTCDate($lmt_date);
}

date_default_timezone_set("UTC");
// expires_date : 10s after page generation
$expires_date = new DateTime();
$expires_date->add(new DateInterval($et));

$headers = array(
    'Date' => date( 'D, d M Y H:i:s', time() ),
);

$auth = 0;
if( isset( $_SERVER['HTTP_AUTHORIZATION'] ) and $_SERVER['HTTP_AUTHORIZATION'] !== '')
{
    $auth = 1;
    $headers['X-Auth'] = md5($_SERVER['HTTP_AUTHORIZATION']);
}

if( isset( $_GET['h'] ) and $_GET['h'] !== '' )
{
    switch( $_GET['h'] )
    {
        case "private" :
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Cache-Control'] = "s-maxage=60, private, max-age=60";
        break;

        case "nostore" :
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Cache-Control'] = "s-maxage=60, no-store, max-age=60";
        break;

        case "nocache" :
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Cache-Control'] = "s-maxage=60, no-cache, max-age=60";
        break;

        case "expires" :
            $headers['Expires'] = toUTCDate($expires_date);
        break;

        case "cache-control":
            $headers['Cache-Control'] = "public, proxy-revalidate, max-age=" . $arg_et/2 . ", s-maxage=" . $arg_et;
        break;

        case "cache-control-override":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Cache-Control'] = "public, proxy-revalidate, max-age=" . $arg_et/4 . ", s-maxage=" . $arg_et/2;
        break;

        case "lmt":
            $headers['Last-Modified'] = $lmts;
            $headers['Etag'] = md5( $lmts );

            if( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) and
                $_SERVER['HTTP_IF_MODIFIED_SINCE'] == $lmts ) {
                header( "HTTP/1.1 304 Not Modified" );
                exit(  );
            }
        break;

        case "vary":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = 'User-Agent';
        break;

        case "varycookie":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = 'Cookie';
        break;

        case "varystar":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = '*';
        break;

        case "cookie":
            $utcdate = toUTCDate($expires_date);
            $headers['Expires'] = $utcdate;
            $headers['Set-Cookie'] = 'md5expires=' . md5($utcdate);
        break;

        case "nonexp":
        break;

        case "nodate":
            unset($headers['Date']);
            $headers['Expires'] = toUTCDate($expires_date);
        break;

        case "agexp":
            $headers['Age'] = $arg_et;
            $headers['Expires'] = toUTCDate($expires_date);
        break;

        case "multivary":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = 'User-Agent,Host,Accept-Encoding';
        break;

        case "missingvary":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = 'User-AgentX,Host,Accept-Encoding';
        break;

        case "mlinevary":
            $headers['Expires'] = toUTCDate($expires_date);
            $headers['Vary'] = 'User-Agent,Host';
            header("vary: accept-language, accept-encoding");
            flush();
        break;

        case "hwarn":
            $headers['Last-Modified'] = $lmts;
            $headers['Cache-Control'] = "public";
	        $headers['Age'] = '86398';
        break;

        case "imodz":
            $lmts = $headers['Date'];
            $lmts = toUTCDate(new DateTime($lmts));
        // fallthrough

        case "imod":
            $headers['Last-Modified'] = $lmts;
            $headers['Etag'] = md5( $lmts );
            $headers['Cache-Control'] = "public";
            $headers['Expires'] = toUTCDate($expires_date);
        break;
    }
} elseif( isset($_POST['k']) and $_POST['k'] !== '' and
    isset($_POST['v']) and $_POST['v'] !== '') {
        $k=$_POST['k'];
        $v=$_POST['v'];
        $setc = "$k: $v";

        header("$setc", false);
} else {
	$headers['Last-Modified'] = $lmts;
	if ($auth==0) {
	    $headers['Age'] = '86398';
    }
    if( isset( $_SERVER['HTTP_CACHE_CONTROL'] ) ) {
        $headers['Cache-Control'] = $_SERVER['HTTP_CACHE_CONTROL'];
    }
}

sendHeaders( $headers );

function sendHeaders( array $headerList )
{
    foreach( $headerList as $name => $value )
    {
        header( "${name}: ${value}", false );
    }
}

function toUTCDate( DateTime $date )
{
    $date->setTimezone( new DateTimeZone( 'UTC' ) );
    return $date->format( 'D, d M Y H:i:s \G\M\T' );
}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head></head>
    <body>
        <h1>Headers received</h1>
        <?php
            print "<pre>";
            print_r($_SERVER);
            print "</pre>";
        ?>
        <hr/>
        <h1>Headers sent</h1>
        <?php
            print "<pre>";
            foreach( $headers as $name => $value ) {
                print "<strong>${name}</strong>: ${value}<br/>";
            }

            if( isset( $_SERVER['HTTP_IF_MODIFIED_SINCE'] ) ) {
                print "<strong>If-Modified-Since</strong> has been sent in the";
                print "request, value : " . $_SERVER['HTTP_IF_MODIFIED_SINCE'];
            }
            print "</pre>";
        ?>
        <hr/>
        <h1>Links for testing</h1>
        <ul>
            <li><a href="<?=$_SERVER['PHP_SELF']?>?h=expires">Test Expires response header</a></li>
            <li><a href="<?=$_SERVER['PHP_SELF']?>?h=cache-control">Test Cache-Control response header</a></li>
            <li><a href="<?=$_SERVER['PHP_SELF']?>?h=cache-control-override">Test Cache-Control response header overrides Expires</a></li>
            <li><a href="<?=$_SERVER['PHP_SELF']?>?h=last-modified">Test Last-Modified/If-modified-since response header</a></li>
            <li><a href="<?=$_SERVER['PHP_SELF']?>?h=vary">Test Vary response header</a></li>
        <ul>
    </body>
</html>

