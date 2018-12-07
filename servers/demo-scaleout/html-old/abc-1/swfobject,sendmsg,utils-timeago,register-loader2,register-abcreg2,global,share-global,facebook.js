

/** 
* @filepath: swfobject,sendmsg,utils-timeago,register-loader2,register-abcreg2,global,share-global,facebook
* @created: Wed, 27 Nov 13 17:12:01 -0800
*/


/** 
* @filepath: /utils/swfobject.js
* @created: Wed, 27 Nov 13 17:12:00 -0800
*/
/*! SWFObject v2.1 <http://code.google.com/p/swfobject/>
	Copyright (c) 2007-2008 Geoff Stearns, Michael Williams, and Bobby van der Sluis
	This software is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
*/

var swfobject = function() {
	
	var UNDEF = "undefined",
		OBJECT = "object",
		SHOCKWAVE_FLASH = "Shockwave Flash",
		SHOCKWAVE_FLASH_AX = "ShockwaveFlash.ShockwaveFlash",
		FLASH_MIME_TYPE = "application/x-shockwave-flash",
		EXPRESS_INSTALL_ID = "SWFObjectExprInst",
		
		win = window,
		doc = document,
		nav = navigator,
		
		domLoadFnArr = [],
		regObjArr = [],
		objIdArr = [],
		listenersArr = [],
		script,
		timer = null,
		storedAltContent = null,
		storedAltContentId = null,
		isDomLoaded = false,
		isExpressInstallActive = false;
	
	/* Centralized function for browser feature detection
		- Proprietary feature detection (conditional compiling) is used to detect Internet Explorer's features
		- User agent string detection is only used when no alternative is possible
		- Is executed directly for optimal performance
	*/	
	var ua = function() {
		var w3cdom = typeof doc.getElementById != UNDEF && typeof doc.getElementsByTagName != UNDEF && typeof doc.createElement != UNDEF,
			playerVersion = [0,0,0],
			d = null;
		if (typeof nav.plugins != UNDEF && typeof nav.plugins[SHOCKWAVE_FLASH] == OBJECT) {
			d = nav.plugins[SHOCKWAVE_FLASH].description;
			if (d && !(typeof nav.mimeTypes != UNDEF && nav.mimeTypes[FLASH_MIME_TYPE] && !nav.mimeTypes[FLASH_MIME_TYPE].enabledPlugin)) { // navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin indicates whether plug-ins are enabled or disabled in Safari 3+
				d = d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				playerVersion[0] = parseInt(d.replace(/^(.*)\..*$/, "$1"), 10);
				playerVersion[1] = parseInt(d.replace(/^.*\.(.*)\s.*$/, "$1"), 10);
				playerVersion[2] = /r/.test(d) ? parseInt(d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
			}
		}
		else if (typeof win.ActiveXObject != UNDEF) {
			var a = null, fp6Crash = false;
			try {
				a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".7");
			}
			catch(e) {
				try { 
					a = new ActiveXObject(SHOCKWAVE_FLASH_AX + ".6");
					playerVersion = [6,0,21];
					a.AllowScriptAccess = "always";	 // Introduced in fp6.0.47
				}
				catch(e) {
					if (playerVersion[0] == 6) {
						fp6Crash = true;
					}
				}
				if (!fp6Crash) {
					try {
						a = new ActiveXObject(SHOCKWAVE_FLASH_AX);
					}
					catch(e) {}
				}
			}
			if (!fp6Crash && a) { // a will return null when ActiveX is disabled
				try {
					d = a.GetVariable("$version");	// Will crash fp6.0.21/23/29
					if (d) {
						d = d.split(" ")[1].split(",");
						playerVersion = [parseInt(d[0], 10), parseInt(d[1], 10), parseInt(d[2], 10)];
					}
				}
				catch(e) {}
			}
		}
		var u = nav.userAgent.toLowerCase(),
			p = nav.platform.toLowerCase(),
			webkit = /webkit/.test(u) ? parseFloat(u.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : false, // returns either the webkit version or false if not webkit
			ie = false,
			windows = p ? /win/.test(p) : /win/.test(u),
			mac = p ? /mac/.test(p) : /mac/.test(u);
		/*@cc_on
			ie = true;
			@if (@_win32)
				windows = true;
			@elif (@_mac)
				mac = true;
			@end
		@*/
		return { w3cdom:w3cdom, pv:playerVersion, webkit:webkit, ie:ie, win:windows, mac:mac };
	}();

	/* Cross-browser onDomLoad
		- Based on Dean Edwards' solution: http://dean.edwards.name/weblog/2006/06/again/
		- Will fire an event as soon as the DOM of a page is loaded (supported by Gecko based browsers - like Firefox -, IE, Opera9+, Safari)
	*/ 
	var onDomLoad = function() {
		if (!ua.w3cdom) {
			return;
		}
		addDomLoadEvent(main);
		if (ua.ie && ua.win) {
			try {	 // Avoid a possible Operation Aborted error
				doc.write("<scr" + "ipt id=__ie_ondomload defer=true src=//:></scr" + "ipt>"); // String is split into pieces to avoid Norton AV to add code that can cause errors 
				script = getElementById("__ie_ondomload");
				if (script) {
					addListener(script, "onreadystatechange", checkReadyState);
				}
			}
			catch(e) {}
		}
		if (ua.webkit && typeof doc.readyState != UNDEF) {
			timer = setInterval(function() { if (/loaded|complete/.test(doc.readyState)) { callDomLoadFunctions(); }}, 10);
		}
		if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("DOMContentLoaded", callDomLoadFunctions, null);
		}
		addLoadEvent(callDomLoadFunctions);
	}();
	
	function checkReadyState() {
		if (script.readyState == "complete") {
			script.parentNode.removeChild(script);
			callDomLoadFunctions();
		}
	}
	
	function callDomLoadFunctions() {
		if (isDomLoaded) {
			return;
		}
		if (ua.ie && ua.win) { // Test if we can really add elements to the DOM; we don't want to fire it too early
			var s = createElement("span");
			try { // Avoid a possible Operation Aborted error
				var t = doc.getElementsByTagName("body")[0].appendChild(s);
				t.parentNode.removeChild(t);
			}
			catch (e) {
				return;
			}
		}
		isDomLoaded = true;
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
		var dl = domLoadFnArr.length;
		for (var i = 0; i < dl; i++) {
			domLoadFnArr[i]();
		}
	}
	
	function addDomLoadEvent(fn) {
		if (isDomLoaded) {
			fn();
		}
		else { 
			domLoadFnArr[domLoadFnArr.length] = fn; // Array.push() is only available in IE5.5+
		}
	}
	
	/* Cross-browser onload
		- Based on James Edwards' solution: http://brothercake.com/site/resources/scripts/onload/
		- Will fire an event as soon as a web page including all of its assets are loaded 
	 */
	function addLoadEvent(fn) {
		if (typeof win.addEventListener != UNDEF) {
			win.addEventListener("load", fn, false);
		}
		else if (typeof doc.addEventListener != UNDEF) {
			doc.addEventListener("load", fn, false);
		}
		else if (typeof win.attachEvent != UNDEF) {
			addListener(win, "onload", fn);
		}
		else if (typeof win.onload == "function") {
			var fnOld = win.onload;
			win.onload = function() {
				fnOld();
				fn();
			};
		}
		else {
			win.onload = fn;
		}
	}
	
	/* Main function
		- Will preferably execute onDomLoad, otherwise onload (as a fallback)
	*/
	function main() { // Static publishing only
		var rl = regObjArr.length;
		for (var i = 0; i < rl; i++) { // For each registered object element
			var id = regObjArr[i].id;
			if (ua.pv[0] > 0) {
				var obj = getElementById(id);
				if (obj) {
					regObjArr[i].width = obj.getAttribute("width") ? obj.getAttribute("width") : "0";
					regObjArr[i].height = obj.getAttribute("height") ? obj.getAttribute("height") : "0";
					if (hasPlayerVersion(regObjArr[i].swfVersion)) { // Flash plug-in version >= Flash content version: Houston, we have a match!
						if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements
							fixParams(obj);
						}
						setVisibility(id, true);
					}
					else if (regObjArr[i].expressInstall && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) { // Show the Adobe Express Install dialog if set by the web page author and if supported (fp6.0.65+ on Win/Mac OS only)
						showExpressInstall(regObjArr[i]);
					}
					else { // Flash plug-in and Flash content version mismatch: display alternative content instead of Flash content
						displayAltContent(obj);
					}
				}
			}
			else {	// If no fp is installed, we let the object element do its job (show alternative content)
				setVisibility(id, true);
			}
		}
	}
	
	/* Fix nested param elements, which are ignored by older webkit engines
		- This includes Safari up to and including version 1.2.2 on Mac OS 10.3
		- Fall back to the proprietary embed element
	*/
	function fixParams(obj) {
		var nestedObj = obj.getElementsByTagName(OBJECT)[0];
		if (nestedObj) {
			var e = createElement("embed"), a = nestedObj.attributes;
			if (a) {
				var al = a.length;
				for (var i = 0; i < al; i++) {
					if (a[i].nodeName == "DATA") {
						e.setAttribute("src", a[i].nodeValue);
					}
					else {
						e.setAttribute(a[i].nodeName, a[i].nodeValue);
					}
				}
			}
			var c = nestedObj.childNodes;
			if (c) {
				var cl = c.length;
				for (var j = 0; j < cl; j++) {
					if (c[j].nodeType == 1 && c[j].nodeName == "PARAM") {
						e.setAttribute(c[j].getAttribute("name"), c[j].getAttribute("value"));
					}
				}
			}
			obj.parentNode.replaceChild(e, obj);
		}
	}
	
	/* Show the Adobe Express Install dialog
		- Reference: http://www.adobe.com/cfusion/knowledgebase/index.cfm?id=6a253b75
	*/
	function showExpressInstall(regObj) {
		isExpressInstallActive = true;
		var obj = getElementById(regObj.id);
		if (obj) {
			if (regObj.altContentId) {
				var ac = getElementById(regObj.altContentId);
				if (ac) {
					storedAltContent = ac;
					storedAltContentId = regObj.altContentId;
				}
			}
			else {
				storedAltContent = abstractAltContent(obj);
			}
			if (!(/%$/.test(regObj.width)) && parseInt(regObj.width, 10) < 310) {
				regObj.width = "310";
			}
			if (!(/%$/.test(regObj.height)) && parseInt(regObj.height, 10) < 137) {
				regObj.height = "137";
			}
			doc.title = doc.title.slice(0, 47) + " - Flash Player Installation";
			var pt = ua.ie && ua.win ? "ActiveX" : "PlugIn",
				dt = doc.title,
				fv = "MMredirectURL=" + win.location + "&MMplayerType=" + pt + "&MMdoctitle=" + dt,
				replaceId = regObj.id;
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			if (ua.ie && ua.win && obj.readyState != 4) {
				var newObj = createElement("div");
				replaceId += "SWFObjectNew";
				newObj.setAttribute("id", replaceId);
				obj.parentNode.insertBefore(newObj, obj); // Insert placeholder div that will be replaced by the object element that loads expressinstall.swf
				obj.style.display = "none";
				var fn = function() {
					obj.parentNode.removeChild(obj);
				};
				addListener(win, "onload", fn);
			}
			createSWF({ data:regObj.expressInstall, id:EXPRESS_INSTALL_ID, width:regObj.width, height:regObj.height }, { flashvars:fv }, replaceId);
		}
	}
	
	/* Functions to abstract and display alternative content
	*/
	function displayAltContent(obj) {
		if (ua.ie && ua.win && obj.readyState != 4) {
			// For IE when a SWF is loading (AND: not available in cache) wait for the onload event to fire to remove the original object element
			// In IE you cannot properly cancel a loading SWF file without breaking browser load references, also obj.onreadystatechange doesn't work
			var el = createElement("div");
			obj.parentNode.insertBefore(el, obj); // Insert placeholder div that will be replaced by the alternative content
			el.parentNode.replaceChild(abstractAltContent(obj), el);
			obj.style.display = "none";
			var fn = function() {
				obj.parentNode.removeChild(obj);
			};
			addListener(win, "onload", fn);
		}
		else {
			obj.parentNode.replaceChild(abstractAltContent(obj), obj);
		}
	} 

	function abstractAltContent(obj) {
		var ac = createElement("div");
		if (ua.win && ua.ie) {
			ac.innerHTML = obj.innerHTML;
		}
		else {
			var nestedObj = obj.getElementsByTagName(OBJECT)[0];
			if (nestedObj) {
				var c = nestedObj.childNodes;
				if (c) {
					var cl = c.length;
					for (var i = 0; i < cl; i++) {
						if (!(c[i].nodeType == 1 && c[i].nodeName == "PARAM") && !(c[i].nodeType == 8)) {
							ac.appendChild(c[i].cloneNode(true));
						}
					}
				}
			}
		}
		return ac;
	}
	
	/* Cross-browser dynamic SWF creation
	*/
	function createSWF(attObj, parObj, id) {
		var r, el = getElementById(id);
		if (el) {
			if (typeof attObj.id == UNDEF) { // if no 'id' is defined for the object element, it will inherit the 'id' from the alternative content
				attObj.id = id;
			}
			if (ua.ie && ua.win) { // IE, the object element and W3C DOM methods do not combine: fall back to outerHTML
				var att = "";
				for (var i in attObj) {
					if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries, like Object.prototype.toJSONString = function() {}
						if (i.toLowerCase() == "data") {
							parObj.movie = attObj[i];
						}
						else if (i.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							att += ' class="' + attObj[i] + '"';
						}
						else if (i.toLowerCase() != "classid") {
							att += ' ' + i + '="' + attObj[i] + '"';
						}
					}
				}
				var par = "";
				for (var j in parObj) {
					if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
						par += '<param name="' + j + '" value="' + parObj[j] + '" />';
					}
				}
				el.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + att + '>' + par + '</object>';
				objIdArr[objIdArr.length] = attObj.id; // Stored to fix object 'leaks' on unload (dynamic publishing only)
				r = getElementById(attObj.id);	
			}
			else if (ua.webkit && ua.webkit < 312) { // Older webkit engines ignore the object element's nested param elements: fall back to the proprietary embed element
				var e = createElement("embed");
				e.setAttribute("type", FLASH_MIME_TYPE);
				for (var k in attObj) {
					if (attObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
						if (k.toLowerCase() == "data") {
							e.setAttribute("src", attObj[k]);
						}
						else if (k.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							e.setAttribute("class", attObj[k]);
						}
						else if (k.toLowerCase() != "classid") { // Filter out IE specific attribute
							e.setAttribute(k, attObj[k]);
						}
					}
				}
				for (var l in parObj) {
					if (parObj[l] != Object.prototype[l]) { // Filter out prototype additions from other potential libraries
						if (l.toLowerCase() != "movie") { // Filter out IE specific param element
							e.setAttribute(l, parObj[l]);
						}
					}
				}
				el.parentNode.replaceChild(e, el);
				r = e;
			}
			else { // Well-behaving browsers
				var o = createElement(OBJECT);
				o.setAttribute("type", FLASH_MIME_TYPE);
				for (var m in attObj) {
					if (attObj[m] != Object.prototype[m]) { // Filter out prototype additions from other potential libraries
						if (m.toLowerCase() == "styleclass") { // 'class' is an ECMA4 reserved keyword
							o.setAttribute("class", attObj[m]);
						}
						else if (m.toLowerCase() != "classid") { // Filter out IE specific attribute
							o.setAttribute(m, attObj[m]);
						}
					}
				}
				for (var n in parObj) {
					if (parObj[n] != Object.prototype[n] && n.toLowerCase() != "movie") { // Filter out prototype additions from other potential libraries and IE specific param element
						createObjParam(o, n, parObj[n]);
					}
				}
				el.parentNode.replaceChild(o, el);
				r = o;
			}
		}
		return r;
	}
	
	function createObjParam(el, pName, pValue) {
		var p = createElement("param");
		p.setAttribute("name", pName);	
		p.setAttribute("value", pValue);
		el.appendChild(p);
	}
	
	/* Cross-browser SWF removal
		- Especially needed to safely and completely remove a SWF in Internet Explorer
	*/
	function removeSWF(id) {
		var obj = getElementById(id);
		if (obj && (obj.nodeName == "OBJECT" || obj.nodeName == "EMBED")) {
			if (ua.ie && ua.win) {
				if (obj.readyState == 4) {
					removeObjectInIE(id);
				}
				else {
					win.attachEvent("onload", function() {
						removeObjectInIE(id);
					});
				}
			}
			else {
				obj.parentNode.removeChild(obj);
			}
		}
	}
	
	function removeObjectInIE(id) {
		var obj = getElementById(id);
		if (obj) {
			for (var i in obj) {
				if (typeof obj[i] == "function") {
					obj[i] = null;
				}
			}
			obj.parentNode.removeChild(obj);
		}
	}
	
	/* Functions to optimize JavaScript compression
	*/
	function getElementById(id) {
		var el = null;
		try {
			el = doc.getElementById(id);
		}
		catch (e) {}
		return el;
	}
	
	function createElement(el) {
		return doc.createElement(el);
	}
	
	/* Updated attachEvent function for Internet Explorer
		- Stores attachEvent information in an Array, so on unload the detachEvent functions can be called to avoid memory leaks
	*/	
	function addListener(target, eventType, fn) {
		target.attachEvent(eventType, fn);
		listenersArr[listenersArr.length] = [target, eventType, fn];
	}
	
	/* Flash Player and SWF content version matching
	*/
	function hasPlayerVersion(rv) {
		var pv = ua.pv, v = rv.split(".");
		v[0] = parseInt(v[0], 10);
		v[1] = parseInt(v[1], 10) || 0; // supports short notation, e.g. "9" instead of "9.0.0"
		v[2] = parseInt(v[2], 10) || 0;
		return (pv[0] > v[0] || (pv[0] == v[0] && pv[1] > v[1]) || (pv[0] == v[0] && pv[1] == v[1] && pv[2] >= v[2])) ? true : false;
	}
	
	/* Cross-browser dynamic CSS creation
		- Based on Bobby van der Sluis' solution: http://www.bobbyvandersluis.com/articles/dynamicCSS.php
	*/	
	function createCSS(sel, decl) {
		if (ua.ie && ua.mac) {
			return;
		}
		var h = doc.getElementsByTagName("head")[0], s = createElement("style");
		s.setAttribute("type", "text/css");
		s.setAttribute("media", "screen");
		if (!(ua.ie && ua.win) && typeof doc.createTextNode != UNDEF) {
			s.appendChild(doc.createTextNode(sel + " {" + decl + "}"));
		}
		h.appendChild(s);
		if (ua.ie && ua.win && typeof doc.styleSheets != UNDEF && doc.styleSheets.length > 0) {
			var ls = doc.styleSheets[doc.styleSheets.length - 1];
			if (typeof ls.addRule == OBJECT) {
				ls.addRule(sel, decl);
			}
		}
	}
	
	function setVisibility(id, isVisible) {
		var v = isVisible ? "visible" : "hidden";
		if (isDomLoaded && getElementById(id)) {
			getElementById(id).style.visibility = v;
		}
		else {
			createCSS("#" + id, "visibility:" + v);
		}
	}

	/* Filter to avoid XSS attacks 
	*/
	function urlEncodeIfNecessary(s) {
		var regex = /[\\\"<>\.;]/;
		var hasBadChars = regex.exec(s) != null;
		return hasBadChars ? encodeURIComponent(s) : s;
	}
	
	/* Release memory to avoid memory leaks caused by closures, fix hanging audio/video threads and force open sockets/NetConnections to disconnect (Internet Explorer only)
	*/
	var cleanup = function() {
		if (ua.ie && ua.win) {
			window.attachEvent("onunload", function() {
				// remove listeners to avoid memory leaks
				var ll = listenersArr.length;
				for (var i = 0; i < ll; i++) {
					listenersArr[i][0].detachEvent(listenersArr[i][1], listenersArr[i][2]);
				}
				// cleanup dynamically embedded objects to fix audio/video threads and force open sockets and NetConnections to disconnect
				var il = objIdArr.length;
				for (var j = 0; j < il; j++) {
					removeSWF(objIdArr[j]);
				}
				// cleanup library's main closures to avoid memory leaks
				for (var k in ua) {
					ua[k] = null;
				}
				ua = null;
				for (var l in swfobject) {
					swfobject[l] = null;
				}
				swfobject = null;
			});
		}
	}();
	
	
	return {
		/* Public API
			- Reference: http://code.google.com/p/swfobject/wiki/SWFObject_2_0_documentation
		*/ 
		registerObject: function(objectIdStr, swfVersionStr, xiSwfUrlStr) {
			if (!ua.w3cdom || !objectIdStr || !swfVersionStr) {
				return;
			}
			var regObj = {};
			regObj.id = objectIdStr;
			regObj.swfVersion = swfVersionStr;
			regObj.expressInstall = xiSwfUrlStr ? xiSwfUrlStr : false;
			regObjArr[regObjArr.length] = regObj;
			setVisibility(objectIdStr, false);
		},
		
		getObjectById: function(objectIdStr) {
			var r = null;
			if (ua.w3cdom) {
				var o = getElementById(objectIdStr);
				if (o) {
					var n = o.getElementsByTagName(OBJECT)[0];
					if (!n || (n && typeof o.SetVariable != UNDEF)) {
							r = o;
					}
					else if (typeof n.SetVariable != UNDEF) {
						r = n;
					}
				}
			}
			return r;
		},
		
		embedSWF: function(swfUrlStr, replaceElemIdStr, widthStr, heightStr, swfVersionStr, xiSwfUrlStr, flashvarsObj, parObj, attObj) {
			if (!ua.w3cdom || !swfUrlStr || !replaceElemIdStr || !widthStr || !heightStr || !swfVersionStr) {
				return;
			}
			widthStr += ""; // Auto-convert to string
			heightStr += "";
			if (hasPlayerVersion(swfVersionStr)) {
				setVisibility(replaceElemIdStr, false);
				var att = {};
				if (attObj && typeof attObj === OBJECT) {
					for (var i in attObj) {
						if (attObj[i] != Object.prototype[i]) { // Filter out prototype additions from other potential libraries
							att[i] = attObj[i];
						}
					}
				}
				att.data = swfUrlStr;
				att.width = widthStr;
				att.height = heightStr;
				var par = {}; 
				if (parObj && typeof parObj === OBJECT) {
					for (var j in parObj) {
						if (parObj[j] != Object.prototype[j]) { // Filter out prototype additions from other potential libraries
							par[j] = parObj[j];
						}
					}
				}
				if (flashvarsObj && typeof flashvarsObj === OBJECT) {
					for (var k in flashvarsObj) {
						if (flashvarsObj[k] != Object.prototype[k]) { // Filter out prototype additions from other potential libraries
							if (typeof par.flashvars != UNDEF) {
								par.flashvars += "&" + k + "=" + flashvarsObj[k];
							}
							else {
								par.flashvars = k + "=" + flashvarsObj[k];
							}
						}
					}
				}
				addDomLoadEvent(function() {
					createSWF(att, par, replaceElemIdStr);
					if (att.id == replaceElemIdStr) {
						setVisibility(replaceElemIdStr, true);
					}
				});
			}
			else if (xiSwfUrlStr && !isExpressInstallActive && hasPlayerVersion("6.0.65") && (ua.win || ua.mac)) {
				isExpressInstallActive = true; // deferred execution
				setVisibility(replaceElemIdStr, false);
				addDomLoadEvent(function() {
					var regObj = {};
					regObj.id = regObj.altContentId = replaceElemIdStr;
					regObj.width = widthStr;
					regObj.height = heightStr;
					regObj.expressInstall = xiSwfUrlStr;
					showExpressInstall(regObj);
				});
			}
		},
		
		getFlashPlayerVersion: function() {
			return { major:ua.pv[0], minor:ua.pv[1], release:ua.pv[2] };
		},
		
		hasFlashPlayerVersion: hasPlayerVersion,
		
		createSWF: function(attObj, parObj, replaceElemIdStr) {
			if (ua.w3cdom) {
				return createSWF(attObj, parObj, replaceElemIdStr);
			}
			else {
				return undefined;
			}
		},
		
		removeSWF: function(objElemIdStr) {
			if (ua.w3cdom) {
				removeSWF(objElemIdStr);
			}
		},
		
		createCSS: function(sel, decl) {
			if (ua.w3cdom) {
				createCSS(sel, decl);
			}
		},
		
		addDomLoadEvent: addDomLoadEvent,
		
		addLoadEvent: addLoadEvent,
		
		getQueryParamValue: function(param) {
			var q = doc.location.search || doc.location.hash;
			if (param == null) {
				return urlEncodeIfNecessary(q);
			}
			if (q) {
				var pairs = q.substring(1).split("&");
				for (var i = 0; i < pairs.length; i++) {
					if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
						return urlEncodeIfNecessary(pairs[i].substring((pairs[i].indexOf("=") + 1)));
					}
				}
			}
			return "";
		},
		
		// For internal usage only
		expressInstallCallback: function() {
			if (isExpressInstallActive && storedAltContent) {
				var obj = getElementById(EXPRESS_INSTALL_ID);
				if (obj) {
					obj.parentNode.replaceChild(storedAltContent, obj);
					if (storedAltContentId) {
						setVisibility(storedAltContentId, true);
						if (ua.ie && ua.win) {
							storedAltContent.style.display = "block";
						}
					}
					storedAltContent = null;
					storedAltContentId = null;
					isExpressInstallActive = false;
				}
			} 
		}
	};
}();


