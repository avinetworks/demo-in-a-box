

/** 
* @filepath: met-help,ad,slideshow-horizontal,splitcontent,biodetails,timeago,metdat,datgslider,sliderstrip
* @created: Tue, 26 Nov 13 12:59:28 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/


/** 
* @filepath: /abcdm/metrics-helper.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Hook=abcdm.abccom.Hook||{};abcdm.abccom.MetricsHelper=abcdm.abccom.MetricsHelper||{};abcdm.abccom.MetricsHelper.CustomLink=abcdm.abccom.MetricsHelper.CustomLink||{};var metLog=abcdm.abccom.debugLog('metrics');(function($){abcdm.abccom.MetricsHelper.CustomLink={options:{linkType:'custom',linkName:"",linkUrl:"",timeout:0,openInNewWindow:false,debug:false,delegate:false}};$.fn.trackCustomLink=function(obj){var cLinkOptions=$.extend({},abcdm.abccom.MetricsHelper.CustomLink.options,obj),omniParamsObj={},linkTypes={custom:"lnk_o",download:"lnk_d",external:"lnk_e"},$linkElem=$(this),peType=linkTypes[cLinkOptions.linkType]||linkTypes.custom,linkHref=cLinkOptions.linkUrl||$linkElem.attr('href')||$linkElem.find('a').attr('href')||window.location.href;omniParamsObj.omnivars={"pe":peType,"pev1":linkHref,"pev2":cLinkOptions.linkName};metLog(omniParamsObj);updateOmnitureTracking(omniParamsObj);};$.fn.addCustomLinkForOmniture=function(options){metLog('using deprecated call');var cLinkOptions=$.extend({},abcdm.abccom.MetricsHelper.CustomLink.options,options),omniParamsObj={},linkTypes={download:"lnk_d",custom:"lnk_o",external:"lnk_e"},linkHref="",peType=linkTypes[cLinkOptions.linkType],$linkElem=$(this),clickFunc=function(){};if(linkTypes[cLinkOptions.linkType]){peType=linkTypes[cLinkOptions.linkType];}else{peType=linkTypes.custom;}
if(cLinkOptions.linkUrl!==""){linkHref=cLinkOptions.linkUrl;}else{if($linkElem.is('a')){linkHref=$linkElem.attr('href');}else{linkHref=$linkElem.find('a').attr('href');}}
omniParamsObj.omnivars={"pe":peType,"pev1":linkHref,"pev2":cLinkOptions.linkName};clickFunc=function(e){if(cLinkOptions.debug){metLog('clicked! debugging...');metLog(cLinkOptions);metLog(omniParamsObj);e.preventDefault();}
updateOmnitureTracking(omniParamsObj);if(cLinkOptions.openInNewWindow){e.preventDefault();}
if(cLinkOptions.timeout>0){setTimeout(function(){window.location=linkHref;},cLinkOptions.timeout);}
return false;};if(cLinkOptions.delegate){$('body.datgGen').delegate($linkElem,'click',function(e){clickFunc(e);});}else{$linkElem.click(function(e){clickFunc(e);});}};var updateOmnitureTracking=function(eventParams){try{if(eventParams){if(eventParams.omnivars){$.each(eventParams.omnivars,function(omniName,omniData){s_omni[omniName]=omniData.replace(/(\?|&|#)/g,function(x){return encodeURIComponent(x);});});}
s_omni.t();}
abcdm.abccom.Hook("MetricsHelper_updateOmnitureTracking");}catch(e){metLog('error in updateOmnitureTracking');}},updateNielsenTracking=function(eventParams){if(eventParams){if(eventParams.account&&eventParams.url){try{var d=new Image(1,1);d.onerror=d.onload=function(){d.onerror=d.onload=null;};d.src=["http://secure-us.imrworldwide.com/cgi-bin/m?ci=",eventParams.account,"&cg=0&cc=1&si=",escape(eventParams.url),"&rp=",escape(document.referrer),"&ts=compact&c0=usergen,1&rnd=",(new Date()).getTime()].join('');abcdm.abccom.Hook("MetricsHelper_updateNielsenTracking");}catch(e){metLog('error in updateNielsenTracking');}}}},updateSingleMetric=function(type,params){if(type==="omniture"){updateOmnitureTracking(params);}else if(type==="nielsen"){updateNielsenTracking(params);}},updateMultipleMetrics=function(metricData){$.each(metricData.metrics,function(type,data){if(type!==""&&data.result===true){updateSingleMetric(type,data.params);}});};abcdm.abccom.MetricsHelper.updateMetrics=function(metricData){if(metricData){if(metricData.type){updateSingleMetric(metricData.type,metricData.params.metrics);}else if(metricData.metrics){updateMultipleMetrics(metricData);}}
abcdm.abccom.Hook("MetricsHelper_updateMetrics");};$(document).ready(function(){abcdm.abccom.Hook('MetricsHelper_Multiple',{"hook":function(obj){abcdm.abccom.MetricsHelper.updateMetrics(obj);}});abcdm.abccom.Hook('MetricsHelper_Omniture',{"hook":function(params){var metObj={"type":"omniture","params":params};abcdm.abccom.MetricsHelper.updateMetrics(metObj);}});abcdm.abccom.Hook('MetricsHelper_Nielsen',{"hook":function(params){var metObj={"type":"nielsen","params":params};abcdm.abccom.MetricsHelper.updateMetrics(metObj);}});});})(jQuery);

/** 
* @filepath: /module-js/ad/ad.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Player=abcdm.abccom.Player||{};abcdm.abccom.Slideshow=abcdm.abccom.Slideshow||{};abcdm.abccom.Slideshow.persistentPause=abcdm.abccom.Slideshow.persistentPause||function(){};abcdm.abccom.Ads=abcdm.abccom.Ads||{};$(function(){try{if($('body.mobile').length===0&&$('.gutterAd a, .gutterAd iframe, , .gutterAd embed, , .gutterAd object').length>0){$('body').css({'overflow-x':'hidden'});$('.gutterAd').addClass('background');abcdm.abccom.Hook('digAdGutters');}}catch(e){}
abcdm.abccom.Hook('digAdLRGutters',{"hTiming":'default','hook':function(options){if(typeof options==='object'&&options.leftImage&&options.rightImage&&options.leftLink&&options.rightLink){if($('body.mobile').length===0){try{$('.gutterAd').html('<a><img /></a>');if(options.internalAd!==true){$('.gutterAd a').attr('target','_blank');}
$('#leftGutter img').attr('src',options.leftImage);$('#rightGutter img').attr("src",options.rightImage);$('#leftGutter a').attr("href",options.leftLink);$('#rightGutter a').attr("href",options.rightLink);$('.gutterAd').addClass('background');$('body').css({'overflow-x':'hidden'});}catch(e){}}}}});abcdm.abccom.Hook('digAdBackground',{'hook':function(){if($('body.mobile').length===0){$('.gutterAd').addClass('background');$('body').css({'overflow-x':'hidden'});}}});abcdm.abccom.Player.displayWrapper=function(adObj){$('#sfpSynchInfo').hide();$('#adCompanionBanner').hide();$('.adBlockRectangles #sfpSynchWrapper').show();var divTarget=$('#sfpSynchWrapper');if(divTarget.length){var adObjStr='';if(typeof(adObj.iframe)!='undefined'){adObjStr+='<iframe src="'+adObj.iframe+'" ';if(typeof(adObj.assetWidth)!='undefined'){adObjStr+='width="'+adObj.assetWidth+'" ';}else{adObjStr+='width="300" ';}
if(typeof(adObj.assetHeight)!='undefined'){adObjStr+='height="'+adObj.assetHeight+'" ';}else{adObjStr+='height="250" ';}
adObjStr+='frameborder="0" border="0" marginwidth="0" marginheight="0" allowtransparency="true" scrolling="no"></iframe>';divTarget.html(adObjStr);}else if(typeof(adObj.assetURL)!='undefined'){divTarget.html('<a href="'+adObj.clickURL+'" target="_blank"><img border=0 src="'+adObj.assetURL+'"></a>');}}};abcdm.abccom.Player.closeWrapper=function(){var bgState=$('#videoPlayerOverlay').css('background-image'),divTarget=$('#sfpSynchWrapper');if(bgState!='none'){$('#sfpSynchInfo').show();}
if(divTarget.length){if(divTarget.hasClass('reuseAdSpace')){divTarget.find('#_fw_container_300x60slot').empty();}else if(!divTarget.hasClass('persistentSyncAd')){divTarget.html('');}}
abcdm.abccom.Slideshow.persistentPause(false);};abcdm.abccom.Player.displayCompanionBanners=function(banners,tracking){$('.adBlockRectangles #sfpSynchWrapper').hide();$('#sfpSynchInfo').html('');$('#adCompanionBanner').show();tmDisplayBanner(banners,"adCompanionBanner",300,250,null,tracking);};abcdm.abccom.Player.hideCompanionBanners=function(banners){if(!$('#adCompanionBanner').hasClass("persistentSyncAd")){$('#adCompanionBanner').hide();$('.adBlockRectangles #sfpSynchWrapper').show();tmHideBanner("adCompanionBanner");}};});abcdm.abccom.Ads.segScores=function(i){var o={};if(!i.indexOf("CBLM-001:")){i=i.substring(9);var id,sc,e=0,f=0,h="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";for(var b=0,a=i.length,l=a-(a%4);b<l;){var m=h.indexOf(i.charAt(b++));var k=h.indexOf(i.charAt(b++));f|=(m<<2|k>>4)<<(e++?0:8);f*=(e%=6)&&e-2?1:0;var j=h.indexOf(i.charAt(b++));if(j!=64){f|=((k&15)<<4|j>>2)<<(e++?0:8);if(!(e-2)){id=f;}
f*=(e%=6)&&e-2?1:0}
var g=h.indexOf(i.charAt(b++));if(g!=64){f|=((j&3)<<6|g)<<(e++?0:8);if(!(e-6)){o[id]=f;}
f*=(e%=6)&&e-2?1:0}}}
return o;};abcdm.abccom.Ads.refreshAds=function(){$('.csarRefreshable').attr('src',function(i,val){return val;});}
abcdm.abccom.Ads.fwSeg=function(){var fwAdCookie=abcdm.abccom.Ads.readCookie('CRBLM');if(fwAdCookie!=null){fwAdCookie=abcdm.abccom.Ads.segScores(fwAdCookie);fwAdCookieStr="";for(var i in fwAdCookie){if(fwAdCookie[i]>0){fwAdCookieStr=fwAdCookieStr+"&seg="+i;}}
if(fwAdCookieStr!=""){fwAdCookieStr=fwAdCookieStr.substr(1);}
return fwAdCookieStr;}};abcdm.abccom.Ads.readCookie=function(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)==0)return c.substring(nameEQ.length,c.length);}
return null;};fwSegStr=abcdm.abccom.Ads.fwSeg();fwWriteJs=function(fwStrJs){if(fwSegStr){if(fwStrJs.indexOf("ad;;")>0){fwStrJs=fwStrJs.replace("ad;;","ad;"+fwSegStr+';');}else{fwStrJs=fwStrJs.replace("ad;","ad;"+fwSegStr+'&');}}
document.write(fwStrJs);};

/** 
* @filepath: /module-js/slideshow/slideshow-horizontal.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{},heroAdServ;abcdm.abccom=abcdm.abccom||{};abcdm.abccom.Hook=abcdm.abccom.Hook||function(){};abcdm.abccom.KalPlayer=abcdm.abccom.KalPlayer||{};abcdm.abccom.Slideshow=abcdm.abccom.Slideshow||{};abcdm.abccom.Slideshow.persistentPause=function(){};(function($){var debugLog=abcdm.abccom.debugLog('slideshow'),heroLogoAds=function($adCont){if($adCont.length>0&&!$adCont.data('adServed')&&$adCont.attr('id')){$adCont.data('adServed',true);var fwmrmRandomNumber=fwmrmRandomNumber||0;if($adCont.hasClass('fwadContainer')&&(fwmrmRandomNumber>0)){$adCont.find('iframe').attr('src','http://'+fwslideshow.domain+'/ad/g/1?nw='+fwslideshow.networkid+'&csid='+fwslideshow.sitesectionid+'&sfid='+fwslideshow.fallbackid+'&pvrn='+fwmrmRandomNumber+'&resp=ad;hero='+$adCont[0].id+';ptgt=s&envp=g_iframe&slid=hero1&w=120&h=90');}else{adContext='/';adURL='http://abc.csar.go.com/DynamicAd?srvc=abcfam&adTypes=Hero&callback=heroAdServ&url=';adURL+=adContext;adURL+='&cb=';adURL+=Math.round(Math.random()*100000);adURL+='&content=';adURL+=$adCont[0].id;heroAdServ=function(data){var str='#';if(data&&data.keyword&&data.returnAd){str+=data.keyword;$adCont.html(data.returnAd).removeAttr('id');}};$.ajax({'url':adURL,'dataType':'jsonp'});}}};$(document).ready(function(){var $slideshows=$('.module.slideshow');if($slideshows.length<=0){return false;}
$slideshows.each(function(){var $slideshow=$(this),$centerSlider=$slideshow.find('ul.slidesCenter').data('isPaused',false).data('userPause',false).data('videoPause',false),$sliders=$centerSlider,$mainHeroSlides=$centerSlider.find('li.mainHeroSlides'),$allSlides,mainSlideWidth=$mainHeroSlides.outerWidth(true),$thumbNails=$slideshow.find('ul.heroThumbNails li'),$pauseButton=$slideshow.find('a.slideshowPause'),$adWrap=$slideshow.find('#_fw_container_300x60slot'),$animatingElement,isSliding=false,defaultElapseTime=7000,slidingDuration=1000,animationValues={'from':{'css':{'opacity':0},'duration':500},'to':{'css':{'opacity':1},'duration':500}},$playerParent=$slideshow.find('.kalCont'),playerObj=null,playerLoadType,followingSlide,slideLeft,moveToSlide,slideLogic,playVideoSlide,slideTimer,elapseTime=0,remainingTime;if($slideshow.hasClass('compact')){animationValues={'from':{'duration':0,'css':{}},'to':{'duration':0,'css':{}}};}else if($slideshow.hasClass('fullwidth')){slidingDuration=0;animationValues={'from':{'css':{'opacity':0},'duration':330,'durationStart':0},'to':{'css':{'opacity':1},'duration':0}};$slideshow.find("li .slideTitleDesc").each(function(){$(this).html($(this).html().replace(/(SUNDAY[S]?|MONDAY[S]?|TUESDAY[S]?|WEDNESDAY[S]?|THURSDAY[S]?|FRIDAY[S]?|SATURDAY[S]?|WEEKDAY[S]?|WEEKNIGHT[S]?|TONIGHT|TOMORROW+)/gi,'<span class="dayOfWeek">$1</span>'));});$slideshow.find("li.videolink .datgButton, li.videolinkright .datgButton, li.takeover .datgButton").each(function(){$(this).parent().after(this);});}else if($slideshow.hasClass('halfFader')){animationValues={'from':{'css':{'opacity':0.55},'duration':'slow'},'to':{'css':{'opacity':1},'duration':0}};}
if(animationValues.from.durationStart===undefined){animationValues.from.durationStart=animationValues.from.duration;}
if($mainHeroSlides.length>1){var slideHTML='<ul>',$leftArea,$rightArea,temp1,temp2;slideHTML+=$centerSlider.first().html();slideHTML+='</ul>';slideHTML=$(slideHTML).children().attr('class',function(i,attr){return attr.replace(/(.*)(slideBig\d+)(.*)/g,'$2')+' sideSlides';});temp1=$mainHeroSlides.length/2;temp2=Math.ceil(temp1);if(temp1===temp2){temp1--;}else{temp1=Math.floor(temp1);}
$leftArea=slideHTML.filter(':gt('+(temp1)+')');var $leftAreaTmp=$leftArea.first().prev().clone();$rightArea=slideHTML.filter(':lt('+(temp2)+')');$centerSlider.prepend($leftArea).prepend($leftAreaTmp).append($rightArea);temp1={'left':(-$mainHeroSlides.first().index()*mainSlideWidth),'width':($centerSlider.children().length*mainSlideWidth+100)};$centerSlider.css(temp1);if(($leftArea=$slideshow.find('.slidesBack.leftArea')).length>0){$sliders=$sliders.add($('<ul class="slidesBack">'+$centerSlider.html()+'</ul>').appendTo($leftArea).filter('.slidesBack').css(temp1));}
$slideshow.find('.slidesBack.hide').removeClass('hide');}
$animatingElement=$mainHeroSlides.first().addClass('activeSlide previousActiveSlide');$animatingElement.find('.adContainer').each(function(){var $this=$(this);if($this.attr('id')){heroLogoAds.apply(this,[$this]);return false;}});$animatingElement=$();$allSlides=$centerSlider.children();if($playerParent.length>0){playerObj=$playerParent.data('vp2k');}
abcdm.abccom.Slideshow.resumeSliding=animationTimerState=function(startTimer,interval){if($playerParent.data('preroll')||$centerSlider.data('isPaused')!==startTimer){return false;}
var classAdd='play',classRem='pause';if(startTimer){classAdd='pause';classRem='play';startTimer=false;$centerSlider.data('videoPause',false);clearInterval(slideTimer);if(this!==window||isNaN(parseInt(interval))){if(isNaN(remainingTime)){remainingTime=defaultElapseTime;}
interval=remainingTime;}
slideTimer=setInterval(slideLeft,interval);}else{clearInterval(slideTimer);startTimer=true;}
$pauseButton.removeClass(classRem).addClass(classAdd);$centerSlider.data('isPaused',startTimer);return startTimer;};playVideoSlide=function(obj){debugLog('start video slide');if(isSliding||playerObj===null){debugLog('cant play. Currently sliding or no player found.');return false;}
if(playerObj.getReady()){var mediaIndex=null;if(obj.playlistId||obj.clipId){debugLog('Player stuff.');$adWrap.empty();playerObj.pause();if(!$centerSlider.data('isPaused')){animationTimerState(false);}
$centerSlider.css('z-index',98).data('videoPause',true);$slideshow.find('.videoContainer').removeClass('stall');if(obj.playlistId){debugLog('Player loading playlist');playerLoadType='playlist';if(obj.clipId===null){mediaIndex=0;}
playerObj.loadPlaylist(obj.playlistId,obj.clipId,mediaIndex);}else{debugLog('Player loading clip');playerLoadType='video';playerObj.loadMedia(obj.clipId);}}}else{debugLog('Player is not ready. Try again.');abcdm.abccom.Hook('playerLOADEND',{'hName':'slidePlayerLoadEnd','runOnce':true,'hook':function(hobj){debugLog('Player loaded. Trying again.');playVideoSlide(obj);}});}};slideLogic=function(moveTo,$slides,$slider){var returnObj={'css':{}};if(typeof moveTo=='object'&&moveTo.jquery!==undefined){returnObj.$moveSlide=moveTo;moveTo=$mainHeroSlides.index(returnObj.$moveSlide);}else{returnObj.$moveSlide=$mainHeroSlides.eq(moveTo);}
returnObj.reset=false;returnObj.$currentSlide=$mainHeroSlides.filter('.activeSlide').first();var currentIndex=$mainHeroSlides.index(returnObj.$currentSlide),slideWidth=-mainSlideWidth,moveNum=returnObj.$moveSlide.index();if(currentIndex===moveTo)return false;if(!(Math.sqrt(Math.pow((moveTo-currentIndex),2))<=Math.floor($mainHeroSlides.length/2))){returnObj.reset=true;moveNum=$allSlides.filter('.sideSlides.slideBig'+moveTo);if(moveTo<currentIndex){moveNum=moveNum.first();}else{moveNum=moveNum.last();}
moveNum=moveNum.index();}
returnObj.css.left=slideWidth*moveNum;if(returnObj.$currentSlide.hasClass('animateDetail')){returnObj.$from=returnObj.$currentSlide;returnObj.$to=returnObj.$moveSlide;}else{returnObj.$from=returnObj.$currentSlide.find('.animateDetail');returnObj.$to=returnObj.$moveSlide.find('.animateDetail');}
return returnObj;};abcdm.abccom.Slideshow.moveToSlide=moveToSlide=function(moveTo){if(typeof moveTo=='object'&&moveTo.jquery!==undefined){moveTo=moveTo.index();}
if(isSliding||$playerParent.data('preroll')||moveTo>$mainHeroSlides.length||moveTo<0){return false;}
isSliding=true;var currentIndex=$mainHeroSlides.index($mainHeroSlides.filter('.mainHeroSlides.activeSlide')),completeDone=false,video,centerObj,$adCont;if(currentIndex===moveTo){isSliding=false;return isSliding;}
abcdm.abccom.Hook('slidehow_beforesliding');centerObj=slideLogic(moveTo,$mainHeroSlides,$centerSlider);var moduleid="slideshow",slotnumber=$mainHeroSlides.index($mainHeroSlides.filter('.mainHeroSlides.activeSlide')),contentid=centerObj.$currentSlide.attr('id'),slidetitle=centerObj.$currentSlide.attr('title');abcdm.abccom.Hook('slideshow_advance',{"args":{'slotnumber':slotnumber,'contentid':contentid,'slidetitle':slidetitle}});video=centerObj.$currentSlide.has('.slideVideo');if(video.length>0){if(playerObj.getReady()){playerObj.pause();}
$centerSlider.css('z-index',100);$slideshow.find('.videoContainer').addClass('stall');}
$adCont=centerObj.$moveSlide.find('.adContainer');centerObj.completeFunc=function(){if(centerObj.reset){$sliders.css('left',-mainSlideWidth*centerObj.$moveSlide.index());}
$animatingElement=centerObj.$to.animate(animationValues.to.css,{'duration':animationValues.from.duration,'complete':function(){$slideshow.find('.previousActiveSlide').removeClass('previousActiveSlide');$slideshow.find('.activeSlide').addClass('previousActiveSlide');if(!completeDone){heroLogoAds.apply(this,[$adCont]);$sliders.removeClass('animatingNow');debugLog('sliding done.');completeDone=true;abcdm.abccom.Hook('slideshow_aftersliding');$animatingElement=$();elapseTime=new Date().valueOf();remainingTime=defaultElapseTime;isSliding=false;}
return false;}}).queue(function(){if($(this).css('filter')){$(this).css('filter','none').dequeue();}});};$animatingElement=centerObj.$from.animate(animationValues.from.css,{'duration':animationValues.from.durationStart,'complete':function(){centerObj.$currentSlide.removeClass('activeSlide');centerObj.$moveSlide.addClass('activeSlide');$thumbNails.eq(moveTo).addClass('activeSlide').siblings('.activeSlide').removeClass('activeSlide');$animatingElement=$sliders.addClass('animatingNow').animate(centerObj.css,{'duration':slidingDuration,'complete':centerObj.completeFunc});}});return true;};slideLeft=function(){var $nextSlide=$mainHeroSlides.filter('.mainHeroSlides.activeSlide').next('.mainHeroSlides');if($nextSlide.length===0){$nextSlide=$mainHeroSlides.first();}
moveToSlide($mainHeroSlides.index($nextSlide));if($centerSlider.data('userPause')){$centerSlider.data('userPause',false);clearInterval(slideTimer);slideTimer=setInterval(slideLeft,defaultElapseTime);}};followingSlide=function(follow){if(!/^(next|prev)$/.test(follow)){follow='next';}
var $nextSlide=$mainHeroSlides.filter('.mainHeroSlides.activeSlide')[follow]('.mainHeroSlides');if($nextSlide.length===0){$nextSlide=$mainHeroSlides[(follow=='next'?'first':'last')]();}
if(!$centerSlider.data('userPause')&&moveToSlide($mainHeroSlides.index($nextSlide))){if($centerSlider.data('videoPause')){animationTimerState(true,defaultElapseTime);}else if(!$centerSlider.data('isPaused')){$centerSlider.data('userPause',false);clearInterval(slideTimer);slideTimer=setInterval(slideLeft,defaultElapseTime);}}};$slideshow.find('.prev').bind('click',function(ev){followingSlide('prev');return false;});$slideshow.find('.next').bind('click',function(ev){followingSlide('next');return false;});$slideshow.delegate('ul.heroThumbNails li','click',function(ev){if($(this).hasClass('activeSlide'))return false;if(moveToSlide($(this).index())&&!$centerSlider.data('userPause')){if($centerSlider.data('videoPause')){animationTimerState(true,defaultElapseTime);}else if(!$centerSlider.data('isPaused')){$centerSlider.data('userPause',false);clearInterval(slideTimer);slideTimer=setInterval(slideLeft,defaultElapseTime);}}});$pauseButton.click(function(ev){ev.preventDefault();var clickTime=new Date().valueOf()-elapseTime;if(clickTime<=500){return false;}
if(!$centerSlider.data('isPaused')){remainingTime-=clickTime;animationTimerState(false);$centerSlider.data('userPause',true);}else{if(remainingTime<=0){slideLeft();}else{animationTimerState(true);elapseTime=new Date().valueOf();}}});$slideshow.delegate('.slideVideo','click',function(ev){if(isSliding)return false;var idObj={'clipId':null,'playlistId':null};if((/^\s*vd\d+\s*/i).test(this.id)){idObj.clipId=this.id;}else if((/^\s*pl\d+\s*/i).test(this.id)){idObj.playlistId=this.id;}else{return false;}
if(!$centerSlider.data('isPaused')){animationTimerState(false);}
playVideoSlide(idObj);});remainingTime=defaultElapseTime;elapseTime=new Date().valueOf();slideTimer=setInterval(slideLeft,defaultElapseTime);abcdm.abccom.Hook('playerLOADMEDIAEND',{'hook':function(hobj){if(hobj.kaltura&&$playerParent.length>0){debugLog('Player media loaded. Going to play now.');hobj.kaltura.player.play(null,0);}}});abcdm.abccom.Hook('playerPLAYBACKEND',{'hook':function(hobj){if(hobj.kaltura&&$playerParent.length>0){hobj.kaltura.player.fullscreen(false);if(playerLoadType==='video'&&$centerSlider.data('videoPause')&&!$centerSlider.data('userPause')){debugLog('Player sliding on.');hobj.kaltura.player.pause();animationTimerState(true,defaultElapseTime);slideLeft();}}}});});});})(jQuery);

