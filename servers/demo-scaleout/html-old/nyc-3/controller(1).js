/*
$Id: controller.js 17697 2009-04-16 12:49:30Z jguinto $ 
*/

NYTD.Trackers.GoogleAnalytics = function(contentGroup){

  var googleAnalyticsTrackerID = {"Travel":"UA-4406282-79",
                     			  "Business":"UA-4406282-80",
                     			  "Health":"UA-4406282-81"};
  
  if (googleAnalyticsTrackerID[contentGroup]!=undefined){
    try {
      var pageTracker = _gat._getTracker(googleAnalyticsTrackerID[contentGroup]); 
      pageTracker._trackPageview();
    } catch(err) {}
  }

}

NYTD.Trackers.GoogleAnalyticsTrackers[wt_contentGroup] = new NYTD.Trackers.GoogleAnalytics(wt_contentGroup); //wt_contentGroup set in wt controller_v1.1.js