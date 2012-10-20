var win = this.window,
    doc = this.document,

StingyImg = {

  detectPixelRatio: function() {
    var dpr = (win.devicePixelRatio) ? win.devicePixelRatio : 1;
    return dpr;
  },

  detectViewportWidth: function() {
    return doc.documentElement.clientWidth;
  },

  //detectOrientation: function() {
    //var o;
    //if (win.orientation !== undefined) {
      //o = (win.orientation === 0 || win.orientation === 180) ? 0 : 1;
    //} else {
      //var mq = win.matchMedia('(orientation:portrait)');
      //o = (mq.matches) ? 0 : 1;
    //}
    //return o;
  //},

  calculateMaxWidth: function() {
    var pixelRatio = this.detectPixelRatio(),
        viewportWidth = this.detectViewportWidth(),
        imgNodes = doc.getElementsByTagName('img');

    console.log('px ratio:', pixelRatio);
    console.log('viewport:', viewportWidth);
    //console.log('orientation', orientation);
    console.log('image nodes:', imgNodes);

    return pixelRatio * viewportWidth;
  },

  ready: function() {
    if ( !doc.body ) {
      return window.setTimeout(StingyImg.ready, 1);
    }
    StingyImg.init();
  },

  init: function() {
    if (this.loaded) return;
    this.loaded = true;

    max = this.calculateMaxWidth();
    console.log(max);
  }

};

if (doc.readyState === 'complete') {
  setTimeout(StingyImg.ready, 1);
} else {
  if (doc.addEventListener) {
    doc.addEventListener("DOMContentLoaded", StingyImg.ready, false);
    win.addEventListener("load", StingyImg.ready, false);
  } else if (doc.attachEvent) {
    doc.attachEvent("onreadystatechange", StingyImg.ready);
    win.attachEvent("onload", StingyImg.ready);
  }
}
