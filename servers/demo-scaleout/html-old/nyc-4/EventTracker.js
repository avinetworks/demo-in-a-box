
NYTD = window.NYTD || {};

NYTD.EventTracker = (function () {
    'use strict';
    var etHost; 
    var lastEventTime = 0;
    var nextCallbackNum = 0;
    var sourceApp = "nyt4"; // default unless ...
    
    etHost = (function () {
       var
         etHost = "et.nytimes.com",
         hosts = ["et.stg.use1.nytimes.com", "et.dev.use1.nytimes.com"];

        if (NYTD !== undefined) {
            // Use the NYTD.env, if available.
            if (NYTD.env !== undefined) {
                if (NYTD.env === "stg" || NYTD.env === "staging") {
                    etHost = hosts[0];
                } else if (NYTD.env === "dev" || NYTD.env === "development") {
                    etHost = hosts[1];
                }
            } else if (NYTD.Host !== undefined && typeof NYTD.Host.getEnv === "function") {
                // Use NYTD.Host.getEnv() function if available.
                if (NYTD.Host.getEnv() === "stg" || NYTD.Host.getEnv() === "staging") {
                   etHost = hosts[0];
                } else if (NYTD.Host.getEnv() === "dev" || NYTD.Host.getEnv() === "development") {
                   etHost = hosts[1];
                }
            } else {
                // Last resource, checks the hostname.
                if (/\.stg\.nytimes\.com$/.test(location["hostname"]) === true) {
                   etHost = hosts[0];
                } else if (/\.dev\.nytimes\.com$/.test(location["hostname"]) === true) {
                   etHost = hosts[1];
                }
            }
        }

      // Return the event tracker hostname.
      return etHost;
    })();  

    var buildUrl = function (url, params, useFieldOverwrites) {
        var key, value, qs = '', overwrites = {};

        if(useFieldOverwrites === true && window.NYTD &&  window.NYTD.hasOwnProperty('AnalyticsOverrides') === true 
            && typeof window.NYTD.AnalyticsOverrides === 'object') {
            overwrites = copyObject(window.NYTD.AnalyticsOverrides);
        }
        
        for (key in params) { 
            if (params.hasOwnProperty(key) === true) {
                value = params[key];

                if(overwrites.hasOwnProperty(key) === true) {
                    value = overwrites[key];
                }

                qs += (qs ? '&' : '') + key + '=' + encodeURIComponent(value);
            }    
        }

        if (qs.length > 0) {
            return url + '?' + qs;
        } else {
            return url;
        }
    };

    var copyObject = function (obj) {
        var key;
        var objCopy = {};
        for (key in obj) if (obj.hasOwnProperty(key)) {
            objCopy[key] = obj[key];
        }
        return objCopy;
    };

    var stringifyJson = JSON ? JSON.stringify : function (obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            if (t == "string") obj = '"'+obj+'"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n]; t = typeof(v);
                if (t == "string") v = '"'+v+'"';
                else if (t == "object" && v !== null) v = stringifyJson(v);
                json.push((arr ? "" : '"' + n + '":') + String(v));
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    };

    var extractPageMetaTags = function (obj) {
        var name, nameLower, content, i;
        var tags = document.getElementsByTagName('meta');
        var whiteListObj = {PT:"", CG:"", SCG:"", byl:"", tom:"", hdl:"", ptime:"", cre:"", articleid:""};
        obj = obj || {};
        for (i = 0; i < tags.length; i += 1) {
            name = tags[i].getAttribute('name');
            content = tags[i].getAttribute('content');
            if (typeof name === 'string' && typeof content === 'string') {
                if (whiteListObj.hasOwnProperty(name)) {
                    whiteListObj[name] = content;
                }
                // read source app meta tag info
                if (name === 'sourceApp' && content !== sourceApp) {
                    obj.sourceApp = sourceApp = content;
                }
            }
            
        }
        
        return obj.pageMetaData = stringifyJson(whiteListObj);
    };

    // Retrieve addtional information.
    var additionalClientData = function (obj) {
        var
            date,
            data;
            
        data = {
            // User language.
            'ul': (function () {
                var
                    ul;
                if (navigator.appName === 'Netscape') {
                    ul = navigator.language;
                } else {
                    ul = navigator.userLanguage;
                }
                return ul;
            }()),
            // Javascript is enabled.
            'js': 'Yes',
            // Javascript version.
            'jv': (function () {
                var
                    agt = navigator.userAgent.toLowerCase(),
                    major = parseInt(navigator.appVersion, 10),
                    mac = (agt.indexOf("mac") != -1),
                    ff = (agt.indexOf("firefox") != -1),
                    ff0 = (agt.indexOf("firefox/0.") != -1),
                    ff10 = (agt.indexOf("firefox/1.0") != -1),
                    ff15 = (agt.indexOf("firefox/1.5") != -1),
                    ff2up = (ff && !ff0 && !ff10 & !ff15),
                    nn = (!ff && (agt.indexOf("mozilla") != -1) && (agt.indexOf("compatible") == -1)),
                    nn4 = (nn && (major === 4)),
                    nn6up = (nn && (major >= 5)),
                    ie = ((agt.indexOf("msie") != -1) && (agt.indexOf("opera") == -1)),
                    ie4 = (ie && (major == 4) && (agt.indexOf("msie 4") != -1)),
                    ie5up = (ie && !ie4),
                    op = (agt.indexOf("opera") != -1),
                    op5 = (agt.indexOf("opera 5") != -1 || agt.indexOf("opera/5") != -1),
                    op6 = (agt.indexOf("opera 6") != -1 || agt.indexOf("opera/6") != -1),
                    op7up = (op && !op5 && !op6),
                    jv = "1.1";

                if (ff2up === true) {
                    jv = "1.7";
                } else if (ff15 === true) {
                    jv = "1.6";
                } else if (ff0 === true || ff10 === true || nn6up === true || op7up === true) {
                    jv = "1.5";
                } else if ((mac === true && ie5up === true) || op6 === true) {
                    jv = "1.4";
                } else if (ie5up === true || nn4 === true || op5 === true) {
                    jv = "1.3";
                } else if (ie4 === true) {
                    jv = "1.2";
                }
                return jv;
            }()),
            // Flash enable is false until detection.
            'fi': 'No'
        };

        // Timezone.
        date = new Date();
        data.tz = date.getTimezoneOffset() / 60 * -1;
        data.bh = date.getHours();

        // Color depth and screen resolution.
        if (typeof(screen) === 'object') {
            // Color depth.
            if (navigator.appName === 'Netscape') {
                data.cd = screen.pixelDepth;
            } else {
                data.cd = screen.colorDepth;
            }

            // Screen resolution.
            data.sr = screen.width + 'x' + screen.height;
        }

        // Browser size.
        if (parseInt(navigator.appVersion, 10) > 3) {
            if ((navigator.appName === "Microsoft Internet Explorer") && document.body) {
                data.bs = document.body.offsetWidth + "x" + document.body.offsetHeight;
            } else if (navigator.appName === "Netscape") {
                data.bs = window.innerWidth + "x" + window.innerHeight;
            }
        }

        // Check if is Java enable.
        if (typeof(navigator.javaEnabled()) === "boolean") {
            data.jo = navigator.javaEnabled() ? "Yes" : "No";
        }

        // Flash detection and version.
        (function () {
            var
                i,
                flash;

            if (window.ActiveXObject) {
                for (i = 10; i > 0; i -= 1) {
                    try {
                        flash = new ActiveXObject("ShockwaveFlash.ShockwaveFlash." + i);
                        // Flash enable.
                        data.fi = "Yes";
                        // Flash version.
                        data.fv = i + ".0";
                        break;
                    }
                    catch (e) {}
                }
            } else if (navigator.plugins && navigator.plugins.length) {
                for (i = 0; i < navigator.plugins.length; i += 1) {
                    if (navigator.plugins[i].name.indexOf('Shockwave Flash') != -1) {
                        // Flash enable.
                        data.fi = "Yes";
                        // Flash version.
                        data.fv = navigator.plugins[i].description.split(" ")[2];
                        break;
                    }
                }
            }
        }());

        // Detect the screen orientation.
        if (window.matchMedia) {
            if (window.matchMedia("(orientation: portrait)").matches === true) {
                data.or = 'port';
            } else if (window.matchMedia("(orientation: landscape)").matches === true) {
                data.or = 'land';
            }
        }

        // Return the object.
        obj.additionalClientData = stringifyJson(data);
        return obj;
    };

    return function () {
        var trackNow, agentId;
        var that = this;
        var datumId = null;
        var parentDatumId = null;
        var firedFirstEvent = false;
        var scripts = [];
        var queue = [];
        var newData = [];
        
        if (this instanceof NYTD.EventTracker === false) {
            return new NYTD.EventTracker();
        }

        trackNow = function (evt, options) {
            var scriptElem, oldScriptElem;
            var callbackNum = nextCallbackNum;
            var useOverwrites = options && options.useFieldOverwrites === true ? true : false;

            nextCallbackNum += 1;

            NYTD.EventTracker['cb' + callbackNum] = function (result) {
                var i;
                delete NYTD.EventTracker['cb' + callbackNum];
                if (result.status && result.status === 'OK') {
                    if (!datumId && options.buffer) {
                        datumId = result.datumId;
                        for (i = 0; i < queue.length; i += 1) {
                            trackNow(queue[i].evt, queue[i].options);
                        }
                    }
                    if (!agentId) {
                        agentId = result.agentId;
                    }
                    if (options.callback) {
                        options.callback(null, result);
                    }
                } else {
                    if (options.callback) {
                        options.callback(new Error('Event tracking failed'), 
                            result);
                    }
                }
            };

            evt = copyObject(evt);
            if (!options.buffer) {
                evt.instant = '1';
            }
            evt.callback = 'NYTD.EventTracker.cb' + callbackNum;
            if (datumId && options.buffer) {
                evt.datumId = datumId;
            }

            if (options.sendMeta) {
                extractPageMetaTags(evt);
            }

            if (options.collectClientData) {
                additionalClientData(evt);
            }

            if (agentId) {
                evt.agentId = agentId;
            }

            scriptElem = document.createElement('script');
            scriptElem.src = buildUrl((document.location.protocol || 'http:') +
                '//'+etHost+'/', evt, useOverwrites);
            document.body.appendChild(scriptElem);

            scripts.push(scriptElem);
            if (scripts.length > 5) {
                oldScriptElem = scripts.shift();
                document.body.removeChild(oldScriptElem);
            }
        };

        this.track = function (evt, options) {
            var newDataItem, key;
            options = options || {};
            if (!options.background) {
                lastEventTime = (new Date()).valueOf();
            }
            
            if(evt.subject !== 'page' && this.getParentDatumId() !== null) {
                evt.parentDatumId = this.getParentDatumId();
            }

            evt.sourceApp = sourceApp;

            if(newData.length > 0) {
                for (var i = 0; i < newData.length; i++) {
                    newDataItem = newData[i];
                    for (key in newDataItem) if (newDataItem.hasOwnProperty(key)) {
                        evt[key] = newDataItem[key];
                    }
                }
                newData = []; // empty the array out for future usage
            }
            
            if (!options.buffer) {
                trackNow(evt, options);
            } else if (datumId || !firedFirstEvent) {
                firedFirstEvent = true;
                trackNow(evt, options);
            } else {
                queue.push({
                    evt: copyObject(evt),
                    options: copyObject(options)
                });
            }
        };
        
        this.updateData = function (oArg) {
            if(oArg instanceof Array) {
                newData = newData.concat(oArg)
            } else if(typeof oArg === 'object') {
                newData.push(oArg);   
            }
            // if flag to short circuit check here
        };

        this.hasTrackedEventRecently = function () {
            return ((new Date()).valueOf() - lastEventTime) < 960000;
        };

        this.getDatumId = function () {
            return datumId;
        };
        
        this.getParentDatumId = function() {
            if(parentDatumId === null && 
                NYTD.pageEventTracker && NYTD.pageEventTracker.getDatumId() !== null) {
                parentDatumId = NYTD.pageEventTracker.getDatumId();
            }
            return parentDatumId;
        };
        
        this.pixelTrack = function (evt, qs) {
            var imgsrc, validEvt, validQs;
            validEvt = (function (e) {
                var k;
                if (typeof e !== 'object') {
                    return false;
                }
                for (k in e) if (e.hasOwnProperty(k)) {
                    return true;
                }
                return false;
            }(evt));
            validQs = (typeof qs === 'string' && qs !== '');
            if (!validEvt && !validQs) {
                return;
            }
            imgsrc = (document.location.protocol || 'http:') + '//' + etHost +
                    '/pixel';
            if (validEvt) {
                imgsrc = buildUrl(imgsrc, evt);
            }
            if (validQs) {
                imgsrc += ((imgsrc.indexOf('?') === -1 ? '?' : '&') + qs);
            }
            new Image().src = imgsrc;
        };

        this.stringifyJson = stringifyJson;
        

    };
})();

