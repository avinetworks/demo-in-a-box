// <globalInlineCode> 02/26/10
// s_account is the only non-s. variable that we still need to set here
if (typeof ngs_reportsuite != "undefined") {
    s_account = ngs_reportsuite;
}
// default to the global group if the var is not already set
if (typeof s_account == "undefined"){
    //s_account = "nationalgeopoc,natgeoglobal";
    s_account = "natgeoglobal,natgeonotags";
}
else if (s_account == "natgeongkidsmagcom"){
    // typo at omniture
    s_account = "natgeongkidsmagccom,natgeoglobal";
}
else if ((s_account == "ngcorporate")||
         (s_account == "natgeojapan")||
         (s_account == "natgeoschoolpublishing")||
         (s_account == "natgeohamptonbrown")||
         (s_account == "natgeohbedge")||
         (s_account == "natgeoaol")||
         (s_account == "natgeodomainit")||
         (s_account == "natnatgeodomainesp")||
         (s_account == "natnatgeongsp")){
    // don't add to global report suite
}
else if (s_account == "natgeoglobal"){
    // natgeonotags makes it easy to see pages without custom tags
    s_account = s_account + ",natgeonotags";
}
else{
    // if hostname is greeneffect.nationalgeographic.com then also send data to  natgeogreeneffect report suite
    if (window.location.hostname.indexOf ("greeneffect.") == 0){
        s_account = s_account + ",natgeogreeneffect";
    }
    s_account = s_account + ",natgeoglobal";
}

// if we're on a preview server then use *just* the qa report suite
if ((window.location.hostname.indexOf(".preview.")>-1)||
        (window.location.hostname.indexOf(".dev.")>-1)||
        (window.location.hostname.indexOf(".beta.")>-1)) {
    s_account = "natgeoqa";
}

// if tracking is disabled, set the s_account to blank. This disables the omniture call.
// This should be placed just before the sitecatalyst code.
//081020 JGO THIS IS A BUG AND SHOULD MOVE?? if (!ngsTrackingEnabled) s_account="";
// </globalInlineCode>


// <omniture>
//  <scode>
/* SiteCatalyst code version: H.23.8.
Copyright 1997-2009 Omniture, Inc. More info available at
http://www.omniture.com */


// JGO COMMENTED OUT SINCE CREATED ABOVE
//var s_account="natgeoglobal"
var s=s_gi(s_account)



/************************** CONFIG SECTION **************************/
/* You may add or alter any code config here. */
s.charSet="ISO-8859-1"
/* Conversion Config */
s.currencyCode="USD"
/* Link Tracking Config */
s.trackDownloadLinks=true
s.trackExternalLinks=true
s.trackInlineStats=true
s.linkInternalFilters="javascript:,secure.customersvc.com,customersvc.com,ngmapstore.com,http://shop.nationalgeographic.com,subscribengkids.com,subscribengm.com,subscribengadventure.com,subscribengtraveler.com,ngm.com,longevity.ngm.com,ngcveramonte.com,nationalgeographic.org,http://83.138.180.105/wildlifemuseum.aspx,ngmservice.com,shopngvideos.com,mywonderfulworld.org,ngeo.com,205.188.130.53,207.24.89.238,ngdigitalmotion.com,ngstore.com,nationalgeographicexpeditions.com,83.138.180.105,megastructures.kp9.net,buysub.com,ngschoolpub.org,godgrewtiredofus.com,ngsednet.org,link.brightcove.com,runningthesahara.com,ngchannel.com,ngtlibrary.com,ngtraveler.com,ngadventure.com,nationalgeo.com,national-geographic.com,nationalgeographicchannel.com,pictopia.com,thegreenguide.com,kp9.net,mywonderfulworld.com,ngsednet,nationalgeographic.com,nationalgeographic.co.uk,natgeomaps.com,ngm.typepad.com,kp10.net,dw100.kp10.net,ngm.venturaassociates.net,natgeomaps.com,ngm.typepad.com,ngadventure.typepad.com,intelligenttravelblog.com,nationalgeographic.co.in,nationalgeographic.co.jp,natgeotakeaction.org,www.nationalgeographic.it,www.nationalgeographic.com.au,www.nationalgeographic.es"
s.linkLeaveQueryString=false
s.linkTrackVars="None"
s.linkTrackEvents="None"

// carried from g code
s.eVarCFG=""
s.linkDownloadFileTypes="flv,fla,ram,asx,exe,zip,wav,mp3,mp4,mov,mpg,avi,wmv,doc,pdf,xls,jpg,scr,bin"
//s.linkInternalFilters="javascript:,nationalgeographic.com,nationalgeographic.org,customersvc,buysub,nationalgeographicchannel.com,national-geographic.com,nationalgeo.com,ngadventure.com,ngtraveler.com,ngdigitalmotion.com,ngtlibrary.com,ngchannel.com,nationalgeographicexpeditions.com,godgrewtiredofus.com,runningthesahara.com,arctictalemovie,ngtservice.com,pictopia.com,shopngvideos.com,thegreenguide.com,everydayexplorer.com,mywonderfulworld.com,mywonderfulworld.org,ngcwild.com,ngmapstore.com,ngmservice.com,ngschoolpub.org,ngsednet.org,ngsimages.com,buysub.com,ngs.org,209.16.232.90,realarcade.com,nationalgeographic.co.uk,u23dmovie.com,ngm.com,hippodude.com,xif.com,ngm.typepad.com,ngeo.com"

s.prop1="";

s.loadModule("Survey")
s.Survey.suites="natgeoglobal"; // "devnatgeocom";
/****************************** MODULES *****************************/
/* Module: Survey */
s.m_Survey_c="s_sv_globals~=function(~var m=this,~_root\",(e?e+\".\":\"\")+d+\".2o7.net/survey/~.length~};m._~g.triggerRequested~execute~return~suites~g.commonRevision~rl=location.protocol+\"//\"+c.~"
+"=window~.match(/~;if(~g.pending~=navigator.~g.pageImpressions~g.manualTriggers~g.incomingLists~&&i.constructor~){this._boot();~.toLowerCase()~gather~m._blocked())~=1;m._script(~.module._load~setTim"
+"eout(\"~.url+\"/~r.requested~g.commonUrl~.replace(/\\~){var ~);m.~<b[1]:n==\"~param(c,\"~;for(~else if(~Name~||{},~||\"\",~]={l:m._~_booted~typeof ~:s.page~\",\"~=\"s_sv_~=[];~~var m=s.m_i(\"Survey"
+"\"`Xlaunch`1i,e,c,o,f`L`2g`C.`0`dl,j`Eg.unloaded||`O`8 0;i=i`K&&i.constructor==Array?i:[i];l=`I`aj=0;j<i`4;++j)l[l`4`f`9,i:i[j],e:e||0,c:c||0,o:o||0,f:f||0`5`7();`8 1;`5t`1`L`2s=m.s,g`C.`0`dl`E`O`8"
+";l=`H;l[l`4`f`9,n`i`c`eu`iURL`er:s.referrer`ec:s.campaign||\"\"`5`7();`5rr`1`Wg`C.`0`df=g.onScQueueEmpty||0`Ef)f();`5blocked`1){`2g`C.`0||{};`8 !m.`g||g.stop||!`F&&!`6;`5`7`1){if(`0.`7)`R`0.`7();\""
+",0);`5boot`1){`2s=m.s,w`C,g,c,d=s.dc,e=s.visitor`cspace,n`Gapp`c`M,a`GuserAgent,v`GappVersion,h,i,j,k,l,b`Ew.`0)`8`E!((b=v`DAppleWebKit\\/([0-9]+)/))?521`Ynetscape\"?a`Dgecko\\//i):(b=a`Dopera[ \\/"
+"]?([0-9]+).[0-9]+/i))?7`Ymicrosoft internet explorer\"&&!v`Dmacintosh/i)&&(b=v`Dmsie ([0-9]+).([0-9]+)/i))&&(5<b[1]||b[1]==5&&4<b[2])))`8;g=w.`0={};g.module=m;`F=0;`J`l`H`l`I`le=\"survey\";c=g.conf"
+"ig={`5`Zdynamic`3dynamic\"`X_`Z`N`3`N\");g.u`Bdynamic_root;g.`NU`B`N_root;g.dataCenter=d;g.onListLoaded=new Function(\"r`jb`jd`ji`jl`j`0`Qed(r,b,d,i,l);\"`X_`9=(m.`9||s.un)`M.split(`j);l=m._`9;b={}"
+"`aj=0;j<l`4;++j){i=l[j]`Ei&&!b[i]){h=i`4`ak=0;k<i`4;++k)h=(h&0x03ffffff)<<5^ h>>26^ i.charCodeAt(k);b[i]={url:g`S`9/\"+(h%251+100)+\"/\"+encodeURIComponent(i`V|/,\"||\")`V//,\"|-\"))};++`F;}}g.`9=b"
+";`R`0`Q();\",0`X`g=1;`5param`1c,n,v`Wp`k\",w`C,u=\"undefined\"`E`hc[n]==u)c[n]=`hw[p+n]==u?v:w[p+n];`5load`1){`2g=`0,q=g.`9,r,i,n`ksid\",b=m.s.c_r(n)`E!b){b=parseInt((new Date()).getTime()*Math.ran"
+"dom()`Xs.c_w(n,b);}for(i in q){r=q[i]`E!`T){`T`Pr`Slist.js?\"+b);}}`5loaded`1r,b,d,i,l){`2g=`0,n=`J;--`F`E!`A){g.bulkRevision=b;`A=r;`U=g`Scommon/\"+b;}`b`A!=r)`8`E!l`4)`8;n[n`4]={r:i,l:l}`Eg.`7)g."
+"`7();`b!`6){`6`P`U+\"/trigger.js\");}`5script`1u`Wd=document,e=d.createElement(\"script\");e.type=\"text/javascript\";e.src=u;d.getElementsByTag`c(\"head\")[0].appendChild(e);};";
s.m_i("Survey");

/* WARNING: Changing any of the below variables will cause drastic
changes to how your visitor data is collected.  Changes should only be
made when instructed to do so by your account manager.*/
s.dc=112
s.trackingServer="metric.nationalgeographic.com"
s.trackingServerSecure="metrics.nationalgeographic.com"

/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/