/** 
* @filepath: /abcdm/abccom/sendmsg.js
* @created: Wed, 27 Nov 13 17:12:00 -0800
*/

var abcdm=abcdm||{abccom:{Utils:{}}};var abccom=abccom||{};abcdm.abccom.Utils=abcdm.abccom.Utils||{};abcdm.abccom.debugLog=abcdm.abccom.debugLog||function(bug){return function(){};};abcdm.abccom.Utils.MessageQueueTick=150;(function($){abcdm.abccom.Utils.sendMessage=function(message,proxy){var messenger,proxytable,messageDestination,origin;message.dom=document.domain.replace(/\./g,'');message.timestamp=new Date().valueOf();message.params=message.params||{};proxytable=abcdm.abccom.Utils.proxytable;if(proxy){proxyOrigin=proxy;}
if((typeof proxy==='string')&&(proxy.indexOf('proxy.html')<0)){if(typeof proxytable[proxy]==='string'){proxy=proxy+proxytable[proxy];}else{proxy=proxy+proxytable.defaultproxy;}}
if(typeof message.params==='object'){if((typeof message.params.proxyCallback!=='string')&&($('#abcProxyCallback').length>0)){message.params.proxyCallback=$('#abcProxyCallback').attr('title');}
message.pname=[];message.pval=[];$.each(message.params,function(i,val){message.pname.push(i);message.pval.push(val);});message.params=0;delete message.params;}
if(window.postMessage){if(message.MessDest){messageDestination=window.frames[message.MessDest];}else{messageDestination=window.parent;}
if(proxyOrigin){origin=proxyOrigin;}else{origin=(jQuery.url.param("dm"));}
if(!origin){if(window.self==window.parent){origin="https://ww2.abc.go.com";}else{origin=window.location.protocol+'//'+window.location.hostname;}
if(origin=="http://abc.go.com"){origin="https://ww2.abc.go.com";}
if(origin=="http://preview.abc.go.com"){origin="https://preview.abc.go.com";}}
abcdm.abccom.debugLog("============== sending from origin"+origin);abcdm.abccom.debugLog(JSON.stringify(message));messageDestination.postMessage(JSON.stringify(message),unescape(origin));return true;}
messenger=$('<iframe src="'+proxy+'?'+$.param(message,true)+'" width="1" height="1" style="display:none"></iframe>');$(document.body).append(messenger);messenger.load(function(e){setTimeout(function(){$(e.target).remove();},1000);});};}(jQuery));

