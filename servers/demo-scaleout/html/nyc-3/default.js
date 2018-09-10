/* 
$Id: default.js 135745 2013-11-22 23:01:32Z hetal.thakkar $
(c)2013 The New York Times Company  
*/

/**
 * Places a growl on the page.
 * Generally used to display how many articles user has left.
 *
 * @method growl
 * @public
 *
 * @return {Object}
 */
(function(root, factory) {
    'use strict';

    // exports for NYT5
    if (typeof define === "function" && define.amd) {
        define(['foundation/hosts', 'jquery/nyt', 'auth/mtr', 'foundation/views/page-manager'], function(hosts, $, mtr, pageManager) {
            return factory(hosts, $, mtr, pageManager);
        });
    } else if (typeof root.NYTD === 'object') {
        //NYT4
        NYTD.AuthGrowl = factory(NYTD.Hosts, NYTD.jQuery, NYTD.Meter);
    }

} (this, function(host, $, mtr, pageManager) {

    'use strict';

    var growl = {};
    var wwwHost = host.www || host.wwwHost;
    var meterCount;

    /**
     * Closes the growl
     * @method close
     * @public
     */
    growl.close = function() {
        if (!growl || !growl.container) return;
        growl.container.fadeOut('slow', function() {
            if (growl && growl.container) {
                growl.container.unbind('click');
                growl.container.remove();
            }
        });
    };

    /**
     * Gets the current meter count
     * @method getMeterCount
     * @private
     *
     * @return {String}
     */
    var getMeterCookieCount = function() {
        var count = document.cookie.match(/v=i.([0-9]+)/);
        if (count) return count[1];
    };

    /**
     * Gets any keywords or query strings specific to this growl
     * to help on adx targetting
     * @method getData
     * @private
     *
     * @return Object
     */
    var getData = function() {
        var keywords, query;
        var pageType = (typeof define === "function" && define.amd) ? 'nyt5' : 'nyt4';
        var element = $('#growlCampaignScript');

        var keywords = element.attr('data-keywords');
        keywords = (keywords && keywords.length > 0) ? keywords : '';

        var query = element.attr('data-query');
        query = (query && query.length > 0) ? query : '';

        return {keywords: keywords, query: query};
    };

    /**
     * Makes adx call to get growl creative and adds it to the page if exists
     * @method addGrowl
     * @private
     */
    var addGrowl = function(mtrData){
        var data = getData();

        // if we already have a growl open, then we close it
        growl.close();

        // don't show growl is either meter or gateway are down
        if (mtrData.gatewayOn === false || mtrData.meterOn === false) { return; }

        $.getJSON(wwwHost + '/adx/bin/adxrun.html?v=3&jsonp=?&keywords='+data.keywords+'&page=www.nytimes.com/growl&type=fastscript&positions=Left9&query='+data.query,
            function(data) {
                // if it doesn't have any ads, quit
                if (!data || !data.ads) return;
                // quit if by the time we got the growl creative, the user has already changed page
                // this happens most on ajax applications such as video, nyt5, etc
                if (mtrData.pageCount != getMeterCookieCount()) {
                    return;
                }

                function setGrowlPosition() {
                    var left = $("#masthead").offset().left;

                    if (left > 0) {
                        growl.container.css({left: left});
                    } else {
                        growl.container.removeAttr("style");
                    }
                }

                // place the growl creative
                var body = $('body');
                if (data.ads.Left9 && body) {
                    // removes previous growl, if there is one
                    if (growl.container) {
                        growl.container.off('click').remove();
                    }
                    // TODO: strip out scripts
                    body.append(data.ads.Left9.creative);
                    // get new container
                    growl.container = $(".nytdGrowlUIContainer");

                    if (pageManager) {
                        pageManager.listenTo(pageManager, 'nyt:page-resize', setGrowlPosition);
                        pageManager.listenTo(pageManager, 'nyt:page-ready', setGrowlPosition);
                    }

                    //bind a click event that will close container
                    growl.container.on('click', '.nytdGrowlNotifyCross', function() {
                        growl.close();
                    });
                    // dispatch event notifying the page that growl has loaded
                    $(document).trigger('NYTD:AuthGrowlLoaded', {count: mtrData.pageCount});
                    // Set timeout to remove grow if cookie changes
                    // this is so dynamic applications can implement swipe gestures and 
                    // not have the growl stick on the page with the wrong count
                }
                if (data.ads.ADX_CLIENTSIDE && body) {
                    // display confirmation
                    body.append(data.ads.ADX_CLIENTSIDE.creative);
                }
            }
        );
    };

    // we can only load the growl after the front end meter has loaded
    // listens for MeterLoaded events
    $(document).on('NYTD:MeterLoaded', function(evt, data) { addGrowl(data); });
    // just in case meter has fired event before this script loaded...
    if (mtr && mtr.loaded) { addGrowl(mtr); }

    return growl;

}));
