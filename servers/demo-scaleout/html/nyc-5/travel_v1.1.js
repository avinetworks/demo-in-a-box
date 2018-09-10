/*
$Id: travel_v1.1.js 44254 2010-08-30 05:07:18Z sowmya_m04 $
*/
// set sub content group if it exists
var subcontentGroup = getMetaTag("WT.cg_s");
if (subcontentGroup == "") {
  if(/\/travel\/escapes\//.test(nyt_path)) {
    subcontentGroup = "Escapes";
  } else if (/\/travel\/tmagazine\//.test(nyt_url)) {
    subcontentGroup = "T Travel";
  }
}
addMetaTag("WT.cg_s", subcontentGroup);

// set page type
var pageType = getMetaTag("WT.z_gpt");
var pageSubType = getMetaTag("WT.z_gpst");
var pageSubSubType = getMetaTag("WT.z_gpsst");
var pageSubSubSubType = getMetaTag("WT.z_gpssst");
var metaTom = getMetaTag("tom");
var metaCol = getMetaTag("col");

if(pageType == "Article" && pageSubType == "News") {
  if (metaCol != "") {
    pageSubSubType = metaCol;
  } else if (/\/travel\/escapes\//.test(nyt_path)) {
    pageSubSubType = "Escapes";
  } else if (/\/travel\/tmagazine\//.test(nyt_path)) {
    pageSubSubType = "T Travel";
  }
}

if (pageType == "" || pageType == "Other") {
  if(/^http:\/\/travel\.nytimes\.com\/$/.test(nyt_url)
     || /^\/pages\/travel\/index.html$/.test(nyt_path)) {
    pageType = "Section Front";
  } else if(/^\/pages\/travel\/escapes\/$/.test(nyt_path)
         || /^\/pages\/travel\/escapes\/index.html/.test(nyt_path)) {
    pageType = "Section Front";
    pageSubType = "SubSection Front";
  } else if(/^\/pages\/travel\/tmagazine\/$/.test(nyt_path)
         || /^\/pages\/travel\/tmagazine\/index.html/.test(nyt_path)) {
    pageType = "Section Front";
    pageSubType = "SubSection Front";
  } else if(/\/frugal-traveler\//.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Series";
  } else if(/\/overview.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Overview";
  } else if(/\/overview-detail.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Overview";
  } else if(/\/hotels.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Where to Stay";
    pageSubSubSubType = "Suggestions";
  } else if(/\/hotel-detail.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Venue Detail";
    pageSubSubType = "Where to Stay";
    pageSubSubSubType = "Review";
  } else if(/\/hotel-listings.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Where to Stay";
    pageSubSubSubType = "Listings";
  } else if(/\/restaurants.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Where to Eat";
    pageSubSubSubType = "Suggestions";
  } else if(/\/restaurant-detail.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Venue Detail";
    pageSubSubType = "Where to Eat";
    pageSubSubSubType = "Review";
  } else if(/\/restaurant-listings.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Where to Eat";
    pageSubSubSubType = "Listings";
  } else if(/\/attractions.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "What to Do";
    pageSubSubSubType = "Suggestions";
  } else if(/\/attraction-detail.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Venue Detail";
    pageSubSubType = "What to Do";
    pageSubSubSubType = "Review";
  } else if(/\/attraction-listings.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "What to Do";
    var listingType = getQueryParameter("type");
	 if (listingType != "") {
	   if (listingType == "Attraction") {
        pageSubSubSubType = "Listings";
      } else {
        pageSubSubSubType = listingType;
      }
    }
  } else if(/\/when-to-go.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "When to Go";
  } else if(/\/where-to-go.html$/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
    pageSubSubType = "Where to Go";
  } else if(/\/maps.html/.test(nyt_path)) {
    pageType = "Topic";
    pageSubType = "Travel Guide";
	pageSubSubType = "Maps";
  } else if (/\/frommers\//.test(nyt_path)) {
    pageType = "Article";
    pageSubType = "Travel Guide";
  } else if(/\/slideshow\//.test(nyt_path)) {
    pageType = "Multimedia";
    pageSubType = "Slideshow";
  } else if(/\/travsearch.html/.test(nyt_path)) {
    pageType = "Search";
    pageSubType = "Results";
  } else {
    pageType = "Other";
  }
}
overwriteMetaTag("WT.z_gpt", pageType);
addMetaTag("WT.z_gpst", pageSubType);
addMetaTag("WT.z_gpsst", pageSubSubType);
addMetaTag("WT.z_gpssst", pageSubSubSubType);