/** 
* @filepath: /utils/jquery.timeago.js
* @created: Wed, 27 Nov 13 17:12:00 -0800
*/

(function($){var inWords,$t,refresh,prepareData,distance;$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp);}else if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp));}else{return inWords($.timeago.datetime(timestamp));}};$t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowFuture:false,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(distanceMillis){var $l=this.settings.strings,prefix=$l.prefixAgo,suffix=$l.suffixAgo,seconds,minutes,hours,days,years,words;if(this.settings.allowFuture){if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow;}
distanceMillis=Math.abs(distanceMillis);}
seconds=distanceMillis/1000;minutes=seconds/60;hours=minutes/60;days=hours/24;years=days/365;function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction,value=($l.numbers&&$l.numbers[number])||number;return string.replace(/%d/i,value);}
words=((seconds<45)&&substitute($l.seconds,Math.round(seconds)))||((seconds<90)&&substitute($l.minute,1))||((minutes<45)&&substitute($l.minutes,Math.round(minutes)))||((minutes<90)&&substitute($l.hour,1))||((hours<24)&&substitute($l.hours,Math.round(hours)))||((hours<48)&&substitute($l.day,1))||((days<30)&&substitute($l.days,Math.floor(days)))||((days<60)&&substitute($l.month,1))||((days<365)&&substitute($l.months,Math.floor(days/30)))||((years<2)&&substitute($l.year,1))||substitute($l.years,Math.floor(years));return $.trim([prefix,words,suffix].join(" "));},parse:function(bbts){return new Date(bbts*1000);},datetime:function(elem){var isTime=$(elem).get(0).tagName.toLowerCase()==="time",iso8601=isTime?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601);}});$.fn.timeago=function(){var self=this,$s;self.each(refresh);$s=$t.settings;if($s.refreshMillis>0){setInterval(function(){self.each(refresh);},$s.refreshMillis);}
return self;};refresh=function(){var data=prepareData(this);if(!isNaN(data.datetime)){$(this).text(inWords(data.datetime));}
return this;};prepareData=function(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if(text.length>0){element.attr("title",text);}}
return element.data("timeago");};inWords=function(date){return $t.inWords(distance(date));};distance=function(date){return(new Date().getTime()-date.getTime());};document.createElement("abbr");document.createElement("time");}(jQuery));

