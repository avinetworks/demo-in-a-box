/* $Id: autosuggestConfig.js 119242 2013-01-15 00:48:07Z surya.sanagavarapu $
   (c) 2012 The New York Times Company
*/

var NYTD = NYTD || {};
NYTD.Search = NYTD.Search || {};

// Configure to show company ticker symbol, then the full name of the company, with matching text in bold in both
NYTD.Search.Config = {
    SearchBoxes: {
        bizAutosuggest: {
            DOMselector: ".inlineSearchControl",
            resultsNode: [1], //node in the response that holds results
            serviceLocation: "/svc/suggest/v1/business",
            nameOfQueryCall: "query=",
            minimumCharSearch: 2, //minuimum number of characters to search on (optional)
            dataType: "json",
            getMethod: "get",
            suggestedItemTemplate: function(key, val, boldedJson) {
                var data = NYTD.jQuery.parseJSON(val);
                var boldedData = NYTD.jQuery.parseJSON(boldedJson);
                var boldedResults = boldedData.results;
                var boldedCompany = boldedResults.company;
                var prettyCompany = boldedCompany.slice(0, 3) === '<b>' ? 
                                        '<b>' + boldedCompany.charAt(3).toUpperCase() + boldedCompany.slice(4) :
                                        boldedCompany.charAt(0).toUpperCase() + boldedCompany.slice(1);
                return [
                    '<li class="clearfix">',
                        '<a href="',data.results.url,'">','<span>',boldedResults.ticker,'</span>',prettyCompany,'</a>',
                    '</li>'].join('');
            },

            footerTemplate: function(query) {
                return [
                    '<li class="marketQuoteRefer" title="View All Matches">',
                        '<h6>',
                            '<a href="http://markets.on.nytimes.com/research/symbol_lookup/overview/search.asp?textIn=',query,'">',
                                '<b>View All Matches &raquo;</b>',
                            '</a>',
                        '</h6>',
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