var s_code='',s_objectID;function s_gi(un,pg,ss){var c="s.version='H.23.8';s.an=s_an;s.logDebug=function(m){var s=this,tcf=new Function('var e;try{console.log(\"'+s.rep(s.rep(m,\"\\n\",\"\\\\n\"),\""
+"\\\"\",\"\\\\\\\"\")+'\");}catch(e){}');tcf()};s.cls=function(x,c){var i,y='';if(!c)c=this.an;for(i=0;i<x.length;i++){n=x.substring(i,i+1);if(c.indexOf(n)>=0)y+=n}return y};s.fl=function(x,l){retur"
+"n x?(''+x).substring(0,l):x};s.co=function(o){if(!o)return o;var n=new Object,x;for(x in o)if(x.indexOf('select')<0&&x.indexOf('filter')<0)n[x]=o[x];return n};s.num=function(x){x=''+x;for(var p=0;p"
+"<x.length;p++)if(('0123456789').indexOf(x.substring(p,p+1))<0)return 0;return 1};s.rep=s_rep;s.sp=s_sp;s.jn=s_jn;s.ape=function(x){var s=this,h='0123456789ABCDEF',i,c=s.charSet,n,l,e,y='';c=c?c.toU"
+"pperCase():'';if(x){x=''+x;if(s.em==3)x=encodeURIComponent(x);else if(c=='AUTO'&&('').charCodeAt){for(i=0;i<x.length;i++){c=x.substring(i,i+1);n=x.charCodeAt(i);if(n>127){l=0;e='';while(n||l<4){e=h"
+".substring(n%16,n%16+1)+e;n=(n-n%16)/16;l++}y+='%u'+e}else if(c=='+')y+='%2B';else y+=escape(c)}x=y}else x=escape(''+x);x=s.rep(x,'+','%2B');if(c&&c!='AUTO'&&s.em==1&&x.indexOf('%u')<0&&x.indexOf('"
+"%U')<0){i=x.indexOf('%');while(i>=0){i++;if(h.substring(8).indexOf(x.substring(i,i+1).toUpperCase())>=0)return x.substring(0,i)+'u00'+x.substring(i);i=x.indexOf('%',i)}}}return x};s.epa=function(x)"
+"{var s=this;if(x){x=s.rep(''+x,'+',' ');return s.em==3?decodeURIComponent(x):unescape(x)}return x};s.pt=function(x,d,f,a){var s=this,t=x,z=0,y,r;while(t){y=t.indexOf(d);y=y<0?t.length:y;t=t.substri"
+"ng(0,y);r=s[f](t,a);if(r)return r;z+=y+d.length;t=x.substring(z,x.length);t=z<x.length?t:''}return ''};s.isf=function(t,a){var c=a.indexOf(':');if(c>=0)a=a.substring(0,c);c=a.indexOf('=');if(c>=0)a"
+"=a.substring(0,c);if(t.substring(0,2)=='s_')t=t.substring(2);return (t!=''&&t==a)};s.fsf=function(t,a){var s=this;if(s.pt(a,',','isf',t))s.fsg+=(s.fsg!=''?',':'')+t;return 0};s.fs=function(x,f){var"
+" s=this;s.fsg='';s.pt(x,',','fsf',f);return s.fsg};s.si=function(){var s=this,i,k,v,c=s_gi+'var s=s_gi(\"'+s.oun+'\");s.sa(\"'+s.un+'\");';for(i=0;i<s.va_g.length;i++){k=s.va_g[i];v=s[k];if(v!=unde"
+"fined){if(typeof(v)!='number')c+='s.'+k+'=\"'+s_fe(v)+'\";';else c+='s.'+k+'='+v+';'}}c+=\"s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';\";return c};s.c_d='';"
+"s.c_gdf=function(t,a){var s=this;if(!s.num(t))return 1;return 0};s.c_gd=function(){var s=this,d=s.wd.location.hostname,n=s.fpCookieDomainPeriods,p;if(!n)n=s.cookieDomainPeriods;if(d&&!s.c_d){n=n?pa"
+"rseInt(n):2;n=n>2?n:2;p=d.lastIndexOf('.');if(p>=0){while(p>=0&&n>1){p=d.lastIndexOf('.',p-1);n--}s.c_d=p>0&&s.pt(d,'.','c_gdf',0)?d.substring(p):d}}return s.c_d};s.c_r=function(k){var s=this;k=s.a"
+"pe(k);var c=' '+s.d.cookie,i=c.indexOf(' '+k+'='),e=i<0?i:c.indexOf(';',i),v=i<0?'':s.epa(c.substring(i+2+k.length,e<0?c.length:e));return v!='[[B]]'?v:''};s.c_w=function(k,v,e){var s=this,d=s.c_gd"
+"(),l=s.cookieLifetime,t;v=''+v;l=l?(''+l).toUpperCase():'';if(e&&l!='SESSION'&&l!='NONE'){t=(v!=''?parseInt(l?l:0):-60);if(t){e=new Date;e.setTime(e.getTime()+(t*1000))}}if(k&&l!='NONE'){s.d.cookie"
+"=k+'='+s.ape(v!=''?v:'[[B]]')+'; path=/;'+(e&&l!='SESSION'?' expires='+e.toGMTString()+';':'')+(d?' domain='+d+';':'');return s.c_r(k)==v}return 0};s.eh=function(o,e,r,f){var s=this,b='s_'+e+'_'+s."
+"_in,n=-1,l,i,x;if(!s.ehl)s.ehl=new Array;l=s.ehl;for(i=0;i<l.length&&n<0;i++){if(l[i].o==o&&l[i].e==e)n=i}if(n<0){n=i;l[n]=new Object}x=l[n];x.o=o;x.e=e;f=r?x.b:f;if(r||f){x.b=r?0:o[e];x.o[e]=f}if("
+"x.b){x.o[b]=x.b;return b}return 0};s.cet=function(f,a,t,o,b){var s=this,r,tcf;if(s.apv>=5&&(!s.isopera||s.apv>=7)){tcf=new Function('s','f','a','t','var e,r;try{r=s[f](a)}catch(e){r=s[t](e)}return "
+"r');r=tcf(s,f,a,t)}else{if(s.ismac&&s.u.indexOf('MSIE 4')>=0)r=s[b](a);else{s.eh(s.wd,'onerror',0,o);r=s[f](a);s.eh(s.wd,'onerror',1)}}return r};s.gtfset=function(e){var s=this;return s.tfs};s.gtfs"
+"oe=new Function('e','var s=s_c_il['+s._in+'],c;s.eh(window,\"onerror\",1);s.etfs=1;c=s.t();if(c)s.d.write(c);s.etfs=0;return true');s.gtfsfb=function(a){return window};s.gtfsf=function(w){var s=thi"
+"s,p=w.parent,l=w.location;s.tfs=w;if(p&&p.location!=l&&p.location.host==l.host){s.tfs=p;return s.gtfsf(s.tfs)}return s.tfs};s.gtfs=function(){var s=this;if(!s.tfs){s.tfs=s.wd;if(!s.etfs)s.tfs=s.cet"
+"('gtfsf',s.tfs,'gtfset',s.gtfsoe,'gtfsfb')}return s.tfs};s.mrq=function(u){var s=this,l=s.rl[u],n,r;s.rl[u]=0;if(l)for(n=0;n<l.length;n++){r=l[n];s.mr(0,0,r.r,r.t,r.u)}};s.flushBufferedRequests=fun"
+"ction(){};s.mr=function(sess,q,rs,ta,u){var s=this,dc=s.dc,t1=s.trackingServer,t2=s.trackingServerSecure,tb=s.trackingServerBase,p='.sc',ns=s.visitorNamespace,un=s.cls(u?u:(ns?ns:s.fun)),r=new Obje"
+"ct,l,imn='s_i_'+(un),im,b,e;if(!rs){if(t1){if(t2&&s.ssl)t1=t2}else{if(!tb)tb='2o7.net';if(dc)dc=(''+dc).toLowerCase();else dc='d1';if(tb=='2o7.net'){if(dc=='d1')dc='112';else if(dc=='d2')dc='122';p"
+"=''}t1=un+'.'+dc+'.'+p+tb}rs='http'+(s.ssl?'s':'')+'://'+t1+'/b/ss/'+s.un+'/'+(s.mobile?'5.1':'1')+'/'+s.version+(s.tcn?'T':'')+'/'+sess+'?AQB=1&ndh=1'+(q?q:'')+'&AQE=1';if(s.isie&&!s.ismac)rs=s.fl"
+"(rs,2047)}if(s.d.images&&s.apv>=3&&(!s.isopera||s.apv>=7)&&(s.ns6<0||s.apv>=6.1)){if(!s.rc)s.rc=new Object;if(!s.rc[un]){s.rc[un]=1;if(!s.rl)s.rl=new Object;s.rl[un]=new Array;setTimeout('if(window"
+".s_c_il)window.s_c_il['+s._in+'].mrq(\"'+un+'\")',750)}else{l=s.rl[un];if(l){r.t=ta;r.u=un;r.r=rs;l[l.length]=r;return ''}imn+='_'+s.rc[un];s.rc[un]++}im=s.wd[imn];if(!im)im=s.wd[imn]=new Image;im."
+"s_l=0;im.onload=new Function('e','this.s_l=1;var wd=window,s;if(wd.s_c_il){s=wd.s_c_il['+s._in+'];s.mrq(\"'+un+'\");s.nrs--;if(!s.nrs)s.m_m(\"rr\")}');if(!s.nrs){s.nrs=1;s.m_m('rs')}else s.nrs++;if"
+"(s.debugTracking){var d='AppMeasurement Debug: '+rs,dl=s.sp(rs,'&'),dln;for(dln=0;dln<dl.length;dln++)d+=\"\\n\\t\"+s.epa(dl[dln]);s.logDebug(d)}im.src=rs;if((!ta||ta=='_self'||ta=='_top'||(s.wd.na"
+"me&&ta==s.wd.name))&&rs.indexOf('&pe=')>=0){b=e=new Date;while(!im.s_l&&e.getTime()-b.getTime()<500)e=new Date}return ''}return '<im'+'g sr'+'c=\"'+rs+'\" width=1 height=1 border=0 alt=\"\">'};s.gg"
+"=function(v){var s=this;if(!s.wd['s_'+v])s.wd['s_'+v]='';return s.wd['s_'+v]};s.glf=function(t,a){if(t.substring(0,2)=='s_')t=t.substring(2);var s=this,v=s.gg(t);if(v)s[t]=v};s.gl=function(v){var s"
+"=this;if(s.pg)s.pt(v,',','glf',0)};s.rf=function(x){var s=this,y,i,j,h,p,l=0,q,a,b='',c='',t;if(x&&x.length>255){y=''+x;i=y.indexOf('?');if(i>0){q=y.substring(i+1);y=y.substring(0,i);h=y.toLowerCas"
+"e();j=0;if(h.substring(0,7)=='http://')j+=7;else if(h.substring(0,8)=='https://')j+=8;i=h.indexOf(\"/\",j);if(i>0){h=h.substring(j,i);p=y.substring(i);y=y.substring(0,i);if(h.indexOf('google')>=0)l"
+"=',q,ie,start,search_key,word,kw,cd,';else if(h.indexOf('yahoo.co')>=0)l=',p,ei,';if(l&&q){a=s.sp(q,'&');if(a&&a.length>1){for(j=0;j<a.length;j++){t=a[j];i=t.indexOf('=');if(i>0&&l.indexOf(','+t.su"
+"bstring(0,i)+',')>=0)b+=(b?'&':'')+t;else c+=(c?'&':'')+t}if(b&&c)q=b+'&'+c;else c=''}i=253-(q.length-c.length)-y.length;x=y+(i>0?p.substring(0,i):'')+'?'+q}}}}return x};s.s2q=function(k,v,vf,vfp,f"
+"){var s=this,qs='',sk,sv,sp,ss,nke,nk,nf,nfl=0,nfn,nfm;if(k==\"contextData\")k=\"c\";if(v){for(sk in v) {if((!f||sk.substring(0,f.length)==f)&&v[sk]&&(!vf||vf.indexOf(','+(vfp?vfp+'.':'')+sk+',')>="
+"0)){nfm=0;if(nfl)for(nfn=0;nfn<nfl.length;nfn++)if(sk.substring(0,nfl[nfn].length)==nfl[nfn])nfm=1;if(!nfm){if(qs=='')qs+='&'+k+'.';sv=v[sk];if(f)sk=sk.substring(f.length);if(sk.length>0){nke=sk.in"
+"dexOf('.');if(nke>0){nk=sk.substring(0,nke);nf=(f?f:'')+nk+'.';if(!nfl)nfl=new Array;nfl[nfl.length]=nf;qs+=s.s2q(nk,v,vf,vfp,nf)}else{if(typeof(sv)=='boolean'){if(sv)sv='true';else sv='false'}if(s"
+"v){if(vfp=='retrieveLightData'&&f.indexOf('.contextData.')<0){sp=sk.substring(0,4);ss=sk.substring(4);if(sk=='transactionID')sk='xact';else if(sk=='channel')sk='ch';else if(sk=='campaign')sk='v0';e"
+"lse if(s.num(ss)){if(sp=='prop')sk='c'+ss;else if(sp=='eVar')sk='v'+ss;else if(sp=='list')sk='l'+ss;else if(sp=='hier'){sk='h'+ss;sv=sv.substring(0,255)}}}qs+='&'+s.ape(sk)+'='+s.ape(sv)}}}}}}if(qs"
+"!='')qs+='&.'+k}return qs};s.hav=function(){var s=this,qs='',l,fv='',fe='',mn,i,e;if(s.lightProfileID){l=s.va_m;fv=s.lightTrackVars;if(fv)fv=','+fv+','+s.vl_mr+','}else{l=s.va_t;if(s.pe||s.linkType"
+"){fv=s.linkTrackVars;fe=s.linkTrackEvents;if(s.pe){mn=s.pe.substring(0,1).toUpperCase()+s.pe.substring(1);if(s[mn]){fv=s[mn].trackVars;fe=s[mn].trackEvents}}}if(fv)fv=','+fv+','+s.vl_l+','+s.vl_l2;"
+"if(fe){fe=','+fe+',';if(fv)fv+=',events,'}if (s.events2)e=(e?',':'')+s.events2}for(i=0;i<l.length;i++){var k=l[i],v=s[k],b=k.substring(0,4),x=k.substring(4),n=parseInt(x),q=k;if(!v)if(k=='events'&&"
+"e){v=e;e=''}if(v&&(!fv||fv.indexOf(','+k+',')>=0)&&k!='linkName'&&k!='linkType'){if(k=='timestamp')q='ts';else if(k=='dynamicVariablePrefix')q='D';else if(k=='visitorID')q='vid';else if(k=='pageURL"
+"'){q='g';v=s.fl(v,255)}else if(k=='referrer'){q='r';v=s.fl(s.rf(v),255)}else if(k=='vmk'||k=='visitorMigrationKey')q='vmt';else if(k=='visitorMigrationServer'){q='vmf';if(s.ssl&&s.visitorMigrationS"
+"erverSecure)v=''}else if(k=='visitorMigrationServerSecure'){q='vmf';if(!s.ssl&&s.visitorMigrationServer)v=''}else if(k=='charSet'){q='ce';if(v.toUpperCase()=='AUTO')v='ISO8859-1';else if(s.em==2||s"
+".em==3)v='UTF-8'}else if(k=='visitorNamespace')q='ns';else if(k=='cookieDomainPeriods')q='cdp';else if(k=='cookieLifetime')q='cl';else if(k=='variableProvider')q='vvp';else if(k=='currencyCode')q='"
+"cc';else if(k=='channel')q='ch';else if(k=='transactionID')q='xact';else if(k=='campaign')q='v0';else if(k=='resolution')q='s';else if(k=='colorDepth')q='c';else if(k=='javascriptVersion')q='j';els"
+"e if(k=='javaEnabled')q='v';else if(k=='cookiesEnabled')q='k';else if(k=='browserWidth')q='bw';else if(k=='browserHeight')q='bh';else if(k=='connectionType')q='ct';else if(k=='homepage')q='hp';else"
+" if(k=='plugins')q='p';else if(k=='events'){if(e)v+=(v?',':'')+e;if(fe)v=s.fs(v,fe)}else if(k=='events2')v='';else if(k=='contextData'){qs+=s.s2q('c',s[k],fv,k,0);v=''}else if(k=='lightProfileID')q"
+"='mtp';else if(k=='lightStoreForSeconds'){q='mtss';if(!s.lightProfileID)v=''}else if(k=='lightIncrementBy'){q='mti';if(!s.lightProfileID)v=''}else if(k=='retrieveLightProfiles')q='mtsr';else if(k=="
+"'deleteLightProfiles')q='mtsd';else if(k=='retrieveLightData'){if(s.retrieveLightProfiles)qs+=s.s2q('mts',s[k],fv,k,0);v=''}else if(s.num(x)){if(b=='prop')q='c'+n;else if(b=='eVar')q='v'+n;else if("
+"b=='list')q='l'+n;else if(b=='hier'){q='h'+n;v=s.fl(v,255)}}if(v)qs+='&'+s.ape(q)+'='+(k.substring(0,3)!='pev'?s.ape(v):v)}}return qs};s.ltdf=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase("
+"):'';var qi=h.indexOf('?');h=qi>=0?h.substring(0,qi):h;if(t&&h.substring(h.length-(t.length+1))=='.'+t)return 1;return 0};s.ltef=function(t,h){t=t?t.toLowerCase():'';h=h?h.toLowerCase():'';if(t&&h."
+"indexOf(t)>=0)return 1;return 0};s.lt=function(h){var s=this,lft=s.linkDownloadFileTypes,lef=s.linkExternalFilters,lif=s.linkInternalFilters;lif=lif?lif:s.wd.location.hostname;h=h.toLowerCase();if("
+"s.trackDownloadLinks&&lft&&s.pt(lft,',','ltdf',h))return 'd';if(s.trackExternalLinks&&h.substring(0,1)!='#'&&(lef||lif)&&(!lef||s.pt(lef,',','ltef',h))&&(!lif||!s.pt(lif,',','ltef',h)))return 'e';r"
+"eturn ''};s.lc=new Function('e','var s=s_c_il['+s._in+'],b=s.eh(this,\"onclick\");s.lnk=s.co(this);s.t();s.lnk=0;if(b)return this[b](e);return true');s.bc=new Function('e','var s=s_c_il['+s._in+'],"
+"f,tcf;if(s.d&&s.d.all&&s.d.all.cppXYctnr)return;s.eo=e.srcElement?e.srcElement:e.target;tcf=new Function(\"s\",\"var e;try{if(s.eo&&(s.eo.tagName||s.eo.parentElement||s.eo.parentNode))s.t()}catch(e"
+"){}\");tcf(s);s.eo=0');s.oh=function(o){var s=this,l=s.wd.location,h=o.href?o.href:'',i,j,k,p;i=h.indexOf(':');j=h.indexOf('?');k=h.indexOf('/');if(h&&(i<0||(j>=0&&i>j)||(k>=0&&i>k))){p=o.protocol&"
+"&o.protocol.length>1?o.protocol:(l.protocol?l.protocol:'');i=l.pathname.lastIndexOf('/');h=(p?p+'//':'')+(o.host?o.host:(l.host?l.host:''))+(h.substring(0,1)!='/'?l.pathname.substring(0,i<0?0:i)+'/"
+"':'')+h}return h};s.ot=function(o){var t=o.tagName;if(o.tagUrn||(o.scopeName&&o.scopeName.toUpperCase()!='HTML'))return '';t=t&&t.toUpperCase?t.toUpperCase():'';if(t=='SHAPE')t='';if(t){if((t=='INP"
+"UT'||t=='BUTTON')&&o.type&&o.type.toUpperCase)t=o.type.toUpperCase();else if(!t&&o.href)t='A';}return t};s.oid=function(o){var s=this,t=s.ot(o),p,c,n='',x=0;if(t&&!o.s_oid){p=o.protocol;c=o.onclick"
+";if(o.href&&(t=='A'||t=='AREA')&&(!c||!p||p.toLowerCase().indexOf('javascript')<0))n=s.oh(o);else if(c){n=s.rep(s.rep(s.rep(s.rep(''+c,\"\\r\",''),\"\\n\",''),\"\\t\",''),' ','');x=2}else if(t=='IN"
+"PUT'||t=='SUBMIT'){if(o.value)n=o.value;else if(o.innerText)n=o.innerText;else if(o.textContent)n=o.textContent;x=3}else if(o.src&&t=='IMAGE')n=o.src;if(n){o.s_oid=s.fl(n,100);o.s_oidt=x}}return o."
+"s_oid};s.rqf=function(t,un){var s=this,e=t.indexOf('='),u=e>=0?t.substring(0,e):'',q=e>=0?s.epa(t.substring(e+1)):'';if(u&&q&&(','+u+',').indexOf(','+un+',')>=0){if(u!=s.un&&s.un.indexOf(',')>=0)q="
+"'&u='+u+q+'&u=0';return q}return ''};s.rq=function(un){if(!un)un=this.un;var s=this,c=un.indexOf(','),v=s.c_r('s_sq'),q='';if(c<0)return s.pt(v,'&','rqf',un);return s.pt(un,',','rq',0)};s.sqp=funct"
+"ion(t,a){var s=this,e=t.indexOf('='),q=e<0?'':s.epa(t.substring(e+1));s.sqq[q]='';if(e>=0)s.pt(t.substring(0,e),',','sqs',q);return 0};s.sqs=function(un,q){var s=this;s.squ[un]=q;return 0};s.sq=fun"
+"ction(q){var s=this,k='s_sq',v=s.c_r(k),x,c=0;s.sqq=new Object;s.squ=new Object;s.sqq[q]='';s.pt(v,'&','sqp',0);s.pt(s.un,',','sqs',q);v='';for(x in s.squ)if(x&&(!Object||!Object.prototype||!Object"
+".prototype[x]))s.sqq[s.squ[x]]+=(s.sqq[s.squ[x]]?',':'')+x;for(x in s.sqq)if(x&&(!Object||!Object.prototype||!Object.prototype[x])&&s.sqq[x]&&(x==q||c<2)){v+=(v?'&':'')+s.sqq[x]+'='+s.ape(x);c++}re"
+"turn s.c_w(k,v,0)};s.wdl=new Function('e','var s=s_c_il['+s._in+'],r=true,b=s.eh(s.wd,\"onload\"),i,o,oc;if(b)r=this[b](e);for(i=0;i<s.d.links.length;i++){o=s.d.links[i];oc=o.onclick?\"\"+o.onclick"
+":\"\";if((oc.indexOf(\"s_gs(\")<0||oc.indexOf(\".s_oc(\")>=0)&&oc.indexOf(\".tl(\")<0)s.eh(o,\"onclick\",0,s.lc);}return r');s.wds=function(){var s=this;if(s.apv>3&&(!s.isie||!s.ismac||s.apv>=5)){i"
+"f(s.b&&s.b.attachEvent)s.b.attachEvent('onclick',s.bc);else if(s.b&&s.b.addEventListener)s.b.addEventListener('click',s.bc,false);else s.eh(s.wd,'onload',0,s.wdl)}};s.vs=function(x){var s=this,v=s."
+"visitorSampling,g=s.visitorSamplingGroup,k='s_vsn_'+s.un+(g?'_'+g:''),n=s.c_r(k),e=new Date,y=e.getYear();e.setYear(y+10+(y<1900?1900:0));if(v){v*=100;if(!n){if(!s.c_w(k,x,e))return 0;n=x}if(n%1000"
+"0>v)return 0}return 1};s.dyasmf=function(t,m){if(t&&m&&m.indexOf(t)>=0)return 1;return 0};s.dyasf=function(t,m){var s=this,i=t?t.indexOf('='):-1,n,x;if(i>=0&&m){var n=t.substring(0,i),x=t.substring"
+"(i+1);if(s.pt(x,',','dyasmf',m))return n}return 0};s.uns=function(){var s=this,x=s.dynamicAccountSelection,l=s.dynamicAccountList,m=s.dynamicAccountMatch,n,i;s.un=s.un.toLowerCase();if(x&&l){if(!m)"
+"m=s.wd.location.host;if(!m.toLowerCase)m=''+m;l=l.toLowerCase();m=m.toLowerCase();n=s.pt(l,';','dyasf',m);if(n)s.un=n}i=s.un.indexOf(',');s.fun=i<0?s.un:s.un.substring(0,i)};s.sa=function(un){var s"
+"=this;s.un=un;if(!s.oun)s.oun=un;else if((','+s.oun+',').indexOf(','+un+',')<0)s.oun+=','+un;s.uns()};s.m_i=function(n,a){var s=this,m,f=n.substring(0,1),r,l,i;if(!s.m_l)s.m_l=new Object;if(!s.m_nl"
+")s.m_nl=new Array;m=s.m_l[n];if(!a&&m&&m._e&&!m._i)s.m_a(n);if(!m){m=new Object,m._c='s_m';m._in=s.wd.s_c_in;m._il=s._il;m._il[m._in]=m;s.wd.s_c_in++;m.s=s;m._n=n;m._l=new Array('_c','_in','_il','_"
+"i','_e','_d','_dl','s','n','_r','_g','_g1','_t','_t1','_x','_x1','_rs','_rr','_l');s.m_l[n]=m;s.m_nl[s.m_nl.length]=n}else if(m._r&&!m._m){r=m._r;r._m=m;l=m._l;for(i=0;i<l.length;i++)if(m[l[i]])r[l"
+"[i]]=m[l[i]];r._il[r._in]=r;m=s.m_l[n]=r}if(f==f.toUpperCase())s[n]=m;return m};s.m_a=new Function('n','g','e','if(!g)g=\"m_\"+n;var s=s_c_il['+s._in+'],c=s[g+\"_c\"],m,x,f=0;if(!c)c=s.wd[\"s_\"+g+"
+"\"_c\"];if(c&&s_d)s[g]=new Function(\"s\",s_ft(s_d(c)));x=s[g];if(!x)x=s.wd[\\'s_\\'+g];if(!x)x=s.wd[g];m=s.m_i(n,1);if(x&&(!m._i||g!=\"m_\"+n)){m._i=f=1;if((\"\"+x).indexOf(\"function\")>=0)x(s);e"
+"lse s.m_m(\"x\",n,x,e)}m=s.m_i(n,1);if(m._dl)m._dl=m._d=0;s.dlt();return f');s.m_m=function(t,n,d,e){t='_'+t;var s=this,i,x,m,f='_'+t,r=0,u;if(s.m_l&&s.m_nl)for(i=0;i<s.m_nl.length;i++){x=s.m_nl[i]"
+";if(!n||x==n){m=s.m_i(x);u=m[t];if(u){if((''+u).indexOf('function')>=0){if(d&&e)u=m[t](d,e);else if(d)u=m[t](d);else u=m[t]()}}if(u)r=1;u=m[t+1];if(u&&!m[f]){if((''+u).indexOf('function')>=0){if(d&"
+"&e)u=m[t+1](d,e);else if(d)u=m[t+1](d);else u=m[t+1]()}}m[f]=1;if(u)r=1}}return r};s.m_ll=function(){var s=this,g=s.m_dl,i,o;if(g)for(i=0;i<g.length;i++){o=g[i];if(o)s.loadModule(o.n,o.u,o.d,o.l,o."
+"e,1);g[i]=0}};s.loadModule=function(n,u,d,l,e,ln){var s=this,m=0,i,g,o=0,f1,f2,c=s.h?s.h:s.b,b,tcf;if(n){i=n.indexOf(':');if(i>=0){g=n.substring(i+1);n=n.substring(0,i)}else g=\"m_\"+n;m=s.m_i(n)}i"
+"f((l||(n&&!s.m_a(n,g)))&&u&&s.d&&c&&s.d.createElement){if(d){m._d=1;m._dl=1}if(ln){if(s.ssl)u=s.rep(u,'http:','https:');i='s_s:'+s._in+':'+n+':'+g;b='var s=s_c_il['+s._in+'],o=s.d.getElementById(\""
+"'+i+'\");if(s&&o){if(!o.l&&s.wd.'+g+'){o.l=1;if(o.i)clearTimeout(o.i);o.i=0;s.m_a(\"'+n+'\",\"'+g+'\"'+(e?',\"'+e+'\"':'')+')}';f2=b+'o.c++;if(!s.maxDelay)s.maxDelay=250;if(!o.l&&o.c<(s.maxDelay*2)"
+"/100)o.i=setTimeout(o.f2,100)}';f1=new Function('e',b+'}');tcf=new Function('s','c','i','u','f1','f2','var e,o=0;try{o=s.d.createElement(\"script\");if(o){o.type=\"text/javascript\";'+(n?'o.id=i;o."
+"defer=true;o.onload=o.onreadystatechange=f1;o.f2=f2;o.l=0;':'')+'o.src=u;c.appendChild(o);'+(n?'o.c=0;o.i=setTimeout(f2,100)':'')+'}}catch(e){o=0}return o');o=tcf(s,c,i,u,f1,f2)}else{o=new Object;o"
+".n=n+':'+g;o.u=u;o.d=d;o.l=l;o.e=e;g=s.m_dl;if(!g)g=s.m_dl=new Array;i=0;while(i<g.length&&g[i])i++;g[i]=o}}else if(n){m=s.m_i(n);m._e=1}return m};s.voa=function(vo,r){var s=this,l=s.va_g,i,k,v,x;f"
+"or(i=0;i<l.length;i++){k=l[i];v=vo[k];if(v||vo['!'+k]){if(!r&&(k==\"contextData\"||k==\"retrieveLightData\")&&s[k])for(x in s[k])if(!v[x])v[x]=s[k][x];s[k]=v}}};s.vob=function(vo){var s=this,l=s.va"
+"_g,i,k;for(i=0;i<l.length;i++){k=l[i];vo[k]=s[k];if(!vo[k])vo['!'+k]=1}};s.dlt=new Function('var s=s_c_il['+s._in+'],d=new Date,i,vo,f=0;if(s.dll)for(i=0;i<s.dll.length;i++){vo=s.dll[i];if(vo){if(!"
+"s.m_m(\"d\")||d.getTime()-vo._t>=s.maxDelay){s.dll[i]=0;s.t(vo)}else f=1}}if(s.dli)clearTimeout(s.dli);s.dli=0;if(f){if(!s.dli)s.dli=setTimeout(s.dlt,s.maxDelay)}else s.dll=0');s.dl=function(vo){va"
+"r s=this,d=new Date;if(!vo)vo=new Object;s.vob(vo);vo._t=d.getTime();if(!s.dll)s.dll=new Array;s.dll[s.dll.length]=vo;if(!s.maxDelay)s.maxDelay=250;s.dlt()};s.track=s.t=function(vo){var s=this,trk="
+"1,tm=new Date,sed=Math&&Math.random?Math.floor(Math.random()*10000000000000):tm.getTime(),sess='s'+Math.floor(tm.getTime()/10800000)%10+sed,y=tm.getYear(),vt=tm.getDate()+'/'+tm.getMonth()+'/'+(y<1"
+"900?y+1900:y)+' '+tm.getHours()+':'+tm.getMinutes()+':'+tm.getSeconds()+' '+tm.getDay()+' '+tm.getTimezoneOffset(),tcf,tfs=s.gtfs(),ta=-1,q='',qs='',code='',vb=new Object;s.gl(s.vl_g);s.uns();s.m_l"
+"l();if(!s.td){var tl=tfs.location,a,o,i,x='',c='',v='',p='',bw='',bh='',j='1.0',k=s.c_w('s_cc','true',0)?'Y':'N',hp='',ct='',pn=0,ps;if(String&&String.prototype){j='1.1';if(j.match){j='1.2';if(tm.s"
+"etUTCDate){j='1.3';if(s.isie&&s.ismac&&s.apv>=5)j='1.4';if(pn.toPrecision){j='1.5';a=new Array;if(a.forEach){j='1.6';i=0;o=new Object;tcf=new Function('o','var e,i=0;try{i=new Iterator(o)}catch(e){"
+"}return i');i=tcf(o);if(i&&i.next)j='1.7'}}}}}if(s.apv>=4)x=screen.width+'x'+screen.height;if(s.isns||s.isopera){if(s.apv>=3){v=s.n.javaEnabled()?'Y':'N';if(s.apv>=4){c=screen.pixelDepth;bw=s.wd.in"
+"nerWidth;bh=s.wd.innerHeight}}s.pl=s.n.plugins}else if(s.isie){if(s.apv>=4){v=s.n.javaEnabled()?'Y':'N';c=screen.colorDepth;if(s.apv>=5){bw=s.d.documentElement.offsetWidth;bh=s.d.documentElement.of"
+"fsetHeight;if(!s.ismac&&s.b){tcf=new Function('s','tl','var e,hp=0;try{s.b.addBehavior(\"#default#homePage\");hp=s.b.isHomePage(tl)?\"Y\":\"N\"}catch(e){}return hp');hp=tcf(s,tl);tcf=new Function('"
+"s','var e,ct=0;try{s.b.addBehavior(\"#default#clientCaps\");ct=s.b.connectionType}catch(e){}return ct');ct=tcf(s)}}}else r=''}if(s.pl)while(pn<s.pl.length&&pn<30){ps=s.fl(s.pl[pn].name,100)+';';if("
+"p.indexOf(ps)<0)p+=ps;pn++}s.resolution=x;s.colorDepth=c;s.javascriptVersion=j;s.javaEnabled=v;s.cookiesEnabled=k;s.browserWidth=bw;s.browserHeight=bh;s.connectionType=ct;s.homepage=hp;s.plugins=p;"
+"s.td=1}if(vo){s.vob(vb);s.voa(vo)}if((vo&&vo._t)||!s.m_m('d')){if(s.usePlugins)s.doPlugins(s);var l=s.wd.location,r=tfs.document.referrer;if(!s.pageURL)s.pageURL=l.href?l.href:l;if(!s.referrer&&!s."
+"_1_referrer){s.referrer=r;s._1_referrer=1}s.m_m('g');if(s.lnk||s.eo){var o=s.eo?s.eo:s.lnk,p=s.pageName,w=1,t=s.ot(o),n=s.oid(o),x=o.s_oidt,h,l,i,oc;if(s.eo&&o==s.eo){while(o&&!n&&t!='BODY'){o=o.pa"
+"rentElement?o.parentElement:o.parentNode;if(o){t=s.ot(o);n=s.oid(o);x=o.s_oidt}}if(o){oc=o.onclick?''+o.onclick:'';if((oc.indexOf('s_gs(')>=0&&oc.indexOf('.s_oc(')<0)||oc.indexOf('.tl(')>=0)o=0}}if"
+"(o){if(n)ta=o.target;h=s.oh(o);i=h.indexOf('?');h=s.linkLeaveQueryString||i<0?h:h.substring(0,i);l=s.linkName;t=s.linkType?s.linkType.toLowerCase():s.lt(h);if(t&&(h||l)){s.pe='lnk_'+(t=='d'||t=='e'"
+"?t:'o');q+='&pe='+s.pe+(h?'&pev1='+s.ape(h):'')+(l?'&pev2='+s.ape(l):'');}else trk=0;if(s.trackInlineStats){if(!p){p=s.pageURL;w=0}t=s.ot(o);i=o.sourceIndex;if(s.gg('objectID')){n=s.gg('objectID');"
+"x=1;i=1}if(p&&n&&t)qs='&pid='+s.ape(s.fl(p,255))+(w?'&pidt='+w:'')+'&oid='+s.ape(s.fl(n,100))+(x?'&oidt='+x:'')+'&ot='+s.ape(t)+(i?'&oi='+i:'')}}else trk=0}if(trk||qs){s.sampled=s.vs(sed);if(trk){i"
+"f(s.sampled)code=s.mr(sess,(vt?'&t='+s.ape(vt):'')+s.hav()+q+(qs?qs:s.rq()),0,ta);qs='';s.m_m('t');if(s.p_r)s.p_r();s.referrer=s.lightProfileID=s.retrieveLightProfiles=s.deleteLightProfiles=''}s.sq"
+"(qs)}}else s.dl(vo);if(vo)s.voa(vb,1);s.lnk=s.eo=s.linkName=s.linkType=s.wd.s_objectID=s.ppu=s.pe=s.pev1=s.pev2=s.pev3='';if(s.pg)s.wd.s_lnk=s.wd.s_eo=s.wd.s_linkName=s.wd.s_linkType='';return code"
+"};s.trackLink=s.tl=function(o,t,n,vo){var s=this;s.lnk=s.co(o);s.linkType=t;s.linkName=n;s.t(vo)};s.trackLight=function(p,ss,i,vo){var s=this;s.lightProfileID=p;s.lightStoreForSeconds=ss;s.lightInc"
+"rementBy=i;s.t(vo)};s.setTagContainer=function(n){var s=this,l=s.wd.s_c_il,i,t,x,y;s.tcn=n;if(l)for(i=0;i<l.length;i++){t=l[i];if(t&&t._c=='s_l'&&t.tagContainerName==n){for(i=0;i<s.va_g.length;i++)"
+"{x=s.va_g[i];if(t[x])s[x]=t[x]}if(t.lmq)for(i=0;i<t.lmq.length;i++){x=t.lmq[i];y='m_'+x.n;if(!s[y]&&!s[y+'_c']){s[y]=t[y];s[y+'_c']=t[y+'_c']}s.loadModule(x.n,x.u,x.d)}if(t.ml)for(x in t.ml)if(s[x]"
+"){y=s[x];x=t.ml[x];for(i in x)if(!Object.prototype[i]){if(typeof(x[i])!='function'||(''+x[i]).indexOf('s_c_il')<0)y[i]=x[i]}}if(t.mmq)for(i=0;i<t.mmq.length;i++){x=t.mmq[i];if(s[x.m]){y=s[x.m];if(y"
+"[x.f]&&typeof(y[x.f])=='function'){if(x.a)y[x.f].apply(y,x.a);else y[x.f].apply(y)}}}if(t.tq)for(i=0;i<t.tq.length;i++)s.t(t.tq[i]);t.s=s;return}}};s.wd=window;s.ssl=(s.wd.location.protocol.toLower"
+"Case().indexOf('https')>=0);s.d=document;s.b=s.d.body;if(s.d.getElementsByTagName){s.h=s.d.getElementsByTagName('HEAD');if(s.h)s.h=s.h[0]}s.n=navigator;s.u=s.n.userAgent;s.ns6=s.u.indexOf('Netscape"
+"6/');var apn=s.n.appName,v=s.n.appVersion,ie=v.indexOf('MSIE '),o=s.u.indexOf('Opera '),i;if(v.indexOf('Opera')>=0||o>0)apn='Opera';s.isie=(apn=='Microsoft Internet Explorer');s.isns=(apn=='Netscap"
+"e');s.isopera=(apn=='Opera');s.ismac=(s.u.indexOf('Mac')>=0);if(o>0)s.apv=parseFloat(s.u.substring(o+6));else if(ie>0){s.apv=parseInt(i=v.substring(ie+5));if(s.apv>3)s.apv=parseFloat(i)}else if(s.n"
+"s6>0)s.apv=parseFloat(s.u.substring(s.ns6+10));else s.apv=parseFloat(v);s.em=0;if(s.em.toPrecision)s.em=3;else if(String.fromCharCode){i=escape(String.fromCharCode(256)).toUpperCase();s.em=(i=='%C4"
+"%80'?2:(i=='%U0100'?1:0))}if(s.oun)s.sa(s.oun);s.sa(un);s.vl_l='dynamicVariablePrefix,visitorID,vmk,visitorMigrationKey,visitorMigrationServer,visitorMigrationServerSecure,ppu,charSet,visitorNamesp"
+"ace,cookieDomainPeriods,cookieLifetime,pageName,pageURL,referrer,currencyCode';s.va_l=s.sp(s.vl_l,',');s.vl_mr=s.vl_m='charSet,visitorNamespace,cookieDomainPeriods,cookieLifetime,contextData,lightP"
+"rofileID,lightStoreForSeconds,lightIncrementBy';s.vl_t=s.vl_l+',variableProvider,channel,server,pageType,transactionID,purchaseID,campaign,state,zip,events,events2,products,linkName,linkType,contex"
+"tData,lightProfileID,lightStoreForSeconds,lightIncrementBy,retrieveLightProfiles,deleteLightProfiles,retrieveLightData';var n;for(n=1;n<=75;n++){s.vl_t+=',prop'+n+',eVar'+n;s.vl_m+=',prop'+n+',eVar"
+"'+n}for(n=1;n<=5;n++)s.vl_t+=',hier'+n;for(n=1;n<=3;n++)s.vl_t+=',list'+n;s.va_m=s.sp(s.vl_m,',');s.vl_l2=',tnt,pe,pev1,pev2,pev3,resolution,colorDepth,javascriptVersion,javaEnabled,cookiesEnabled,"
+"browserWidth,browserHeight,connectionType,homepage,plugins';s.vl_t+=s.vl_l2;s.va_t=s.sp(s.vl_t,',');s.vl_g=s.vl_t+',trackingServer,trackingServerSecure,trackingServerBase,fpCookieDomainPeriods,disa"
+"bleBufferedRequests,mobile,visitorSampling,visitorSamplingGroup,dynamicAccountSelection,dynamicAccountList,dynamicAccountMatch,trackDownloadLinks,trackExternalLinks,trackInlineStats,linkLeaveQueryS"
+"tring,linkDownloadFileTypes,linkExternalFilters,linkInternalFilters,linkTrackVars,linkTrackEvents,linkNames,lnk,eo,lightTrackVars,_1_referrer,un';s.va_g=s.sp(s.vl_g,',');s.pg=pg;s.gl(s.vl_g);s.cont"
+"extData=new Object;s.retrieveLightData=new Object;if(!ss)s.wds();if(pg){s.wd.s_co=function(o){s_gi(\"_\",1,1).co(o)};s.wd.s_gs=function(un){s_gi(un,1,1).t()};s.wd.s_dc=function(un){s_gi(un,1).t()}}",
w=window,l=w.s_c_il,n=navigator,u=n.userAgent,v=n.appVersion,e=v.indexOf('MSIE '),m=u.indexOf('Netscape6/'),a,i,j,x,s;if(un){un=un.toLowerCase();if(l)for(j=0;j<2;j++)for(i=0;i<l.length;i++){s=l[i];x=s._c;if((!x||x=='s_c'||(j>0&&x=='s_l'))&&(s.oun==un||(s.fs&&s.sa&&s.fs(s.oun,un)))){if(s.sa)s.sa(un);if(x=='s_c')return s}else s=0}}w.s_an='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
w.s_sp=new Function("x","d","var a=new Array,i=0,j;if(x){if(x.split)a=x.split(d);else if(!d)for(i=0;i<x.length;i++)a[a.length]=x.substring(i,i+1);else while(i>=0){j=x.indexOf(d,i);a[a.length]=x.subst"
+"ring(i,j<0?x.length:j);i=j;if(i>=0)i+=d.length}}return a");
w.s_jn=new Function("a","d","var x='',i,j=a.length;if(a&&j>0){x=a[0];if(j>1){if(a.join)x=a.join(d);else for(i=1;i<j;i++)x+=d+a[i]}}return x");
w.s_rep=new Function("x","o","n","return s_jn(s_sp(x,o),n)");
w.s_d=new Function("x","var t='`^@$#',l=s_an,l2=new Object,x2,d,b=0,k,i=x.lastIndexOf('~~'),j,v,w;if(i>0){d=x.substring(0,i);x=x.substring(i+2);l=s_sp(l,'');for(i=0;i<62;i++)l2[l[i]]=i;t=s_sp(t,'');d"
+"=s_sp(d,'~');i=0;while(i<5){v=0;if(x.indexOf(t[i])>=0) {x2=s_sp(x,t[i]);for(j=1;j<x2.length;j++){k=x2[j].substring(0,1);w=t[i]+k;if(k!=' '){v=1;w=d[b+l2[k]]}x2[j]=w+x2[j].substring(1)}}if(v)x=s_jn("
+"x2,'');else{w=t[i]+' ';if(x.indexOf(w)>=0)x=s_rep(x,w,t[i]);i++;b+=62}}}return x");
w.s_fe=new Function("c","return s_rep(s_rep(s_rep(c,'\\\\','\\\\\\\\'),'\"','\\\\\"'),\"\\n\",\"\\\\n\")");
w.s_fa=new Function("f","var s=f.indexOf('(')+1,e=f.indexOf(')'),a='',c;while(s>=0&&s<e){c=f.substring(s,s+1);if(c==',')a+='\",\"';else if((\"\\n\\r\\t \").indexOf(c)<0)a+=c;s++}return a?'\"'+a+'\"':"
+"a");
w.s_ft=new Function("c","c+='';var s,e,o,a,d,q,f,h,x;s=c.indexOf('=function(');while(s>=0){s++;d=1;q='';x=0;f=c.substring(s);a=s_fa(f);e=o=c.indexOf('{',s);e++;while(d>0){h=c.substring(e,e+1);if(q){i"
+"f(h==q&&!x)q='';if(h=='\\\\')x=x?0:1;else x=0}else{if(h=='\"'||h==\"'\")q=h;if(h=='{')d++;if(h=='}')d--}if(d>0)e++}c=c.substring(0,s)+'new Function('+(a?a+',':'')+'\"'+s_fe(c.substring(o+1,e))+'\")"
+"'+c.substring(e+1);s=c.indexOf('=function(')}return c;");
c=s_d(c);if(e>0){a=parseInt(i=v.substring(e+5));if(a>3)a=parseFloat(i)}else if(m>0)a=parseFloat(u.substring(m+10));else a=parseFloat(v);if(a<5||v.indexOf('Opera')>=0||u.indexOf('Opera')>=0)c=s_ft(c);if(!s){s=new Object;if(!w.s_c_in){w.s_c_il=new Array;w.s_c_in=0}s._il=w.s_c_il;s._in=w.s_c_in;s._il[s._in]=s;w.s_c_in++;}s._c='s_c';(new Function("s","un","pg","ss",c))(s,un,pg,ss);return s}
function s_giqf(){var w=window,q=w.s_giq,i,t,s;if(q)for(i=0;i<q.length;i++){t=q[i];s=s_gi(t.oun);s.sa(t.un);s.setTagContainer(t.tagContainerName)}w.s_giq=0}s_giqf()// </scode>
// </omniture>

