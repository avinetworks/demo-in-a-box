

/** 
* @filepath: show:abccom,abccom
* @created: Tue, 26 Nov 13 12:59:30 -0800
* @serveraddr: 10.239.13.249
* @remoteaddr: 10.96.118.249
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/


/** 
* @filepath: /shows/abccom/abccom/show.js
* @created: Tue, 26 Nov 13 12:59:30 -0800
* @serveraddr: 10.239.13.249
* @remoteaddr: 10.96.118.249
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

(function($,h,c){var a=$([]),e=$.resize=$.extend($.resize,{}),i,k="setTimeout",j="resize",d=j+"-special-event",b="delay",f="throttleWindow";e[b]=250;e[f]=true;$.event.special[j]={setup:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.add(l);$.data(this,d,{w:l.width(),h:l.height()});if(a.length===1){g()}},teardown:function(){if(!e[f]&&this[k]){return false}var l=$(this);a=a.not(l);l.removeData(d);if(!a.length){clearTimeout(i)}},add:function(l){if(!e[f]&&this[k]){return false}var n;function m(s,o,p){var q=$(this),r=$.data(this,d);r.w=o!==c?o:q.width();r.h=p!==c?p:q.height();n.apply(this,arguments)}if($.isFunction(l)){n=l;return m}else{n=l.handler;l.handler=m}}};function g(){i=h[k](function(){a.each(function(){var n=$(this),m=n.width(),l=n.height(),o=$.data(this,d);if(m!==o.w||l!==o.h){n.trigger(j,[o.w=m,o.h=l])}});g()},e[b])}})(jQuery,this);(function($){$(document).ready(function(){abcdm.abccom.Hook('slideshow_advance',{'hook':function(obj){var s=s_gi(s_account);s.trackExternalLinks=false;s.linkTrackVars='prop1,prop2,prop4,prop5,eVar30,events';s.linkTrackEvents=s.events='event30';s.eVar30='abcHpSlideShow'+':'+obj.slotnumber+':'+obj.contentid+':'+obj.slidetitle;s.tl(true,'o',window.location);}});$(".module.sliderstrip.video .contentArea.videoClip").each(function(){var showName=$(this).find('meta[itemprop="showName"]').attr('content');if(showName){var epName=$(this).find(".detailTitle abbr").html();$(this).find(".detailTitle abbr").html(showName);$(this).find(".detailTitle").after('<div class="detailEpisodeTitle">'+epName+'</div>')}
var uploadDate=$(this).find('meta[itemprop="uploadDate"]').attr('content');if(uploadDate){var v=uploadDate.split('-');$(this).find('.detailDuration').append(' | '+v[1]+'/'+v[2]+'/'+v[0]);}});$(".module.sliderstrip.video.fullEpisodes .contentArea.videoClip").each(function(){var showName=$(this).find('.detailShowname').html();if(showName){var epName=$(this).find(".detailTitle").html();$(this).find(".detailTitle").html(showName);$(this).find(".detailDesc").html(epName);}});$(".homeTrendingNow .adBlock").resize(function(e){adHeight=$(".homeTrendingNow .adBlock").height();if(adHeight>550){$(".homeTrendingNow").addClass("longAd");}
else if(adHeight<320){$(".homeTrendingNow").removeClass("longAd");}});$(".primaryWrapper.ads .ThinBannerAdBlock").addClass("hideAd");$(".primaryWrapper.ads .ThinBannerAdBlock").resize(function(e){adHeight=$(".primaryWrapper.ads .ThinBannerAdBlock").height();if(adHeight<=0){$(".primaryWrapper.ads .ThinBannerAdBlock").addClass("hideAd");}
else{$(".primaryWrapper.ads .ThinBannerAdBlock").removeClass("hideAd");}});$("body.abccom #datgslider_schedule-day").each(function(){$(this).find(".dateSelector li").each(function(){$(this).children("a").each(function(index){var increment=Math.round(index*3)/100;$(this).css('background-color','rgba(0, 0, 0, '+increment+')');})});$(this).find(".staticViewPort li.selected").prepend('<div class="weekdayCursor"><div class="weekdayCursorOpacity"></div></div>');$(this).find(".weekdayCursor").css("left",$(this).find("a.weekday.selected").position().left)
weekdayCursor();$(this).find("a.weekday").click(function(){$(".weekdayCursor").remove();$(this).parent().prepend('<div class="weekdayCursor"><div class="weekdayCursorOpacity"></div></div>');var left=$(this).position().left;$(".weekdayCursor").css("left",left)
weekdayCursor();});});$("body.abccom .scheduledayModule li.scheduleItem").each(function(){$(this).find(".schedTuneRating").insertAfter($(this).find(".scheduleEpisodeDescription"));var pipe='';if($(this).find("div.onaironly").length>0&&$(this).find(".schedTuneIn").html()){pipe='&nbsp;| ';$(this).find(".schedTuneRating").prepend(pipe);$(this).find("div.onaironly").css('float','left');}
$(this).find("div.onaironly").insertAfter($(this).find(".scheduleEpisodeDescription"));});function weekdayCursor(){var selected_index=$("body.abccom #datgslider_schedule-day .staticViewPort li a.selected").index()
var new_opacity=Math.round(selected_index*3)/100;var new_opacity=new_opacity+0.1;$("body.abccom #datgslider_schedule-day .weekdayCursorOpacity").css("opacity",new_opacity);$("body.abccom #datgslider_schedule-day .weekdayCursorOpacity").css("filter","alpha(opacity="+new_opacity*10+")");}
abcdm.abccom.Hook('schedule_ready',{"hook":function(){$("body.abccom .scheduledayModule li.scheduleItem").each(function(){$(this).find(".schedTuneRating").insertAfter($(this).find(".scheduleEpisodeDescription"));var pipe='';if($(this).find("div.onaironly").length>0&&$(this).find(".schedTuneIn").html()){pipe='&nbsp;| ';$(this).find(".schedTuneRating").prepend(pipe);$(this).find("div.onaironly").css('float','left');}
$(this).find("div.onaironly").insertAfter($(this).find(".scheduleEpisodeDescription"));});}});if($("body.abccom .schedAddToCal").length>0){$('body').on('click',"#abc-overlay",function(){$("#abc-overlay").remove();$("#abc-div-iframe").remove();});}
abcdm.abccom.Hook('digAdHPTakeover',{"hTiming":'default','hook':function(options){if(typeof options==='object'){if(options.leftImage&&options.rightImage&&options.leftLink&&options.rightLink){if($('body.mobile').length===0){try{$('.LRGuttersAdBlock').html('<div id="leftGutter" class="gutterAd background"><a><img /></a></div><div id="rightGutter" class="gutterAd background"><a><img /></a></div>');if(options.internalAd!==true){$('.LRGuttersAdBlock a').attr('target','_blank');}
$('#leftGutter img').attr('src',options.leftImage);$('#rightGutter img').attr("src",options.rightImage);$('#leftGutter a').attr("href",options.leftLink);$('#rightGutter a').attr("href",options.rightLink);$('.LRGuttersAdBlock').addClass('background');$('body').css({'overflow-x':'hidden'});}catch(e){}}}}}});});})(jQuery);