/** 
* @filepath: /register/loader2.js
* @created: Wed, 27 Nov 13 17:12:00 -0800
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Register=abcdm.abccom.Register||{};abcdm.abccom.Utils=abcdm.abccom.Utils||{};abcdm.abccom.Register.conf=abcdm.abccom.Register.conf||{};abcdm.abccom.Register.logoutRedirect=abcdm.abccom.Register.logoutRedirect||location.href;abcdm.abccom.Register.bypassConfirm=abcdm.abccom.Register.bypassConfirm||false;abcdm.abccom.SocialLink=abcdm.abccom.SocialLink||{};abcdm.abccom.SocialLink.regConf=abcdm.abccom.SocialLink.regConf||{};abcdm.abccom.Hook=abcdm.abccom.Hook||function(){};abcdm.abccom.debugLog=abcdm.abccom.debugLog||function(bug){return function(){};};abcdm.abccom.Overlay=abcdm.abccom.Overlay||function(){};(function($){var url,proxy,loaderLog,convertEV;loaderLog=abcdm.abccom.debugLog('loader');url='https://ww2.abc.go.com/service/regapi/user';proxy='https://ww2.abc.go.com';abcdm.abccom.Register.conf={'appId':false,'paramId':false};abcdm.abccom.Register.path={};abcdm.abccom.Register.regtypes=abcdm.abccom.Register.regtypes||{"sdlt":{"level":20,'narrow':true},"slt":{"level":40,'narrow':true},"lt":{"level":60,'narrow':false},"ht":{"level":80,'narrow':false},"defaults":{'narrow':true}};abcdm.abccom.Register.loginComplete=function(){};abcdm.abccom.Register.regComplete=function(){};abcdm.abccom.Register.getSwid=abcdm.abccom.Utils.getSwid;abcdm.abccom.Register.init=function(type,options){var src,callbackname,action,check,ulevel,touPathCheck,queryParams,appId,paramId,bypass,isStale,regOlay=function(src){var olayOptions={'src':src,'narrow':false};loaderLog('a: '+action+' t: '+type+' s: '+src);if(action==="register"&&abcdm.abccom.Register.regtypes&&abcdm.abccom.Register.regtypes[type]){loaderLog('type '+type+' used');if(abcdm.abccom.Register.regtypes[type].narrow){olayOptions.narrow=true;}}else if(abcdm.abccom.Register.regtypes.defaults.narrow){olayOptions.narrow=abcdm.abccom.Register.regtypes.defaults.narrow;loaderLog('action '+action+' not found, using defaults');}
abcdm.abccom.Overlay(olayOptions);},staleOk;options=options||{};staleOk=true;action=options.action||'upgrade';appId=options.appId||abcdm.abccom.Register.conf.appId;paramId=options.paramId||abcdm.abccom.Register.conf.paramId;bypass=$.isFunction(options.bypass)?options.bypass():abcdm.abccom.Register.bypassConfirm;isStale=abcdm.abccom.Utils.userStale();convertEV();loaderLog('action '+action);loaderLog('appId '+appId);if(!abcdm.abccom.Register.regtypes[type]){loaderLog('invalid reg type'+type);return false;}
if(action==='confirm'&&bypass){action='upgrade';}
src='https://ww2.abc.go.com/service/register/'+action+'/type/'+type;queryParams={'dm':location.protocol+'//'+location.host,'path':location.pathname,'pathparam':location.search||'','callback':'','loginProvider':'','applicationid':'','paramid':'','ios':abcdm.abccom.isMobile};if(typeof options.callback==='function'){loaderLog('adding callback');callbackname="regcallback";$('body').unbind(callbackname);$('body').bind(callbackname,options.callback);queryParams.callback=callbackname;}
if(typeof options.loginProvider==='string'){queryParams.loginProvider=options.loginProvider;}
if(appId!==false){queryParams.applicationid=appId;}
if(paramId!==false){queryParams.paramid=paramId;}
if(options.optins){queryParams.optins=options.optins;}
if(options.optionaltou){queryParams.opttou=options.optionaltou;}
src+='?'+$.param(queryParams);if(type==="login"){try{$.cookie('LOGIN',null,{path:'/',domain:'go.com'});}catch(e){}}
abcdm.abccom.Utils.MessageQueueInit();if($.cookie('___sluc_')){$.cookie('___sluc_copy',$.cookie('___sluc_'),{'domain':'go.com','path':'/'});}
if(action==='upgrade'){ulevel=abcdm.abccom.Utils.userCheck(type);if(options.staleCheck===true){if(isStale){staleOk=false;loaderLog('staleOk - stale cookie, treating as logged out');}}
check=staleOk&&(ulevel===true)&&abcdm.abccom.Utils.userVerified();touPathCheck=abcdm.abccom.Utils.touPathCheck();if(check===true){if(touPathCheck===true){if(typeof options.callback==='function'){loaderLog('directCallback');options.callback();}
return true;}
src=src.replace('register/upgrade','register/tou');}
if(check){loaderLog('upgrade '+type+" logged out"+check);}}else{loaderLog('not upgrade '+type);}
if(ulevel&&!abcdm.abccom.Utils.userVerified()&&typeof abcdm.abccom.Utils.userStale==='function'&&!abcdm.abccom.Utils.userStale()){loaderLog('action '+'verifynote');type='verifynote';src=src.replace('register/upgrade','register/'+type);}
regOlay(src);$('#messageQueue').unbind('PreVerifySuccess');$('#messageQueue').bind('PreVerifySuccess',function(e,data){loaderLog('preverify callback');abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){abcdm.abccom.Hook('hPreVerifySuccess');}});});$('#messageQueue').unbind('LoginSuccess');$('#messageQueue').bind('LoginSuccess',function(e,data){abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){abcdm.abccom.Hook('loginComplete');abcdm.abccom.Utils.globalCallback();if(data&&typeof data.callback==="string"&&abcdm.abccom.Utils.userVerified()!==false){$('body').trigger(data.callback,data);}}});abcdm.abccom.Overlay('close');});$('#messageQueue').unbind('RegSuccess');$('#messageQueue').bind('RegSuccess',function(e,data){abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){loaderLog('reg callback');abcdm.abccom.Hook('regComplete');abcdm.abccom.Utils.globalCallback();if(data&&typeof data.callback==="string"&&abcdm.abccom.Utils.userVerified()!==false){$('body').trigger(data.callback,data);}}});abcdm.abccom.Overlay('close');});$('#messageQueue').unbind('NewsletterSuccess');$('#messageQueue').bind('NewsletterSuccess',function(e,data){abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){loaderLog('newsletter callback');abcdm.abccom.Register.newsletterComplete();abcdm.abccom.Utils.globalCallback();if(data&&typeof data.callback==="string"){$('body').trigger(data.callback,data);}}});});$('#messageQueue').unbind('Closebox');$('#messageQueue').bind('Closebox',function(){abcdm.abccom.Overlay('close');});$('#messageQueue').bind('upgradeLogin',function(){regOlay(src);});$('#messageQueue').bind('upgradeForm',function(){regOlay(src);});$('#messageQueue').bind('upgradeExit',function(e,data){if(data&&typeof data.callback==="string"){$('body').trigger(data.callback,data);}});$('#messageQueue').bind('ParentRefresh',function(){window.location.reload();});$('#messageQueue').bind('Logout',function(){$.get("/service/register/logout");window.location.reload();});$('#messageQueue').bind('childFrameQueueReady',function(){if(options.user){abcdm.abccom.Register.sendPopulateForm(options.user);abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){if(typeof abcdm.abccom.SocialLink.logout==='function'){abcdm.abccom.SocialLink.logout();}}});}});$('#messageQueue').bind('OptTOU',function(e,data){abcdm.abccom.Overlay('close');loaderLog('OptTOU recieved');if(typeof data==="object"&&typeof data.touName==="string"&&typeof data.answer==="string"){if(data.answer==="yes"){abcdm.abccom.Hook('OptTOUyes',{'args':data});}else{abcdm.abccom.Hook('OptTOUno',{'args':data});}}});$('#messageQueue').bind('childFrameRedirect',function(e,data){data=data||{};try{var message={'trigger':'childFrameRedirectGo','MessDest':$('#abc-iframe').attr('name')};abcdm.abccom.Utils.sendMessage(message,proxy);}catch(ex){loaderLog(ex);}
$('#messageQueue').bind('childFrameRedirectGetData',function(){abcdm.abccom.Register.sendPopulateForm(data);abcdm.abccom.Hook('olayEnd',{'hName':'regDefault','hook':function(){if(typeof abcdm.abccom.SocialLink.logout==='function'){abcdm.abccom.SocialLink.logout();}}});});});$('body').bind('upgradeTest',function(){});};abcdm.abccom.Register.getUser=function(callback){try{abcdm.abccom.Utils.xdomain.callback=function(json){if(typeof callback==='function'){callback(json);}};abcdm.abccom.Utils.xdomain(url);}catch(ex){loaderLog(ex);}};abcdm.abccom.Register.getUserByCookies=abcdm.abccom.Utils.getUserByCookies;abcdm.abccom.Register.logout=function(){abcdm.abccom.Hook('logout');};abcdm.abccom.Register.sendPopulateForm=function(options){options=options||{};try{var message={'trigger':'socialLinkPopulateForm','params':options,'MessDest':$('#abc-iframe').attr('name')};abcdm.abccom.Utils.sendMessage(message,proxy);}catch(e){loaderLog(e);}};convertEV=function(){var usercookie,cookies;if(typeof $.cookie('__ev')==='string'){usercookie=$.cookie('__uc');cookies=abcdm.abccom.Utils.paramStringToObject(usercookie);cookies.v=1;cookies.s=unescape(cookies.s);$.cookie('__uc',$.param(cookies),{'path':'/','domain':'go.com'});$.cookie('__ev',null,{'path':'/','domain':'go.com'});}};$(document).ready(function(){var regTable=['slt','lt','ht'],regCalls=['login','register',''];abcdm.abccom.Hook('logout',{'hTiming':'default','hook':function(){loaderLog('logging out for reals!');var logoutUrl='https://ww2.abc.go.com/service/regapi/logout?redirect='+encodeURIComponent(abcdm.abccom.Register.logoutRedirect);location.href=logoutUrl;}});abcdm.abccom.Hook('logout',function(){Backplane.resetCookieChannel();});abcdm.abccom.Register.regTable=regTable;abcdm.abccom.Register.regCalls=regCalls;$.each(regCalls,function(k,rCall){$.each(regTable,function(k2,rType){$('body').delegate('a.abcReg'+rCall+rType,'click',function(e){var opt={},lDest=$(this).attr('href')||"";if(lDest==='#'){lDest='';}
if(rCall){opt.action=rCall;}
if(lDest){opt.callback=function(){window.location=lDest;};}
e.preventDefault();abcdm.abccom.Register.init(rType,opt);});});});$('body').delegate('a.abcReglogout','click',function(e){e.preventDefault();abcdm.abccom.Register.logout();});});}(jQuery));

/** 
* @filepath: /register/abcreg2a.js
* @created: Wed, 27 Nov 13 17:12:01 -0800
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Register=abcdm.abccom.Register||{};abcdm.abccom.Register.conf=abcdm.abccom.Register.conf||{};abcdm.abccom.SocialLink=abcdm.abccom.SocialLink||{};abcdm.abccom.SocialLink.conf=abcdm.abccom.SocialLink.conf||{};abcdm.abccom.SocialLink.regConf=abcdm.abccom.SocialLink.regConf||{};abcdm.abccom.SocialLink.authConf=abcdm.abccom.SocialLink.authConf||{};abcdm.abccom.Optin=abcdm.abccom.Optin||{};abcdm.abccom.Hook=abcdm.abccom.Hook||function(){};abcdm.abccom.abcreg=abcdm.abccom.abcreg||{};(function($){abcdm.abccom.Register.conf.appId='abccom';abcdm.abccom.Register.processLoginInterrupt=function(callback){if(typeof callback==='function'){callback();callback=false;}};abcdm.abccom.Register.path={'/shows/lost/fan-art-wall':{'tou':{'id':'2115'}}};abcdm.abccom.abcreg.updateSignInArea=function(options){var username,swid,usernameLink;options=options||{};username=abcdm.abccom.Register.getUserByCookies();if(username){usernameLink='Welcome, '+username;$('#span-register-id').html(usernameLink);$('#div-register .out').hide();$('#div-register, #div-register .in').show();}
else{$('#div-register .in').hide();$('#div-register, #div-register .out').show();}
if(typeof abcdm.abccom.SocialLink.authInit==='function'){options.abcUser=username;abcdm.abccom.SocialLink.authInit(options);}
abcdm.abccom.abcreg.updateSignInAreaSocnetInit('facebook');abcdm.abccom.abcreg.updateSignInAreaSocnetInit('myspace');abcdm.abccom.abcreg.updateSignInAreaSocnetInit('twitter');if($('.joinModule').length!==0){$('.joinModuleStep1').hide();$('.joinModuleStep2').hide();$('.joinModuleStep3').show();}};abcdm.abccom.Register.newsletterComplete=abcdm.abccom.abcreg.updateSignInArea;abcdm.abccom.abcreg.mzingaDropCookie=function(callback){var username,swid,intervalId,timeoutId,cookie;username=abcdm.abccom.Utils.getUserByCookies();swid=abcdm.abccom.Utils.getSwid();$.cookie('LOGIN',null,{path:'/',domain:'go.com'});if(username&&swid&&abcdm.abccom.Utils.userCheck('lt')){$('body').append('<img id="img-proxy-mg" src="https://ww2.abc.go.com/service/regapi/mzinga-sync" border="0" style="display: none;" width="1" height="1" />');timeoutId=setTimeout(function(){clearTimeout(timeoutId);if(typeof callback==='function'){callback();callback=false;}},5000);intervalId=setInterval(function(){var loggedIn=$.cookie('LOGIN');if(loggedIn!==null){loggedIn=loggedIn.match(/^\d\|(p|g)/i)[1];if(loggedIn.toLowerCase()=='p'){loggedIn=true;}else{loggedIn=false;}}
if(loggedIn){clearInterval(intervalId);clearTimeout(timeoutId);if(typeof callback==='function'){callback();callback=false;}}},500);}
else{if(typeof callback==='function'){callback();callback=false;}}};abcdm.abccom.SocialLink.conf.APIKey='2_f-d5x_faL7_QG1jvPIy4yTV3WiuAryaOtEYnylKC2IYTXyA0H1Fp1xBRG22aVhdz';abcdm.abccom.SocialLink.regConf.type='sdlt';abcdm.abccom.SocialLink.regConf.onLogin=abcdm.abccom.abcreg.updateSignInArea;abcdm.abccom.SocialLink.regConf.onConnect=abcdm.abccom.abcreg.updateSignInArea;if(top===self){abcdm.abccom.SocialLink.authConf.height=20;abcdm.abccom.SocialLink.authConf.width=89;abcdm.abccom.SocialLink.authConf.UIConfig='<config><body><texts color="Transparent"><links color="Transparent"></links></texts><controls><snbuttons buttonsize="15"></snbuttons></controls><background background-color="Transparent" frame-color="Transparent"></background></body></config>';}
abcdm.abccom.Utils.postOverlay=function(){try{abcdm.abccom.Player.resume();autoScroll();}catch(e){}};abcdm.abccom.Optin=function(optin){if(typeof optin!=="undefined"){var options={'action':'optins','optins':optin,'appId':'abccom_newsletter_'+optin};abcdm.abccom.Register.init('slt',options);}};abcdm.abccom.abcreg.updateSignInAreaSocnetInit=function(provider){var username=abcdm.abccom.Register.getUserByCookies(),connectedClass='connected';if(provider){$('#div-register .btn-login-'+provider).unbind('click');if(username&&abcdm.abccom.SocialLink.isLoggedIn(provider)===true){$('#div-register .btn-login-'+provider).addClass(connectedClass);}else{$('#div-register .btn-login-'+provider).removeClass(connectedClass);$('#div-register .btn-login-'+provider).click(function(e){if(e){e.preventDefault();}
abcdm.abccom.SocialLink.login(provider);});}}};$(document).ready(function(){abcdm.abccom.Hook("preOverlay",function(){abcdm.abccom.Player.pause();clearTimeout(theTimer);});abcdm.abccom.Hook('loginComplete',{'hTiming':'default','hook':function(){abcdm.abccom.abcreg.updateSignInArea();abcdm.abccom.Register.loginComplete();}});abcdm.abccom.Hook('regComplete',{'hTiming':'default','hook':function(){abcdm.abccom.abcreg.updateSignInArea();abcdm.abccom.Register.loginComplete();}});abcdm.abccom.Hook('hPreVerifySuccess',{'hTiming':'default','hook':function(){abcdm.abccom.Utils.closeOverlay();abcdm.abccom.Utils.globalCallback();abcdm.abccom.abcreg.updateSignInArea();}});abcdm.abccom.Hook('abcHomepageSlideAdvance',{'hook':function(obj){var omniObj=new Object();omniObj.eventName='SLIDEVIEW_HP';omniObj.slideData=obj.slideshowmoduleid+':'+obj.slotnumber+':'+obj.contentid+':'+obj.slidetitle;vendors.Omniture.logEvent(omniObj);}});var oTrackArray=[['syndicateNewsfeedFormInit',"event17",'sharingstart_',true],['syndicateNewsfeedSuccess',"event18",'sharingdone_',true],['syndicateStatusFormInit',"event17",'sharingstart_',true],['syndicateStatusSuccess',"event18",'sharingdone_',true],['syndicateEmailFormInit',"event17",'sharingstart_email_',false],['syndicateEmailSuccess',"event18",'sharingdone_email_',false],['donateStatusFormLoaded',"event17",'sharingstart_',true],['donateStatusSuccess',"event18",'sharingdone_',true],['OptTOUyes','event14','LoyaltyOptIn_'],['OptTOUno','event19','LoyaltyOptOut_'],['recapRead','event20','recapRead_'],['galleryViewThreshold','event20','GalleryView_']];$.each(oTrackArray,function(i,val){abcdm.abccom.Hook(val[0],{"hName":"omni","hook":function(options){options=options||{};var provider=options.provider||'unknown',oString=val[2];if(val[3]){oString=val[2]+provider+'_';}
if(s_omni&&typeof val[1]==="string"){s_omni.linkTrackEvents=val[1];s_omni.linkTrackVars="prop1,prop2,prop3,prop4,prop5,prop6,prop13,prop14,prop18,prop_37,eVar2,eVar8,eVar15,eVar20,eVar23,eVar27,events,products";s_omni.events=val[1];s_omni.tl($(this),'o',oString+location.href);}}});});});}(jQuery));

/** 
* @filepath: /global.js
* @created: Wed, 27 Nov 13 17:12:01 -0800
*/

