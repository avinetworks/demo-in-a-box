
//////////// src: scripts/_bcom-gigya.js ////////////

if (typeof bcom === "undefined") { bcom = {}; }

/*-------------
 * BCOM Gigya module
 *
 * Used for putting the Gigya social
 * module on a page
 */
bcom.gigya = {

    /*--------------
     * bcom.gigya.init()
     *
     * Expects the ID of an element
     * that will be turned into the
     * Gigya module.
     *
     * DOM element should resemble:
     * <div id="gigya-top" data-networks="facebook,twitter" data-canonical="example.com/full-article" data-shorturl="example.com" data-headline="Hello World">
     */
    init: function(id) {
        var $elem, act, uiParams;

        $elem = $("#" + id);
        this.canonicalURL = $elem.attr("data-canonical");
        this.shortURL = $elem.attr("data-shorturl");
        this.headline = $elem.attr("data-headline");
        this.thumbnail = $elem.attr("data-thumbnail");
        this.description = $elem.attr("data-description");
        this.networks = this.getNetworks($elem.attr("data-networks"));
        this.thumbType = $elem.attr("data-thumb-type");
        this.showCounts = $elem.attr("data-show-counts");
        this.iconsOnly = $elem.attr("data-icons");

		//changing the default from right to top if attr left blank of undefined
		if(this.showCounts == undefined || this.showCounts == ''){
			this.showCounts = 'top';
		}
        act = this.createUserAction();
        uiParams = this.setUIParams(act, id);
        gigya.socialize.showShareBarUI(uiParams);
    },

    createUserAction: function() {
        var act;
        act = new gigya.socialize.UserAction();
        act.setLinkBack(this.shortURL);
        act.setTitle(this.headline);
        act.setDescription(this.description);
        if(this.thumbType === 'image'){
	        var image = {
			//we should really set a default image to use in the instance that we don't have an image set for an article
	                type: 'image',
	                src: this.thumbnail,
	                href: 'http://graphics8.nytimes.com'
	        }
			act.addMediaItem(image);
		}
		if(this.thumbType === 'video'){
			var video = {
                src: 'http://www.youtube.com/v/fzzjgBAaWZw&hl=en&fs=1',
                previewImageURL: 'http://graphics8.nytimes.com/images/2006/01/02/science/03cute.large2.jpg',
                type: 'flash'
            }
			act.addMediaItem(video);

		}
        return act;
    },

    getNetworks: function(data) {
        if (data) {
            return data.split(",");
        }

        // Default list of networks to use
        // if none are provided
        return ["facebook",
                "twitter",
                "googleplus-share",
                "pinterest",
                "linkedin",
                "share"];
    },

    setUIParams: function(act, id) {
        var params, self;

        self = this;

        params = {
            containerID: id,
            moreEnabledProviders: "reddit,tumblr,evernote,gmail,pinterest,bitly,delicious",
            shareButtons: [],
            //showCounts: "top",-show-counts
            showCounts: this.showCounts,
            iconsOnly:	this.iconsOnly,
            userAction: act,
            shortURLs: "never"
        }

        var len = self.networks.length;
        for(var i = 0; i < len; i++) {
            var network = self.networks[i];

            switch(network) {
                case "facebook":
                    params.shareButtons.push(
                        {provider: "Facebook"});
                    break;
                case "twitter":
                    params.shareButtons.push(
                        { provider:"Twitter",
                          related: "BostonDotCom,BostonGlobe",
                          via:"BostonDotCom",
                          countURL: self.canonical
                        });
                     params["twitterUserAction"] = { "title": this.headline + " - via @bostondotcom" }
                    break;
                case "googleplus-share":
                    params.shareButtons.push(
                        { provider:"googleplus-share"});
                    break;
                case "pinterest":
                    params.shareButtons.push(
                        { provider:"pinterest"});
                    break;
                case "linkedin":
                    params.shareButtons.push(
                        { provider:"linkedin"});
                    break;
                case "share":
                    params.shareButtons.push(
                        { provider:"share",
                          tooltip:"Share on other social networks"
                        });
                    params["enableCount"] = false;
                    break;
                case "email":
                    params.shareButtons.push({provider:"email"});
                    break;
                case "reddit":
                    params.shareButtons.push({provider:"Reddit"});
                    break;
                case "stumbleupon":
                    params.shareButtons.push({provider:"Stumbleupon"});
                    break;
                case "myspace":
                    params.shareButtons.push({provider:"Myspace"});
                    break;
                case "tumblr":
                    params.shareButtons.push({provider:"Tumblr"});
                    break;
                default:
                    break;
            }
        }

        return params;
    }
}


//////////// src: scripts/_bcom-gigya-run.js ////////////

$(function() {
	$('.gigya').each(function(){
		 bcom.gigya.init(this.id);
	});
});