// <functions>
// <travelerFunctions>
function _pageNameFilterTraveler(pageName){

    //pageName has any trailing slash or index.html removed
    var myArray = new Array(["/drives", "TravelerMagazine|DrivesofaLifetime"]);

    for (i=0; i<myArray.length; i++){
        if (pageName.indexOf(myArray[i][0]) == 0){
            s.hier1 = myArray[i][1];
            break;
        }
    }
}
// </travelerFunctions>

// <mapsFunctions>
function _pageNameFilterMaps(pageName){

    //pageName has any trailing slash or index.html removed
    var myArray = new Array(["/maps", "MapMachine|mapview"],
                                                    ["/map-machine", "MapMachine|mapview"]);

    for (i=0; i<myArray.length; i++){
        if (pageName.indexOf(myArray[i][0]) == 0){
            s.hier1 = myArray[i][1];
            break;
        }
    }
}
// </mapsFunctions>

// <booksFunctions>
function _pageNameFilterBooks(pageName){

    var found = 0;

    //pageName has any trailing slash or index.html removed
    if (pageName == ""){
        s.hier1 = "Books|Books";
        found = 1;
    }

    if (!found) {

        //pageName has any trailing slash or index.html removed
        var myArray = new Array(["/visions-of-paradise", "Books|VisionsOfParadise"],
                                                        ["/", "Books|Books"]);

        for (i=0; i<myArray.length; i++){
            if (pageName.indexOf(myArray[i][0]) == 0){
                s.hier1 = myArray[i][1];
                break;
            }
        }
    }
}
// </booksFunctions>

