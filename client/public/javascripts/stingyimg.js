var win = this.window,
    doc = this.document,

StingyImg = {

  detectPixelRatio: function() {
    return win.devicePixelRatio;
  },

  detectViewportWidth: function() {
    return doc.documentElement.clientWidth;
  },

  detectOrientation: function() {
    var o;
    if (win.orientation) {
      o = (win.orientation === 0 || win.orientation === 180) ? 'portrait' : 'landscape';
    } else {
      var mq = win.matchMedia('orientation: portrait');
      o = (mq.matches) ? 'portrait' : 'landscape';
    }
    return o;
  },

  getImgTags: function() {
    return doc.getElementsByTagName('img');
  },

  replaceSrc: function() {

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

    console.log('image tags:', StingyImg.getImgTags());
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

//console.log('pixelRatio:', StingyImg.detectPixelRatio());
//console.log('viewportWidth:', StingyImg.detectViewportWidth());
//console.log('orientation:', StingyImg.detectOrientation());
//console.log('image tags:', StingyImg.getImgTags());
