/*    
$Id: autosuggest.js 122664 2013-03-12 19:55:23Z surya.sanagavarapu $
Autosuggest from a json feed
Requires NYTD.jQuery & a config
(c) 2012 The New York Times Company
*/

var NYTD = NYTD || {};
NYTD.Search = NYTD.Search || {};

NYTD.Search.Suggest = (function(jQuery) {
    var $queryResults = jQuery(".autoSuggestQueryResults");
    
    function init() {
        initSearchBoxes();
    }

    function initSearchBoxes() {
        var searchBoxObject = NYTD.Search.Config.SearchBoxes; //get searchboxes from config
        for (var key in searchBoxObject) { //set up each
            if (searchBoxObject.hasOwnProperty(key)) {
                setEventHandlers(searchBoxObject[key]);
                setSearchPrompt(searchBoxObject[key]);
            }
        }
    }

    function setEventHandlers(configData) { //UI interactions
        var searchBoxLocation = configData.DOMselector;
        jQuery(searchBoxLocation)
            .on("focus",".autoSuggestQuery",clearSearchField)
            .on("keydown",".autoSuggestQuery",function(event) {navigateItems(event,searchBoxLocation);})
            .on("keyup",".autoSuggestQuery",function(event) {typeSearch(event,this,configData);})
            .on("focusout",".autoSuggestQuery",hideSuggestions)
            //.on("mouseover",".autoSuggestQueryResults li",function(event) {browse(this,searchBoxLocation);})

            // provide hooks for user event handlers
            .on("keydown", configData.keydownCallback || $.noop)
            .on("click", configData.clickCallback || $.noop)
            .on("submit", "form", configData.submitCallback || $.noop);
    }
    
    function browse(item,searchBoxLocation) { //browse an item in the dropdown
        var $searchField = jQuery(searchBoxLocation).find(".autoSuggestQuery");
        jQuery(".autoSuggestQueryResults").find("li").removeClass("selectedItem");
        jQuery(item).addClass("selectedItem");
        browsedQuery = jQuery(item).find("a").data("query"); //get query from markup
        if (browsedQuery) {
            $searchField.val(browsedQuery);
        }
    }

    function navigateItems(event,searchBoxLocation) { //user types the "up" and "down" keys to navigate items in the dropdown
        var $itemsList = jQuery(searchBoxLocation).find(".autoSuggestQueryResults"),
            $searchField = jQuery(searchBoxLocation).find(".autoSuggestQuery"),
            $selectedItem = $itemsList.find("li").hasClass("selectedItem"),
            browsedQuery,
            itemToSelect;
        if (event.keyCode == 40) { //"down"
            if ($selectedItem) { //an element is already selected
                if ($itemsList.find("li:last-child").hasClass("selectedItem")) { //the last item is selected, so select the first in the list
                    itemToSelect = $itemsList.find("li:first-child");
                }
                else { //otherwise just choose the next item
                    itemToSelect = $itemsList.find("li.selectedItem").next("li");
                }
            }
            else { //none is selected, so choose the first
                itemToSelect = $itemsList.find("li:first-child");
            }
            browse(itemToSelect,searchBoxLocation);
        }
        if (event.keyCode == 38) { //"up"
            if ($selectedItem) { //an element is already selected
                if ($itemsList.find("li:first-child").hasClass("selectedItem")) { //the first item is selected...
                    itemToSelect = $itemsList.find("li:last-child"); //so select the last
                }
                else { //otherwise just choose the previous one
                    itemToSelect = $itemsList.find("li.selectedItem").prev("li");
                }
            }
            else { //none is selected, so choose the last
                itemToSelect = $itemsList.find("li:last-child");
            }
            browse(itemToSelect,searchBoxLocation);
        }
    }

    function setSearchPrompt(configData) { //capture or fill in the initial search prompt
        var searchBoxLocation = configData.DOMselector,
            $searchPrompt = jQuery(searchBoxLocation).find(".autoSuggestQuery");
        $searchPrompt.attr("autocomplete", "off");
        if (configData.promptInTextField) {
            var searchPromptInConfig = configData.promptInTextField;
            $searchPrompt.val(searchPromptInConfig);
            $searchPrompt.attr("data-searchprompt",searchPromptInConfig); //save the prompt in a data attr
        }
    }

    function clearSearchField() { //search field should only be cleared if the stored search prompt is the same that is currently displayed in the field
        var $target = jQuery(this);
        if ($target.val() == $target.attr("data-searchprompt")) {
            $target.val("");
        }
    }

    function typeSearch(event, theSearchField, configData) {
        if (event.keyCode == 40 || event.keyCode == 38) { //navigating up or down?
        }
        else { //do suggest
            if (configData.minimumCharSearch) { //get minimum number of characters to search on
                characterSearchThreshold = configData.minimumCharSearch;
            }
            else {
                characterSearchThreshold = 2;
            }
            if ((jQuery(theSearchField).val().length < characterSearchThreshold)) { //under the threshold? hide the suggest
                hideSuggestions();
            }
            else { //start the suggest
                startSuggest(theSearchField, configData);
            }
        }
    }

    function startSuggest(theSearchField, configData) {
        var theQuery = jQuery(theSearchField).val(), //what to suggest on
            APIcall = configData.serviceLocation, //where is the API?
            payload = configData.nameOfQueryCall + theQuery, //querystring
            requesttype = configData.dataType,
            method =  configData.getMethod;

        if (theQuery != "") { //did they actually type something??
            jQuery.ajax({
                url: APIcall,
                dataType: requesttype,
                data: payload,
                type: method
            }).done(function(data,status,xhr) {
                processSuccessfulResponse(data,configData,theQuery);
            }).fail(function(){
                processFailedResponse();
            });
        }
    }

    function showSuggestions(DOMselector) { //show
        var $target = jQuery(DOMselector).find(".autoSuggestQueryResults");
        $target.show();
        $target.addClass("active");
    }

    function hideSuggestions() {
        $queryResults.fadeOut('fast', function() {
            $queryResults.removeClass("active");
        });
    }

    function clearSuggestions() { //remove all suggestions
        $queryResults.empty();
    }

    function processSuccessfulResponse(response,configData,theQuery) { //response is good
        clearSuggestions();
        var theResultsNode = configData.resultsNode, //where are the results in the json?
            DOMselector = configData.DOMselector, //where to put them?
            dropdownTemplate = configData.suggestedItemTemplate, //what is the template?
            items = [],
            findQuery = RegExp('(' + theQuery + ')', "gi");    //case-insensitive regex search for the query, ready for search & replace

        if (response[theResultsNode] == "") { //anything to suggest?
            hideSuggestions();
        }

        else {
            showSuggestions(DOMselector);
            for (var j = 0; j < response[theResultsNode].length; j++) {
                var val = response[theResultsNode][j];

                //search for the query term in the results and make all instances bold
                if (typeof val === "string") {
                    boldedResult = val.replace(findQuery, '<b>$1</b>');
                    items.push(dropdownTemplate(j, val, boldedResult));
                }
            }
            if (configData.footerTemplate) {
                items.push(configData.footerTemplate(theQuery));
            }
            jQuery(items.join('')).appendTo(DOMselector + ' .autoSuggestQueryResults'); //add to listings ul
        }
    }

    function processFailedResponse(response) {
        //API failed
    }

    return {
        init: init,
        showSuggestions: showSuggestions,
        hideSuggestions: hideSuggestions
    };
})(NYTD.jQuery);

NYTD.jQuery(document).ready(function() {
    NYTD.Search.Suggest.init();
});
