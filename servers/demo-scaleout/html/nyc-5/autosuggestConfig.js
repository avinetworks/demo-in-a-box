/* $Id: autosuggestConfig.js 114437 2012-10-25 14:12:04Z benjamin.morss $
   (c) 2012 The New York Times Company
*/

var NYTD = NYTD || {};
NYTD.Search = NYTD.Search || {};

// Configure to show company ticker symbol, then the full name of the company, with matching text in bold in both
NYTD.Search.Config = {
    SearchBoxes: {
        autosuggest: {
            DOMselector: ".inlineSearchControl",
            resultsNode: [1], //node in the response that holds results
            serviceLocation: "/svc/suggest/v1/travel",
            nameOfQueryCall: "query=",
            minimumCharSearch: 2, //minuimum number of characters to search on (optional)
            dataType: "json",
            getMethod: "get",
            suggestedItemTemplate: function(key, val, boldedJson) {
                var data = NYTD.jQuery.parseJSON(val);
                var boldedData = NYTD.jQuery.parseJSON(boldedJson);
                var url = 'http://query.nytimes.com/search/sitesearch/?vertical=travel/#/' + encodeURIComponent(data.topic);
                return [
                    '<li class="clearfix">',
                        '<a href="', url, '">', boldedData.topic, '</a>',
                    '</li>'].join('');
            },

            submitCallback: function() {
                var $selectedItem = NYTD.jQuery(this).find("li.selectedItem");
                if ($selectedItem.length) {
                    var href = $selectedItem.find("a").attr('href');
                    if (href) {
                        window.location.href = href;
                        return false;
                    }
                }
            }
        }
    }
};
