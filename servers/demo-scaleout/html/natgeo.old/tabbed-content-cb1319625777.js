$(function(){
  var tabbedContent = $(".tabbed-content");
  var tabLinks = tabbedContent.find("ul:first li a");
  var heightChange = 0;

  // remove any tabs that don't have corresponding content
  tabLinks.each(function(){
    var aTag = $(this);
    var target = $(aTag.attr("href"));
    if(!target.length) aTag.parent().remove();
  });

  // create the tabs
  if(tabbedContent.length) {
    //The tabbed content module is taller before the tabs are created, so that height is stored..
    heightChange = $('.tabbed-content').height();
    tabbedContent.tabs();
    //then the tabbed height is subtracted for the difference
    heightChange -= $('.tabbed-content').height();
    //The difference is then subtracted from content_mainA and content_mainB to remove the extra space from the bottom of each
    //(the min-height for content_mainA is the only one checked the function setting because they are both the same, otherwise there would be no reason to do this)
    $('#content_mainA, #content_mainB').css('min-height', (parseInt($('#content_mainA').css('min-height').substring(0, $('#content_mainA').css('min-height').length - 2)) - heightChange) + "px");
  }
});