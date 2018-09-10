/* mycon-dev-gradle 13.11.15-1079-1079 (2013-11-15 22:49:06 GMT) */
rsinetsegs=['A09801_10001','A09801_10313','A09801_0'];
var rsiExp=new Date((new Date()).getTime()+2419200000);
var rsiDom=location.hostname;
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.[a-zA-Z]{3}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]+\.\w+\.[a-zA-Z]{2}$)/,'$1');
rsiDom=rsiDom.replace(/.*(\.[\w\-]{3,}\.[a-zA-Z]{2}$)/,'$1');
var rsiSegs="";
var rsiPat=/.*_5.*/;
var i=0;
for(x=0;x<rsinetsegs.length&&i<20;++x){if(!rsiPat.test(rsinetsegs[x])){rsiSegs+='|'+rsinetsegs[x];++i;}}
document.cookie="rsi_segs_ttn="+(rsiSegs.length>0?rsiSegs.substr(1):"")+";expires="+rsiExp.toGMTString()+";path=/;domain="+rsiDom;
if(typeof(DM_onSegsAvailable)=="function"){DM_onSegsAvailable(['A09801_10001','A09801_10313','A09801_0'],'a09801');}