var redirectToAbcStandard;(function($){$(document).ready(function(){try{abcdm.abccom.abcreg.updateSignInArea({'pageLoad':true});}catch(e){}
$('h1.logo a, div.logo a, .showLogo a').ifixpng();try{if($('body.mobile').length===0&&$('.gutterAd a, .gutterAd iframe, , .gutterAd embed, , .gutterAd object').length>0){$('body').css({'overflow-x':'hidden'});$('.gutterAd').addClass('background');abcdm.abccom.Hook('digAdGutters');}}catch(e){}
abcdm.abccom.Hook('digAdLRGutters',{"hTiming":'default','hook':function(options){if(typeof options==='object'&&options.leftImage&&options.rightImage&&options.leftLink&&options.rightLink){if($('body.mobile').length===0){try{$('.gutterAd').html('<a><img /></a>')
if(options.internalAd!==true){$('.gutterAd a').attr('target','_blank');}
$('#leftGutter img').attr('src',options.leftImage);$('#rightGutter img').attr("src",options.rightImage);$('#leftGutter a').attr("href",options.leftLink);$('#rightGutter a').attr("href",options.rightLink);$('.gutterAd').addClass('background');$('body').css({'overflow-x':'hidden'});}catch(e){}}}}});abcdm.abccom.Hook('digAdBackground',{'hook':function(){if($('body.mobile').length===0){$('.gutterAd').addClass('background');$('body').css({'overflow-x':'hidden'});}}});if($(".searchInput").length){try{$(".searchInput").autocomplete('/shows/list/index?noLayout=1');}catch(e){}}});}(jQuery));