// <ngmFunctions>
function _pageNameFilterNGM(pageName){

        var found = 0;

        //pageName has any trailing slash or index.html removed

        if (window.location.hostname == "ngm.typepad.com"){
            s.hier1 = "NGM|Blog";
            found = 1;
        }
        else if ((pageName == "")||(pageName == "/home")||(pageName == "/ngm")){
        s.hier1 = "NGM|Homepage";
        found = 1;
        }
        else{
            var levels = pageName.split("/"); //before first / is counted as a level
            if (levels.length >= 4){
                // are first two levels numbers?
                var year = levels[1];
                var month = levels[2];
                var slug = levels[3];
                if ((!isNaN(year)) && (!isNaN(month))){
                    if ((year.length==4) && (month.length==2)){
                        // /YYYY/MM/article-slug NGM|YYYY|MM|article-slug
                            s.hier1 = "NGM|" + year + "|" + month + "|" + slug;
                            found = 1;
                    }
                }
            }
        }

        if (!found) {
            var myArray = new Array(["/archives/browse", "NGM|Archives|Browse"],
                                                            ["/archives/search", "NGM|Archives|Search"],
                                                            ["/archives", "NGM|Archives|Main"],
                                                            ["/emailafriend.html", "NGM|Email-a-Friend"],
                                                            ["/featurehub", "NGM|FeatureHub"],
                                                            ["/features", "NGM|Legacy"],
                                                            ["/games/memory-game", "NGM|Games"],
                                                            ["/geopedia", "NGM|Geopedia"],
                                                            ["/interactive", "NGM|Interactive"],
                                                            ["/map/atlas", "NGM|Maps|Atlas"],
                                                            ["/map/map-day", "NGM|Maps|Map-of-the-Day"],
                                                            ["/more/interactives", "NGM|Interactive"],
                                                            ["/more/photography", "NGM|Interactive"],
                                                            ["/oceans", "NGM|Oceans"],
                                                            ["/photo-contest", "NGM|PhotoContest"],
                                                            ["/print", "NGM|Printable"],
                                                            ["/video/player", "NGM|Video"],
                                                            ["/visions-of-earth/visions-earth-2006", "NGM|Visions-of-Earth|2006"],
                                                            ["/visions-of-earth/visions-earth-2007", "NGM|Visions-of-Earth|2007"],
                                                            ["/visions-of-earth/visions-earth-2008", "NGM|Visions-of-Earth|2008"],
                                                            ["/visions-of-earth/visions-earth-2009", "NGM|Visions-of-Earth|2009"],
                                                            ["/wallpaper/download", "NGM|Wallpaper"],
                                                            ["/your-shot/animals", "NGM|Your-Shot|Animals"],
                                                            ["/your-shot/custom-cover", "NGM|Your-Shot|Covers"],
                                                            ["/your-shot/daily-dozen", "NGM|Your-Shot|Daily-Dozen"],
                                                            ["/your-shot/faq", "NGM|Your-Shot|FAQ"],
                                                            ["/your-shot/frog", "NGM|Your-Shot|Frogs"],
                                                            ["/your-shot/jigsaw", "NGM|Your-Shot|Jigsaw-Puzzles"],
                                                            ["/your-shot/landscapes", "NGM|Your-Shot|Landscapes"],
                                                            ["/your-shot/match-game", "NGM|Your-Shot|Match-Game"],
                                                            ["/your-shot/rules", "NGM|Your-Shot|Rules"],
                                                            ["/your-shot/slide-puzzles", "NGM|Your-Shot|Slide-Puzzles"],
                                                            ["/your-shot/submit", "NGM|Your-Shot|Submit"],
                                                            ["/your-shot/thank-you", "NGM|Your-Shot|Thanks"],
                                                            ["/your-shot/top-shots", "NGM|Your-Shot|Top-Shots"],
                                                            ["/your-shot/upload", "NGM|Your-Shot|Upload"],
                                                            ["/your-shot/voting-machine", "NGM|Your-Shot|Voting"],
                                                            ["/your-shot/wallpaper", "NGM|Your-Shot|Wallpaper"],
                                                            ["/your-shot/your-shot", "NGM|Your-Shot|Main"],
                                                            ["/your-shot", "NGM|Your-Shot|Main"],
                                                            ["/myshot/weather", "NGM|MyShot|Weather"],
                                                            ["/myshot/search", "NGM|MyShot|Search"],
                                                            ["/myshot/rules", "NGM|MyShot|Rules"],
                                                            ["/myshot/page", "NGM|MyShot|Page"],
                                                            ["/myshot/map", "NGM|MyShot|Map"],
                                                            ["/myshot/gallery", "NGM|MyShot|Gallery"],
                                                            ["/myshot/edit", "NGM|MyShot|Edit"],
                                                            ["/myshot/drop-shot", "NGM|MyShot|Drop-Shot"],
                                                            ["/myshot/dogs", "NGM|MyShot|Dogs"],
                                                            ["/myshot/categories/wallpaper", "NGM|MyShot|Wallpaper"],
                                                            ["/myshot/categories/puzzles", "NGM|MyShot|Puzzles"],
                                                            ["/myshot/categories/gallery", "NGM|MyShot|Gallery"],
                                                            ["/myshot/categories", "NGM|MyShot|Categories"],
                                                            ["/myshot/add", "NGM|MyShot|Add"],
                                                            ["/myshot", "NGM|MyShot|Main"],
                                                            ["/2000", "NGM|Legacy"],
                                                            ["/ngm/", "NGM|Legacy"],
                                                            ["/", "NGM|Misc"]
                                                            );

                    for (i=0; i<myArray.length; i++){
                        if (pageName.indexOf(myArray[i][0]) == 0){
                            s.hier1 = myArray[i][1];
                            break;
                        }
                    }
            }
    }
