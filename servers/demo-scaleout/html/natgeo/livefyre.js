if(typeof fyre=="undefined"){var fyre={};}fyre.conv=fyre.conv||{};(function(z){
var ma;z.aa=function(){return function(a){return a}};z.ba=function(){return function(){}};z.ca=function(a){return function(b){this[a]=b}};z.e=function(a){return function(){return this[a]}};z.l=function(a){return function(){return a}};z.da=function(a){return function(){return z.ea[a].apply(this,arguments)}};z.p=function(){};
z.fa=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};z.ga=function(a){return void 0!==a};z.ha=function(a){var b=(0,z.fa)(a);return"array"==b||"object"==b&&"number"==typeof a.length};z.q=function(a){return"string"==typeof a};z.ia=function(a){return"function"==(0,z.fa)(a)};z.ja=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};z.ka=function(a){return a[z.la]||(a[z.la]=++ma)};var na=function(a,b,c){return a.call.apply(a.bind,arguments)};
var oa=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};z.r=function(a,b,c){z.r=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?na:oa;return z.r.apply(null,arguments)};
z.pa=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};z.qa=function(a,b){var c=a.split("."),d=z.t;c[0]in d||!d.execScript||d.execScript("var "+c[0]);for(var f;c.length&&(f=c.shift());)c.length||void 0===b?d=d[f]?d[f]:d[f]={}:d[f]=b};z.u=function(a,b){function c(){}c.prototype=b.prototype;a.b=b.prototype;a.prototype=new c;a.prototype.constructor=a};
z.ra=function(a){Error.captureStackTrace?Error.captureStackTrace(this,z.ra):this.stack=Error().stack||"";a&&(this.message=String(a))};z.sa=function(a,b){return 0==a.lastIndexOf(b,0)};z.ta=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};z.ua=function(a,b){for(var c=a.split("%s"),d="",f=Array.prototype.slice.call(arguments,1);f.length&&1<c.length;)d+=c.shift()+f.shift();return d+c.join("%s")};z.va=function(a){return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
z.wa=function(a,b){return-1!=a.indexOf(b)};
z.ya=function(a,b){for(var c=0,d=(0,z.va)(String(a)).split("."),f=(0,z.va)(String(b)).split("."),g=Math.max(d.length,f.length),h=0;0==c&&h<g;h++){var k=d[h]||"",n=f[h]||"",s=RegExp("(\\d*)(\\D*)","g"),D=RegExp("(\\d*)(\\D*)","g");do{var v=s.exec(k)||["","",""],G=D.exec(n)||["","",""];if(0==v[0].length&&0==G[0].length)break;c=((0==v[1].length?0:(0,window.parseInt)(v[1],10))<(0==G[1].length?0:(0,window.parseInt)(G[1],10))?-1:(0==v[1].length?0:(0,window.parseInt)(v[1],10))>(0==G[1].length?0:(0,window.parseInt)(G[1],
10))?1:0)||((0==v[2].length)<(0==G[2].length)?-1:(0==v[2].length)>(0==G[2].length)?1:0)||(v[2]<G[2]?-1:v[2]>G[2]?1:0)}while(0==c)}return c};var za=function(a,b){a.Hr=b;switch(b){case 3:a.P.cA=a.IN;break;case 0:a.$f=(0,z.wa)(window.location.hostname,"fy.re")?"fy.re":"fyre",Aa(a,z.w.$f);default:a.P.cA=""}Aa(a,a.$f)};
var Aa=function(a,b){var c="%s."+b;a.oh&&a.jf&&(c=b.indexOf("."),c=b.slice(0,c)+".%s."+b.slice(c+1));a.P.domain=b;a.P.kY=a.protocol+b;Ba(a);a.P.Uu=a.protocol+(0,z.ua)(c,"www");a.P.gw=a.protocol+(0,z.ua)(c,"admin");a.P.Qj=a.oh?a.P.gw:a.P.Uu;0==a.Hr&&(a.P.Qj=a.P.Uu);a.P.Zm=a.protocol+(0,z.ua)(c,"quill");a.P.Jd=a.protocol+(0,z.ua)(c,"bootstrap");a.P.rj=a.protocol+(0,z.ua)(c,"stream1");a.P.Gg=a.protocol+"lc."+a.$f;a.P.YA=a.protocol+"www."+a.$f};
var Ba=function(a,b){if(b)a.P.pb=b;else{var c;if(a.jf)switch(a.Hr){case 2:c="lfstagingzor-a.akamaihd.net";break;case 1:c="lfqazor-a.akamaihd.net";break;case 0:c="widget."+a.$f;break;default:c="lfzor-a.akamaihd.net"}else switch(a.Hr){case 3:c="zor.fyre.co";break;case 0:c="widget."+a.$f;break;default:c="zor."+a.$f}c=a.protocol+c;a.P.pb=c;a.P.pb+="/wjs";a.Oj&&((0,z.ta)(a.P.pb,"v3.0")?a.P.pb+="."+a.Oj:a.P.pb+="/v3.0."+a.Oj)}};
z.x=function(a,b,c){for(var d=a.length,f=(0,z.q)(a)?a.split(""):a,g=0;g<d;g++)g in f&&b.call(c,f[g],g,a)};z.Da=function(a,b,c){for(var d=a.length,f=Array(d),g=(0,z.q)(a)?a.split(""):a,h=0;h<d;h++)h in g&&(f[h]=b.call(c,g[h],h,a));return f};z.Ea=function(a,b,c){for(var d=a.length,f=(0,z.q)(a)?a.split(""):a,g=0;g<d;g++)if(g in f&&b.call(c,f[g],g,a))return!0;return!1};z.Fa=function(a){return z.Ga.concat.apply(z.Ga,arguments)};
z.Ha=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};z.Ia=function(a){for(var b=[],c=0,d=0;d<a.length;d++){for(var f=a.charCodeAt(d);255<f;)b[c++]=f&255,f>>=8;b[c++]=f}return b};z.Ja=function(){return z.t.navigator?z.t.navigator.userAgent:null};var Ka=function(){return z.t.navigator};var La=function(){var a=z.t.document;return a?a.documentMode:void 0};z.y=function(a){return Ma[a]||(Ma[a]=0<=(0,z.ya)(z.Na,a))};
z.Oa=function(a,b){var c;if(z.Pa&&!b)c=z.t.btoa(a);else{c=(0,z.Ia)(a);if(!(0,z.ha)(c))throw Error("encodeByteArray takes an array as a parameter");(0,z.Qa)();for(var d=b?Ra:Sa,f=[],g=0;g<c.length;g+=3){var h=c[g],k=g+1<c.length,n=k?c[g+1]:0,s=g+2<c.length,D=s?c[g+2]:0,v=h>>2,h=(h&3)<<4|n>>4,n=(n&15)<<2|D>>6,D=D&63;s||(D=64,k||(n=64));f.push(d[v],d[h],d[n],d[D])}c=f.join("")}return c};
z.Qa=function(){if(!Sa){Sa={};z.Ta={};Ra={};for(var a=0;65>a;a++)Sa[a]="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/\x3d".charAt(a),z.Ta[Sa[a]]=a,Ra[a]=Ua.charAt(a)}};z.A=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};z.Va=function(a){var b=0,c;for(c in a)b++;return b};z.Xa=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};z.Ya=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};z.Za=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};
z.$a=function(a){for(var b in a)return!1;return!0};z.ab=function(a){var b={},c;for(c in a)b[c]=a[c];return b};z.B=function(a,b){for(var c,d,f=1;f<arguments.length;f++){d=arguments[f];for(c in d)a[c]=d[c];for(var g=0;g<bb.length;g++)c=bb[g],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};z.cb=function(a){return function(){return a}};var db=function(a){return function(){throw a;}};
z.eb=function(a,b){this.Uh=[];this.$I=a;this.QF=b||null;this.bp=this.wG=!1;this.gn=void 0;this.AA=this.fP=this.rw=!1;this.Ou=0;this.jb=null;this.Gr=0};z.fb=function(a,b,c){a.wG=!0;a.gn=c;a.bp=!b;gb(a)};z.hb=function(a){if(a.pe()){if(!a.AA)throw new jb;a.AA=!1}};z.kb=function(a,b,c){(0,z.lb)(a,b,null,c)};z.lb=function(a,b,c,d){a.Uh.push([b,c,d]);a.pe()&&gb(a)};var mb=function(a){return(0,z.Ea)(a.Uh,function(a){return(0,z.ia)(a[1])})};
var gb=function(a){a.Ou&&a.pe()&&mb(a)&&(z.t.clearTimeout(a.Ou),delete a.Ou);a.jb&&(a.jb.Gr--,delete a.jb);for(var b=a.gn,c=!1,d=!1;a.Uh.length&&!a.rw;){var f=a.Uh.shift(),g=f[0],h=f[1],f=f[2];if(g=a.bp?h:g)try{var k=g.call(f||a.QF,b);(0,z.ga)(k)&&(a.bp=a.bp&&(k==b||k instanceof Error),a.gn=b=k);b instanceof z.eb&&(d=!0,a.rw=!0)}catch(n){b=n,a.bp=!0,mb(a)||(c=!0)}}a.gn=b;d&&((0,z.lb)(b,(0,z.r)(a.uF,a,!0),(0,z.r)(a.uF,a,!1)),b.fP=!0);c&&(a.Ou=nb.call(z.t,db(b),0))};var jb=function(){z.ra.call(this)};
var ob=function(){this.Pz={}};z.pb=function(a,b){var c=b||window.document,d=c.getElementsByTagName("head")[0],f=c.createElement("link"),g;a:{g=0;for(var h=(c||window.document).getElementsByTagName("link"),k=h.length,n,c=a.toLowerCase();g<k;g++)if(n=h[g],(0,z.q)(n.href)&&-1<n.href.toLowerCase().indexOf(c)){g=!0;break a}g=!1}g||(f.rel="stylesheet",f.type="text/css",f.href=a,f.media="all",(0,z.ja)(void 0)&&(0,z.B)(f,void 0),d.appendChild(f))};
z.qb=function(a,b,c,d){b=b||window.document;d=(0,z.ia)(d)?d:z.p;var f=b.getElementsByTagName("head")[0];b=b.createElement("script");rb[a]?d():sb[a]?sb[a].push(d):(b.type="text/javascript",b.src=a,b.async=!0,b.defer=!0,(0,z.ja)(c)&&(0,z.B)(b,c),tb(b,d),f.appendChild(b))};
var tb=function(a,b){sb[a.src]=[b];a.onload=a.onreadystatechange=function(){if(!a.readyState||/loaded|complete/.test(a.readyState)){var b=a.src,d=sb[b];if(d.length)for(var f=0,g=d.length;f<g;f++)d[f]();delete sb[b];rb[a.src]=!0;a.onload=a.onreadystatechange=null;a=void 0}}};z.ub=function(a){if("function"==typeof a.zd)return a.zd();if((0,z.q)(a))return a.split("");if((0,z.ha)(a)){for(var b=[],c=a.length,d=0;d<c;d++)b.push(a[d]);return b}return(0,z.Xa)(a)};
z.vb=function(a){if("function"==typeof a.qk)return a.qk();if("function"!=typeof a.zd){if((0,z.ha)(a)||(0,z.q)(a)){var b=[];a=a.length;for(var c=0;c<a;c++)b.push(c);return b}return(0,z.Ya)(a)}};z.wb=function(a,b,c){if("function"==typeof a.forEach)a.forEach(b,c);else if((0,z.ha)(a)||(0,z.q)(a))(0,z.x)(a,b,c);else for(var d=(0,z.vb)(a),f=(0,z.ub)(a),g=f.length,h=0;h<g;h++)b.call(c,f[h],d&&d[h],a)};
z.yb=function(a,b){this.Kb={};this.ib=[];this.Nq=this.Ya=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&this.ew(a)};z.zb=function(a){if(a.Ya!=a.ib.length){for(var b=0,c=0;b<a.ib.length;){var d=a.ib[b];(0,z.Ab)(a.Kb,d)&&(a.ib[c++]=d);b++}a.ib.length=c}if(a.Ya!=a.ib.length){for(var f={},c=b=0;b<a.ib.length;)d=a.ib[b],(0,z.Ab)(f,d)||(a.ib[c++]=d,f[d]=1),b++;a.ib.length=c}};
z.Ab=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)};z.Bb=function(a){if(Cb){Cb=!1;var b=z.t.location;if(b){var c=b.href;if(c&&(c=(c=(0,z.Bb)(c)[3]||null)&&(0,window.decodeURIComponent)(c))&&c!=b.hostname)throw Cb=!0,Error();}}return a.match(Db)};
z.Eb=function(a,b){var c;if(a instanceof z.Eb)this.af=(0,z.ga)(b)?b:a.af,(0,z.Fb)(this,a.jn),c=a.Ru,(0,z.Gb)(this),this.Ru=c,c=a.em,(0,z.Gb)(this),this.em=c,Hb(this,a.St),(0,z.Ib)(this,a.Mt),(0,z.Jb)(this,a.hf.Oa()),Kb(this,a.Ex);else if(a&&(c=(0,z.Bb)(String(a)))){this.af=!!b;(0,z.Fb)(this,c[1]||"",!0);var d=c[2]||"";(0,z.Gb)(this);this.Ru=d?(0,window.decodeURIComponent)(d):"";d=c[3]||"";(0,z.Gb)(this);this.em=d?(0,window.decodeURIComponent)(d):"";Hb(this,c[4]);(0,z.Ib)(this,c[5]||"",!0);(0,z.Jb)(this,
c[6]||"",!0);Kb(this,c[7]||"",!0)}else this.af=!!b,this.hf=new z.Lb(null,0,this.af)};z.Fb=function(a,b,c){(0,z.Gb)(a);a.jn=c?b?(0,window.decodeURIComponent)(b):"":b;a.jn&&(a.jn=a.jn.replace(/:$/,""))};var Hb=function(a,b){(0,z.Gb)(a);if(b){b=Number(b);if((0,window.isNaN)(b)||0>b)throw Error("Bad port number "+b);a.St=b}else a.St=null};z.Ib=function(a,b,c){(0,z.Gb)(a);a.Mt=c?b?(0,window.decodeURIComponent)(b):"":b};
z.Jb=function(a,b,c){(0,z.Gb)(a);b instanceof z.Lb?(a.hf=b,a.hf.iA(a.af)):(c||(b=Mb(b,Nb)),a.hf=new z.Lb(b,0,a.af))};var Kb=function(a,b,c){(0,z.Gb)(a);a.Ex=c?b?(0,window.decodeURIComponent)(b):"":b};z.Gb=function(a){if(a.PU)throw Error("Tried to modify a read-only Uri");};var Mb=function(a,b){return(0,z.q)(a)?(0,window.encodeURI)(a).replace(b,Qb):null};var Qb=function(a){a=a.charCodeAt(0);return"%"+(a>>4&15).toString(16)+(a&15).toString(16)};z.Lb=function(a,b,c){this.me=a||null;this.af=!!c};
z.Rb=function(a){if(!a.Ub&&(a.Ub=new z.yb,a.Ya=0,a.me))for(var b=a.me.split("\x26"),c=0;c<b.length;c++){var d=b[c].indexOf("\x3d"),f=null,g=null;0<=d?(f=b[c].substring(0,d),g=b[c].substring(d+1)):f=b[c];f=(0,window.decodeURIComponent)(f.replace(/\+/g," "));f=Sb(a,f);a.add(f,g?(0,window.decodeURIComponent)(g.replace(/\+/g," ")):"")}};z.Tb=function(a,b,c){a.remove(b);0<c.length&&(a.me=null,a.Ub.set(Sb(a,b),(0,z.Ha)(c)),a.Ya+=c.length)};
var Sb=function(a,b){var c=String(b);a.af&&(c=c.toLowerCase());return c};var Ub=function(a,b,c){a=new Vb(a,b,c);if(!a.CM)return a.load(),z.t.FyreLoader=a};
var Vb=function(a,b,c){a.network&&"livefyre.com"!==a.network&&z.w.sX(a.network);this.oa=a;var d=(new z.Eb(window.location.href)).hf.get("livefyrejs");if(d&&!z.t.FYRE_OVERRIDE){var f=null,g=null,h=z.w.protocol;switch(d){case "dev":g="widget.fyre/wjs";f=h+"widget.fyre/compile?id\x3dlfconv\x26mode\x3dsimple";break;case "qa":g="zor.qa-ext.livefyre.com/wjs";f=h+g+"/v3.0/"+z.w.we.zI;break;case "uat":g="zor.t402.livefyre.com/wjs";f=h+g+"/v3.0/"+z.w.we.zI;break;default:d=null,window.console&&window.console.warn("Unknown server override.")}z.t.FYRE_OVERRIDE=
this.CM=d;d={tldPrefix:z.w.$f.replace(/.livefyre.com/,""),buildType:z.w.Hr,assetServer:g};d=(0,z.pa)(function(a,b){var c=z.t.fyre.conv;(0,z.A)(b,function(a,b){c.config.set(b,a)});c.load.apply(z.t,a)},arguments,d);(0,z.qb)(f,null,null,d)}else(0,z.ia)(b)&&(c=b,b=z.Wb.ml),b||(b=z.Wb.ml),this.fo={},this.la=c||z.p,this.QI=[],this.zr=(0,z.Da)((0,z.q)(b)?[b]:b,this.$Q,this),(0,z.x)(this.zr,function(a,b){(0,z.kb)(a.uV.zi,(0,z.r)(this.dI,this,b));var c="";z.Xb?c="_ipad":z.Yb&&(c="_mobile");(0,z.pb)(z.w.P.pb+
"/css/"+("livefyre_"+("reviews"===a.appName?"reviews":"main")+c+".css"))},this)};var Zb=function(a,b){z.w.Oj=b;(0,z.qb)(z.w.P.pb+z.w.we.bP,null,null,(0,z.r)(a.tt,a));a.vj=(0,window.setTimeout)((0,z.r)(a.ZT,a),3E3)};var $b=function(a,b){var c=(0,z.ab)(a.oa);(0,z.B)(c,b.oa);c.strings=(0,z.ab)(a.oa.strings);(0,z.B)(c.strings,b.oa.strings||{});return c};z.ea=[];z.bc=z.bc||{};z.t=this;z.la="closure_uid_"+(1E9*Math.random()>>>0);ma=0;(0,z.u)(z.ra,Error);z.ra.prototype.name="CustomError";z.cc=2147483648*Math.random()|0;z.Ga=Array.prototype;var yc;var Ma;var rc;var oc;var nc;var hc;var gc;var fc;var ec;var dc;hc=gc=fc=ec=dc=!1;var lc;if(lc=(0,z.Ja)()){var mc=Ka();dc=(0,z.sa)(lc,"Opera");ec=!dc&&((0,z.wa)(lc,"MSIE")||(0,z.wa)(lc,"Trident"));gc=(fc=!dc&&(0,z.wa)(lc,"WebKit"))&&(0,z.wa)(lc,"Mobile");hc=!dc&&!fc&&!ec&&"Gecko"==mc.product}z.C=dc;z.F=ec;z.H=hc;z.I=fc;nc=gc;rc=Ka();oc=rc&&rc.platform||"";z.ic=(0,z.wa)(oc,"Mac");z.jc=(0,z.wa)(oc,"Win");(0,z.wa)(oc,"Linux");z.kc=!!Ka()&&(0,z.wa)(Ka().appVersion||"","X11");var sc=(0,z.Ja)();
sc&&(0,z.wa)(sc,"Android");sc&&(0,z.wa)(sc,"iPhone");sc&&(0,z.wa)(sc,"iPad");a:{var tc="",uc;if(z.C&&z.t.opera)var vc=z.t.opera.version,tc="function"==typeof vc?vc():vc;else if(z.H?uc=/rv\:([^\);]+)(\)|;)/:z.F?uc=/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/:z.I&&(uc=/WebKit\/(\S+)/),uc)var wc=uc.exec((0,z.Ja)()),tc=wc?wc[1]:"";if(z.F){var xc=La();if(xc>(0,window.parseFloat)(tc)){z.Na=String(xc);break a}}z.Na=tc}Ma={};yc=z.t.document;
z.zc=yc&&z.F?La()||("CSS1Compat"==yc.compatMode?(0,window.parseInt)(z.Na,10):5):void 0;var Ua;var Ra;var Sa;Sa=null;z.Ta=null;Ra=null;Ua="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.";z.Pa=z.H||z.I||z.C||"function"==typeof z.t.atob;var bb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");z.w={};(0,z.qa)("fyre.conv.config",z.w);z.w.WF=!1;z.w.LE="https://s3.amazonaws.com/data.bootstrap.fyre.co";z.w.jf="https:"===window.document.location.protocol;z.w.protocol=z.w.jf?"https://":"http://";z.w.vB="/api/v1.1/";z.w.of="/api/v3.0/";z.w.jL="fyre-auth";z.w.kL=2592E3;z.w.MC="fyre-livecount";z.w.Sb=(z.w.jf?"https://lfavatar-a.akamaihd.net":"http://avatars.fyre.co")+"/a/anon/50.jpg";z.w.s1=50;z.w.M1={K1:"WARNING"};z.w.VI="livefyre.com";z.w.oh=!1;z.w.ME="";z.w.$f="livefyre.com";z.w.EK="https://twitter.com/intent/";
z.w.FK="https://platform.twitter.com/widgets.js";z.w.GN="https://d2kmm3vx031a1h.cloudfront.net";z.w.we={};z.w.we.zI="/javascripts/livefyre.js";z.w.we.bP="/javascripts/livefyre_base.js";z.w.we.oQ="/javascripts/livefyre_mod_error.js";z.w.we.vQ="/javascripts/livefyre_mod_featured.js";z.w.we.xU="/javascripts/livefyre_mod_iframe.js";z.w.we.Dt="/javascripts/livefyre_mod_notifier.js";z.w.iL="10067";z.w.Oj=z.w.iL;z.w.P={gw:null,Uu:null,Jd:null,Zm:null,Gg:null,YA:null,Qj:null,pb:null,rj:null};
z.w.sX=function(a){var b=z.w;b.oh=!0;b.VI=a;Aa(b,a);b.P.Qj=b.P.gw};z.w.set=function(a,b){var c=z.w;switch(a){case "tldPrefix":var d="livefyre.com";b&&(d=b+"."+d,c.ME="/"+d);c.$f=d;Aa(c,d);Ba(c);break;case "buildType":za(c,b);break;case "assetVersion":c.Oj=b;Ba(c);break;case "assetServer":Ba(c,b)}};z.w.set=z.w.set;z.w.uw=function(a,b){return[z.w.ME,z.w.VI,a,(0,z.Oa)(""+b,!0),""].join("/")};z.w.$_=!1;z.w.IN="http://803d167b95084bdf833d2f95d66a1b3f@sentry.livefyre.com:9000/2";Aa(z.w,z.w.$f);za(z.w,3);
z.w.WF&&((0,z.B)(z.w,z.t.RZ||{}),za(z.w,0));z.Ac=(0,z.cb)(!1);z.Bc=(0,z.cb)(!0);/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
var nb=z.t.setTimeout;z.m=z.eb.prototype;z.m.cancel=(0,z.da)(17);z.m.uF=function(a,b){this.rw=!1;(0,z.fb)(this,a,b)};z.m.la=function(a){(0,z.hb)(this);(0,z.fb)(this,!0,a)};z.m.im=(0,z.da)(29);z.m.PE=(0,z.da)(0);z.m.pe=(0,z.e)("wG");(0,z.u)(jb,z.ra);jb.prototype.message="Deferred has already fired";jb.prototype.name="AlreadyCalledError";z.Wb={ml:"main"};z.Wb.main={Jd:!0,Ag:!0,zi:new z.eb};z.Wb.reviews={Jd:!0,Ag:!0,zi:new z.eb};z.Wb.debug={zi:new z.eb};z.Wb.sdk={zi:new z.eb};ob.prototype.factory=function(a){function b(){this.VO=(0,z.Ha)(arguments);(0,z.Za)(d,c)||(d[c]=[]);d[c].push(this);this.Yb=new z.eb}var c=(0,z.ka)(a||(0,z.ba)()),d=this.Pz;b.kj=(0,z.r)(this.kj,this,c);b.t1=c;return b};ob.prototype.kj=function(a,b){this.Pz[a]&&(0,z.x)(this.Pz[a],function(a){function d(){return b.apply(this,a.VO)}d.prototype=b.prototype;a.Yb.la(new d)})};var Cc=new ob;z.Dc=Cc.factory();(0,z.qa)("fyre.conv.LivefyreAuthDelegate",z.Dc);z.Dc.prototype.Jb=function(a){(0,z.kb)(this.Yb,function(b){b.Jb(a)})};z.Dc.prototype.loginByCookie=z.Dc.prototype.Jb;z.Dc.prototype.logout=function(a){(0,z.kb)(this.Yb,function(b){b.logout(a)})};z.Dc.prototype.logout=z.Dc.prototype.logout;z.Dc.prototype.viewProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.viewProfile(a,b)})};z.Dc.prototype.viewProfile=z.Dc.prototype.viewProfile;
z.Dc.prototype.editProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.editProfile(a,b)})};z.Dc.prototype.editProfile=z.Dc.prototype.editProfile;z.Dc.prototype.type=2;z.Ec=Cc.factory();(0,z.qa)("fyre.conv.SPAuthDelegate",z.Ec);z.Ec.prototype.wc=function(a){(0,z.kb)(this.Yb,function(b){b.wc(a)})};z.Ec.prototype.login=z.Ec.prototype.wc;z.Ec.prototype.Jb=function(a,b){(0,z.kb)(this.Yb,function(c){c.Jb(a,b)})};z.Ec.prototype.loginByCookie=z.Ec.prototype.Jb;
z.Ec.prototype.logout=function(a){(0,z.kb)(this.Yb,function(b){b.logout(a)})};z.Ec.prototype.logout=z.Ec.prototype.logout;z.Ec.prototype.viewProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.viewProfile(a,b)})};z.Ec.prototype.viewProfile=z.Ec.prototype.viewProfile;z.Ec.prototype.editProfile=function(a){(0,z.kb)(this.Yb,function(b){b.editProfile(a)})};z.Ec.prototype.editProfile=z.Ec.prototype.editProfile;z.Ec.prototype.type=4;z.Fc=Cc.factory();(0,z.qa)("fyre.conv.BackplaneAuthDelegate",z.Fc);
z.Fc.prototype.Jb=function(a,b){(0,z.kb)(this.Yb,function(c){c.Jb(a,b)})};z.Fc.prototype.loginByCookie=z.Fc.prototype.Jb;z.Fc.prototype.wc=function(a){(0,z.kb)(this.Yb,function(b){b.wc(a)})};z.Fc.prototype.login=z.Fc.prototype.wc;z.Fc.prototype.logout=function(a){(0,z.kb)(this.Yb,function(b){b.logout(a)})};z.Fc.prototype.logout=z.Fc.prototype.logout;z.Fc.prototype.viewProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.viewProfile(a,b)})};z.Fc.prototype.viewProfile=z.Fc.prototype.viewProfile;
z.Fc.prototype.editProfile=function(a){(0,z.kb)(this.Yb,function(b){b.editProfile(a)})};z.Fc.prototype.editProfile=z.Fc.prototype.editProfile;z.Fc.prototype.ut=function(){(0,z.kb)(this.Yb,function(a){a.ut()})};z.Fc.prototype.logoutInternal=z.Fc.prototype.ut;z.Fc.prototype.type=1;z.Gc=Cc.factory();(0,z.qa)("fyre.conv.RemoteAuthDelegate",z.Gc);z.Gc.prototype.Jb=function(a,b){(0,z.kb)(this.Yb,function(c){c.Jb(a,b)})};z.Gc.prototype.loginByCookie=z.Gc.prototype.Jb;
z.Gc.prototype.wc=function(a){(0,z.kb)(this.Yb,function(b){b.wc(a)})};z.Fc.prototype.login=z.Fc.prototype.wc;z.Gc.prototype.logout=function(a){(0,z.kb)(this.Yb,function(b){b.logout(a)})};z.Fc.prototype.logout=z.Fc.prototype.logout;z.Gc.prototype.viewProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.viewProfile(a,b)})};z.Gc.prototype.viewProfile=z.Gc.prototype.viewProfile;z.Gc.prototype.editProfile=function(a,b){(0,z.kb)(this.Yb,function(c){c.editProfile(a,b)})};z.Gc.prototype.editProfile=z.Gc.prototype.editProfile;
z.Gc.prototype.type=3;z.Hc=function(){function a(a){(0,z.kb)(b,a)}var b=new z.eb;a.L=function(){b.la()};a.pe=function(){return b.pe()};return a}();(0,z.qa)("fyre.conv.ready",z.Hc);var sb={},rb={};var Ic,Jc,Kc,Lc,Mc,Nc,Oc;Oc=Nc=Mc=Lc=Kc=Jc=Ic=!1;var Pc=(0,z.Ja)();Pc&&(-1!=Pc.indexOf("Firefox")?Ic=!0:-1!=Pc.indexOf("Camino")?Jc=!0:-1!=Pc.indexOf("iPhone")||-1!=Pc.indexOf("iPod")?Kc=!0:-1!=Pc.indexOf("iPad")?Lc=!0:-1!=Pc.indexOf("Chrome")?Nc=!0:-1!=Pc.indexOf("Android")?Mc=!0:-1!=Pc.indexOf("Safari")&&(Oc=!0));z.Qc=Ic;z.Rc=Jc;z.Sc=Kc;z.Xb=Lc;z.Tc=Mc;z.Uc=Nc;z.Vc=Oc;var Wc;Wc=(0,z.Ja)();z.Xc=(z.Yb=nc||z.Tc||-1<Wc.indexOf("IEMobile"))&&!z.Xb;z.H&&(0,z.y)(12);z.F&&(0,z.y)(10);z.Yc="StopIteration"in z.t?z.t.StopIteration:Error("StopIteration");z.m=z.yb.prototype;z.m.jc=(0,z.da)(12);z.m.zd=function(){(0,z.zb)(this);for(var a=[],b=0;b<this.ib.length;b++)a.push(this.Kb[this.ib[b]]);return a};z.m.qk=function(){(0,z.zb)(this);return this.ib.concat()};z.m.lh=function(a){return(0,z.Ab)(this.Kb,a)};z.m.Yl=(0,z.da)(34);z.m.Jo=(0,z.da)(15);z.m.Ch=(0,z.da)(20);z.m.clear=(0,z.da)(37);z.m.remove=function(a){return(0,z.Ab)(this.Kb,a)?(delete this.Kb[a],this.Ya--,this.Nq++,this.ib.length>2*this.Ya&&(0,z.zb)(this),!0):!1};
z.m.get=function(a,b){return(0,z.Ab)(this.Kb,a)?this.Kb[a]:b};z.m.set=function(a,b){(0,z.Ab)(this.Kb,a)||(this.Ya++,this.ib.push(a),this.Nq++);this.Kb[a]=b};z.m.ew=function(a){var b;a instanceof z.yb?(b=a.qk(),a=a.zd()):(b=(0,z.Ya)(a),a=(0,z.Xa)(a));for(var c=0;c<b.length;c++)this.set(b[c],a[c])};z.m.Oa=function(){return new z.yb(this)};z.m.td=(0,z.da)(31);var Db=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?\x3d[/#?]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$"),Cb=z.I;z.m=z.Eb.prototype;z.m.jn="";z.m.Ru="";z.m.em="";z.m.St=null;z.m.Mt="";z.m.Ex="";z.m.PU=!1;z.m.af=!1;z.m.toString=function(){var a=[],b=this.jn;b&&a.push(Mb(b,Zc),":");if(b=this.em){a.push("//");var c=this.Ru;c&&a.push(Mb(c,Zc),"@");a.push((0,window.encodeURIComponent)(String(b)));b=this.St;null!=b&&a.push(":",String(b))}if(b=this.Mt)this.em&&"/"!=b.charAt(0)&&a.push("/"),a.push(Mb(b,"/"==b.charAt(0)?$c:ad));(b=this.hf.toString())&&a.push("?",b);(b=this.Ex)&&a.push("#",Mb(b,bd));return a.join("")};
z.m.Oa=function(){return new z.Eb(this)};z.m.iA=function(a){this.af=a;this.hf&&this.hf.iA(a);return this};var Zc=/[#\/\?@]/g,ad=/[\#\?:]/g,$c=/[\#\?]/g,Nb=/[\#\?@]/g,bd=/#/g;z.m=z.Lb.prototype;z.m.Ub=null;z.m.Ya=null;z.m.jc=(0,z.da)(11);z.m.add=function(a,b){(0,z.Rb)(this);this.me=null;a=Sb(this,a);var c=this.Ub.get(a);c||this.Ub.set(a,c=[]);c.push(b);this.Ya++;return this};
z.m.remove=function(a){(0,z.Rb)(this);a=Sb(this,a);return this.Ub.lh(a)?(this.me=null,this.Ya-=this.Ub.get(a).length,this.Ub.remove(a)):!1};z.m.clear=(0,z.da)(36);z.m.Ch=(0,z.da)(19);z.m.lh=function(a){(0,z.Rb)(this);a=Sb(this,a);return this.Ub.lh(a)};z.m.Yl=(0,z.da)(33);z.m.qk=function(){(0,z.Rb)(this);for(var a=this.Ub.zd(),b=this.Ub.qk(),c=[],d=0;d<b.length;d++)for(var f=a[d],g=0;g<f.length;g++)c.push(b[d]);return c};
z.m.zd=function(a){(0,z.Rb)(this);var b=[];if((0,z.q)(a))this.lh(a)&&(b=(0,z.Fa)(b,this.Ub.get(Sb(this,a))));else{a=this.Ub.zd();for(var c=0;c<a.length;c++)b=(0,z.Fa)(b,a[c])}return b};z.m.set=function(a,b){(0,z.Rb)(this);this.me=null;a=Sb(this,a);this.lh(a)&&(this.Ya-=this.Ub.get(a).length);this.Ub.set(a,[b]);this.Ya++;return this};z.m.get=function(a,b){var c=a?this.zd(a):[];return 0<c.length?String(c[0]):b};
z.m.toString=function(){if(this.me)return this.me;if(!this.Ub)return"";for(var a=[],b=this.Ub.qk(),c=0;c<b.length;c++)for(var d=b[c],f=(0,window.encodeURIComponent)(String(d)),d=this.zd(d),g=0;g<d.length;g++){var h=f;""!==d[g]&&(h+="\x3d"+(0,window.encodeURIComponent)(String(d[g])));a.push(h)}return this.me=a.join("\x26")};z.m.Oa=function(){var a=new z.Lb;a.me=this.me;this.Ub&&(a.Ub=this.Ub.Oa(),a.Ya=this.Ya);return a};
z.m.iA=function(a){a&&!this.af&&((0,z.Rb)(this),this.me=null,(0,z.wb)(this.Ub,function(a,c){var d=c.toLowerCase();c!=d&&(this.remove(c),(0,z.Tb)(this,d,a))},this));this.af=a};z.m.extend=(0,z.da)(45);Ua="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_\x3d";z.r=oa;(0,z.qa)("fyre.conv.load",Ub);Ub.dV=function(a,b,c){return Ub.BI(a,b,c)};(0,z.qa)("fyre.conv.load.makeArticleId",Ub.dV);Ub.BI=function(a,b,c){var d,f=new z.Lb;a||(a=Ub.IG());a||(a=window.location.href);d=new z.Eb(a);(0,z.q)(b)&&(b=[b]);b&&(0,z.x)(b,function(a){f.add(a,d.hf.get(a))});(0,z.Jb)(d,f);c||Kb(d,"");return d.toString()};(0,z.qa)("fyre.conv.load.makeCollectionUrl",Ub.BI);
Ub.IG=function(){for(var a=window.document.getElementsByTagName("link"),b=0,c=a.length,d;b<c;b++)if(d=a[b],"canonical"==d.rel)return d.href};(0,z.qa)("fyre.conv.load.getCanonicalLinkRel",Ub.IG);z.m=Vb.prototype;z.m.load=function(){Zb(this,this.oa.assetVersion||z.w.Oj)};z.m.$Q=function(a){var b;(0,z.q)(a)?a={appName:a,oa:{}}:(a={appName:a.app||z.Wb.ml,oa:(0,z.ab)(a)},delete a.oa.app);b=z.Wb[a.appName];if(!b)throw"Invalid app "+a.appName;a.uV=b;this.QI.push(a.appName);return a};
z.m.tt=function(){(0,window.clearTimeout)(this.vj);(0,z.x)(this.QI,function(a){(0,z.qb)(z.w.P.pb+"/javascripts/livefyre_mod_"+a+".js")})};z.m.dI=function(a,b){var c=$b(this,this.zr[a]);((0,z.$a)(this.fo)||0==a)&&(0,z.cd)(c);c=new b(this.oa,c);this.fo[a]=c;if(!((0,z.Va)(this.fo)<this.zr.length)){var d=[];(0,z.A)(this.fo,function(a,b){var c=this.fo[b.toString()].Jx();d.push(c);-1<window.location.hash.indexOf("fyre-debug")&&a.debug()},this);this.la.apply(z.t,d);z.Hc.pe()||z.Hc.L()}};
z.m.ZT=function(){Zb(this,z.w.Oj)};(0,z.ia)(z.t.FYRE_LOADED_CB)&&(0,window.setTimeout)(z.t.FYRE_LOADED_CB,80);})(fyre.conv);fyre.conv.config.set('assetVersion', 1385081611);