NYTD.pageEventTracker = (function (updateFrequency) {
    'use strict';
    var tracker = new NYTD.EventTracker();
    var impressions = [];
    var timeoutHandle;

    var url = document.location.href;
    var assetUrl = (function(u) {
        var href = u || document.location.href,
            links = document.getElementsByTagName("link");
        if(links && links.length > 0) {
            //loop the links and find
            for (var i=0; i < links.length; i++) {
                var link = links[i]; 
                if(link && link.rel === "canonical") {
                    href = link.href;
                    break;
                }
            }
        }
        return href;    

    })(url);

    tracker.addModuleImpression = function(module) {
        impressions.push(module);
    };

    var startTime = (new Date()).valueOf();
    updateFrequency = updateFrequency || 60000;
    var bgTrackerTrack = function () {
        tracker.track({
            subject: 'page',
            url: url,
            assetUrl: assetUrl,
            referrer: document.referrer,
            impressions : tracker.stringifyJson(impressions),
            totalTime: (new Date()).valueOf() - startTime
        }, {
            background: true,
            useFieldOverwrites: true,
            buffer: true,
            callback: setUpdateTimeout
        });
    };
    var setUpdateTimeout = function () {
        timeoutHandle = setTimeout(function () {
            if (!tracker.getDatumId()) {
                setUpdateTimeout();
                return;
            } else if (!tracker.hasTrackedEventRecently()) {
                return;
            }
            bgTrackerTrack();

        }, updateFrequency);
    };
    tracker.track({
        subject: 'page',
        url: url,
        assetUrl: assetUrl,
        referrer: document.referrer,
        impressions : impressions,
        totalTime: 0
    }, {
        sendMeta: true,
        useFieldOverwrites: true,
        buffer: true,
        collectClientData: true,
        callback: setUpdateTimeout
    });
    
    tracker.shortCircuit = function () {
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
        bgTrackerTrack();
    };

    return tracker;
})();