jQuery(document).ready(function(){
	Sharebox.init();
});

var Sharebox = {
	"settings": [
	             {'id': '#share_link', 'box': '#sharebox', 'closer': '#shareclosebox', 'offset': [ -273, 29 ], 'sendlink':'#send_link'},
  						 {'id': '#embed_link', 'box': '#embedbox', 'closer': '#embedclosebox', 'offset': [ -278, 29 ], 'sendlink': null}
						  ],

	"init":function() {
		var self = this;
		self.inject_share_box();
		self.init_link_handlers();
		jQuery.each(this.settings, function(i, value) {
			self.attach_handler(value);
		});
		var sendlink = jQuery("#send_link");
		jQuery(sendlink).removeAttr('onclick');
		
		jQuery(sendlink).click(function(){
		//	self.send_to_friend();
		//	return false;
		}).css('opacity', '0.5');
	},
	"inject_share_box": function() {
	  var self = this;
	  if(jQuery('#sharebox')) {jQuery('#sharebox').remove();}
	  if(jQuery.browser.msie && jQuery.browser.version > 7) {
	    jQuery('head').prepend('<link rel="stylesheet" type="text/css" href="shared/style_ie.css"');
    }
    jQuery('body').append(self.create_template());
	},
	"attach_handler":function (setting) {
		var self = this;
		if(!jQuery(setting.id)) {return};
		var box = jQuery(setting.box);

		jQuery(setting.id).click(function() {
		  jQuery('body').append(box.remove());

			box.clonePosition(this, {
																setWidth: false,
	    													setHeight: false,
																offsetTop:setting.offset[1],
																offsetLeft:setting.offset[0]
																})
			
			if(!box.css('z-index')) {
				box.css('z-index', 1);
			}
															
			box.show();
			

      jQuery(setting.closer).unbind().click(function() {
        box.hide();
        return false;
      });

			return false;
		})
	},

	"send_to_friend": function() {
		var fromaddr = jQuery('#sharesender').val();
		var toaddr = jQuery('#sharerecipiants').val();
		var link = window.location.href;
		var title = document.title;
		var templates = 'gallery';

		this.send_email({'email': toaddr, 'from':fromaddr, 'link': link, 'template':templates, 'title':title});
	},
	"send_email": function(data) {
		jQuery.post('shared/send_to_a_friend/send.php', data, function(data){jQuery('#sharebox').hide();});
	},
	"init_link_handlers":function() {
		jQuery('#sharelinks li a[onclick]').each(function(){
			jQuery(this).removeAttr('onclick');
		});
		var self = this;
		jQuery('#sharelinks a').each(function() {
			jQuery(this).click(function() {
				self.log_click(jQuery(this).children('strong')[0].innerHTML, this.href);
			})
		})
	},
	"log_click":function(type, url) {
			jQuery.get('shared/shared.php?type=' + type + '&url=' + url);
	},

	"services": [
	  {
  	  'service':'digg',
  		'url' : 'http://digg.com/submit?title={title}&amp;url={url}',
  		'alt' : 'Digg this',
  		'name' : 'Digg'
  	},
  	{
  	  'service':'delicious',
  		'url' : 'http://del.icio.us/post?t&amp;v=4&amp;noui&amp;jump=close&amp;title={title}&amp;url={url}',
  		'alt' : 'bookmark on delicious',
  		'name' : 'Delicious'
  	},
  	{
  	  'service':'stumbleupon',
  		'url' : 'http://www.stumbleupon.com/submit?title={title}&amp;url={url}',
  		'alt' : 'stumbleupon',
  		'name' : 'StumbleUpon'
  	},
  	{
  	  'service':'technorati',
  		'url' : 'http://technorati.com/faves?add={url}',
  		'alt' : 'technorati',
  		'name' : 'Technorati'
  	},
  	{
  	  'service':'yahoo',
  		'url' : 'http://bookmarks.yahoo.com/toolbar/savebm?t={title}&amp;u={url}',
  		'alt' : 'yahoo',
  		'name' : 'Yahoo'
  	},
  	{
  	  'service':'facebook',
  	  'url' : 'http://www.facebook.com/sharer.php?u={url}&amp;t={title}',
  		'alt' : 'facebook',
  		'name' : 'Facebook'
  	},
  	{
  	  'service': 'twitter',
  	  'url' : '/tiny_url_proxy.php?loc=' + escape(window.location.href) + '&amp;title=' + escape(document.title) + '&amp;mode=twitter',
  		'alt' : 'send to twitter',
  		'name' : 'Twitter'
  	}
  ],
  "template":"<div id=\'sharebox\' style=\'display:none;\'><a id=\'shareclosebox\' href=\'javascript:void(0)\'></a><div id=\'sharetoptext\'><span class=\'sharetext sharefloatleft\'><strong>SHARE</strong></span><br style=\'clear:both;\'/></div><div id=\'sharelinks\'>{links}</div><br /><br style=\'clear:both;\'/></div>",
  "email":"<br /><div id=\'shareemail\'><span class=\'sharetext\'><strong>E-MAIL</strong></span><br /><span class=\'sharepad sharedescription\'><label for=\'sharesender\'><strong>Your name</strong></label></span><input name=\'sender\' id=\'sharesender\' class=\'shareinput\' /><span class=\'sharepad sharedescription\'><label for=\'sharerecipiants\'><strong>Recipient\'s e-mail address</strong><span class=\'shareitalics\'>(separate addresses with commas)</span></label></span><input name=\'recipients\' id=\'sharerecipiants\' class=\'shareinput\' /></div><span id=\'sharesend\'><a id='send_link' href=\'javascript:void(0)\'><strong>SEND</strong></a></span>",
  "make_link":function(object) {
    return "<a href=\"" + this.build_share_url(object.url) + "\"><img src=\"shared/" + object.service + "_icon_16.png\" alt=\"" + object.alt + "\"><strong>" + object.name + "</strong></a>";
  },
  "twitter_message":function() {
    var tiny_url = get_tiny_url();
    return document.title + ': ' + tiny_url;
  },
  "build_share_url": function(url){
    var replacements = {'{url}': window.location.href, '{title}': document.title};
    jQuery.each(replacements, function(match, replace) {
      url = url.replace(match, escape(replace));
    });
    return url;
  },
  "image_path": function(name) {
    return "shared/" + name + "_icon_16.png";
  },
  "create_template": function() {
    var links = ["<ul>"];
    var self = this;
    jQuery.each(self.services, function(){
      links.push('<li>' + self.make_link(this) + '</li>');
    })
    links.push('</ul>');
    return self.template.replace('{links}', links.join(''));
  }

}