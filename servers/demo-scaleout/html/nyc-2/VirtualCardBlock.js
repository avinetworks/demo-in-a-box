(function($, data) {

  function VirtualCardBlock(data) {
    
    this.data = data;
    this.initialCount = (this.data.options.initialRows <= 0) ? Infinity : this.data.options.initialRows * 2;
    this.iconCount = (this.data.options.iconRows < 0) ? Infinity : this.data.options.iconRows * 2;
    this.onLoad( );

  }
  
  VirtualCardBlock.prototype.onLoad = function( ) {
    
    var html = "";
    
    html += "<h3 class='sectionHeader blockHeader'>" + this.data.title + "</h3>";
    
    for(var i = 0; i < this.data.cards.length; i++) {
      
      var card = this.data.cards[i];
			
			if (i == this.initialCount) html += "<a href='javascript: void 0;' class='moreButton'><span>More</span> <span class='down'></span></a><div class='more'>";

      if(i % 2 == 0) html += "<div class='wrap'>";
      
      html += "<div class='card " + ((i % 2 == 0) ? "odd" : "even") + "'>";
      
      if(card.icon && i < this.iconCount) {
        html += "<div class='left'>";
      }
            
      html += "<h3 class='sectionHeader'>";

      if (card.website) {
        html += "<a href='" + card.website + "'>" + card.name + "</a>"
      } else {
        html += card.name;
      }

      html += "</h3>";

      if(card.description) html += "<p>" + card.description + "</p>";
      
      if(card.links.length || card.links.text) {
        
        if(card.links.text) card.links = [card.links];

        html += "<ul>";
        for(var j = 0; j < card.links.length; j++) {
          var link = card.links[j];
          
          html += "<li>";
          if(link.isTwitter) {
            var href = "";
            href += "https://twitter.com/intent/user?original_referer=";
            href += escape(document.location);
            href += "&region=following&source=followbutton&variant=2.0&screen_name=" + link.url;
            html += "<a href='javascript: twitterPopup=window.open(\"";
            html += href;
            html += "\", \"twitterPopUp\",\"height=500,width=550\"); twitterPopup.focus( );'>";
						html += (card.links.length == 1) ? link.text : "Twitter";
            html += "</a>";
					} else if(link.isEmail) {
						html += "<a href='mailto:" + link.url + "'>Email</a>";
          } else {
						html += "<a href='" + link.url + "'>" + link.text + "</a>";
					}
          html += "</li>";
        }
        html += "</ul>";
      }
      
      if(card.icon && i < this.iconCount) {
        html += "</div>";
        html += "<div class='right'>";
        html += "<a href='" + card.website + "'><img width='50' height='50' src='" + card.icon + "' /></a>";
        html += "</div>";
      }
      
      html += "</div>";
      
      html += (i % 2 == 0) ? "" : "</div>"; /* CLOSE WRAP DIV */
      
    }
    
    if(card.links.length % 2 == 1) html += "</div>"; /* CLOSE WRAP DIV if LENGTH IS ODD */

		if (this.data.cards.length >= this.initialCount) html += "</div>"; /* CLOSE MORE DIV */
    
    $(".virtualCardBlock").html(html);
		
		if(this.data.options.iconUrl) {
			console.log(this.data.options.iconUrl);
			$(".virtualCardBlock .blockHeader").css("background", "url(" + this.data.options.iconUrl + ") no-repeat 0 0").css("padding-left", "20px");
		}
		
		var that = this;
		$(".virtualCardBlock .moreButton").click(function( ) {
			that.displayMore( );
		});
    
  }

	VirtualCardBlock.prototype.displayMore = function( ) {
		$(".virtualCardBlock .moreButton").slideUp(100, function( ) {
			$(".virtualCardBlock .more").slideDown( );
		});
	}

  $(document).ready(function( ) {
    var virtualCardBlock = new VirtualCardBlock(data.data);
  });

})(NYTD.jQuery, getFlexData( ));