// </ngmFunctions>

// <greenGuideFunctions>
function _pageNameFilterGreenGuide(pageName){

        // should be here if hostname is www.thegreenguide.com
        //pageName has any trailing slash or index.html removed

        if ((pageName == "") || (pageName == "/home")){
        s.hier1 = "TheGreenGuide|Main";
        }
        else{

            var myArray = new Array(
                ["/buying-guide/baby-bottles","TheGreenGuide|buying-guide|baby-bottles"],
                ["/buying-guide/mattresses","TheGreenGuide|buying-guide|mattresses"],
                ["/buying-guide/plastic-containers","TheGreenGuide|buying-guide|plastic-containers"],
                ["/buying-guide/refrigerators","TheGreenGuide|buying-guide|refrigerators"],
                ["/buying-guide/washing-machines","TheGreenGuide|buying-guide|washing-machines"],
                ["/buying-guide", "TheGreenGuide|buying-guide"],
                ["/buyingguide", "TheGreenGuide|buyingguide"],
                ["/earth-day", "TheGreenGuide|Earth-Day"],
                ["/fastfact", "TheGreenGuide|fastfact"],
                ["/food/buying", "TheGreenGuide|food|buying"],
                ["/food/cooking", "TheGreenGuide|food|cooking"],
                ["/food/safety-storage", "TheGreenGuide|food|safety-storage"],
                ["/food", "TheGreenGuide|food"],
                ["/glossary", "TheGreenGuide|glossary"],
                ["/golocal", "TheGreenGuide|golocal"],
                ["/greeneffect", "TheGreenGuide|GreenEffect"],
                ["/health-safety/bisphenol-a-debate-suspect-chemical","TheGreenGuide|health-safety|bisphenol-a-debate-suspect-chemical"],
                ["/health-safety/byo-yoga-mat","TheGreenGuide|health-safety|byo-yoga-mat"],
                ["/health-safety/clearing-air-chemical","TheGreenGuide|health-safety|clearing-air-chemical"],
                ["/health-safety/clearing-air-gases","TheGreenGuide|health-safety|clearing-air-gases"],
                ["/health-safety/clearing-air","TheGreenGuide|health-safety|clearing-air"],
                ["/health-safety/dirty-dozen-decoder","TheGreenGuide|health-safety|dirty-dozen-decoder"],
                ["/health-safety/dont-swallow-sealants","TheGreenGuide|health-safety|dont-swallow-sealants"],
                ["/health-safety/mercury-in-fillings","TheGreenGuide|health-safety|mercury-in-fillings"],
                ["/health-safety/preserving-your-health","TheGreenGuide|health-safety|preserving-your-health"],
                ["/health-safety ", "TheGreenGuide|health-safety "],
                ["/home-garden/cleaning", "TheGreenGuide|home-garden|cleaning"],
                ["/home-garden/decor", "TheGreenGuide|home-garden|decor"],
                ["/home-garden/energy-saving", "TheGreenGuide|home-garden|energy-saving"],
                ["/home-garden/energy_saving", "TheGreenGuide|home-garden|energy_saving"],
                ["/home-garden/garden", "TheGreenGuide|home-garden|garden"],
                ["/home-garden/holidays", "TheGreenGuide|home-garden|holidays"],
                ["/home-garden/home-improvement", "TheGreenGuide|home-garden|home-improvement"],
                ["/home-garden/home_improvement", "TheGreenGuide|home-garden|home_improvement"],
                ["/home-garden/pets", "TheGreenGuide|home-garden|pets"],
                ["/home-garden/recycling", "TheGreenGuide|home-garden| recycling"],
                ["/home-garden/room-by-room", "TheGreenGuide|home-garden|room-by-room"],
                ["/home-garden/room_by_room", "TheGreenGuide|home-garden|room_by_room"],
                ["/home-garden/waste&recycling", "TheGreenGuide|home-garden|waste&recycling"],
                ["/home-garden", "TheGreenGuide|home-garden"],
                ["/infinite-photograph","TheGreenGuide|infinite-photograph"],
                ["/just-ask/food/hormonesinmilk","TheGreenGuide|just-ask|food|hormonesinmilk"],
                ["/just-ask/food/nonstickpans","TheGreenGuide|just-ask|food|nonstickpans"],
                ["/just-ask/food","TheGreenGuide|just-ask|food"],
                ["/just-ask/health-safety/greencarpetcleaner","TheGreenGuide|just-ask|health-safety|greencarpetcleaner"],
                ["/just-ask/health-safety/switchgreencleaners","TheGreenGuide|just-ask|health-safety|switchgreencleaners"],
                ["/just-ask/health-safety","TheGreenGuide|just-ask|health-safety"],
                ["/just-ask/home-garden/disposehhw","TheGreenGuide|just-ask|home-garden|disposehhw"],
                ["/just-ask/home-garden/feelingdrained","TheGreenGuide|just-ask|home-garden|feelingdrained"],
                ["/just-ask/home-garden/greenroof","TheGreenGuide|just-ask|home-garden|greenroof"],
                ["/just-ask/home-garden/healthycarpets","TheGreenGuide|just-ask|home-garden|healthycarpets"],
                ["/just-ask/home-garden/moldkillers","TheGreenGuide|just-ask|home-garden|moldkillers"],
                ["/just-ask/home-garden/particleboard","TheGreenGuide|just-ask|home-garden|particleboard"],
                ["/just-ask/home-garden/rainwaterharvesting","TheGreenGuide|just-ask|home-garden|rainwaterharvesting"],
                ["/just-ask/home-garden","TheGreenGuide|just-ask|home-garden"],
                ["/just-ask/kids/collegebound","TheGreenGuide|just-ask|kids|collegebound"],
                ["/just-ask/kids/stryrofoamschool","TheGreenGuide|just-ask|kids|stryrofoamschool"],
                ["/just-ask/personal-care/allergens-fragrances","TheGreenGuide|just-ask|personal-care|allergens-fragrances"],
                ["/just-ask/personal-care/chappedlips","TheGreenGuide|just-ask|personal-care|chappedlips"],
                ["/just-ask/personal-care","TheGreenGuide|just-ask|personal-care"],
                ["/just-ask","TheGreenGuide|just-ask"],
                ["/justask", "TheGreenGuide|justask"],
                ["/kids/baby-toddler", "TheGreenGuide|kids|baby-toddler"],
                ["/kids/pregnancy", "TheGreenGuide|kids|pregnancy"],
                ["/kids/school-age", "TheGreenGuide|kids|school-age"],
                ["/kids", "TheGreenGuide|kids"],
                ["/personal-care/cosmetic-labeling","TheGreenGuide|personal-care|cosmetic-labeling"],
                ["/personal-care/dirty-dozen","TheGreenGuide|personal-care|dirty-dozen"],
                ["/personal-care", "TheGreenGuide|personal-care"],
                ["/personalcare", "TheGreenGuide|personalcare"],
                ["/reports", "TheGreenGuide|reports"],
                ["/shop-evo", "TheGreenGuide|shop-evo"],
                ["/shop/body", "TheGreenGuide|shop|body"],
                ["/shop/clothing", "TheGreenGuide|shop|clothing"],
                ["/shop/home", "TheGreenGuide|shop|home"],
                ["/shop/money", "TheGreenGuide|shop|money"],
                ["/shop/travel", "TheGreenGuide|shop|travel"],
                ["/shop", "TheGreenGuide|shop"],
                ["/travel-transportation", "TheGreenGuide|travel-transportation"],
                ["/videos", "TheGreenGuide|videos"],
                ["/", "TheGreenGuide|Misc"]
                );

            for (i=0; i<myArray.length; i++){
                if (pageName.indexOf(myArray[i][0]) == 0){
                    s.hier1 = myArray[i][1];
                    //alert('matched '+myArray[i][0]+';cg='+s.hier1);


                    //begin 090303
                    var levels = s.hier1.split("|");
                    //Values with one pipe  should write to sprop6.
                    if (levels.length == 2){
                        s.prop6 = s.hier1;
                    }
                    //Values with two pipes should write to sprop7.
                    else if (levels.length == 3){
                        s.prop7 = s.hier1;
                    }
                    //end 090303
                    break;
                }
            }
        }
    }
// </greenGuideFunctions>

// <animalsFunctions>
function _ngsPageNameFilterAnimals(pageName) {
    var pathname = window.location.pathname;

    var channelBlogsWithPrefix = "/wild/community/blogs/";

    if ((pathname.indexOf(channelBlogsWithPrefix) == 0)){
        var qs = window.location.search;

        if (qs.indexOf('plckController') == -1){
            s.pageName = window.location.pathname;
        } else if (typeof ngc_canonical_link != "undefined" && ngc_canonical_link.indexOf ('/wild/community/') > 0) {
            s.pageName = ngc_canonical_link.substring(ngc_canonical_link.indexOf ('/wild/community/') ); //Strip off hostname from this string
        }
    }

    return pageName;
}

function _ngsPageViewFilterAnimals(pageName, separator) {
    var pathname = window.location.pathname;

    var channelBlogsWithPrefix = "/wild/community/blogs/";

    if ((pathname.indexOf(channelBlogsWithPrefix) == 0)){
        var qs = window.location.search;

        if (qs.indexOf('plckController') == -1){
            s.pageName = window.location.pathname;
        } else if (typeof ngc_canonical_link != "undefined" && ngc_canonical_link.indexOf ('/wild/community/') > 0) {
            s.pageName = ngc_canonical_link.substring(ngc_canonical_link.indexOf ('/wild/community/') ); //Strip off hostname from this string
        }
    }
}
// </animalsFunctions>

// <videoPlayerFunctions>
function _pageNameFilterVideoPlayer(pageName) {

    var videoPlayerPrefixVersion2 = "/video/player";
    var videoPlayerPrefixVersion3 = "/video";
    var videoPlayerPrefix = "";

    var cat1index = pageName.indexOf(videoPlayerPrefixVersion2);
    if (cat1index != -1){
        videoPlayerPrefix = videoPlayerPrefixVersion2;
    } else{
        cat1index = pageName.indexOf(videoPlayerPrefixVersion3);
        if (cat1index != -1){
            videoPlayerPrefix = videoPlayerPrefixVersion3;
        } else{
            return;
        }
    }

    // get to index after the prefix
    cat1index += videoPlayerPrefix.length;

    // videoPlayerPath contains the string after .../video/player
    var videoPlayerPath = pageName.substr(cat1index);
    var categories = videoPlayerPath.split("/");

    var dirs = pageName.split('/');
    var video = dirs[dirs.length-1];

    // trim any .html from the video filename
    var extIndex = video.indexOf(".html");
    if (extIndex != -1){
        video = video.substring(0,extIndex);
    }

    var l1 = "";
    var l2 = "";
    var l3 = "";

    var i=0;
    var nodeIndex = 0; // only use directories other than "" (which would happen if there was // or even the leading /
    while (i<categories.length){
        if (categories[i] == ''){
            i++;
            continue;
        }

        if (nodeIndex == 0){
            l1 = categories[i];
        } else if (nodeIndex == 1){
            l2 = categories[i];
        } else if (nodeIndex == 2){
            l3 = categories[i];
        }

        i++;
        nodeIndex++;
    }// end while

    // only want to set these evars and sprops if a video will be played
    // is this a video url?
    var is_video_url = 0;
    $.ajax({
      url: '/video/api/get/video/by-slug/' + video + '/json/',
      async: false,
      dataType: 'json',
      success:function(data){
        is_video_url = 1;
        }
    });

    if (is_video_url){
        // cat level 1
        s.eVar7 = l1;
        s.prop13 = l1;

        // cat level 2
        if (video != l2){
            s.eVar8 = l2;
            s.prop14 = l2;
        }

        // cat level 3
        if (video != l3){
            s.eVar9 = l3;
            s.prop15 = l3;
        }

        // video
        s.eVar6 = video;
        s.prop12 = video;

        // only set event4 if video was viewed
        _ngsAddToEventsList("event4");
    }

    return pageName;
}

