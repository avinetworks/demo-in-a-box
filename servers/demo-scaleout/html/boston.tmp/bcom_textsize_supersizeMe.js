function fontsizeup() {
  active = getActiveStyleSheet();
  switch (active) {
    case 'A-' : 
      setActiveStyleSheet('A');
      break;
    case 'A' : 
      setActiveStyleSheet('A+');
      break;
    case 'A+' : 
      setActiveStyleSheet('A++');
      break;
    case 'A++' :
      break;
    default :
      setActiveStyleSheet('A+');
      break;
  }
}

function fontsizedown() {
  active = getActiveStyleSheet();
  switch (active) {
    case 'A++' : 
      setActiveStyleSheet('A+');
      break;
    case 'A+' : 
      setActiveStyleSheet('A');
      break;
    case 'A' : 
      setActiveStyleSheet('A-');
      break;
    case 'A-' : 
       break;
    default :
      setActiveStyleSheet('A-');
      break;
  }
}

function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}
