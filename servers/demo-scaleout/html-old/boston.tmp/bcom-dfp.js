(function( bcom ){

    var bcom = bcom || {};
    bcom.dfp = bcom.dfp || {};

    // Setup Ad Catalog
    bcom.dfp.adCatalog = [
        {
            name: 'ad_lead1',
            size: [[728, 90]],
            position: 'atf'
        },
        {
            name: 'ad_bigbox1',
            size: [[300, 250], [300, 600], [300, 1050]],
            position: 'atf'
        },
        {
            name: 'ad_bigbox2',
            size: [[300, 250], [300, 600], [300, 1050]],
            position: 'btf'
        },
        {
            name: 'ad_bigbox3',
            size: [[300, 250]],
            position: ['btf', 'bigbox3']
        },        
        {
            name: 'ad_bigbox4',
            size: [[300, 250]],
            position: ['btf', 'bigbox4']
        },
        {
            name: 'ad_billboard',
            size: [[959, 30], [959, 300]],
            position: 'atf'
        },
        {
            name: 'ad_sky',
            size: [[160, 600]],
            position: 'atf'
        },
        {
            name: 'ad_featurebox',
            size: [[180, 150], [185, 85]],
            position: 'atf'
        },
        {
            name: 'ad_lead2',
            size: [[728, 90]],
            position: 'btf'
        },
        {
            name: 'ad_sponsor',
            size: [[88, 31], [100, 40]],
            position: 'sponsor'
        },
        {
            name: 'ad_adsense',
            size: [[609, 222]],
            position: 'btf'
        },
        {
            name: 'ad_headline1',
            size: [[234, 60]],
            position: 'atf'
        },
        {
            name: 'ad_headline2',
            size: [[234, 60]],
            position: 'btf'
        },
        {
            name: 'ad_header',
            size: [[539, 30]],
            position: 'atf'
        },
        {
            name: 'ad_native',
            size: [[5, 5]],
            position: 'native'
        },
        {
            name: 'ad_highlight',
            size: [[110, 70]],
            position: 'atf'
        },
        {
            name: 'ad_wallpaper',
            size: [[1, 1]],
            position: ['wallpaper', 'atf']
        },
        {
            name: 'ad_text1',
            size: [[2, 2]],
            position: 'text1'
        },
        {
            name: 'ad_text2',
            size: [[2, 2]],
            position: 'text2'
        },
        {
            name: 'ad_text3',
            size: [[2, 2]],
            position: 'text3'
        },
        {
            name: 'ad_topleft',
            size: [[274, 105]],
            position: 'topleft'
        },
        {
            name: 'ad_topright',
            size: [[275, 105]],
            position: 'topright'
        },
        {
            name: 'ad_topbox',
            size: [[300, 142]],
            position: 'topbox'
        },
        {
            name: 'ad_botbox',
            size: [[300, 142]],
            position: 'botbox'
        },
        {
            name: 'ad_midleftbox',
            size: [[300, 142]],
            position: 'midleftbox'
        },
        {
            name: 'ad_midrightbox',
            size: [[300, 42]],
            position: 'midrightbox'
        },
        {
            name: 'ad_topleftmini',
            size: [[148, 87]],
            position: 'topleftmini'
        },
        {
            name: 'ad_toprightmini',
            size: [[148, 87]],
            position: 'toprightmini'
        },
        {
            name: 'ad_botleftmini',
            size: [[148, 87]],
            position: 'botleftmini'
        },
        {
            name: 'ad_botrightmini',
            size: [[148, 87]],
            position: 'botrightmini'
        },
        {
            name: 'ad_tile',
            size: [[175, 342]],
            position: 'tile'
        },
        {
            name: 'ad_showcase',
            size: [400, 375],
            position: 'showcase'
        },
        {
            name: 'ad_featurepartner1',
            size: [189, 120],
            position: 'featurepartner1'
        },
        {
            name: 'ad_featurepartner2',
            size: [[189, 120]],
            position: 'featurepartner2'
        },
        {
            name: 'ad_featurepartner3',
            size: [[189, 120]],
            position: 'featurepartner3'
        },
        {
            name: 'ad_featurebox1',
            size: [[306, 205]],
            position: 'featurebox1'
        },
        {
            name: 'ad_featurebox2',
            size: [[306, 205]],
            position: 'featurebox2'
        },
        {
            name: 'ad_featurebox3',
            size: [[306, 205]],
            position: 'featurebox3'
        },
        {
            name: 'ad_featurebox4',
            size: [[306, 205]],
            position: 'featurebox4'
        },
        {
            name: 'ad_featurebox5',
            size: [[306, 205]],
            position: 'featurebox5'
        },
        {
            name: 'ad_featurebox6',
            size: [[306, 205]],
            position: 'featurebox6'
        },
        {
            name: 'ad_spotlight1',
            size: [[460, 150]],
            position: 'spotlight1'
        },
        {
            name: 'ad_spotlight2',
            size: [[460, 150]],
            position: 'spotlight2'
        },
        {
            name: 'ad_spotlight3',
            size: [[460, 150]],
            position: 'spotlight3'
        },
        {
            name: 'ad_spotlight4',
            size: [[460, 150]],
            position: 'spotlight4'
        }
    ];

    bcom.dfp.outOfPageAds = [
        {
            name: 'ad_outofpage',
            position: ['outofpage', 'atf']
        }
    ];

    // Ad Setup
    var networkCode = bcom.dfp.networkCode;
    var numberOfAds = bcom.dfp.adCatalog.length;
    var numberOfOOPAds = bcom.dfp.outOfPageAds.length;
    var adUnit = bcom.dfp.adUnit;
    var adSlots = bcom.dfp.adSlots;

    // Strip www. from adUnit / This feels wrong
    var www = adUnit.indexOf('www.');
    if ( www === 0 ) { adUnit = adUnit.replace('www.', ''); }

    // Loop through ad catalog
    for ( var i = 0; i < numberOfAds; i++ ) {
        var thisAd = bcom.dfp.adCatalog[i];
        if ( $.inArray(thisAd.name, adSlots) >= 0 ) {
            googletag.cmd.push(function() {
                // ad_bigbox1 & ad_lead1 might be companion ads, act accordingly ***
                if ( thisAd.name === 'ad_lead1' || thisAd.name === 'ad_bigbox1' ) {
                    googletag.defineSlot('/' + networkCode + '/' + adUnit, thisAd.size, thisAd.name)
                        .addService(googletag.companionAds())
                        .addService(googletag.pubads())
                        .setTargeting("pos", thisAd.position);
                } else {
                    googletag.defineSlot('/' + networkCode + '/' + adUnit, thisAd.size, thisAd.name)
                        .addService(googletag.pubads())
                        .setTargeting("pos", thisAd.position);
                }
            });
        }
    }

    // Loop through out of page ads
    for ( var i = 0; i < numberOfOOPAds; i++ ) {
        var thisAd = bcom.dfp.outOfPageAds[i];
        if ( $.inArray(thisAd.name, adSlots) >= 0 ) {
            googletag.cmd.push(function() {
                googletag.defineOutOfPageSlot('/' + networkCode + '/' + adUnit, thisAd.name)
                    .addService(googletag.pubads())
                    .setTargeting("pos", thisAd.position);
            });
        }
    }

    // Check pathAuth cookie for login status
    var pathAuth = getCookie('pathAuth');
    if ( pathAuth ) {
        bcom.dfp.keyValuePairs.logstat = 'y';
    } else {
        bcom.dfp.keyValuePairs.logstat = 'n';
    }

    // Check the RDB cookie to add some more key/value pairs
    checkCookie();

    // Grab the weather info
    $.ajax({
        type: 'GET',
        url: 'http://weather.boston.com/api/current/bos?callback=?',
        async: false,
        dataType: "json",
    }).done(function( data ) {
        bcom.dfp.keyValuePairs.weather = data.weather;
        bcom.dfp.keyValuePairs.temp = data.tempf;
    }).fail(function( jqXHR, textStatus, errorThrown ) {
        bcom.dfp.keyValuePairs.weather = '';
        bcom.dfp.keyValuePairs.temp = '';
    });

    // Store value of test query string
    bcom.dfp.keyValuePairs.test = getQueryStringValue('test');

    // Check search query string
    var isSearchQuery = getQueryStringValue('q');
    bcom.dfp.keyValuePairs.search = isSearchQuery ? isSearchQuery : '';

    // Loop through key/value pairs to set targeting
    var kvPairs = bcom.dfp.keyValuePairs;
    for ( var key in kvPairs ) {
        googletag.cmd.push(function() {
            googletag.pubads().setTargeting( key, kvPairs[key] );
        });
    }

    // Set Location
    if ( bcom.dfp.keyValuePairs.zip ) {
        googletag.cmd.push(function() {
            googletag.pubads().setLocation( bcom.dfp.keyValuePairs.zip + ',US' );
        });
    }

    // Finish setup
    googletag.cmd.push(function() {
        googletag.pubads().enableSingleRequest();
        googletag.companionAds().setRefreshUnfilledSlots(true);
        googletag.pubads().enableSyncRendering();
        googletag.enableServices();
    });

    /*
         Read RDB cookie and add appropriate values to globe.OAS.keyValuePairs
         Dummy cookie is set on doc ready for testing purposes
         Maybe clean this code up at some point?
    */
    // Functions that either get or set a cookie
    // Checks for the presence of the RDB cookie
    function checkCookie() {
         var rdb = getCookie('RDB');
         if (rdb != null && rdb != '') {
                //if the cookie exists hit up the cookieParser to get our data
                cookieParser(rdb);
         } else {
                return false;
         }
    }
    function getCookie(c_name) {
         var i, x, y, ARRcookies = document.cookie.split(";");
         for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                     return unescape(y);
                }
         }
    }
    // A more complex hex to ascii translation - useful in a number of places especially when you need letters back
    function translator(hex) {
         var arr = hex.match(/../g);
         var response = '';
         for (i = 0; i < arr.length; i++) {
                var m = parseInt(arr[i], 16);
                var t = String.fromCharCode(m);
                response = response + t;
         }
         return response;
    }
    // Generic Decimal to Hex Conversion
    function d2h(d) {
         return d.toString(16);
    }
    // Generic Hex to Decimal Conversion
    function h2d(h) {
         return parseInt(h, 16);
    }
    // Specific functions for messing with the cookie input to readable output
    // Specific function to check the zip code. If the zip has less than 4 characters than we need add a '0' as the cause for this issue is that the leading '0' is dropped.
    function zip5checker(hex) {
         var z = parseInt(hex, 16).toString();
         if (z.length > 4) {
                return z;
         } else {
                return '0' + z;
         }
    }
    // Like your pet turtle - this flips the hex over and checks for gender
    function genderChecker(hex) {
         var response = '';
         switch (hex) {
         case '01':
                response = 'm';
                break;
         case '02':
                response = 'f;';
                break;
         default:
                response = '';
                break;
         }
         return response;
    }
    function age(low, high) {
         var age, date, curYear, l, h, range;
         date = new Date();
         curYear = date.getFullYear();
         l = (curYear - h2d(low) + 1);
         h = (curYear - h2d(high) - 1);
         if (l == h) {
                return range = curYear - l;
         } else {
                range = curYear - l;
                range += '-';
                range += curYear - h;
                return range;
         }
    }
    function toUnicode(theString) {
         var unicodeString = '';
         var theUnicode = theString;
         while (theUnicode.length < 4) {
                theUnicode = '0' + theUnicode;
         }
         theUnicode = '\\x' + theUnicode;
         unicodeString += theUnicode;
         return unicodeString;
    }
    function cookieParser(cookie) {
         // obj container for freeback to Lotame
         var obj = new Object;
         obj = {
                zip5: zip5checker(cookie.substring(4, 10)),
                gender: genderChecker(cookie.substring(48, 50)),
                age: age(cookie.substring(56, 58), cookie.substring(58, 60)),
         };
         //this checks to make sure we don't have an empty object and then dispatches the info out to lotame.
         if (!$.isEmptyObject(obj)) {
                bcom.dfp.keyValuePairs.age = obj.age;
                bcom.dfp.keyValuePairs.zip = obj.zip5;
                bcom.dfp.keyValuePairs.g = obj.gender;
         };
         return obj;
    }
    // Parse query string values
    function getQueryStringValue( key ) {
        var queryStringArray = window.location.search.substr( 1 ).split( '&' );
        for ( var i = 0; i < queryStringArray.length; i++ ) {
            var keyValueArray = queryStringArray[i].split( '=' );
            if ( keyValueArray[0] === key ) {
                return keyValueArray[1];
            }
        }
        return false;
    }

})( bcom );