function _ngsPageViewFilterVideoPlayer(pageName, separator) {

        // parse the pageName which is of the format
        // c1=foo&c2=bar&c3=blah&video=doh
        var c1 = "";
        var c2 = "";
        var c3 = "";
        var video = "";

    var pairs = pageName.split("&");

        for (var i=0;i<pairs.length;i++){
            var pos = pairs[i].indexOf('=');
            if (pos >= 0){
                var name = pairs[i].substring(0,pos);
                var value = pairs[i].substring(pos+1);

                //c1 goes in evar7 and sprop13
                if (name == 'c1'){
                    c1 = value;
                }
                //c2 goes in evar8 and sprop14
                else if (name == 'c2'){
                    c2 = value;
                }
                //c3 goes in evar9 and sprop15
                else if (name == 'c3'){
                    c3 = value;
                }
                //video goes in evar6 and sprop12
                else if (name == 'video'){
                    video = value;
                }

            } // end if pos >= 0
        }// end for

        // reinitialize these since only want to set if video is played
        s.eVar7 = "";
        s.prop13 = "";

        s.eVar8 = "";
        s.prop14 = "";

        s.eVar9 = "";
        s.prop15 = "";

        s.eVar6 = "";
        s.prop12 = "";

        if (video != ""){
            s.eVar7 = c1;
            s.prop13 = c1;

            s.eVar8 = c2;
            s.prop14 = c2;

            s.eVar9 = c3;
            s.prop15 = c3;

            s.eVar6 = video;
            s.prop12 = video;
        }

        // only set event4 if video was viewed
        if (video != ""){
            //s.events="event4";
            _ngsAddToEventsList("event4");
        }

        // shorten the page name from the seo long one to be
        // foo.nationalgeographic.com/video/player/|<separator>=<pageName>
        //var hostname = window.location.hostname;
        //s.pageName = "http://" + hostname + "/video/player/|" + separator + "=" + pageName;

        //recontruct the friendly url
        var videoPlayerPrefixVersion2 = "/video/player";
        var videoPlayerPrefixVersion3 = "/video";
        var videoPath = "";
        var addExtension = 1;
        var pathname = window.location.pathname;

        if (pathname.indexOf(videoPlayerPrefixVersion2) != -1){
            videoPath = videoPlayerPrefixVersion2;
            addExtension = 1;
        } else{
            videoPath = videoPlayerPrefixVersion3;
            addExtension = 0;
        }

        if (c1 != ""){
            videoPath = videoPath + "/" + c1;

            if (c2 != ""){
                videoPath = videoPath + "/" + c2;

                if (c3 != ""){
                    videoPath = videoPath + "/" + c3;

                    if (video != ""){
                        // c3 video page
                        videoPath = videoPath + "/" + video;

                        if (addExtension){
                            videoPath = videoPath + ".html";
                        }
                    } else{
                        // c3 category page
                        if (addExtension){
                            videoPath = videoPath + "/index.html";
                        }
                    }
                } else{
                    if (video != ""){
                        // c2 video page
                        videoPath = videoPath + "/" + video;
                       if (addExtension){
                        videoPath = videoPath + ".html";
                       }

                    } else{
                        // c2 category page
                       if (addExtension){
                            videoPath = videoPath + "/index.html";
                        }
                    }
                } // end c3
            }
            else{
                // c1 category page
                if (addExtension){
                     videoPath = videoPath + "/index.html";
                }
            }   // end c2
        } // end c1

        s.pageName = videoPath;
    }

function _ngsCustomEventFilterVideo(eventName,type,separator){

    // e.g. ngsCustomEvent("AdTypePreroll").
    // if event name is AdType<something> (e.g. AdTypePreroll)
    if (eventName.indexOf("AdType") == 0){
        s.prop30 = eventName;
    }
}
// </videoPlayerFunctions>

// <greeneffectFunctions>
function _ngsCustomEventFilterGreenEffect(eventName,type,separator){

    // Upon login > Write "Logged In - Quiz" to evar38 : "hpquizlogin"
    // Upon signup > trigger Omniture event27 : "hpquizsignup"
    // Upon quiz completion > trigger Omniture event28 : "hpquizcompletion"

    // e.g. ngsCustomEvent("hpquizlogin").
    if (eventName == "hpquizlogin"){
        s.evar38 = "Logged In - Quiz";
    }
    else if (eventName == "hpquizsignup"){
        _ngsAddToEventsList("event27");
    }
    else if (eventName == "hpquizcompletion"){
        _ngsAddToEventsList("event28");
    }
}
// </greeneffectFunctions>

// <homepageFunctions>
function _ngsCustomEventFilterHomepage(eventName,type,separator){

    // Upon login > Write "Logged In - Quiz" to evar38 : "hpquizlogin"
    // Upon signup > trigger Omniture event27 : "hpquizsignup"
    // Upon quiz completion > trigger Omniture event28 : "hpquizcompletion"

    // e.g. ngsCustomEvent("hpquizlogin").
    if (eventName == "hpquizlogin"){
        s.evar38 = "Logged In - Quiz";
    }
    else if (eventName == "hpquizsignup"){
        _ngsAddToEventsList("event27");
    }
    else if (eventName == "hpquizcompletion"){
        _ngsAddToEventsList("event28");
    }
}
// </homepageFunctions>

// <channelFunctions>
function _pageNameFilterChannel(pageName) {

    // /videos may appear any where in path to left of video slug
    if (pageName.match("/videos")){

        /* 
        some url possibilities in vii
        http://channel.nationalgeographic.com/channel/border-wars/videos/gas-tank-stash/ 
        http://channel.nationalgeographic.com/videos/life-in-the-gulag/ 
        http://channel.nationalgeographic.com/wild/the-incredible-dr-pol/videos/itsy-bitsy-goat-kid/ 
        http://channel.nationalgeographic.com/wild/videos/dirty-dolphin/ 
        */

        var slugs = pageName.split("/");

        // content-slug is always rightmost in pathname
        var video = "";
        if (slugs[slugs.length-1] !== "videos"){
           video = slugs[slugs.length-1];
        }

        var levels = new Array();
        var i=0;
        while (i<slugs.length-1){
            // only use directories other than "" (which would happen if there was // or even the leading /
            if (slugs[i] === ''){
                i++;
                continue;
            }
            // don't use 'videos' as a video category, but if it's the first slug (nodeIndex = 0), then we'll want to capture that
            // as the default top level category 'channel'
            if ((slugs[i] === 'videos') && (levels.length > 0)){
                i++;
                continue;
            }
            
            // if the top category is missing then default to 'channel'
            if ((levels.length === 0) && (slugs[i] === 'videos')){
                level = "channel";
            }
            else{
                level = slugs[i];
            }
            
            levels.push(level);

            i++;
        }// end while
   
        // only want to set these evars and sprops if a video will be played
        // is this a video url?
      
        if (video !== ""){
            var l1 = levels.shift();
            var l2 = levels.shift();
            var l3 = levels.shift();

            // cat level 1
            if (l1){
                s.eVar7 = l1;
                s.prop13 = l1;
            }
            // cat level 2
            if (l2){
                s.eVar8 = l2;
                s.prop14 = l2;
            }

            // cat level 3
            if (l3){
                s.eVar9 = l3;
                s.prop15 = l3;
            }

            // video
            s.eVar6 = video;
            s.prop12 = video;

            // only set event4 if video was viewed
            _ngsAddToEventsList("event4");
        } 
    } // end if (pageName.match("/videos")){

    return pageName;
}


function _ngsFilterChannelMapping(queryStringFormat) {

// queryStringFormat is of format name=value&name=value
// map these values to omniture variables

        var pathname = window.location.pathname;
        if (typeof ngs_furl != "undefined") {
            pathname = ngs_furl;
            s.pageName = ngs_furl;
        }

        var channelPrefix = "/channel";

        var channelSchedule = "/tv-schedule";
        var channelSeries = "/series";
        var channelEpisode = "/episode";

        var channelScheduleWithPrefix = channelPrefix + "/tv-schedule";
        var channelSeriesWithPrefix = channelPrefix + "/series";
        var channelEpisodeWithPrefix = channelPrefix + "/episode";
        var channelBlogsWithPrefix = channelPrefix + "/community/blogs/";

        // re-initialize
        s.prop23="";
        s.prop22="";
        s.prop21="";

    // depending on the path set different omniture variables
        if ((pathname.indexOf(channelSchedule) == 0)||(pathname.indexOf(channelScheduleWithPrefix)) == 0 ){

            // parse the pageName which is of the format...
            // ngsPageView("showname=<showname>&theme=<theme>")
            // ngsPageView("episodename=<episodename>&theme=<theme>")
            //
            var showname = _getQueryStringFormatParamValue(queryStringFormat,'showname');
            var episodename = _getQueryStringFormatParamValue(queryStringFormat,'episodename');
            var theme = _getQueryStringFormatParamValue(queryStringFormat,'theme');

            if (theme != ""){
                s.prop23 = theme;
            }
            if (showname != ""){
                s.hier1 = s.hier1 + "|" + showname;
            }
            if (episodename != ""){
                s.hier1 = s.hier1 + "|" + episodename;
            }
        } // end if (pathname.indexOf('channelSchedule') == 0){
        //else if ((pathname.indexOf(channelSeries) == 0)||(pathname.indexOf(channelEpisode) == 0)){
        else    if (((pathname.indexOf(channelSeries) == 0)||(pathname.indexOf(channelSeriesWithPrefix)) == 0) ||
                            ((pathname.indexOf(channelEpisode) == 0)||(pathname.indexOf(channelEpisodeWithPrefix)) == 0))
            {

            var tab = _getQueryStringFormatParamValue(queryStringFormat,'tab');
            //unused var asset = _getQueryStringFormatParamValue(queryStringFormat,'asset');
            var theme = _getQueryStringFormatParamValue(queryStringFormat,'theme');
            var item = _getQueryStringFormatParamValue(queryStringFormat,'itemRef');
            s.prop23 = theme;                                                       // e.g. "science_technology"
            s.prop22 = tab;                                                             // e.g. "video"
            var pathname1 = window.location.pathname;

            if (pathname1.indexOf ('/series') == 0 && pathname1.indexOf(pathname) != 0 ) {
                pathname1 = channelPrefix + pathname1;
            }

            var episodename = '';
            var epsName = ''
            if (pathname1.indexOf(pathname) == 0 && pathname1.indexOf ('/series') >= 0 ) {
                if (pathname1.length > (pathname.length + 1)) {
                    episodename = pathname1.substring(pathname.length + 1);

                    if ((episodename.indexOf ('/') > 0) && (episodename.indexOf ('all') != 0) ) {
                        episodename = episodename.substring(0, episodename.indexOf ('/'));
                        if (episodename != '') {
/*
                            if ((s.pageName.indexOf ('|') > 0)) {
                                s.pageName = s.pageName.substring(0, s.pageName.indexOf ('|')) + '|' + episodename +  s.pageName.substring(s.pageName.indexOf ('|')) ;

                            }
*/
                           epsName = episodename;
                        }

                    }

                }

            }

            if (tab == '') {
                tab = 'tab-Overview';
            }

            if (epsName != ""){
                s.hier1 = s.hier1 + "|" + epsName;
                s.pageName = s.pageName + '|tab=' + epsName;
            }

            if (tab != ""){
                s.hier1 = s.hier1 + "|" + tab;
                s.pageName = s.pageName + '|tab=' + tab;
            }

            if (item != ""){
                s.hier1 = s.hier1 + "|" + item;
                s.pageName = s.pageName + '|item=' + item;
            }


        } // end if ((pathname.indexOf(channelSeries) == 0)||(pathname.indexOf(channelEpisode) == 0)){

        else if ((pathname.indexOf(channelBlogsWithPrefix) == 0)){
            queryStringFormat = queryStringFormat.substring(1); // skip over the ?
            var plckController = _getQueryStringFormatParamValue(queryStringFormat,'plckController');

            if (plckController == ''){
                s.pageName = window.location.pathname;
            } else if (typeof ngc_canonical_link != "undefined" && ngc_canonical_link.indexOf ('/channel/community/') > 0) {
                s.pageName = ngc_canonical_link.substring(ngc_canonical_link.indexOf ('/channel/community/') );
            }
        }

        else if ( _getQueryStringFormatParamValue(queryStringFormat,'itemRef') != '') {
            s.pageName = s.pageName + '|' + queryStringFormat;
        }

/*
if ((s.pageName.indexOf('tab-Videos') > 0)||(s.pageName.indexOf('tab-Photos')) > 0 ){
    var val = navigator.userAgent.toLowerCase();
    if(val.indexOf('applewebkit/528') > -1)
    {
        ngsTrackingEnabled = 0;
    }
}
*/
        // for all pages..
        // parse the queryStringFormat which may contain flyout menu selection info...
        // ngsPageView("ngcflyout=<ngcflyout>"); // e.g. "ngcflyout=shows"
        //
        var flyout = _getQueryStringFormatParamValue(queryStringFormat,'flyout');
        if (flyout != ""){
            s.prop21 = flyout;
        }

}

function _ngsPageViewFilterChannel(pageName, separator) {
    // pageName is in qs format for ngc application
    _ngsFilterChannelMapping(pageName)
}

function _ngsCustomEventFilterChannel(eventName,type,separator){
    var pathname = window.location.pathname;
    if (typeof ngs_furl != "undefined") {
        pathname = ngs_furl;
    }

    // pass the ngc-formatted event name to ngsCustomEvent. e.g. ngsCustomEvent("dl=main_DL1").
    // Will add an ngc event filter in ngsCustomEvent which will use the passed value to set sprop24.
    var dl = _getQueryStringFormatParamValue(eventName,'dl');
    if (dl != ""){
        s.prop24 = dl;
    }

    var dropdown = _getQueryStringFormatParamValue(eventName,'dropdown');
    if (dropdown != ""){
        s.prop21 = dropdown;
    }
}
// </channelFunctions>

// <globalFunctions>
function getSiteSections (contentGroup) {

    var arr = contentGroup.split("|");

    for (var i=0; i<arr.length; i++) {
        var t = arr[i];

        if (i == 0){
            s.prop5 = t;
        }
        else if (i==1){
            s.prop6 = s.prop5 + "|" + t;
        }
        else if (i==2){
            s.prop7 = s.prop6 + "|" + t;
        }
        else if (i==3){
            s.prop8 = s.prop7 + "|" + t;
        }
        else if (i==4){
            s.prop9 = s.prop8 + "|" + t;
        }
    }
}

function _getQueryStringFormatParamValue(queryStringFormat, paramName) {
// pageName may contain query string name/value pairs name1=value1&name2=value2
// use this function to get the value for a specific name

    var paramValue = "";
    var pairs = queryStringFormat.split("&");

    for (var i=0;i<pairs.length;i++){
        var pos = pairs[i].indexOf('=');
        if (pos >= 0){
            var name = pairs[i].substring(0,pos);
            var value = pairs[i].substring(pos+1);

            if (name == paramName){
                paramValue = value;
                break;
            }
        }
    }

    return paramValue;
}

function ngsAdvertisingRefresh(){
    // if you want ads to be refreshable OOTB then name the iframe with prefix "ngsAdvertisingRefreshFrame"
    // e.g. <iframe name="ngsAdvertisingRefreshFrame1" ....
    // or, via WPF_admanager, either: 
    //      - call defineAd({refreshable: true})
    //     
    function reloadIframes(){
        var frameIndex = 0;
        var pageFrames = document.getElementsByTagName('iframe');
        try {
            for(var i = 0; i < pageFrames.length; i++){
                if(pageFrames[i].name.indexOf("ngsAdvertisingRefreshFrame") >= 0){
                    pageFrames[i].src = pageFrames[i].src;
                }
            }
        }
        catch(e){}
    }
    if( Object.prototype.hasOwnProperty.call( window, 'WPF_admanager'))
        WPF_admanager.refreshAds()
    else reloadIframes()
}

function _pageNameFilter(pageName) {

    s.dynamicAccountSelection=false;
    s.dynamicAccountList="";
    s.dynamicAccountMatch="";

    // depending on the path set different omniture variables
    if (window.location.hostname.match("channel.") || 
        pageName.match('^/channel') || 
        pageName.match('^/wild') || 
        pageName.match('^/videos')){

        pageName = _pageNameFilterChannel(pageName);


    } else if (window.location.hostname.indexOf("thegreenguide.com")!= -1){
        _pageNameFilterGreenGuide(pageName);
    } else if ((window.location.hostname.indexOf("maps.")== 0)||(pageName.indexOf('/map') == 0)){
        _pageNameFilterMaps(pageName);
    } else if (window.location.hostname.indexOf("ngm.")== 0){
        _pageNameFilterNGM(pageName);
    } else if (window.location.hostname.indexOf("books.")== 0){
        _pageNameFilterBooks(pageName);
    } else if (window.location.hostname.indexOf("traveler.")== 0){
        _pageNameFilterTraveler(pageName);
    } else if (pageName.indexOf('/wild/community/') == 0){
        _ngsPageNameFilterAnimals(pageName);
    } else if (pageName.indexOf('/video') == 0){
        pageName = _pageNameFilterVideoPlayer(pageName);

        if (pageName.indexOf('/video/player') == 0){
            // version 3 video player (urls starting with /video and no /player) all report to natgeovideo and don't need this
            s.dynamicAccountSelection=true;
            s.dynamicAccountList="natgeongccom,natgeoglobal=/video/player/national-geographic-channel;natgeovideo,natgeoglobal=/video/player";
            s.dynamicAccountMatch=pageName;
        }
    }

    return pageName;
}

