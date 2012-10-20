var win = this.window,
    doc = this.document,

StingyImg = {

  formattedURI: '',

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

  }

};
