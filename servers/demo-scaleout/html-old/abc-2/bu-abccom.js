

/** 
* @filepath: bu:abccom
* @created: Tue, 26 Nov 13 12:59:18 -0800
* @serveraddr: 10.122.15.187
* @remoteaddr: 10.124.151.194
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/


/** 
* @filepath: /bu/abccom/bu.js
* @created: Tue, 26 Nov 13 12:59:18 -0800
* @serveraddr: 10.122.15.187
* @remoteaddr: 10.124.151.194
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var abcdm=abcdm||{};abcdm.abccom=abcdm.abccom||{};(function($){function addPublishDate(path){var lid='publishDate='+$.url.param("publishDate"),modified=false,appendStr='?';if(path&&(path.indexOf('http://staging.')===0||path.indexOf('http://qa.')===0||path.indexOf('http://editorial.')===0||path.indexOf('http://solr.')===0||path.indexOf('http://local.')===0||path.indexOf('/')===0)&&path.indexOf('publishDate')==-1&&path.indexOf('go.com')>-1){if(path.indexOf('?')>0){appendStr='&';}
if(path.indexOf('#')>0){var arr=path.split('#');path=arr[0]+appendStr+lid+'#'+arr[1];}else{path=path+appendStr+lid;}
modified=true;}
return{path:path,modified:modified};};abcdm.abccom.publishDateAdder=function(){if($.url.param("publishDate")){$('a').each(function(index){var stuff=addPublishDate(this.href);if(stuff.modified===true){this.href=stuff.path;}});$('.categorySelector select option').each(function(index){var stuff=addPublishDate($(this).val());if(stuff.modified===true){$(this).val(stuff.path);}});}};$(document).ready(function(){jQuery.fn.extend({propAttr:$.fn.prop||$.fn.attr});jQuery.fn.extend({prop:$.fn.attr});jQuery.extend({isWindow:function(obj){return obj!=null&&obj==obj.window;}});var hoverMoreTimer;$(".primaryNav .moreTab a").unbind("mouseenter").bind("mouseenter",function(){clearTimeout(hoverMoreTimer);$(".primaryNav .searchInput").blur();$(".primaryNav").addClass("showMore");$(".ui-autocomplete ").hide();});$(".primaryNav .moreTab a").click(function(){$(".primaryNav .searchInput").blur();$(".primaryNav").toggleClass("showMore");});$(".primaryNav").hover(function(){clearTimeout(hoverMoreTimer);},function(){hoverMoreTimer=setTimeout(function(){$(".primaryNav").removeClass("showMore");},1500);});if($(".searchInput").length&&jQuery&&jQuery.widget&&jQuery.widget.extend&&typeof jQuery.widget.extend!="undefined"){$("input.searchInput").autocomplete({delay:200,minLength:2,source:function(req,add){var term={"q":req.term};$.getJSON("/service/search/global-search-autocomplete?callback=?",term,function(data){add(data.shows);});}}).data("ui-autocomplete")._renderItem=function(ul,item){var term=$(".searchInput").val();var showTitle=item.showName;var termPos=showTitle.toLowerCase().indexOf(term.toLowerCase());if(termPos<0){termPos=0;term="";}
showTitle=showTitle.substring(0,termPos)+'<span class="highlight">'+showTitle.substring(termPos,termPos+term.length)+'</span>'+showTitle.substring(termPos+term.length);return $("<li>").append("<a href='"+item.url+"'><img class='showImage' src='"+item.image+"'><span class='showName' href='"+item.url+"'>"+showTitle+"</span></a>").appendTo(ul);};}
abcdm.abccom.publishDateAdder();});})(jQuery);