function _ngsPageViewFilter(pageName, separator) {
// optionally do something with the pageView data depending on the site

    var pathname = window.location.pathname;

    if (typeof ngs_furl != "undefined") {
        pathname = ngs_furl;
    }

    s.dynamicAccountSelection=false;
    s.dynamicAccountList="";
    s.dynamicAccountMatch="";

    // depending on the path set different omniture variables
    if (pathname.indexOf('/video/player') == 0){
           _ngsPageViewFilterVideoPlayer(pageName, separator);

           // version 3 video player (urls starting with /video and no /player) all report to natgeovideo and don't need this
           s.dynamicAccountSelection=true;
           s.dynamicAccountList="natgeongccom,natgeoglobal=/video/player/national-geographic-channel;natgeovideo,natgeoglobal=/video/player";
           s.dynamicAccountMatch=s.pageName;
    } else if (pathname.indexOf('/channel') == 0){
        _ngsPageViewFilterChannel(pageName, separator);
    } else if (pathname.indexOf('/wild/community/') == 0){
        _ngsPageViewFilterAnimals(pageName, separator);
    }
}

function _ngsAddToEventsList(eventName){
    if (typeof s.events != "undefined") {
        //if it's there don't add it again
        if (s.events.indexOf(eventName) == -1){
            s.events = s.events + "," + eventName;
        }
    }
}

function _ngsInitializeEventsList(){
    s.events = "event5";
}
function _ngsInitializeEventVars(){
    s.eVar7 = "";
    s.prop13 = "";

    s.eVar8 = "";
    s.prop14 = "";

    s.eVar9 = "";
    s.prop15 = "";

    s.eVar6 = "";
    s.prop12 = "";

    s.prop30="";
    s.prop24="";
    s.prop21="";

    s.eVar38 = "";

}

// keep this function defined for the flash files that call it.
function ngsPageView(pageName,separator){

    // use this function in those cases where the click should count as a page view

    // pageName - the identifier for the simulated pageview. No spaces. FormatThePageNameLikeThis.

    // separator - optional - used in the reported pagename and content hierarchy.
    // Defaults to "Flash," but this function can get used by other media, so it's changeable here.

    // if neither the pageName nor the separator are defined, the parent HTML page is simply given another pageview count, without any modifiers at all.

    // if hostname is video.nationalgeographic.com, starting with video site version 3, page view events are disabled
    // since 1 html == 1 video view
    // moreover, we don't want to refresh the ads because the player calls this when it starts a video which would result in double impressions
    if (window.location.hostname.indexOf ("video.") == 0){
        return
    }
    
    // NOTE: omniture tracking of pageview disabled per GMKANBAN-6426
    // Only track "gallery" pages
    // added tracking for Great Energy Challenge - GMKANBAN-6556
    if(pageName === "gallery" || separator === "GEC") {
        s.hier1 = s_originalHier1;
        s.pageName = s_originalPageName;
        // reset any event-related variables
        _ngsInitializeEventVars();
        _ngsInitializeEventsList();
        _ngsPageViewFilter(pageName, separator);
        s.t(); // h-code
    }

    // if there are refreshable ads on a page then refresh them
    ngsAdvertisingRefresh();
}
function _ngsCustomEventFilter(eventName,type,separator){
    var pathname = window.location.pathname;

    if (typeof ngs_furl != "undefined") {
        pathname = ngs_furl;
    }

    // depending on the path set different omniture variables
    if ( document.location.host.match('channel.') ) {

        if ( pathname.match('/videos/'))
            _ngsCustomEventFilterVideo(eventName,type,separator);

        _ngsCustomEventFilterChannel(eventName,type,separator);
    }
    else if (pathname.indexOf('/video') == 0){
        _ngsCustomEventFilterVideo(eventName,type,separator);
    }
    else if ((window.location.hostname.indexOf("www.nationalgeographic.") == 0) && ((pathname == '/index.html')||(pathname == '/'))){
        _ngsCustomEventFilterHomepage(eventName,type,separator);
    }
    else if (window.location.hostname.indexOf("greeneffect.nationalgeographic.") == 0){
        _ngsCustomEventFilterGreenEffect(eventName,type,separator);
    }
}

function ngsCustomEvent(eventName,type,separator){
    // use this function in those cases where the click does not count as a page view

    // eventName - used to create a custom link name by combining it
    // with the pathname
    // e.g. eventName = pathname + "?" + separator (defaults to "Flash") + eventName

    // type (optional) valid values: "custom_event", "file_download", "exit_link"; defaults to custom_event

    // separator (optional) - used in the link event name. Defaults to "Flash,"
    // but this function can get used by other media, so it's changeable here.

    _ngsInitializeEventVars();
    _ngsInitializeEventsList();


    if (ngsTrackingEnabled) {

        // apply filter before massaging eventName with pathname info (pathname is useful in event report to give context)
            _ngsCustomEventFilter(eventName,type,separator);

        if (typeof separator == "undefined") var separator = "Flash";
        var eventName = eventName || "UnnamedEvent";

        //eventName = s_originalPageName + "?" + separator + "=" + eventName;
        var pathname = window.location.pathname;
        eventName = pathname + "?" + separator + "=" + eventName;

        //    map linkType to omniture list: o: Custom Links
        //                                   d: File Downloads report
        //                                   e: exit links report
        //

        if (typeof type != "undefined"){

            if (type == "custom_event" || "o"){
                type = 'o';
            }
            else if (type == "file_download" || "d"){
                type = 'd';
            }
            else if (type == "exit_link" || "e"){
                type = 'e';
            }
            else {
                type = 'o';
            }

        }   else {
                var type = 'o';
            }

        // alert ("eventName="+eventName+"\ntype="+type);


        //sendLinkEvent("",eventName,type);
        s=s_gi(s_account);// h-code

        // 091039 - channel depending on legacy behavior, which seems
        // to change if s.tl is called s.tl(this,type,eventName); e.g. sprops aren't passed
        if ((window.location.hostname.indexOf("channel.") == 0) || (window.location.pathname.indexOf('/channel') == 0)){
            s.tl();
        }
        else{
            s.tl(this,type,eventName);
        }
    }
}

function ngsProcessPathname (t) {
    // used to make pagenames in the Omniture style (no index.htm/l, no trailing slash)

    if (typeof t == "undefined" || !t ) return;

    var tin = t.lastIndexOf("/index.htm");

    if (tin > -1 && tin + 12 > t.length) { t = t.substring(0,tin); }
    // if the location of index.htm(l) is at the end of the pathname (fewer than 12 characters from the end), strip it out. Otherwise the pathname might have a query string, like index.html?foo=bar, so it should stay as is.

    var tl = t.length;

    t = (t.charAt(tl-1) == "/") ? t.substring(0,tl-1) : t; // strip trailing slash

    //Strip ?fs/source/email=XXXXX from urls
    var qsIndex = t.indexOf("?");
    var newqs = "";
    if (qsIndex != -1){
        var qs = t.substr(qsIndex+1);

        var pairs = qs.split("&");

      //alert('pairs: ' + pairs);
        for (var i=0;i<pairs.length;i++){
            var pos = pairs[i].indexOf('=');
            if (pos >= 0){
                var name = pairs[i].substring(0,pos);
                var value = pairs[i].substring(pos+1);

                if ((name != "fs") && (name != "source") && (name != "email")){
                    newqs = newqs + pairs[i] + "&";
                }
            }
            else{
                newqs = newqs + pairs[i] + "&";
            }
        }
        t = t.substring(0,qsIndex+1);
        t = t + newqs;
    }

    return t;
}

function checkStartOf (string,params) {
    // params should be a comma-separated list. This functions checks if any of the params
    // are at the start of the string. If so, returns true; otherwise false.

    var arr = params.split(",");
    var stringCheck = false;

    for (var i=0; i<arr.length; i++) {
        var t = arr[i];
        if (string.indexOf(t) == 0) {
            stringCheck = true;
            break;
        }
    }

    return stringCheck;
}

// om_parseQuery and om_parseGoogle are used to parse the Google search terms from a URL.
function om_parseQuery(str,q) { // gets value of q from str

    var sPos = str.indexOf(q + "=")

    if (sPos > -1) {
        sPos = sPos + q.length + 1;
        var ePos = str.indexOf("&",sPos);
        if (ePos == -1) { ePos = str.length; }
            var result = str.substring(sPos,ePos);
            return unescape(result.replace(/\+/g," ")); // strip out plus signs
    }
    else {
        return "";
    }
}

function om_parseGoogle (queryStr) {

    var q = om_parseQuery (queryStr, "q") ;
    var p = om_parseQuery (queryStr, "start");
    var s = om_parseQuery (queryStr, "site");

    // change name of default_collection to "global_search"
    if (typeof s != "undefined"){
        if (s =="default_collection"){
            s = "global_search";
        }
    }

    p = (p != "") ? ((parseInt(p)+10)/10) : 1;

    return (q != "") ? " | " + q.toLowerCase() + " | " + s + " | page " + p : "";
}

function _addSelectPageNameParam(pageName, paramName) {

    // qs params we want to include get tacked on here
    var qsSeparator = "";

    var qs = window.location.search;
    qs = qs.substring(1); // skip over the ?

    if (pageName.indexOf('?') != -1){
        qsSeparator = '&';
    }
    else{
        qsSeparator = '?';
    }
    if (pageName.indexOf(paramName+'=') == -1){
        var paramValue = _getQueryStringFormatParamValue(qs,paramName);
        if (paramValue != ""){
            pageName = pageName + qsSeparator + paramName + "=" + paramValue;
        }
    }
    return pageName;
}

function _addSelectPageNameParams(pageName) {

    var qs = window.location.search;
    if (qs != ''){
        var paramName = "";

        // keep the following params in the pageName
        paramName = 'WESPAGE';
        pageName = _addSelectPageNameParam(pageName, paramName);

        paramName = 'mag';
        pageName = _addSelectPageNameParam(pageName, paramName);

        paramName = 'cds_mag_code';
        pageName = _addSelectPageNameParam(pageName, paramName);

        paramName = 'file_id';
        pageName = _addSelectPageNameParam(pageName, paramName);
    }

    return pageName;
}

// </globalFunctions>
// </functions>

// <globalInlineCode>
// sprops 5-9 are for the level 1-5 site sections of a content group
s.prop5="";
s.prop6="";
s.prop7="";
s.prop8="";
s.prop9="";

// begin ngm integration
s.prop27    = "";
s.prop28    = "";
s.prop29    = "";
//end ngm integration

s.events="";

_ngsInitializeEventsList();

if (typeof ngs_event != "undefined") {
    _ngsAddToEventsList(ngs_event);
    //s.events = s.events + "," + ngs_event;
}

var hostname = window.location.hostname;
var pathname = window.location.pathname;

//if it's a wpf site and has ngs_furl defined, then reset the value as the pathname
//this restores the /<site>/ prefix that isn't present in the ngs_furl value
// disabled override on 9/29/11 for switchover of channel site to wpf from vignette
// since it's now obsolete, ngs_furl use from be removed from this file
//if (!checkStartOf(hostname,"channel")&&!checkStartOf(hostname,"remembering911")) {
    if (typeof ngs_furl != "undefined") {
        ngs_furl = pathname;
    }
//}

// furl value should override the pathname since it guarantees unique uri by including /site prefix
if (typeof ngs_furl != "undefined") {
    pathname = ngs_furl;
}


if (typeof ngsTrackingEnabled == "undefined") {

    if (checkStartOf(hostname,"teststats")) {
        var ngsTrackingEnabled = 1;
    }
    else if (checkStartOf(hostname,"test.,testnetscape,testaolxxx,atoll,pebble,stone,rock,boulder,rapid,eddy")) { // comma-delimited list of testing servers

        var ngsTrackingEnabled = 0;
        //alert('tracking disabled');
    }
    else {
        var ngsTrackingEnabled = 1;
    }
}

// if s_pageName doesn't exist, create it based on the rules we have defined.
// rules include: hostname is rewritten to www.nationalgeographic.com if user
// is browsing a mirror (e.g., www.ngeo.com); trailing slash and index.htm/l
// are removed; a query string is stripped unless it's in a site where we want
// to track query strings.

// 090330 if (typeof s.pageName == "undefined" || s.pageName == "") {

    if (checkStartOf(hostname,"www.nationalgeographic") == false) {

        // don't do the processor-intensive search unless we need to

        if (checkStartOf(hostname, "aol,nationalgeographic,netscape,ngeo,www.ngeo,www.nationalgeographic.org,nationalgeographic.org,ww.nationalgeographic,wwww.nationalgeographic,www.ngsociety,207.24.89.170")) { // comma-delimited list of mirrors
            // if we're on a mirror server, use the "www" pathname instead.
            hostname = "www.nationalgeographic.com";
        }
    }

//  process the pathname that will eventually build the page name.
//  disabled google code since too many unique page names
//  instead going to store search term in sprop/evar
//  if (hostname.indexOf("google")>-1) {
//      // if this is a google search, run through the special google function to define the pathname.
//      pathname = om_parseGoogle(window.location.search);
//  } else {

        if (checkStartOf(pathname,"/ngm,/pod,/cgi-bin/pod,/xpeditions,/forcesofnature,/genographic")) { // comma-delimited list of sites that have valuable information in the query string
            pathname += window.location.search;
        }
        else if (hostname.indexOf("blogs.")>-1) {
            pathname += window.location.search;
        }
        else if (hostname.indexOf("everydayexplorers.")>-1) {
            pathname += window.location.search;
        }
        else if (((typeof s_account != "undefined") &&
                        (s_account == "natgeojapan")) && (pathname.indexOf("/places")== 0)) {
            pathname += window.location.search;
        }

        // process the pathname to strip trailing characters
        pathname = ngsProcessPathname(pathname);
//  }

    // hierarchy -
    if (typeof s_hier1 != "undefined") {
        s.hier1 = s_hier1;
    }
    if (typeof ngs_contentgroup != "undefined") {
        s.hier1 = ngs_contentgroup;
    }
    else{
        // for variables we use in the omn custom code, make sure they have
        // some value so that are defined before they are used.
        // otherwise, we get a js error
        if (typeof s.hier1 == "undefined") {
            s.hier1="";
        }
    }

    // right now filter isn't changing value of pagename, just extracting data and setting evars/sprops
    // should consolidate above process pathname code into filter(s)
    _pageNameFilter(pathname);

    //put the individual levels of the content group into separate sprops (5-9)
    getSiteSections(s.hier1);

    if (typeof ngs_channel != "undefined") {
        s.channel = ngs_channel;
    }
    else{
        // set this to same value as s.hier1
        // so can see the urls that fall under a particular group
        s.channel=s.hier1;
    }

    // build final s.pageName

    // don't include domain for video (want to do for all subdomains?)
    if (hostname.indexOf("video") == 0){
        s.pageName = pathname;
    }
    else if (pathname.indexOf("/genographic") == 0){
        s.pageName = pathname;
    }
    else if (hostname.indexOf("kids.") == 0){
        s.pageName = "Kids:" + pathname;
    }
    else if ((hostname.indexOf("channel.") == 0) &&
             ((pathname.indexOf("/channel/videos") == 0)||(pathname.indexOf("/channel/content") == 0))){
        s.pageName = "NGC:" + pathname;
    }
    else if (hostname.indexOf("www.u23dmovie.") == 0){
        s.pageName = "U23D:" + pathname;
    }
    else if (hostname.indexOf("ngm.") == 0){
        s.pageName = "NGM:" + pathname;
    }
    else if (hostname.indexOf("traveler.") == 0){
        s.pageName = "Traveler:" + pathname;
    }
    else if (hostname.indexOf("adventure.") == 0){
        s.pageName = "Adventure:" + pathname;
    }