// set partner page
var partnerPage;
if (/\/frommers\//.test(nyt_path)) {
  partnerPage = "Frommers";
  addMetaTag("WT.z_pc", partnerPage);
}

// get location specific information
var wt_region;
var wt_country;
var wt_state;
var wt_city;
var wt_destination;
if ((pageType == "Topic") || (pageType == "Article" && partnerPage == "Frommers")) {
  var startRE = /\/travel\/guides\//g;
  var endRE = /\/[A-Za-z0-9\-_]+\.html/g;
  var tempArray0 = startRE.exec(nyt_path);
  var tempArray1 = endRE.exec(nyt_path);
  if (tempArray0 != null && tempArray1 != null) {
    var locationString = nyt_path.substring(startRE.lastIndex, tempArray1.index);
    var locationArray = locationString.split("/");
    wt_region = locationArray[0];
    wt_country = locationArray[1];
    wt_state = locationArray[2];
    wt_city = locationArray[3];
  }
}

// set wt_region
if (wt_region != undefined) {
  addMetaTag("WT.z_tRegion", wt_region);
}

// set wt_country
if (wt_country != undefined) {
  wt_destination = wt_country;
  //addMetaTag("WT.z_tCountry", wt_country);
}

// set wt_state
if (wt_state != undefined) {
  wt_destination = wt_state;
  //addMetaTag("WT.z_tState", wt_state);
}

// set wt_city
if (wt_city != undefined) {
  wt_destination = wt_city;
  //addMetaTag("WT.z_tCity", wt_city;
}

// set wt_destination
if (wt_destination != undefined) {
  addMetaTag("WT.z_tDest", wt_destination);
}

// set refer
var refer = getQueryParameter("refer");
if (refer != "") {
  addMetaTag("WT.z_gref", refer);
}

// set critics pick

// set venue type
if (/\/hotel-detail.html$/.test(nyt_path)) {
  addMetaTag("WT.z_tvt", "Hotel");
} else if (/\/restaurant-detail.html$/.test(nyt_path)) {
  addMetaTag("WT.z_tvt", "Restaurant");
} else if (/\/attraction-detail.html$/.test(nyt_path)) {
  addMetaTag("WT.z_tvt", "Attraction");
}

// set venue name
if (/\/hotel-detail.html$/.test(nyt_path)
  || /\/restaurant-detail.html$/.test(nyt_path)
  || /\/attraction-detail.html$/.test(nyt_path)) {
  var venueName = "";
  var docTitle = document.title;
  if (docTitle != undefined) {
    var endIndex = docTitle.indexOf(" - ");
    venueName = docTitle.substring(0, endIndex);
  }
  addMetaTag("WT.z_tvn", venueName);
}
// set venue id
var vid = getQueryParameter("vid");
if (vid != "") {
  addMetaTag("WT.z_tvid", vid);
}

// set activity

// set search type

// for travel search only
var searchResults;
var wt_tross = "";
var wt_tross_r = "";

if (pageType == "Search" && pageSubType == "Results") {
  wt_tross = getQueryParameter("term");
  searchResults = document.getElementById("noResults");
  if (null == searchResults) {
    wt_tross_r = "1";
  } else {
    wt_tross_r = "0";
  }
}
addMetaTag("WT.z_tross", wt_tross);
addMetaTag("WT.z_tross_r", wt_tross_r);
