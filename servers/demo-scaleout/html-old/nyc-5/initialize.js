/*
$Id: initialize.js 17743 2009-04-16 19:53:50Z jguinto $ 
*/

NYTD.Trackers = NYTD.Trackers || {};
NYTD.Trackers.GoogleAnalyticsTrackers = new Array();

NYTD.Trackers.setGoogleAnalytics = function() {
  var googleAnalyticsJsHost = (("https:" == document.location.protocol) ? "https://ssl." : "http://www.");
  var googleAnalyticsJsFile = googleAnalyticsJsHost + "google-analytics.com/ga.js";
  includeFile(googleAnalyticsJsFile);
  includeFile(js_host+"googleAnalytics/controller.js");
}

NYTD.Trackers.setGoogleAnalytics();