//  // don't include domain for specific report suites
    else if (   (typeof s_account != "undefined") &&
                        ((s_account.indexOf("natgeoadventuremagcom")!= -1)||
                         (s_account.indexOf("natgeotravelermagcom")!= -1)||
                         (s_account.indexOf("natgeoworldmusic")!= -1)||
                         (s_account.indexOf("natgeonews")!= -1)||
                         (s_account.indexOf("natgeopeopleplaces")!= -1)||
                         (s_account.indexOf("natgeongmcom")!= -1)||
                         (s_account.indexOf("natgeomapscom")!= -1)||
                         (s_account.indexOf("natgeonavcom")!= -1)||
                         (s_account.indexOf("natgeomissionpubcom")!= -1)||
                         (s_account.indexOf("natgeomissiondevcom")!= -1))){

            s.pageName = pathname;
    }
    //remove hostname from www.nationalgeographic pages EXCEPT for the homepages
    else if ((hostname.indexOf("www.nationalgeographic") == 0)&&(s_account != "natgeohomepage")){
        s.pageName = pathname;
    }
    else if (typeof ngs_furl != "undefined"){
        if ((typeof s.pageName == "undefined") ||(s.pageName == "")) {
            s.pageName = ngs_furl;
        }
    }
    else{
        s.pageName = window.location.protocol + "//" + hostname + pathname;
    }

    s.pageName = _addSelectPageNameParams(s.pageName);

    // add stub if it exists
    if (typeof s_pageNameStub != "undefined") { s.pageName = s.pageName + "|" + s_pageNameStub; }

//} 090330

// Set global variables for flash tracking.
var s_originalPageName = s.pageName;
var s_originalHier1 = s.hier1;

s.server = window.location.hostname;
s.prop3 = navigator.userAgent;  // track browser/platform versions
s.prop11 = s.pageName;              // s.prop11 is used for Top URLs

// props 5-7 copy to evars 35-37 - 080321
s.eVar35 = s.prop5;
s.eVar36 = s.prop6;
s.eVar37 = s.prop7;

// For Flash version tracking
s.maxFlashVersion = 8;

// survey code 20100322 begin
// 3426 is for 2010 Demographic
var s_sv_debug = false;

if(typeof s.Survey.launch == "function"){
    s.Survey.launch("3426", null, null, null, null);
}
// survey code 20100322 end
// </globalInlineCode>

// <omniture>

/* Plugin Config */

s.usePlugins=true
function s_doPlugins() {

//  /* Add calls to plugins here */
    s.campaign=s.getQueryParam('source');   // External Campaigns.

    s.eVar1=s.getQueryParam('intcmp');      // Internal campaigns
    s.eVar4=s.getQueryParam('EMAIL')
    s.eVar5=s.getQueryParam('Q')
    s.eVar11=s.getQueryParam('cds_page_id')
    s.eVar12=s.getQueryParam('cds_mag_code')

    s.eVar13=s.getQueryParam('id')
    s.eVar14=s.getQueryParam('lsid')
    s.eVar15=s.getQueryParam('cds_misc_5')
    s.eVar18=s.getQueryParam('NAV')
    s.eVar19=s.getQueryParam('esvcid')

    s.eVar20=s.getQueryParam('feed')
    s.eVar21=s.getQueryParam('source')
    s.eVar22=s.getQueryParam('source')
    s.eVar23=s.getQueryParam('ngc')
    s.eVar26=s.getQueryParam('REFERRER')
    s.eVar27=s.getQueryParam('MSRSMAG')

    s.eVar39=s.getQueryParam('PID')
    s.eVar40=s.getQueryParam('EID')

    s.prop2=s.getQueryParam('Q')

    s.prop1 = s.getNewRepeat(); // Return whether user is new or repeat

//  s.prop4 = s.detectFlash();      // Flash detection
    /* Plugin: detectFlash v0.5-H */
    s.prop1=s.getFlash('s_fv');

    /* Plugin: getPreviousValue  v1.0*/
    //s.prop5=s.getPreviousValue(s.pageName,'gpv_p5','');

    /* Plugin Example: getDaysSinceLastVisit v1.1 */
    //s.prop1=s.getDaysSinceLastVisit('s_lv');

    /* Plugin Example: timeparting EST */
    //s.prop31=s.getTimeParting('h','-5','2009'); // Set hour
    //s.prop32=s.getTimeParting('d','-5','2009'); // Set day
    //s.prop33=s.getTimeParting('w','-5','2009'); // Set Weekend / Weekday

    /* Plugin Example: getDaysSinceLastVisit v1.1 */
    s.prop34=s.getDaysSinceLastVisit('s_lv');

    /* Plugin: getPreviousValue 1.0*/
    s.prop35=s.getPreviousValue(s.pageName,'gpv_p35',''); // Previous Page
    s.prop36=s.getPreviousValue(s.prop5,'gpv_p36',''); // Previous Section
    s.prop37=s.getPreviousValue(s.prop6,'gpv_p37',''); // Previous Subsection

    //s.prop38= s.prop35 + ">" + s.pageName; // Page path
    if ((s.prop35 == 'http://www.nationalgeographic.com') ||
            (s.prop35 == 'http://www.nationalgeographic.co.uk')||
            (s.prop35 == 'http://www.nationalgeographic.co.in')||
            (s.prop35 == 'http://www.nationalgeographic.co.au')||
            (s.prop35 == 'http://ngm.nationalgeographic.com/ngm')||
            (s.prop35 == 'http://ngm.nationalgeographic.com')){
        s.prop38 = s.prop35 + ">" + s.pageName; // Page path
    }

    s.prop39= s.prop36 + ">" + s.prop5; // Section path
    s.prop40= s.prop37 + ">" + s.prop6; // Subsection path

    s.eVar2=s.pageName;
    s.eVar3=s.channel;

    s.prop10=document.title; // populate prop10 with title tag value
    s.prop20 = s.eVar5; // 080808
}
s.doPlugins=s_doPlugins;
/************************** PLUGINS SECTION *************************/
/* You may insert any plugins you wish to use here.                 */

/*
 * Plugin: getQueryParam 2.3
 */
s.getQueryParam=new Function("p","d","u",""
+"var s=this,v='',i,t;d=d?d:'';u=u?u:(s.pageURL?s.pageURL:s.wd.locati"
+"on);if(u=='f')u=s.gtfs().location;while(p){i=p.indexOf(',');i=i<0?p"
+".length:i;t=s.p_gpv(p.substring(0,i),u+'');if(t){t=t.indexOf('#')>-"
+"1?t.substring(0,t.indexOf('#')):t;}if(t)v+=v?d+t:t;p=p.substring(i="
+"=p.length?i:i+1)}return v");
s.p_gpv=new Function("k","u",""
+"var s=this,v='',i=u.indexOf('?'),q;if(k&&i>-1){q=u.substring(i+1);v"
+"=s.pt(q,'&','p_gvf',k)}return v");
s.p_gvf=new Function("t","k",""
+"if(t){var s=this,i=t.indexOf('='),p=i<0?t:t.substring(0,i),v=i<0?'T"
+"rue':t.substring(i+1);if(p.toLowerCase()==k.toLowerCase())return s."
+"epa(v)}return ''");

/*
 * Plugin: getNewRepeat 1.0 - Return whether user is new or repeat
 */
s.getNewRepeat=new Function(""
+"var s=this,e=new Date(),cval,ct=e.getTime(),y=e.getYear();e.setTime"
+"(ct+30*24*60*60*1000);cval=s.c_r('s_nr');if(cval.length==0){s.c_w("
+"'s_nr',ct,e);return 'New';}if(cval.length!=0&&ct-cval<30*60*1000){s"
+".c_w('s_nr',ct,e);return 'New';}if(cval<1123916400001){e.setTime(cv"
+"al+30*24*60*60*1000);s.c_w('s_nr',ct,e);return 'Repeat';}else retur"
+"n 'Repeat';");

/*
 * Plugin: Flash Detection 0.5 - Detect Flash version number
 */
s.detectFlash=new Function("cn","mfv","vr",""
+"var s=this,fv=-1,dwi=0,r,w,mt=s.n.mimeTypes,k=s.c_w('s_cc','true',0"
+")?'Y':'N';if(k=='Y'){if(s.pl&&s.pl.length){if(s.pl['Shockwave Flash"
+" 2.0'])fv=2;x=s.pl['Shockwave Flash'];if(x){fv=0;z=x.description;if"
+"(z)fv=z.substring(16,z.indexOf('.'));}}else if(mt&&mt.length){x=mt["
+"'application/x-shockwave-flash'];if(x&&x.enabledPlugin)fv=0;}if(fv<"
+"=0)dwi=1;w=s.u.indexOf('Win')!=-1?1:0;if(dwi&&s.isie&&w&&execScript"
+"){result=false;for(var i=mfv;i>=3&&result!=true;i--){execScript('on"
+" error resume next: result = IsObject(CreateObject(\"ShockwaveFlash"
+".ShockwaveFlash.'+i+'\"))','VBScript');fv=i;}}r=fv==-1?'flash not d"
+"etected':fv==0?'flash enabled (no version)':'flash '+fv;s.c_w(cn,r,"
+"0);return 'true';}else return '';");
s.getFlash=new Function("cn",""
+"var s=this;if(cn&&s.c_r(cn))return s.c_r(cn);");
s.returnFlash=new Function("cn","vr","to",""
+"setTimeout(\"var cn,vr,to,s_dfv=s_gi(s_account);s_dfv.linkTrackVars"
+"=vr,s_dfv.vr=s.getFlash();s_dfv.tl(this,'o','Flash Version Detectio"
+"n')\",to);");

/*
 * Plugin: getPreviousValue_v1.0 - return previous value of designated
 *   variable (requires split utility)
 */
s.getPreviousValue=new Function("v","c","el",""
+"var s=this,t=new Date,i,j,r='';t.setTime(t.getTime()+1800000);if(el"
+"){if(s.events){i=s.split(el,',');j=s.split(s.events,',');for(x in i"
+"){for(y in j){if(i[x]==j[y]){if(s.c_r(c)) r=s.c_r(c);v?s.c_w(c,v,t)"
+":s.c_w(c,'no value',t);return r}}}}}else{if(s.c_r(c)) r=s.c_r(c);v?"
+"s.c_w(c,v,t):s.c_w(c,'no value',t);return r}");
/*
 * Utility Function: split v1.5 - split a string (JS 1.0 compatible)
 */
s.split=new Function("l","d",""
+"var i,x=0,a=new Array;while(l){i=l.indexOf(d);i=i>-1?i:l.length;a[x"
+"++]=l.substring(0,i);l=l.substring(i+d.length);}return a");

/*
 * Plugin: Days since last Visit 1.1.H - capture time from last visit
 */
s.getDaysSinceLastVisit=new Function("c",""
+"var s=this,e=new Date(),es=new Date(),cval,cval_s,cval_ss,ct=e.getT"
+"ime(),day=24*60*60*1000,f1,f2,f3,f4,f5;e.setTime(ct+3*365*day);es.s"
+"etTime(ct+30*60*1000);f0='Cookies Not Supported';f1='First Visit';f"
+"2='More than 30 days';f3='More than 7 days';f4='Less than 7 days';f"
+"5='Less than 1 day';cval=s.c_r(c);if(cval.length==0){s.c_w(c,ct,e);"
+"s.c_w(c+'_s',f1,es);}else{var d=ct-cval;if(d>30*60*1000){if(d>30*da"
+"y){s.c_w(c,ct,e);s.c_w(c+'_s',f2,es);}else if(d<30*day+1 && d>7*day"
+"){s.c_w(c,ct,e);s.c_w(c+'_s',f3,es);}else if(d<7*day+1 && d>day){s."
+"c_w(c,ct,e);s.c_w(c+'_s',f4,es);}else if(d<day+1){s.c_w(c,ct,e);s.c"
+"_w(c+'_s',f5,es);}}else{s.c_w(c,ct,e);cval_ss=s.c_r(c+'_s');s.c_w(c"
+"+'_s',cval_ss,es);}}cval_s=s.c_r(c+'_s');if(cval_s.length==0) retur"
+"n f0;else if(cval_s!=f1&&cval_s!=f2&&cval_s!=f3&&cval_s!=f4&&cval_s"
+"!=f5) return '';else return cval_s;");


/*
 * Plugin: getTimeParting 1.3 - Set timeparting values based on time zone
 */

//s.getTimeParting=new Function("t","z","y",""
//+"dc=new Date('1/1/2000');f=15;ne=8;if(dc.getDay()!=6||"
//+"dc.getMonth()!=0){return'Data Not Available'}else{;z=parseInt(z);"
//+"if(y=='2009'){f=8;ne=1};gmar=new Date('3/1/'+y);dsts=f-gmar.getDay("
//+");gnov=new Date('11/1/'+y);dste=ne-gnov.getDay();spr=new Date('3/'"
//+"+dsts+'/'+y);fl=new Date('11/'+dste+'/'+y);cd=new Date();"
//+"if(cd>spr&&cd<fl){z=z+1}else{z=z};utc=cd.getTime()+(cd.getTimezoneO"
//+"ffset()*60000);tz=new Date(utc + (3600000*z));thisy=tz.getFullYear("
//+");var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Fr"
//+"iday','Saturday'];if(thisy!=y){return'Data Not Available'}else{;thi"
//+"sh=tz.getHours();thismin=tz.getMinutes();thisd=tz.getDay();var dow="
//+"days[thisd];var ap='AM';var dt='Weekday';var mint='00';if(thismin>3"
//+"0){mint='30'}if(thish>=12){ap='PM';thish=thish-12};if (thish==0){th"
//+"ish=12};if(thisd==6||thisd==0){dt='Weekend'};var timestring=thish+'"
//+":'+mint+ap;var daystring=dow;var endstring=dt;if(t=='h'){return tim"
//+"estring}if(t=='d'){return daystring};if(t=='w'){return en"
//+"dstring}}};"
//);


/************* DO NOT ALTER ANYTHING BELOW THIS LINE ! **************/
var s_code=s.t();if(s_code)document.write(s_code)
/*
//--></script>

<script language="JavaScript" type="text/javascript"><!--
if(navigator.appVersion.indexOf('MSIE')>=0)document.write(unescape('%3C')+'\!-'+'-')
//--></script><noscript><a href="http://www.omniture.com" title="Web Analytics"><img
src="http://natgeoglobal.112.2O7.net/b/ss/natgeoglobal/1/H.17--NS/0"
height="1" width="1" border="0" alt="" /></a></noscript><!--/DO NOT REMOVE/-->
<!-- End SiteCatalyst code version: H.17. -->
*/
// note: needed comment above because of current global src is used
// </omniture>
