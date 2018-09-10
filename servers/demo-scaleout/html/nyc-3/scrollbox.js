var NYTD = window.NYTD || {};

NYTD.ScrollBox = Class.create({
    initialize: function(el) {
        this.scrollBox = $(el);
        this.scrollContent = $(el).down(".scrollContent");

        this.scrollBar = (new Element('div')).addClassName("scrollBar");
        this.upButton = (new Element('div')).addClassName("upButton");
        this.downButton = (new Element('div')).addClassName("downButton");
        this.thumbContainer = (new Element('div')).addClassName("thumbContainer");
        this.thumb = (new Element('div')).addClassName("thumb");

        this.scrollBox.appendChild(this.scrollBar);
        this.scrollBar.appendChild(this.upButton);
        this.scrollBar.appendChild(this.thumbContainer);
        this.scrollBar.appendChild(this.downButton);
        this.thumbContainer.appendChild(this.thumb);

        // initialize settings
        this.animating = false;
        this.dragging = false;
        this.holding = false;
        this.navHidden = false;

        // figure out our size
        this.scrollboxHeight = this.scrollBox.getHeight();

        // fix the content height
        this.scrollContent.setStyle({"height": this.scrollboxHeight + "px", "overflow": "hidden"});

        // size the scrollbar
        //  we want the scrollbar height to be an odd number so everything looks right
        var sbHeight = this.scrollboxHeight;
        sbHeight = sbHeight % 2 == 1 ? sbHeight : sbHeight - 1;
        this.scrollBar.setStyle({"height": sbHeight + "px" });
        this.thumbContainer.setStyle({"height": (sbHeight - 33) + "px"}); // top/bottom arrows 15px + 2px border

        // how many scrollContents to we have in the list?
        this.numItems = this.scrollContent.childElements().length;
        // initialize carousel
        this.resizeCarousel();
        this.getMaximumScroll();
        // determine some default scroll sizes
        this.smallScrollAmt = 20;
        this.largeScrollAmt = this.scrollboxHeight;
        this.mouseWheelScrollAmt = 10;
        // figure out the max scrollability
        this.thumbHeight = this.thumb.getHeight();
        this.maxScrollerTop = this.thumbContainer.getHeight() - this.thumbHeight + 1;
        // set up events
        this.setupEvents();
    },
    setupEvents: function() {
        Event.observe(this.scrollBox, 'mousewheel', this.handleMouseWheel.bindAsEventListener(this));
        Event.observe(this.scrollBox, 'DOMMouseScroll', this.handleMouseWheel.bindAsEventListener(this));

        Event.observe(this.upButton, 'mousedown', this.doPreviousScroll.bindAsEventListener(this));
        Event.observe(this.downButton, 'mousedown', this.doNextScroll.bindAsEventListener(this));
        Event.observe(this.thumbContainer, 'mousedown', this.doChunkScroll.bindAsEventListener(this));
        Event.observe(this.thumb, 'mousedown', this.mouseDownHandler.bindAsEventListener(this));
        Event.observe(document, 'mouseup', this.mouseUpHandler.bindAsEventListener(this));
        Event.observe(document, 'mousemove', this.mouseMoveHandler.bindAsEventListener(this));
    },
    handleMouseWheel: function(e) {
        var delta = Event.wheel(e);
        if (delta < 0) {
            // down
            this.doWheelDown(e, -delta);
        }
        else if (delta > 0) {
            // up
            this.doWheelUp(e, delta);
        }
    },
    mouseDownHandler: function(e) {
        // initialize drag
        this.dragging = true;
        // save start position
        this.curX = Event.pointerX(e);
        this.curY = Event.pointerY(e);
        this.originalTop = this.thumb.offsetTop;
        // stop the event
        Event.stop(e);
    },
    mouseUpHandler: function(e) {
        // end drag
        this.dragging = false;
        // end hold button
        this.holding = false;
    },
    mouseMoveHandler: function(e) {
        if (this.dragging) {
            // stop bubble up
            Event.stop(e);
            // get how far the mouse moved
            var diff = Event.pointerY(e) - this.curY;
            // prevent going off the ends
            if (this.originalTop + diff < 0) {
                this.thumb.style.top = "-1px";
            }
            else if (this.originalTop + diff > this.maxScrollerTop) {
                this.thumb.style.top = this.maxScrollerTop + "px";
            }
            else {
                // move the thumb the desired offset
                this.thumb.style.top = (this.originalTop + diff) + "px";
            }
            // update the carousel
            this.setCarouselScrollPercentage(this.getScrollbarPercentage());
        }
    },
    doWheelDown: function (e, delta) {
        var curTop = this.scrollContent.scrollTop;
        if (curTop < this.maximumScroll) {
            var scrollAmt = (this.mouseWheelScrollAmt * delta);
            this.scrollContent.scrollTop += scrollAmt; 
            this.setScrollbarPercentage(this.getCarouselScrollPercentage());
            Event.stop(e);
        }
    },
    doWheelUp: function (e, delta) {
        var curTop = this.scrollContent.scrollTop;
        if (curTop > 0) {
            var scrollAmt = (this.mouseWheelScrollAmt * delta);
            this.scrollContent.scrollTop -= scrollAmt; 
            this.setScrollbarPercentage(this.getCarouselScrollPercentage());
            Event.stop(e);
        }
    },
    doChunkScroll: function (e) {
        if (this.animating) {
            return;
        }

        // we on top of thumb or bottom
        var thumbTop = (this.thumb.cumulativeOffset())[1];
        var thumbBot = thumbTop + this.thumbHeight;
        var curTop = this.scrollContent.scrollTop;

        var yPos = Event.pointerY(e);

        var offset = 0;
        if (yPos < thumbTop) {
            // going up
            if ( (curTop - this.largeScrollAmt) > 0 ) {
                this.scrollCarousel(this.scrollContent.scrollTop - this.largeScrollAmt);
            }
            else {
                this.scrollCarousel(0);
            }
        }
        else if (yPos > thumbBot) {
            // going down
            if ( (curTop + this.largeScrollAmt) < this.maximumScroll ) {
                this.scrollCarousel(this.scrollContent.scrollTop + this.largeScrollAmt);
            }
            else {
                this.scrollCarousel(this.maximumScroll);
            }
        }
    },
    doNextScroll: function() {
        if (this.animating) {
            return;
        }

        this.holding = true;
        var curTop = this.scrollContent.scrollTop;
        if (curTop < this.maximumScroll) {
            this.scrollCarousel(this.scrollContent.scrollTop + this.smallScrollAmt);
        }
        window.setTimeout(this.doContinuousScroll.bind(this,1), 250);
    },
    doPreviousScroll: function() {
        if (this.animating) {
            return;
        }

        this.holding = true;
        var curTop = this.scrollContent.scrollTop;
        if (curTop > 0) {
            this.scrollCarousel(this.scrollContent.scrollTop - this.smallScrollAmt);
        }
        window.setTimeout(this.doContinuousScroll.bind(this,-1), 250);
    },
    doContinuousScroll: function(mult) {
        if (this.animating) {
            window.setTimeout(this.doContinuousScroll.bind(this, mult), 20);
        }
        else if (this.holding) {
            var inc = 5 * mult;
            this.scrollContent.scrollTop += inc; 
            this.setScrollbarPercentage(this.getCarouselScrollPercentage());
            window.setTimeout(this.doContinuousScroll.bind(this, mult), 20);
        }
    },
    getScrollbarPercentage: function() {
        var curTop = this.thumb.offsetTop;
        return ((curTop / this.maxScrollerTop) * 100);
    },
    setScrollbarPercentage: function(percent) {
        var fraction = percent / 100;
        var newPos = Math.floor(fraction * this.maxScrollerTop);
        if (newPos == 0) {
            this.thumb.style.top = "-1px";
        }
        else if (newPos > this.maxScrollerTop) {
            this.thumb.style.top = this.maxScrollerTop + "px";
        }
        else {
            this.thumb.style.top = newPos + "px";
        }
        
    },
    getCarouselScrollPercentage: function() {
        var curTop = this.scrollContent.scrollTop;
        return ((curTop / this.maximumScroll) * 100);
    },
    setCarouselScrollPercentage: function(percent) {
        var fraction = percent / 100;
        this.scrollContent.scrollTop = (Math.floor(fraction * this.maximumScroll));
    },
    resizeCarousel: function() {
        var children = this.scrollContent.childElements();
        var count = 0;
        for ( var i=0, len = this.numItems; i < len; ++i ) {
            count += children[i].getHeight();
            count += parseInt(children[i].getStyle("marginBottom"), 10) || 0;
            count += parseInt(children[i].getStyle("marginTop"), 10) || 0;
        }
        // save this for later
        this.childrenHeight = count;
        if ( count < this.scrollboxHeight ) {
            this.scrollBox.style.height = count + "px";
            this.scrollBar.addClassName('hidden');
            this.navHidden = true;
        }
        else {
            // resize the scrollbar thumb
            var thumbContainerHeight = this.thumbContainer.getHeight();
            var percentShowing = this.scrollboxHeight / count;
            var newHeight = Math.round(thumbContainerHeight * percentShowing);
            if (newHeight < 25) { newHeight = 25; }
            this.thumb.style.height = newHeight + "px";
        }
    },
    getMaximumScroll: function() {
        this.maximumScroll = this.childrenHeight - this.scrollboxHeight;
    },
    scrollCarousel: function(newScrollPos) {
        this.animating = true;
        var frames = 10;
        var curPos = this.scrollContent.scrollTop;
        var diff = newScrollPos - curPos;
        var increment = Math.floor(diff / frames);
        this.animateScroll(newScrollPos, increment, frames, 0);
    },
    animateScroll: function(desired, inc, total, current) {
        if ( current < total ) {
            var newIncPos = this.scrollContent.scrollTop + inc;
            if ( (inc < 0 && newIncPos > desired) || 
                  (inc > 0 && newIncPos < desired) ) {  
                this.scrollContent.scrollTop = newIncPos;
                this.setScrollbarPercentage(this.getCarouselScrollPercentage());
            }
            window.setTimeout(this.animateScroll.bind(this, desired, inc, total, current + 1), 20);
        }
        else {
            if (this.scrollContent.scrollTop != desired) {
                this.scrollContent.scrollTop = desired;
                this.setScrollbarPercentage(this.getCarouselScrollPercentage());
            }
            this.animating = false;
        }
    }
});

Event.observe(window, "load", function () { 
    $$(".scrollBox").each(function(e) { new NYTD.ScrollBox(e); });
});
