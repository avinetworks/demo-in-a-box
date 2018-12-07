if (window['console'] === undefined) {
    window.console = { log: function(){} };
}

var NYTD                = window.NYTD|| {};
NYTD.LatestNews         = NYTD.LatestNews || {};
NYTD.LatestNews.Updates = NYTD.LatestNews.Updates || false;

NYTD.LatestNews.App = {
    init: function() {
        this.Sources = { "The New York Times"           : { kicker: "NYTimes", klass: "nyt" },
                         "International Herald Tribune" : { kicker: "IHT",     klass: "iht" },
                         "AP"                           : { kicker: "AP",      klass: "ap"  },
                         "Reuters"                      : { kicker: "Reuters", klass: "reuters" } };

        this.view           = 'all';
        this.module         = $('moduleLatestNews');
        this.highlightColor = '#fffef0';
        this.timeForUpdates = 60;

        if (this.module) {

            var d = new Date();
            var i = this;
            var p = 0;

            this.module.removeClassName('latestNewsModuleStatic');
            this.est = (d.getTimezoneOffset()/60)-4;
            this.updateTimesStamps();
            this.updateSourceName();
            this.setupEvents();

            new PeriodicalExecuter(function(pe) {
                i.updateTimesStamps();
                if (NYTD.LatestNews.Updates && NYTD.LatestNews.Updates.hasUpdates) {
                    if (p++%2) { /* skip every 2nd call to space polling */
                        i.requestItems();
                    }
                }
            }, (this.timeForUpdates/2));
        }
    },

    setupEvents: function() {
        var instance = this;
        this.module.select('li').each(function(li){
            Event.observe(li, 'click', instance.selectSource.bindAsEventListener(this));
        });
    },

    selectSource: function(e) {
    /*  Avoiding addition of custom classes in this case since choices limited to 2 */
        var target;
        if (!e) var e = window.event;
        if (e.target)             target = e.target;
        else if (e.srcElement)    target = e.srcElement;
        if (target.nodeType == 3) target = target.parentNode;
        var li  = (target.nodeName=="LI") ? target : target.parentNode;
        var app = NYTD.LatestNews.App;

    //  Update Source links
        app.module.select('li').each(function(item) {
            if (li===item) {
                item.addClassName('selected');
            } else {
                item.removeClassName('selected');
            }
        });
        app.updateView(app.module.select('div.story'));
    },

    getCurrentSource: function() {
        var first = this.module.select('li.first');
        var unDef;
        if (first!=unDef) {
            this.src = first[0].hasClassName('selected')  ? 'all' : 'nyt';
            return this.src;
        }
        return 'all';
    },

    updateView: function(stories, hasEffects) {
        var hasEffects = hasEffects || false;
        var src        = this.getCurrentSource();
        var highlight  = this.highlightColor;

        this.updateTimesStamps();

    //  Display appropiately sourced stories
        stories.each(function(story) {

            var storySrc  = story.select('.byline')[0].title;
            var showStory = (src=='all' || (src=='nyt' && storySrc=='The New York Times')) ? true : false;

            if (showStory) {
                if (hasEffects) {
                    new Effect.Appear(story, { duration: 2, queue: 'end', afterFinish: function(e){
                        new Effect.Highlight(story, { startcolor: highlight, endcolor: '#ffffff', restorecolor: '#ffffff' });
                    } });
                } else {
                    story.show();
                }
            } else {
                story.hide();
            }
        });
    },

    requestItems: function() {
        var url      = NYTD.LatestNews.Updates.location + "?" + this.uncacheParam();
        var instance = this;
        new Ajax.Request(url, {
            method: 'get',
            onSuccess: function(response) {
                instance.insertItems(response.responseText);
            },
            onException: function(req,exception) {
                console.log('onException: Request over', req, exception);
            }
        });
    },

    insertItems: function(html) {
        var tsList     = this.module.select('span.timestamp');
        var lastTime   = tsList[0].readAttribute('title');
        var tmp        = document.createElement('div');
        tmp.innerHTML  = html; // Hold, but DOM accessible
        var items      = $(tmp).select('div.story'); // Wrap in $ for IE
        var newStories = [];
        var content    = this.module.select('div.scrollContent')[0];

    //  Push new updates to top
        for (var i=items.length-1; i>=0; i--) {

            var story   = items[i];
            var created = story.select('span.timestamp')[0].title;

            if (story!=undefined && this.isNewerThan(created, lastTime)) {

            //  Prep story
                story.style.display         = 'none';
                story.style.backgroundColor = this.highlightColor;

                var source = story.select('span.byline')[0];
                if (this.Sources[source.title]!=undefined) {
                    source.innerHTML = this.Sources[source.title].kicker;
                }

            //  Insert story
                newStories.push(story);
                content.insert({ top: story });

            //  Remove last Story to maintain the same number
                var storyList = content.select('div.story');
                storyList[storyList.length-1].remove();
            }
        }

        if (newStories.length>0) {
            this.updateView(newStories, true);
        }
    },

    drawItem: function(item) {
        if (item==undefined) { return ''; };

        var story  = document.createElement('div');
        var source = this.getSource(item.source);
        var row;

        story.addClassName('story');
        story.addClassName('singleRuleBottom');
        story.style.display = 'none';

        row  = '    <span class="item">';
        row += '        <h6 class="timestamp" title="' + item.created + '">' +this.readableTimestamp(item.created)+ '</h6>';
        row += '        <h6 class="byline ' + source.klass + '">' + source.kicker + '</h6>';
        row += '    </span>';
        row += '    <h5><a href="' +item.url+ '">' +item.headline+ '</a></h5>';

        story.innerHTML = row;
        return story;
    },

    getSource: function(source){
        var unDef;
        if (this.Sources[source]!=unDef) {
            return this.Sources[source];
        }
        return { kicker: "", klass: "" };
    },

    updateTimesStamps: function () {
        var instance = this;
        instance.module.select('span.timestamp').each(function(span){
            span.innerHTML = instance.readableTimestamp(span.title) || span.title;
        });
    },

    updateSourceName: function () {
        var instance = this;
        instance.module.select('span.byline').each(function(span){
            if (instance.Sources[span.title]!=undefined) {
                span.innerHTML = instance.Sources[span.title].kicker;
            }
        });
    },

    readableTimestamp: function(timestamp) {
        var tsFull = this.timestampToDate(timestamp) || 0;
        var now    = new Date();
        now.setHours(now.getHours() + this.est);
        var dif    = (now.getTime() - tsFull.getTime()) / 1000; // ms to s

        switch(true) {
            case (dif < 60):
                tsText = "Moments ago";
                break;
            case (dif < 120):
                tsText = "1 minute ago";
                break;
            case (dif < 3600):
                tsText = Math.round(dif/60)+" minutes ago";
                break;
            default:
                var tsHour = (tsFull.getHours()%12);
                var tsMin  = tsFull.getMinutes();
                tsMin  = (tsMin<10) ? "0" + tsMin : tsMin;
                tsHour = (tsHour==0) ? 12 : tsHour;
                tsText = tsHour +":"+ tsMin + " " + ((tsFull.getHours()>11) ? "PM" : "AM") + " ET";
        }
        return tsText;
    },

    timestampToDate: function(ts) {
        if (ts!=undefined) {
        //  Example format: 2010-03-09T13:46:38-05:00
            return new Date(ts.substr(0, 19).replace(/-/g,'/').replace(/T/g,' '));
        } else {
            return new Date();
        }
    },

    isNewerThan: function(firstDate, secondDate) {
        if(!secondDate) return false;
        var firstDate  = this.timestampToDate(firstDate)  || 0;
        var secondDate = this.timestampToDate(secondDate) || 0;
        if (firstDate.getTime() > secondDate.getTime()) {
            return true;
        }
        return false;
    },

    uncacheParam: function() {
        return String((new Date()).getTime()).substring(0,10); // to nearest second
    }
};

Event.observe(window, "load", function () {
    NYTD.LatestNews.App.init(); // magic
});

