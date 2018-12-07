

/** 
* @filepath: global,sharebar,aperture,aperture-omniture,omniport
* @created: Tue, 26 Nov 13 13:03:13 -0800
* @serveraddr: 10.122.70.98
* @remoteaddr: 10.120.225.205
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/


/** 
* @filepath: /abcdm/sharebar.js
* @created: Tue, 26 Nov 13 13:01:02 -0800
* @serveraddr: 10.90.249.216
* @remoteaddr: 10.86.159.144
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Share=abcdm.abccom.Share||function(){};abcdm.abccom.SocialLink=abcdm.abccom.SocialLink||{};abcdm.abccom.SocialLink.syndicate=abcdm.abccom.SocialLink.syndicate||{};abcdm.abccom.Register=abcdm.abccom.Register||{};abcdm.abccom.Register.conf=abcdm.abccom.Register.conf||{};abcdm.abccom.Hook=abcdm.abccom.Hook||function(){};abcdm.abccom.debugLog=abcdm.abccom.debugLog||function(bug){return function(){};};(function($){var debugLog=abcdm.abccom.debugLog('sharebar');abcdm.abccom.Share.gigyaShareCB=function(eventObj){debugLog('syndicate gigya share bar callback');var context=eventObj.context,provider=eventObj.providers,sourceUrl=context.sourceurl,syndicateAction=context.action||{},syndicateMediaType,sender,message,email,campaign,params;if(typeof context==="object"&&typeof context.media==='string'){syndicateMediaType=context.media||"";}
if(provider==='email'){sender=eventObj.sender;message=eventObj.userMessage;email=eventObj.recipients[0].email;campaign='abc_sendAFriendMail_GlobalTemplate';params=[{'name':'title','value':context.title},{'name':'sender','value':sender},{'name':'recipientEmail','value':email},{'name':'url','value':sourceUrl},{'name':'description','value':message}];abcdm.abccom.SocialLink.syndicate.sendEmail(campaign,params,'',eventObj);}
abcdm.abccom.Hook('syndicateNewsfeedFormInit',{"args":{'provider':provider,'type':syndicateMediaType,'context':context}});};abcdm.abccom.Share.gigyaShareLoaded=function(eventObj){abcdm.abccom.Hook("sharebar_iconsloaded");var sharebar=$('.abcShareBar');setTimeout(function(){sharebar.removeClass('sbLoading');},1500);};abcdm.abccom.Share.gigyaShareChangeLink=function(options){abcdm.abccom.Hook("sharebar_changelink");var iframesrc,regex,match,sharebar,shareid,sharebarLeft,sbgigya,sbgigya_params;options=options||{};if(options.clipid&&options.link){var ogTitle=options.title;var ogImage=options.image;if(ogImage.search("/dim/")>=0){ogImage=ogImage.substring(0,ogImage.lastIndexOf("/dim/"))+"/dim/600x.jpg";}
debugLog("clip and link");if(options.shareitem){sharebar=$(options.shareitem);}else{sharebar=$('.abcShareBar');}
shareid=sharebar.attr('id').replace('abcShareBar-','');sharebar.attr('id','abcShareBar-'+options.clipid);sharebar.addClass('sbLoading');sharebarLeft=$(sharebar).find('.sharebarLeft');sharebarLeft.attr('id','div_left_'+options.clipid);sbgigya=new gigya.services.socialize.UserAction();sbgigya.setUserMessage("");sbgigya.setLinkBack(options.link);sbgigya.setTitle(ogTitle);sbgigya.setDescription(ogTitle);sbgigya.addMediaItem({type:'image',src:ogImage,href:options.link});sbgigya_params={containerID:'div_left_'+options.clipid,shareButtons:[{provider:'facebook-like',tooltip:'Recommend this on Facebook',enableCount:'true'},{provider:'facebook-send',tooltip:'Send this on Facebook'},{provider:'Twitter',tooltip:'Share on Twitter'},{provider:'pinterest',tooltip:'Share on Pinterest'}],dontSendEmail:true,context:{'container':'div_left_'+options.clipid,'sourceurl':options.link,'title':ogTitle,'description':ogTitle},onSendDone:abcdm.abccom.Share.gigyaShareCB,onLoad:abcdm.abccom.Share.gigyaShareLoaded,userAction:sbgigya};gigya.services.socialize.showShareBarUI(abcdm.abccom.SocialLink.conf,sbgigya_params);}else if(options.link){debugLog("else link");shareid=sharebar.attr('id').replace('abcShareBar-','');sharebar.attr('id','abcShareBar-123');sharebarLeft=$('.sharebarLeft');sharebarLeft.attr('id','div_left_123');sbgigya=new gigya.services.socialize.UserAction();sbgigya.setUserMessage("");sbgigya.setLinkBack(options.link);sbgigya.setTitle(options.title);sbgigya.setDescription(options.description);sbgigya.addMediaItem({type:'image',src:options.image,href:options.link});sbgigya_params={containerID:'div_left_123',shareButtons:[{provider:'facebook-like',tooltip:'Recommend this on Facebook',enableCount:'true'},{provider:'facebook-send',tooltip:'Send this on Facebook'},{provider:'Twitter',tooltip:'Share on Twitter'},{provider:'pinterest',tooltip:'Share on Pinterest'}],dontSendEmail:true,context:{'container':'div_left_123','sourceurl':options.link,'title':options.title,'description':options.description},onSendDone:abcdm.abccom.Share.gigyaShareCB,onLoad:abcdm.abccom.Share.gigyaShareLoaded,userAction:sbgigya};}};}(jQuery));

/** 
* @filepath: /abcdm/aperture.js
* @created: Tue, 26 Nov 13 13:01:02 -0800
* @serveraddr: 10.90.249.216
* @remoteaddr: 10.86.159.144
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.prefs=abcdm.abccom.prefs||{};abcdm.abccom.Aperture=abcdm.abccom.Aperture||{};(function($){abcdm.abccom.Aperture.namePrepend='aperture_';abcdm.abccom.Aperture.defaultExpiration=0;abcdm.abccom.Aperture.defaultTtl=1;abcdm.abccom.Aperture.hashKey='abcdm';abcdm.abccom.Aperture.buildCookie=function(url,type,ttl,obj,expires){var hash=hashUrl(url),cookie=$.cookie(abcdm.abccom.Aperture.namePrepend+hash),cookieOptions={path:'/'},data,list,key,date,mins,dataString;if(cookie){data=$.parseJSON(cookie);}
if(!ttl){ttl=abcdm.abccom.Aperture.defaultTtl;}
if(type&&obj){list=typeLookup(type,data);if(data&&list){obj=$.extend(list,obj);key=typeLookup(type,data,false,true);data[key]=obj;}else{obj=$.extend(obj,{type:type,ttl:ttl});if(data){data.push(obj);}else{data=[obj];}}
dataString=JSON.stringify(data);date=new Date();mins=abcdm.abccom.Aperture.defaultExpiration;if(expires){mins=expires;}
if(mins>0){date.setTime(date.getTime()+(mins*60*1000));cookieOptions.expires=date;}
$.cookie(abcdm.abccom.Aperture.namePrepend+hash,dataString,cookieOptions);}else if(!type&&typeof(obj)==='object'){dataString=JSON.stringify(obj);$.cookie(abcdm.abccom.Aperture.namePrepend+hash,dataString);}else{return data;}};abcdm.abccom.Aperture.readCookie=function(type,url,isDecrement){var name,cookie,data;if(!url){url=window.location.href;}
name=hashUrl(url);cookie=$.cookie(abcdm.abccom.Aperture.namePrepend+name);if(cookie){data=$.parseJSON(cookie);}
if(type){data=typeLookup(type,data);if(isDecrement){list=typeLookup(type,cookie,isDecrement);if(list&&list.length>0){abcdm.abccom.Aperture.buildCookie(url,null,list);}else{abcdm.abccom.Aperture.deleteCookie(url);}}}
return data;};abcdm.abccom.Aperture.deleteCookie=function(url){var name;if(!url){url=window.location.href;}
name=hashUrl(url);$.cookie(abcdm.abccom.Aperture.namePrepend+name,null,{path:'/'});}
hashUrl=function(url){return $.rc4EncryptStr(url,abcdm.abccom.Aperture.hashKey);};typeLookup=function(type,list,isDecrement,isKey){var data;if(list&&typeof(list)==='object'){$.each(list,function(key,value){if(value.type===type){if(isDecrement&&value.ttl>0){value.ttl-=1;if(value.ttl==0){list.splice(key,1);data=list;return false;}}
if(isKey){data=key;return false;}
data=value;return false;}});return data;}else{return null;}};}(jQuery));

/** 
* @filepath: /abcdm/aperture.omniture.js
* @created: Tue, 26 Nov 13 13:01:02 -0800
* @serveraddr: 10.90.249.216
* @remoteaddr: 10.86.159.144
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Aperture=abcdm.abccom.Aperture||{};abcdm.abccom.Aperture.Omniture=abcdm.abccom.Aperture.Omniture||{};var aptLog=abcdm.abccom.debugLog('aperture-Omniture');abcdm.abccom.Aperture.Omniture.type='omniture';(function($){abcdm.abccom.Aperture.Omniture.add=function(url,varName,varValue){var omniData=$.extend(true,abcdm.abccom.Aperture.Omniture.create,abcdm.abccom.Aperture.readCookie(abcdm.abccom.Aperture.Omniture.type,url,false));if(varName&&varValue&&!omniData.data.dataArray[varName]){omniData.data.dataArray[varName]=varValue;aptLog(omniData);abcdm.abccom.Aperture.buildCookie(url,abcdm.abccom.Aperture.Omniture.type,null,omniData.data.dataArray);return true;}else{return false;}};abcdm.abccom.Aperture.Omniture.overwrite=function(url,varName,varValue){var omniData=$.extend(true,abcdm.abccom.Aperture.Omniture.create,abcdm.abccom.Aperture.readCookie(abcdm.abccom.Aperture.Omniture.type,url,false));if(varName&&varValue){omniData.data.dataArray[varName]=varValue;abcdm.abccom.Aperture.buildCookie(url,abcdm.abccom.Aperture.Omniture.type,null,omniData.data.dataArray);return true;}else{return false;}};abcdm.abccom.Aperture.Omniture.append=function(url,varName,varValue){var omniData=$.extend(true,abcdm.abccom.Aperture.Omniture.create,abcdm.abccom.Aperture.readCookie(abcdm.abccom.Aperture.Omniture.type,url,false));if(varName&&varValue&&omniData.data.dataArray[varName]){omniData.data.dataArray[varName]=omniData.data.dataArray[varName]+varValue;abcdm.abccom.Aperture.buildCookie(url,abcdm.abccom.Aperture.Omniture.type,null,omniData.data.dataArray);return true;}else{return false;}};abcdm.abccom.Aperture.Omniture.create={global:{pageName:'',channel:'',prop1:''},data:{dataArray:{}}};})(jQuery);

/** 
* @filepath: /abcdm/omniport.js
* @created: Tue, 26 Nov 13 13:01:02 -0800
* @serveraddr: 10.90.249.216
* @remoteaddr: 10.86.159.144
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.prefs=abcdm.abccom.prefs||{};abcdm.abccom.Omniport=abcdm.abccom.Omniport||{};abcdm.abccom.Aperture.Omniture=abcdm.abccom.Aperture.Omniture||{};(function($){abcdm.abccom.Omniport.evar='eVar31';abcdm.abccom.Omniport.prop='prop9';$(document).ready(function(){abcdm.abccom.Aperture.readCookie('omniture',null,true);$('body').delegate('a','click',function(e){var url=$(this).attr('href'),target=$(this).attr('target'),absolute=/^https?:\/\//i,omnVal='',data,moduleVal,regionVal;if(url.substr(0,1)!=='#'&&url.substr(0,11)!=='javascript:'){if(!absolute.test(url)&&abcdm.abccom.SiteInfo.baseserver){url=abcdm.abccom.SiteInfo.baseserver+url;}
data=$(this).parents('[data-module],[data-region]');data.each(function(){moduleVal=$(this).attr('data-module');regionVal=$(this).attr('data-region');if(moduleVal){omnVal+=moduleVal+'|';}
if(regionVal){omnVal+=regionVal+'|';}});if(s_omni.pageName){omnVal+=s_omni.pageName;}
if(typeof abcdm.abccom.Aperture.Omniture.overwrite=='function'){abcdm.abccom.Aperture.Omniture.overwrite(url,abcdm.abccom.Omniport.evar,omnVal);abcdm.abccom.Aperture.Omniture.overwrite(url,abcdm.abccom.Omniport.prop,omnVal);}}});});}(jQuery));