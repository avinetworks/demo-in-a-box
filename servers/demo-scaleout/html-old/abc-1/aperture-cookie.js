

/** 
* @filepath: aperture-cookie
* @created: Tue, 26 Nov 13 12:59:19 -0800
* @serveraddr: 10.141.172.146
* @remoteaddr: 10.96.118.249
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/


/** 
* @filepath: /abcdm/aperture.cookie.js
* @created: Tue, 26 Nov 13 12:59:19 -0800
* @serveraddr: 10.141.172.146
* @remoteaddr: 10.96.118.249
* @bu: abccom
* @cdnroot: http://cdn.media.abc.com/m
*/

var cookie,cookies,cookieName,omnObject;function readCookie(name){var c=document.cookie.split("; "),C;cookies={};for(var i=c.length-1;i>=0;i--){C=c[i].split("=");cookies[C[0]]=C[1];}
if(cookies[name]){return JSON.parse(decodeURIComponent(cookies[name]));}else{return null;}}
function typeLookup(type,list){if(list&&typeof(list)==="object"){for(var i=0;i<list.length;i++){if(list[i].type===type){return list[i];}}
return null;}else{return null;}}
function rc4Encrypt(key,pt){s=new Array();for(var i=0;i<256;i++){s[i]=i;};var j=0;var x;for(i=0;i<256;i++){j=(j+s[i]+key.charCodeAt(i%key.length))%256;x=s[i];s[i]=s[j];s[j]=x;}
i=0;j=0;var ct="";for(var y=0;y<pt.length;y++){i=(i+1)%256;j=(j+s[i])%256;x=s[i];s[i]=s[j];s[j]=x;ct+=String.fromCharCode(pt.charCodeAt(y)^s[(s[i]+s[j])%256]);}return ct;}
function hexEncode(data){var b16D="0123456789abcdef";var b16M=new Array();for(var i=0;i<256;i++){b16M[i]=b16D.charAt(i>>4)+b16D.charAt(i&15);}
var result=new Array();for(var i=0;i<data.length;i++){result[i]=b16M[data.charCodeAt(i)];}
return result.join("");}
cookieName="aperture_"+hexEncode(rc4Encrypt("abcdm",unescape(encodeURIComponent(window.location.href))));cookie=readCookie(cookieName);if(cookie){omnObject=typeLookup("omniture",cookie);if(omnObject&&omnObject.prop9&&omnObject.eVar31){s_omni.prop9=omnObject.prop9;s_omni.eVar31=omnObject.eVar31;}}