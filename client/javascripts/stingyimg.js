; (function(win, doc, config) {

  StingyImg = {

    config: {
      path: '/stingy/',
      placeholder: false,
      breakPoint: 2000,
      aggressive: true
    },

    getPixelRatio: function() {
      var dpr = (win.devicePixelRatio) ? win.devicePixelRatio : 1;
      return dpr;
    },

    getViewportWidth: function() {
      return doc.documentElement.clientWidth;
    },

    getMaxWidth: function() {
      var pixelRatio = this.getPixelRatio();
          viewportWidth = this.getViewportWidth();

      return pixelRatio * viewportWidth;
    },

    replaceImages: function(maxWidth) {
      var imgNodes = doc.getElementsByTagName('img');

      for(var i = 0; i < imgNodes.length; i++) {
        var img = imgNodes[i];
        img.src = this.config.path + maxWidth + '/#' + img.src;
      }
    },

    replaceImagesAggressive: function(maxWidth) {
      var imgNodes = doc.getElementsByTagName('img'),
          pixelRatio = this.getPixelRatio(),
          regexp = new RegExp('//' + location.host + '($|/)'),
          placeholder = (placeholder) ? placeholder : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

      for(var i = 0; i < imgNodes.length; i++) {
        var img = imgNodes[i],
            originalSrc = (img.src.slice(1) === '/') ? img.src : '/' + img.src,
            originalSrc = (originalSrc.substring(0,4) === "http") ? originalSrc : location.host + '/' + originalSrc,
            renderWidth;

        console.log(originalSrc);
        img.src = placeholder;
        renderWidth = (img.clientWidth > 1 && img.clientWidth < maxWidth) ? img.clientWidth * pixelRatio : maxWidth;

        img.src = this.config.path + '?w=' + renderWidth + '&u=' + originalSrc;
      }
    },

    ready: function() {
      if ( !doc.body ) {
        return window.setTimeout(StingyImg.ready, 1);
      }
      StingyImg.init();
    },

    updateConfig: function() {
      var scripts = doc.getElementsByTagName('script'),
          thisScript, placeholder, path;

      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src.indexOf('stingyimg.js') !== -1) {
          thisScript = script;
          break;
        }
      }

      placeholder = thisScript.getAttribute('data-placeholder');
      path = thisScript.getAttribute('data-path');

      if (placeholder) this.config.placeholder = placeholder;
      if (path) this.config.path = (path.slice(-1) === '/') ? path : path + '/';
    },

    init: function() {
      if (this.loaded) return;
      this.loaded = true;

      this.updateConfig();

      max = this.getMaxWidth();

      if (max <= this.config.breakPoint && this.config.aggressive) {
        this.replaceImagesAggressive(max);
      } else if (max <= this.config.breakPoint && this.config.aggressive) {
        this.replaceImages(max);
      }
    }

  };

  if (doc.readyState === 'complete') {
    win.setTimeout(StingyImg.ready, 1);
  } else {
    if (doc.addEventListener) {
      doc.addEventListener("DOMContentLoaded", StingyImg.ready, false);
      win.addEventListener("load", StingyImg.ready, false);
    } else if (doc.attachEvent) {
      doc.attachEvent("onreadystatechange", StingyImg.ready);
      win.attachEvent("onload", StingyImg.ready);
    }
  }

})(this.window, this.document, this.StingyConfig);