/** 
* @filepath: /share/share-global.js
* @created: Wed, 27 Nov 13 17:12:01 -0800
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Share=abcdm.abccom.Share||{};abcdm.abccom.Share.syndicateparams=abcdm.abccom.Share.syndicateparams||{};abcdm.abccom.Share.emailparams=abcdm.abccom.Share.emailparams||{};abcdm.abccom.Facebook=abcdm.abccom.Facebook||{};abcdm.abccom.Player=abcdm.abccom.Player||{};(function($){var shareSubmit,shareRetrieve,staticCountUpdate,shareCountUpdate,pagetitle,pagedescription,image;$(document).ready(function(){$.each(abcdm.abccom.Share.syndicateparams,function(index,values){if(typeof values.syndicate==='undefined'){return false;}
if(values.syndicate.pagetitle){pagetitle=values.syndicate.pagetitle;}else if($('meta[property="og:title"]').attr("content")){pagetitle=$('meta[property="og:title"]').attr("content");}else{pagetitle=' ';}
abcdm.abccom.Share.syndicateparams[index].syndicate.pagetitle=pagetitle;if(values.syndicate.pagedescription){pagedescription=values.syndicate.pagedescription;}else if($('meta[property="og:description"]').attr("content")){pagedescription=$('meta[property="og:description"]').attr("content");}else{pagedescription=' ';}
abcdm.abccom.Share.syndicateparams[index].syndicate.pagedescription=pagedescription;if(values.syndicate.image){image=values.syndicate.image;}else if($('meta[property="og:image"]').attr("content")){image=$('meta[property="og:image"]').attr("content");}else{image=' ';}
abcdm.abccom.Share.syndicateparams[index].syndicate.image=image;shareRetrieve({'contentid':index,'urls':abcdm.abccom.Share.emailparams[index].url});});abcdm.abccom.Hook('syndicateNewsfeedSuccess',{"hook":function(obj){if(obj.provider&&obj.context&&obj.context.contentid){shareSubmit(obj.provider,obj.context.contentid);staticCountUpdate(obj.context.contentid,obj.provider);abcdm.abccom.Facebook.getStats({'urls':abcdm.abccom.Share.emailparams[obj.context.contentid].url,'contentid':obj.context.contentid});}}});$('.share_facebook, .share_twitter, .share_myspace').click(function(){var contentid=$(this).parents('.abcShareBar').attr('id').replace('abcShareBar-','');var provider=$(this).attr("class").substring($(this).attr("class").indexOf("_")+1,$(this).attr("class").length);var params={'context':{'contentid':contentid},'title':abcdm.abccom.Share.syndicateparams[contentid].title,'register':{'required':false},'description':abcdm.abccom.Share.syndicateparams[contentid].description,'syndicate':{'message':abcdm.abccom.Share.syndicateparams[contentid].syndicate.message,'cid':abcdm.abccom.Share.syndicateparams[contentid].syndicate.cid,'title':{'text':abcdm.abccom.Share.syndicateparams[contentid].syndicate.pagetitle,'link':abcdm.abccom.Share.emailparams[contentid].url},'description':abcdm.abccom.Share.syndicateparams[contentid].syndicate.pagedescription,'action':{'text':'See More','link':abcdm.abccom.Share.emailparams[contentid].url},'media':{'type':'image','image':{'src':abcdm.abccom.Share.syndicateparams[contentid].syndicate.image,'href':abcdm.abccom.Share.emailparams[contentid].url}}}};abcdm.abccom.SocialLink.syndicate.newsfeed(provider,params);});$('.share_email').click(function(){var campaign,params,url;var contentid=$(this).parents('.abcShareBar').attr('id').replace('abcShareBar-','');campaign=abcdm.abccom.Share.emailparams[contentid].campaign;url=abcdm.abccom.Share.emailparams[contentid].url;url=(url.indexOf('?')!=-1)?url+'&':url+'?';params={'title':abcdm.abccom.Share.emailparams[contentid].title,'description':abcdm.abccom.Share.emailparams[contentid].description,'form':{'input':[{'name':'sender','id':'sender','label':'Your Name:','error':'Your name is required.'},{'name':'recipient','id':'recipient','label':'Your Friend\'s Name:','error':'Your Friend\'s name is required.'},{'name':'recipientEmail','id':'recipientEmail','label':'Your Friend\'s Email:','error':'A valid email address is required.'},{'name':'message','id':'message','label':'Your Message:','textarea':true},{"name":"title","id":"title","value":abcdm.abccom.Share.syndicateparams[contentid].syndicate.pagetitle,'hidden':true},{'name':'url','id':'url','value':url+'cid='+abcdm.abccom.Share.syndicateparams[contentid].syndicate.cid,'hidden':true},{'name':'description','id':'description','value':abcdm.abccom.Share.syndicateparams[contentid].syndicate.pagedescription,'hidden':true}]},'thankYouTitle':abcdm.abccom.Share.emailparams[contentid].thankyou,'thankYouDescription':abcdm.abccom.Share.emailparams[contentid].thankyoudesc};abcdm.abccom.SocialLink.syndicate.email(campaign,params);});abcdm.abccom.Facebook.getStatsCB=abcdm.abccom.Share.getFacebookStats;});shareSubmit=function(provider,contentid){$.post('/service/sociallink/sharesubmit',{pageid:contentid,service:provider},'json');};shareRetrieve=function(options){$.getJSON('/service/sociallink/shareretrieve?pageid='+options.contentid+'&format=json&jsoncallback=?',function(data){if(data){var result={'facebook':data[0].voteCount,'twitter':data[1].voteCount,'myspace':data[2].voteCount};shareCountUpdate(options.contentid,result);abcdm.abccom.Facebook.getStats({'urls':options.urls,'contentid':options.contentid});}else{shareCountUpdate(options.contentid);}});};staticCountUpdate=function(contentid,provider){var num;var oldnum=$('#abcShareBar-'+contentid+' .count_'+provider+' span').text();if(oldnum.length>0){num=parseInt(oldnum,16)+1;}else{num=1;}
var result={};result[provider]=num;shareCountUpdate(contentid,result);};shareCountUpdate=function(contentid,data){var shareDiv;shareDiv=$('#abcShareBar-'+contentid+' .abcShareSyndicate');if(data){$.each(data,function(index,value){var providerDiv=shareDiv.find('.count_'+index);if(value>0){providerDiv.addClass('counts');providerDiv.prev().addClass('counts');providerDiv.html('<span></span>');providerDiv.find('span').text(value);}else{providerDiv.remove('span');}});}else{shareDiv.find('dt').removeClass('counts');shareDiv.find('dd').removeClass('counts');shareDiv.find('dd').children().remove();}};abcdm.abccom.Share.getFacebookStats=function(response,pageid){if(response[0].share_count&&response[0].share_count>0){shareCountUpdate(pageid,{'facebook':response[0].share_count});}};abcdm.abccom.Share.shareChangeLink=function(options){var iframesrc,regex,match,sharebar,shareid;var domain='';options=options||{};if(options.clipid&&options.link){if(options.shareitem){sharebar=$(options.shareitem);}else{sharebar=$('.abcShareBar');}
shareid=sharebar.attr('id').replace('abcShareBar-','');sharebar.attr('id','abcShareBar-'+options.clipid);abcdm.abccom.Share.syndicateparams[options.clipid]=abcdm.abccom.Share.syndicateparams[shareid];abcdm.abccom.Share.emailparams[options.clipid]=abcdm.abccom.Share.emailparams[shareid];if(options.title){abcdm.abccom.Share.syndicateparams[options.clipid].syndicate.pagetitle=options.title;}
if(options.description){abcdm.abccom.Share.syndicateparams[options.clipid].syndicate.pagedescription=options.description;}
if(options.image){abcdm.abccom.Share.syndicateparams[options.clipid].syndicate.image=options.image;}
if(options.link){abcdm.abccom.Share.emailparams[options.clipid].url=options.link;}
iframesrc=sharebar.find('.abc-facebook-like iframe').attr('src');regex=new RegExp("[?&]href(?:=(http:\/\/[a-z.]+go.com)([^&]*))?","i");match=regex.exec(decodeURIComponent(iframesrc));if(typeof match[1]!=="undefined"&&options.link.indexOf('http')<0){domain=match[1];}
var fbLikeHtml=sharebar.find('.abc-facebook-like').html();fbLikeHtml=fbLikeHtml.replace(/(href=".+?)+(")/i,'href="'+encodeURIComponent(domain+options.link)+'"');sharebar.find('.abc-facebook-like').html(fbLikeHtml);abcdm.abccom.Facebook.getStats({'urls':domain+options.link});shareRetrieve({'contentid':options.clipid});}};}(jQuery));

/** 
* @filepath: /facebook/facebook.js
* @created: Wed, 27 Nov 13 17:12:01 -0800
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Facebook=abcdm.abccom.Facebook||{};abcdm.abccom.Facebook.conf=abcdm.abccom.Facebook.conf||{};(function($){abcdm.abccom.Facebook.conf={'key':'61322a4bc1bcc2d949c026fcc2defd99','receiver':'/html/facebook/xd_receiver.htm'};abcdm.abccom.Facebook.getStats=function(options){options=options||{};FB.init(abcdm.abccom.Facebook.conf.key,abcdm.abccom.Facebook.conf.receiver);FB.api({method:'links.getStats',urls:options.urls},function(response){abcdm.abccom.Facebook.getStatsCB(response,options.pageid);});};abcdm.abccom.Facebook.getStatsCB=function(response){};}(jQuery));