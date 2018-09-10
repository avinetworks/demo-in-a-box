function updateSubRegion(obj){
	var f = (obj.section) ? obj : obj.form;
	var index = f.region.selectedIndex;
	var o = f.subregion.options;
	var offset = 2;
	o.length = offset;
	var s = eval(regionNames[index]);
	var URL = (s != "") ? eval(regionNames[index] + "_URLs") : "";
	var l = s.length;
	for (var i=0; i<l; i++){
		o[i + offset] = new Option(s[i], URL[i]);
	}
	f.subregion.disabled = ((index < offset) || (s == "")) ? 1 : 0;
	f.subregion.selectedIndex = 0;
}
function gotoSubSection(obj){
	var searchHost = "";
	if (location.hostname == "dwww.em.nytimes.com" || location.hostname == "dtravel.prvt.nytimes.com") {
		searchHost = "http://dtravel.prvt.nytimes.com";
	} else if (location.hostname == "swww.nytimes.com" || location.hostname == "stravel.prvt.nytimes.com" || location.hostname == "stravel2.prvt.nytimes.com") {
		searchHost = "http://stravel.prvt.nytimes.com";
	} else {
		searchHost = "http://travel.nytimes.com";
	}
	
	var f = (obj.subregion) ? obj : obj.form;
	var subRegionSelected = f.subregion.selectedIndex;
	var regionSelected = f.region.selectedIndex;
	var pulldown = ((subRegionSelected == 0) || (subRegionSelected == 1)) ? f.region : f.subregion;
	var selected = ((subRegionSelected == 0) || (subRegionSelected == 1)) ? regionSelected : subRegionSelected;
	if ((selected == 0) || (selected == 1)) {
		var URL = "http://travel.nytimes.com";
	} else {
		var URL = searchHost + "/travel/guides/" + pulldown.options[selected].value + "/overview.html";
	}
	if (URL != "") document.location = URL;
	return false;
}

