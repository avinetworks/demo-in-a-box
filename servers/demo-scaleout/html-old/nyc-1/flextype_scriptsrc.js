var NYTINT = NYTINT || {};

;(function($) {
  'use strict';

  NYTINT.times_minute = {

    //settings
    data: null,
    speed: 5000, //5s
    is_rotating: null,
    is_ab: false,
    active: 0,
    //markup collections
    root: null,
    url: null,
    heds: null,
    img: null,

    init: function() {
      var self = this,
          flex = null;

      //end if no flextypes
      if (NYTD.FlexTypes === undefined || NYTD.FlexTypes === null) { return; } 

      //isolate correct FlexType data
      for (var i = 0, ft; ft = NYTD.FlexTypes[i]; i++) {
        if (ft.type.indexOf('TimesMinute') >= 0) { flex = ft; }
      }
      if (flex === null) { return; }
      this.data = flex.data;
      
      //'wait' for root element
      var loader = setInterval(function() {
        self.root = $('#'+flex.target);
        if (self.root.length > 0) {
          //stop timer
          clearInterval(loader);
          //load and populate, then bind behavior and rotation
          $.when(self.load_template(),self.populate_template()).then(function() {
            self.bind_interaction();
            self.start_rotation();
          });
        }    
      }, 50);
    },
    load_template: function() {
      var loaded = new $.Deferred();
      
      //test location in page
      this.is_ab = this.root.parents('#spanABBottomRegion').length > 0;
      
      //pick which template to use
      var template = (this.is_ab) ? $("#timesminuteAB").html() : $("#timesminute").html();
      if (template === null) { return loaded.reject(); }
      
      this.root.hide().append(template);

      return loaded.resolve();
    },
    populate_template: function() {
      var populated = new $.Deferred(),
          first = this.data[1];
      
      this.url = this.root.find('a');
      this.heds = this.root.find('li');
      this.img = this.root.find('img');
      this.hr = this.root.find('hr');

      //fail silently if not valid URL or first node of data
      if (this.data.url === undefined || (first !== undefined && first.hed === '')) { 
        console.log('populate_template rejected');
        return populated.reject(); 
      }

      //add timestamp
      if (this.data.timestamp !== undefined && this.data.timestamp !== '') {
        this.root.find('.timestamp').text(this.data.timestamp);
      }

      //set click-through destination for all
      this.url.attr('href', this.data.url);

      //add each headline
      for (var i = 0, hed; hed = this.heds[i]; i++) {
        var d = this.data[i + 1];
        $(hed).append(d.hed);
      }

      //add each image (even if it is only one)
      for (var i = 0, img; img = this.img[i]; i++) {
        var d = this.data[i + 1];
        $(img).attr('src',d.img);
      }

      //populate image and URL and reveal tease
      this.replace_tease();
      this.root.show();

      return populated.resolve();
    },
    start_rotation: function() {
      if (!this.data.rotation) { return; }
      var self = this;
      this.is_rotating = setInterval(function() { self.replace_tease(); }, this.speed);
    },
    bind_interaction: function() {
      var self = this;
      this.heds.on('mouseover', function(e) {
          clearInterval(self.is_rotating);
          self.active = self.heds.index($(e.currentTarget)); //get hovered item index and trigger rotation
          self.replace_tease();
        })
        .on('mouseout', function(e) { self.start_rotation(); });
    },
    replace_tease: function() {
      //increment counter
      this.active = (this.active < 3) ? (this.active + 1) : 1;
      
      //get next data
      var tease = this.data[this.active];

      //set image/url if ACol- or BCol-sized teases
      if (!this.is_ab) {
        this.img.attr('src', tease.img);
        this.url.attr('href', (tease.url !== '') ? tease.url : this.data.url);
      }

      //set hr position (via css) if in markup
      if (this.hr.length > 0) {
        this.hr.attr('class','hr_'+this.active);
      }

      //toggle headline visibility
      this.heds.removeClass('active');
      $(this.heds[this.active - 1]).addClass('active');
    }
  };
  
  NYTINT.times_minute.init();
  
  
})( (typeof NYTD != "undefined") ? NYTD.jQuery : window.jQuery);