/** 
* @filepath: /abcdm/splitcontent.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

$(document).ready(function(){$('.splitContentControl a').click(function(e){e.preventDefault();var $parentSplitDiv=$(this).parents('.splitContent');if($parentSplitDiv.hasClass('less')){$parentSplitDiv.find('.splitContentMore').slideDown("slow",function(){$parentSplitDiv.removeClass('less').addClass('more');});}else{$parentSplitDiv.find('.splitContentMore').slideUp("slow",function(){$parentSplitDiv.removeClass('more').addClass('less');});}});});

/** 
* @filepath: /module-js/collection-biodetails.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

(function($){$(document).ready(function(){if(($('#primaryBio').length>=1)||($('#secondaryBio').length>=1)||($('#otherBio').length>=1)){$('#jumpToDiv').addClass('visible');$('#jumpToDiv').removeClass('hidden');}
if($('#primaryBio').length>=1){$('#jumpToCharacterBio').addClass('visible');$('#jumpToCharacterBio').removeClass('hidden');$('#jumpToCharacterBio').html($('#jumpToPrimaryBioModule').attr('title'));}
if($('#secondaryBio').length>=1){$('#jumpToActorBio').addClass('visible');$('#jumpToActorBio').removeClass('hidden');$('#jumpToActorBio').html($('#jumpToSecondaryBioModule').attr('title'));}
if($('#otherBio').length>=1){$('#jumpToOtherBio').addClass('visible');$('#jumpToOtherBio').removeClass('hidden');$('#jumpToOtherBio').html($('#jumpToOtherBioModule').attr('title'));}
if($('#bonusContent').length>=1){$('#jumpToBonusContent').addClass('visible');$('#jumpToBonusContent').removeClass('hidden');$('#jumpToBonusContent').html($('#jumpToBonusContentModule').attr('title'));}
if($('#commentsModule').length>=1){$('#jumpToComments').addClass('visible');$('#jumpToComments').removeClass('hidden');$('#jumpToComments').html($('#jumpToContentsModule').attr('title'));}});}(jQuery));

/** 
* @filepath: /utils/jquery.timeago.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

(function($){$.timeago=function(timestamp){if(timestamp instanceof Date){return inWords(timestamp);}else if(typeof timestamp==="string"){return inWords($.timeago.parse(timestamp));}else{return inWords($.timeago.datetime(timestamp));}};var $t=$.timeago;$.extend($.timeago,{settings:{refreshMillis:60000,allowFuture:true,strings:{prefixAgo:null,prefixFromNow:null,suffixAgo:"ago",suffixFromNow:"from now",seconds:"less than a minute",minute:"about a minute",minutes:"%d minutes",hour:"about an hour",hours:"about %d hours",day:"a day",days:"%d days",month:"about a month",months:"%d months",year:"about a year",years:"%d years",numbers:[]}},inWords:function(distanceMillis){var $l=this.settings.strings;var prefix=$l.prefixAgo;var suffix=$l.suffixAgo;if(this.settings.allowFuture){if(distanceMillis<0){prefix=$l.prefixFromNow;suffix=$l.suffixFromNow;}
distanceMillis=Math.abs(distanceMillis);}
var seconds=distanceMillis/1000;var minutes=seconds/60;var hours=minutes/60;var days=hours/24;var years=days/365;function substitute(stringOrFunction,number){var string=$.isFunction(stringOrFunction)?stringOrFunction(number,distanceMillis):stringOrFunction;var value=($l.numbers&&$l.numbers[number])||number;return string.replace(/%d/i,value);}
var words=seconds<45&&substitute($l.seconds,Math.round(seconds))||seconds<90&&substitute($l.minute,1)||minutes<45&&substitute($l.minutes,Math.round(minutes))||minutes<90&&substitute($l.hour,1)||hours<24&&substitute($l.hours,Math.round(hours))||hours<48&&substitute($l.day,1)||days<30&&substitute($l.days,Math.floor(days))||days<60&&substitute($l.month,1)||days<365&&substitute($l.months,Math.floor(days/30))||years<2&&substitute($l.year,1)||substitute($l.years,Math.floor(years));return $.trim([prefix,words,suffix].join(" "));},parse:function(iso8601){var s=$.trim(iso8601);s=s.replace(/\.\d\d\d+/,"");s=s.replace(/-/,"/").replace(/-/,"/");s=s.replace(/T/," ").replace(/Z/," UTC");s=s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2");return new Date(s);},datetime:function(elem){var isTime=$(elem).get(0).tagName.toLowerCase()==="time";var iso8601=isTime?$(elem).attr("datetime"):$(elem).attr("title");return $t.parse(iso8601);}});$.fn.timeago=function(){var self=this;self.each(refresh);var $s=$t.settings;if($s.refreshMillis>0){setInterval(function(){self.each(refresh);},$s.refreshMillis);}
return self;};function refresh(){var data=prepareData(this);if(!isNaN(data.datetime)){$(this).text(inWords(data.datetime));}
return this;}
function prepareData(element){element=$(element);if(!element.data("timeago")){element.data("timeago",{datetime:$t.datetime(element)});var text=$.trim(element.text());if(text.length>0){element.attr("title",text);}}
return element.data("timeago");}
function inWords(date){return $t.inWords(distance(date));}
function distance(date){return(new Date().getTime()-date.getTime());}
document.createElement("abbr");document.createElement("time");}(jQuery));

/** 
* @filepath: /abcdm/metadata-helper.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.MetaData=abcdm.abccom.MetaData||{};var metDatLog=abcdm.abccom.debugLog('metadata_helper');(function($){abcdm.abccom.MetaData.get=function(element,getOne){var dataObj={};var getByData=function(){if(getOne){dataObj=$(element).data(getOne);}else{dataObj=$(element).data();}};var getByAttr=function(){var firstElement=$(element)[0];var attributes=firstElement.attributes;var dataPattern=new RegExp('data-');var varName;for(var i=0;i<attributes.length;i++){var attribute=attributes[i];if(dataPattern.test(attribute.nodeName)){varName=attribute.nodeName.substr(5).replace(/(\-[a-z])/g,function($1){return $1.toUpperCase().replace('-','');});;dataObj[varName]=attribute.nodeValue;}}
if(getOne){dataObj=dataObj[getOne];}}
var checkJQueryVersionIsAtLeast=function(target){var targetVersion=target.split('.');var version=$().jquery.split('.');var isAdequateVersion=true;for(var i=0;i<targetVersion.length;i++){if(isNaN(version[i])){version[i]=0;}
if(parseInt(targetVersion[i])>parseInt(version[i])){isAdequateVersion=false;}}
return isAdequateVersion;}
if(element){if(checkJQueryVersionIsAtLeast('1.4.3')){getByData();}else{getByAttr();}}
return dataObj;}}(jQuery));

/** 
* @filepath: /module-js/datgslider.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.DatgSliderDefault=abcdm.abccom.DatgSliderDefault||{};abcdm.abccom.Hook=abcdm.abccom.Hook||{};abcdm.abccom.SiteInfo=abcdm.abccom.SiteInfo||{};var carLog=abcdm.abccom.debugLog('DatgSlider');(function($){abcdm.abccom.DatgSliderDefault={customClass:null,options:{display:5,sendvideo:false,suppresslink:false,slideduration:1000,callback:null,loopvideo:false,controlplacement:{'wrap':{}},controltextnext:"next",controltextprevious:"previous",controlseparator:"",controlBeginText:"",behavior:"scroller",rows:1,morecontenturl:"",morecontentiterate:10,morecontenttotal:0,monitorhover:false,heightOnDocLoad:false,hideSingleStepPager:false}};$.fn.datgslider=function(pageoptions){var newoptions,id;if(pageoptions&&typeof pageoptions.controlplacement==='string'){newoptions=pageoptions.controlplacement;pageoptions.controlplacement={};pageoptions.controlplacement[newoptions]={};}
abcdm.abccom.DatgSliderSite=abcdm.abccom.DatgSliderSite||{};if(typeof abcdm.abccom.DatgSliderSite.controlplacement==='string'){newoptions=abcdm.abccom.DatgSliderSite.controlplacement;abcdm.abccom.DatgSliderSite.controlplacement={};abcdm.abccom.DatgSliderSite.controlplacement[newoptions]={};}
newoptions=$.extend({},abcdm.abccom.DatgSliderDefault.options,pageoptions),showOverride=abcdm.abccom.DatgSliderSite.options?abcdm.abccom.DatgSliderSite.options:false;if(abcdm.abccom.DatgSliderSite.customTarget&&abcdm.abccom.DatgSliderSite.customTarget.className){id=$(this).attr('id');if($('.'+abcdm.abccom.DatgSliderSite.customTarget.className+' #'+id).length){showOverride=abcdm.abccom.DatgSliderSite.customTarget.options?abcdm.abccom.DatgSliderSite.customTarget.options:false;}}
if(showOverride){if(typeof showOverride.controlplacement==='string'){id=showOverride.controlplacement;showOverride.controlplacement={};showOverride.controlplacement[id]={};}
newoptions=$.extend({},newoptions,showOverride);}
this.each(function(){$(this).data('tcl',new Slider($(this),newoptions));});return this;};$.fn.datgslider_move=function(iNum){$(this).data('tcl').move(iNum-1,true);};function Slider(root,options){carLog('behavior: '+options.behavior);root.addClass(options.behavior+"Container clearfix").removeClass('showLoading');var oSelf=this,oViewport=root.find('.staticViewPort'),oContent=root.find('.carouselTrack'),oPages=oContent.children(),oRows,oBtnNext,oBtnPrev,oPageInfo=false,iPageSize,iSteps,iCurrent,iCurrentIndex,slideBoundary=0,currentRow=0,ajaxCounter=0,liTotal=0,oPagerNum=$();function initialize(){var temp;iPageSize=$(oPages[0]).outerWidth(true);if(options.morecontenttotal>0&&options.morecontenturl!==""){liTotal=options.morecontenttotal;}else{liTotal=oPages.length;}
var setHeight=$(oPages[0]).outerHeight(true),setWidth=iPageSize*liTotal;iSteps=Math.max(1,Math.ceil((liTotal/options.display)/options.rows));iCurrent=0;iCurrentIndex=0;if(options.rows>1){oRows=[];oViewport.find('.carouselTrack').each(function(index){oRows[index]=$(this).children();});oViewport.each(function(index){if($(this).find('.carouselTrack li').length<1){$(this).hide();}});if(options.topControlsId){options.hasTopControls=true;}}
if(oContent.find("li.selected").length>0){iCurrentIndex=oContent.find("li.selected").index();}
if($(".datgGen").find("#SFPlayer").length>0||$(".datgGen").find("#presetVideoClip").length>0){var clipID=$.trim($("#SFPlayer").attr("clip"));if(clipID===undefined||!clipID){clipID=$.trim($("#presetVideoClip").attr("clip"));}
if(clipID.length>0){var $clipRef=$('span[title="'+clipID+'"]:first').parents("li"),newIndex;newIndex=$clipRef.index();if(newIndex>=0){if(options.rows>1){currentRow=$clipRef.parents('.staticViewPort').index();}
oContent.find('li').eq(iCurrentIndex).removeClass("selected");iCurrentIndex=newIndex;}}}else if(root.is('.videosSelection .datgSlider, .module.kalturaControl')&&$('body').has('.videoplayer .kalPlayer .kalCont, .externalControl .kalCont').length>0){temp={};carLog('Kaltura as player');var videoData=abcdm.abccom.MetaData.get('.videoplayer .module.kalPlayer, .module.externalControl.kalPlayer');if(videoData&&videoData.mediaId){temp.videoId=videoData.mediaId;}
temp.videoId=$.trim(temp.videoId);carLog('Kaltura video Id = '+temp.videoId);temp.videoClips=root.find('.contentArea.videoClip');temp.pageClip=temp.videoClips.first();if(temp.videoId!==''){temp.newClip='.clipId[title="'+temp.videoId+'"]';carLog(temp.newClip);temp.newClip=temp.videoClips.has(temp.newClip);if(temp.newClip.length>0){carLog('Kaltura pageClip returned');temp.pageClip=temp.newClip;}}
carLog('Kaltura pageClip');carLog(temp.pageClip);temp.contentRow=temp.pageClip.closest('.staticViewPort');carLog('Kaltura contentRow ');carLog(temp.contentRow);if(!temp.pageClip.hasClass('.selected')){temp.videoClips.removeClass('selected');temp.pageClip.addClass('selected');carLog('Kaltura pageClip was not selected ');}
iCurrentIndex=temp.pageClip.index();currentRow=oViewport.index(temp.contentRow);carLog('Kaltura column: '+iCurrentIndex+' Kaltura row: '+currentRow);temp=null;}
oContent.css('width',(setWidth+30));if(options.rows>1&&currentRow&&oRows[currentRow]){oRows[currentRow].eq(iCurrentIndex).addClass("selected");if(options.sendvideo||options.loopvideo){abcdm.abccom.Hook("videoplayer_ListenInitialItem",{"args":{'ele':oRows[currentRow].eq(iCurrentIndex),loopVideo:options.loopvideo}});}}else{oContent.find('li').eq(iCurrentIndex).addClass("selected");if(options.sendvideo||options.loopvideo){abcdm.abccom.Hook("videoplayer_ListenInitialItem",{"args":{'ele':oContent.find('li').eq(iCurrentIndex),loopVideo:options.loopvideo}});}}
slideBoundary=iPageSize*(liTotal-options.display);if(options.morecontenttotal>0&&options.morecontenturl!==""){}
if(iSteps>1||options.hideSingleStepPager){buildPlacedControls();oPageInfo=oPagerNum.find('.pageNumOf');}else{oViewport.addClass("nopages");}
if(options.controlplacement['wrap']){buildWrapControls();}
oBtnPrev=oPagerNum.filter('.prevList').add(oPagerNum.find('.prevList'));oBtnNext=oPagerNum.filter('.nextList').add(oPagerNum.find('.nextList'));if(options.behavior==="scroller"){oSelf.move(0,0,iCurrentIndex,true);}else{oSelf.move(iCurrent);}
setHeight=0;$(oContent).each(function(){setHeight=Math.max($(this).outerHeight(true),setHeight);});oViewport.css('height',setHeight);if(options.hideSingleStepPager&&iSteps<2){oPagerNum.addClass('hiddenSliderControls');}
setEvents();abcdm.abccom.Hook("datgslider_ready");}
function setEvents(){if(iSteps>1){if(oBtnPrev.length>0&&oBtnNext.length>0){oBtnPrev.click(function(ev){oSelf.move(-1);return false;});oBtnNext.click(function(ev){oSelf.move(1);return false;});}
root.delegate('.subPagerControls a.slideNumber','click',function(ev){var indexNum;ev.preventDefault();if($('body.abcfamily').length){indexNum=(parseInt($(this).text())-1)*options.display;}else{indexNum=$(this).index()*options.display;}
oSelf.move(0,0,indexNum);});}
if(root.parents('div.subGalleryRow').length>0&&!root.parents('div.subGalleryRow').is(':visible')){abcdm.abccom.Hook('datgslider_resize',{"hook":function(){iPageSize=$(oPages[0]).outerWidth(true);var setHeight=$(oPages[0]).outerHeight(true),setWidth=iPageSize*liTotal;oContent.css('height',setHeight);oViewport.css('height',setHeight);oContent.css('width',setWidth);}});}
if(options.monitorhover){root.delegate('.carouselTrack > li','hover',function(e){abcdm.abccom.Hook("datgslider_lihover",{"args":{'hoverItem':this}});});}
if(options.suppresslink||options.sendvideo){root.delegate('.carouselTrack > li','click.surpressedlinks',function(e){var args={ele:$(this),oldEle:$(this),revert:function(){iCurrentIndex=this.oldEle.index();currentRow=this.oldEle.closest('.staticViewPort').index();this.ele.removeClass('selected');this.oldEle.addClass('selected');},userInit:true};var processSlider=function($li){args.oldEle=oContent.find('li.selected').removeClass('selected');iCurrentIndex=$li.index();currentRow=$li.closest('.staticViewPort').index();$li.addClass('selected');if(options.sendvideo){abcdm.abccom.Hook("videoplayer_ListenNextItem",{"args":args});}
args.newSelection=true;abcdm.abccom.Hook("datgslider_liclicked",{'args':args});}
if(!$(this).hasClass('selected')&&!$(this).hasClass('disabledContent')){var $liElm=$(this);if($().interstitialAd&&$('.module.interstitialAdBlock iframe').length&&interstitialAdConf){$('.galleryImage').interstitialAd({'frame':$('.module.interstitialAdBlock iframe'),'showContentAfterAdRemove':false,'frequency':5,'duration':400,'freewheel':interstitialAdConf},function(state){if(state!=='adDisplayed'){processSlider($liElm);}});}else{processSlider($liElm);}}
return false;});}
if(options.sendvideo){addHooks();}
abcdm.abccom.Hook('datgslider_gotoselected',{"hook":function(obj){oSelf.move(0,0,iCurrentIndex);}});}
function buildWrapControls(){oPagerNum=oPagerNum.add($('<a class="prevList disabled" href="javascript:void(0);">'+options.controltextprevious+'</a>').insertBefore(oViewport.first()).add($('<a class="nextList disabled" href="javascript:void(0);">'+options.controltextnext+'</a>').insertAfter(oViewport.last())));}
function buildPlacedControls(){$.each(options.controlplacement,function(i,v){var $includeEl=root,func='appendTo',controlHtml='<div class="clearfix pagerControls',temp;switch(i){case'after':controlHtml+=' pcAfter';break;case'before':func='prependTo';controlHtml+=' pcBefore';break;default:if((temp=$(i)).length>0){$includeEl=temp;}else{return;}}
if($includeEl.length>0){if(v.controlType==='number'){controlHtml+=' pagerNumberControls';}else{controlHtml+=' pagerOf';}
controlHtml+='"><span class="pagerControlsWrap">';if(!v.removeNextPrev){controlHtml+='<span class="previousSlide"><a class="prevList" href="javascript:void(0);">'+(typeof v.controltextprevious!=='undefined'?v.controltextprevious:options.controltextprevious)+'</a></span>';}
if(v.controlType==='number'){controlHtml+=buildNumberPager(true);}else{temp=typeof v.controlseparator!=='undefined'?v.controlseparator:options.controlseparator;controlHtml+='<span class="pagesList">';controlHtml+=temp;controlHtml+=(typeof v.controlBeginText!=='undefined'?v.controlBeginText:options.controlBeginText);controlHtml+='<span class="pageNumOf">';controlHtml+=(iCurrent+1);controlHtml+='</span>';controlHtml+=(typeof v.controlTextSeparator!=='undefined'?v.controlTextSeparator:' of ');controlHtml+=iSteps;controlHtml+=(typeof v.controlEndText!=='undefined'?v.controlEndText:'');controlHtml+=temp;controlHtml+='</span>';}
if(!v.removeNextPrev){controlHtml+='<span class="nextSlide"><a class="nextList" href="javascript:void(0);">'+(typeof v.controltextnext!=='undefined'?v.controltextnext:options.controltextnext)+'</a></span>';}
controlHtml+='</span></div>';oPagerNum=oPagerNum.add($(controlHtml)[func]($includeEl));}});}
function buildNumberPager(returnString,activePage){var controlHTML='<span class="subPagerControls">',activeClass=' active',startStep=1,endStep=iSteps,activePage=activePage?activePage:1,step;if($('body.abcfamily').length){startStep=activePage-2;if(activePage==4)startStep=1;if(startStep+4>iSteps)startStep=iSteps-4;if(startStep<1)startStep=1;endStep=activePage+2;if(endStep<5)endStep=5;if(endStep>iSteps)endStep=iSteps;if(endStep+1==iSteps)endStep=iSteps;if((iSteps>6)&&(activePage>4)){controlHTML+='<a class="slideNumber';if(activePage==1){controlHTML+=activeClass;}
controlHTML+='" href="javascript:void(0);">1</a>';controlHTML+='<span class="ellipse">...</span>';}}
for(step=startStep;step<=endStep;step++){if($('body.abcfamily').length){controlHTML+='<a class="slideNumber';if(step==activePage){controlHTML+=activeClass;}
controlHTML+='" href="javascript:void(0);">';controlHTML+=step;controlHTML+='</a>';}else{controlHTML+='<a class="slideNumber';controlHTML+=activeClass;controlHTML+='" href="javascript:void(0);">';controlHTML+=step;controlHTML+='</a>';activeClass='';}}
if($('body.abcfamily').length&&((activePage+3)<iSteps)&&(iSteps>6)){controlHTML+='<span class="ellipse">...</span>';controlHTML+='<a class="slideNumber';if(activePage==iSteps){controlHTML+=activeClass;}
controlHTML+='" href="javascript:void(0);">';controlHTML+=iSteps;controlHTML+='</a>';}
controlHTML+='</span>';if(returnString){return controlHTML;}
return $('<div class="pagerNumberControls pcAfter">'+controlHTML+'</div>').appendTo(root);}
function setButtons(iDirection){var getAmount=String(options.morecontentiterate*ajaxCounter);if(iDirection===1){if(iCurrent<iSteps&&ajaxCounter>0&&options.morecontenturl!==""){ajaxCounter++;$.ajax({url:options.morecontenturl+getAmount,context:document.body,success:function(data){if($.trim(data)!=="false"){oContent.append(data);}
else{ajaxCounter=-1;}}});}
else if(ajaxCounter>-1){ajaxCounter++;}}
if(iSteps>1){oBtnPrev.toggleClass('disabled',!(iCurrent>0));oBtnNext.toggleClass('disabled',!(iCurrent+1<iSteps));var $active=oPagerNum.find('.slideNumber.active');if($active.index()!==iCurrent){$active.removeClass('active');if($('body.abcfamily').length){numPagerHtml=buildNumberPager(true,(iCurrent+1));root.find('.subPagerControls').replaceWith(numPagerHtml);}else{oPagerNum.find('.slideNumber').eq(iCurrent).addClass('active');}}}}
function nextItem(){oContent.find("li.selected").removeClass("selected");iCurrentIndex+=1;var virtualIndex=options.display*iCurrent;if(options.rows>1){var lastItem=(currentRow*iCurrentIndex);if(iCurrentIndex%options.display===0){currentRow+=1;iCurrentIndex=virtualIndex;}
if(currentRow>options.rows-1){currentRow=0;iCurrentIndex=options.display+(virtualIndex);if(iCurrentIndex>=oRows[0].length){iCurrentIndex=0;}}
if(iCurrentIndex>oRows[currentRow].length-1){iCurrentIndex=0;currentRow=0;}
if(currentRow!=='undefined')
{oRows[currentRow].eq(iCurrentIndex).addClass("selected");abcdm.abccom.Hook("videoplayer_ListenNextItem",{"args":{'ele':oRows[currentRow].eq(iCurrentIndex)}});}}else{if(iCurrentIndex>liTotal-1){iCurrentIndex=0;}
oPages.eq(iCurrentIndex).addClass("selected");abcdm.abccom.Hook("videoplayer_ListenNextItem",{"args":{'ele':oPages.eq(iCurrentIndex)}});}}
function addHooks(){abcdm.abccom.Hook("videoplayer_SendNextItem",{"hName":"datgslider_SendNextItem","hook":function(){if(options.sendvideo){nextItem();}}});abcdm.abccom.Hook('videoplayer_playingnewcontent',{"hook":function(obj){oSelf.move(0,0,iCurrentIndex);if($(".videoZoom .galleryBody").find(".galleryBodyTitle").length>0){if(obj){if(obj.clipDetails){var currentSel=oContent.find("li.selected");$(".videoZoom .galleryBody .galleryBodyTitle").html(obj.clipDetails.title);$(".videoZoom .galleryBody .galleryBodyDescription").html(obj.clipDetails.description);}}}}});}
this.move=function(iDirection,bPublic,gotoIndex,firstTime){var iDuration=options.slideduration;if(firstTime){iDuration=0;}
abcdm.abccom.Hook("datgslider_move");var newCurrent=iCurrent;newCurrent=bPublic?iDirection:newCurrent+=iDirection;if(newCurrent>-1&&newCurrent<iSteps){var oPosition={};if(typeof gotoIndex!=='undefined'){gotoIndex=Math.min(liTotal,Math.max(0,(gotoIndex)));var pageNum=Math.floor(gotoIndex/options.display);newCurrent=Math.min(iSteps,pageNum);}
if(newCurrent===iCurrent){}else{iCurrent=newCurrent;oPageInfo.html((iCurrent+1));oPosition['left']=-(iCurrent*(iPageSize*options.display));if(oPosition['left']>0){oPosition['left']=0;}
else if(oPosition['left']<-slideBoundary&&options.behavior=="scroller"){oPosition['left']=-slideBoundary;}
oContent.animate(oPosition,{queue:false,duration:iDuration,complete:function(){if(typeof options.callback=='function'){options.callback.call(this,oPages[iCurrent],iCurrent);}}});}
setButtons(iDirection);}};return initialize();};$(document).ready(function(){var $photoArrows=$(this).find('#prevPhoto, #nextPhoto');$photoArrows.hover(function(ev){$(this).addClass('over');},function(ev){$(this).removeClass('over');});});})(jQuery);

/** 
* @filepath: /module-js/collection-sliderstrip.js
* @created: Tue, 26 Nov 13 12:59:29 -0800
* @serveraddr: 10.236.183.122
* @remoteaddr: 10.211.47.159
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};abcdm.abccom.DatgSliderSite=abcdm.abccom.DatgSliderSite||{};$(function(){if($('body.abcfamily .primaryWrapper.videosSelection').length){abcdm.abccom.DatgSliderSite={customTarget:{className:'videosSelection',options:{sendvideo:true}}};}
else if($('.primaryWrapper.videosSelection').length){abcdm.abccom.DatgSliderSite={customTarget:{className:'videosSelection',options:{sendvideo:true,behavior:"pager",controlplacement:{'after':{controltextnext:"<span>NEXT</span>",controltextprevious:"<span>PREV</span>",controlseparator:"&nbsp;&nbsp;|&nbsp;&nbsp;"}}}},options:{sendvideo:false,suppresslink:false,display:4,behavior:"pager",controlplacement:{'before':{controltextnext:"",controltextprevious:"",controlseparator:""}}}};}
$(document).ready(function(){$('div.sliderstrip a.showMore').click(function(e){e.preventDefault();var $this=$(this),$subGalleryRow=$this.closest('.categoryHeaderInfo').siblings('div.subGalleryRow');if(!$subGalleryRow.is(':animated')){if($subGalleryRow.is(':visible')){$this.text('Show me more >>');$subGalleryRow.slideUp('slow');}else{$this.text('<< Show me less');$subGalleryRow.slideDown('slow',function(){abcdm.abccom.Hook('datgslider_resize');});}}});if($('.primaryWrapper.videosSelection').length){var urlParts=location.href.split('?');currUrl=urlParts[0];$(".playerContainer").parent().prepend('<div id="vidDetailWrap"><div id="vidTitle"></div><div id="vidSubtitle"></div><div id="vidDesc"></div></div>');$(".primaryWrapper.videosSelection .videoCategories .moduleHeader").prepend("<p class = \"videoSearchTitle\">Search All Videos</p><div class=\"videoSearchBox\"><div class=\"videoInputBoxWrapper\"><input type =\"text\" name=\"videoSearch\" id=\"videoInputBox\" value=\"Search\" /></div><a href=\"#\" id=\"videoSearchButton\" class=\"datgButton tiny\">search</a></div>");$('.primaryWrapper.videosSelection #videoInputBox').focus(function(e){if($(this).val()==='Search'){$(this).val('');$(this).addClass('selected');}});$('.primaryWrapper.videosSelection #videoInputBox').blur(function(e){if($(this).val()===''){$(this).val('Search');$(this).removeClass('selected');}});$(".primaryWrapper.videosSelection #videoSearchButton").click(function(e){e.preventDefault();window.location=currUrl+'?videoslidertags='+$('.primaryWrapper.videosSelection #videoInputBox').val().replace(/,/gi,'--').replace(/\s/g,'%20');});var playlist=$('.primaryWrapper.videosSelection .datgSlider').find('.playListId').attr('title');var selectedCategory=$('.primaryWrapper.videosSelection .videoCategories a.detailTitle[href*='+playlist+']');if(selectedCategory.length&&document.location.href.toLowerCase().indexOf('videoslidertags')==-1){selectedCategory.parent().addClass('selected datgButton');$(".primaryWrapper.videosSelection .sliderstripTitle").text(selectedCategory.text());}
else if(document.location.href.toLowerCase().indexOf('videoslidertags')!=-1){$(".primaryWrapper.videosSelection .sliderstripTitle").text("Your Search Results");}
var totalVideo=$(".primaryWrapper.videosSelection li.videoClip").length;$(".primaryWrapper.videosSelection .sliderstripTitle").append("<span>("+totalVideo+")</span>");if(totalVideo==0&&document.location.href.toLowerCase().indexOf('videoslidertags')!=-1){$('.primaryWrapper.videosSelection .datgSlider').text("We didn't find any videos matching your search terms");$('.primaryWrapper.videosSelection .datgSlider').append('<div class="clear"></div><a class="clearSearch" href="'+currUrl+'">Clear Search</a>');}
abcdm.abccom.Hook('videoplayer_playingnewcontent',{"hook":function(obj){var currentSel=$('.primaryWrapper.videosSelection .carouselTrack').find(".selected"),subTitle='',temp;if((temp=parseInt(currentSel.find('meta[itemprop="episodeNumber"]').attr('content'),10))>0){subTitle+='<span class="episodeNumber subTitleCont">Episode ';subTitle+=temp;subTitle+='</span>';}
subTitle+='<span class="episodeDuration subTitleCont">';subTitle+=currentSel.find("div.detailDuration").text();subTitle+='</span>';if((temp=currentSel.find('meta[itemprop="tvRating"]').attr('content'))!=='null'){subTitle+='<span class="episodeRating subTitleCont">';subTitle+=temp;subTitle+='</span>';}
if((temp=new Date(currentSel.find('meta[itemprop="uploadDateNice"]').attr('content'))).toString()!=='Invalid Date'){subTitle+='<span class="episodeAirDate subTitleCont">Aired ';subTitle+=temp.getMonth()+1;subTitle+='/';subTitle+=temp.getDate();subTitle+='/';subTitle+=temp.getFullYear();subTitle+='</span>';}
$(".primaryWrapper.videoplayer #vidTitle").text(currentSel.find("abbr").text());$(".primaryWrapper.videoplayer #vidSubtitle").html(subTitle);$(".primaryWrapper.videoplayer #vidDesc").text(currentSel.find("div.detailContent").text());}});}
if($('body.oscar').length){$('abbr.timeago').timeago();$('.comments abbr.objectid').each(function(){var object=$(this),objectid=object.attr('title'),commentsServiceUrl='http://ww2.abc.go.com/service/comment/count',data={objectids:objectid,cmsid:'abccom'};if(objectid){abcdm.abccom.Utils.getJSONP(commentsServiceUrl,data,function(response){if(response&&response.data!==undefined){object.text(response.data.toString());}});}});if($('.videoGallery').length){abcdm.abccom.DatgSliderSite={options:{suppresslink:true,behavior:"pager",controlplacement:{'after':{'controlType':'number',controltextnext:'Newer',controltextprevious:'Older'}}}};abcdm.abccom.Hook('videoplayer_playingnewcontent',{"hook":function(obj){if(!$('.videoZoom .galleryBody').hasClass('videoCaption')){$('.videoZoom .galleryBody').addClass('videoCaption');}
if($('.videoZoom .galleryBody').find('.durationWrapper').length){var currentSel=$('.videoGallery').find('li.selected'),duration=$.trim(currentSel.find('.detailDuration').html());$('.videoZoom .galleryBody .durationWrapper').html('/ <span class="duration">'+duration+'</span>');}}});$('.videoGallery a.thumbNail').css('opacity','1');$('.videoGallery a.thumbNail').mouseenter(function(){$(this).stop(true,true).animate({opacity:0.85},500);});$('.videoGallery a.thumbNail').mouseleave(function(){$(this).stop(true,true).animate({opacity:1},300);});}}});});