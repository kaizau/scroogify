; (function(win, doc) {

  var scroogify = {

    config: {
      path: 'http://scroogify-node.herokuapp.com/',
      placeholder: false,
      threshold: 1024
    },

    getPixelRatio: function() {
      var dpr = (win.devicePixelRatio) ? win.devicePixelRatio : 1;
      return dpr;
    },

    getViewportWidth: function() {
      return doc.documentElement.clientWidth;
    },

    replaceImages: function() {
      var pixelRatio = this.getPixelRatio(),
          viewportWidth = this.getViewportWidth(),
          maxWidth = pixelRatio * viewportWidth,
          placeholder = (placeholder) ? placeholder : 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
          imgNodes;

      // Do nothing if viewport is large enough
      if (maxWidth > this.config.threshold) return;

      imgNodes = doc.getElementsByTagName('img');
      for(var i = 0; i < imgNodes.length; i++) {
        var img = imgNodes[i],
            originalSrc = img.src,
            renderWidth;

        // Does img.src always fetch the absolute path to the img? Or is this just a webkit feature?
        console.log(img.src);

        //if (img.src.substring(0,4) === 'http' && img.src.indexOf(location.host) === -1) {
          //originalSrc = img.src; // external
        //} else {
          //originalSrc = (img.src.slice(1) === '/') ? img.src.substr(1) : img.src; // local
        //}

        // Get the rendered width of the image
        // (in case the image is resized with CSS or HTML attributes)
        img.src = placeholder;
        renderWidth = (img.clientWidth > 1) ? img.clientWidth * pixelRatio : maxWidth;

        img.src = this.config.path + '?w=' + renderWidth + '&u=' + originalSrc;
      }
    },

    ready: function() {
      if (! doc.body) {
        return window.setTimeout(scroogify.ready, 1);
      }
      scroogify.init();
    },

    updateConfig: function() {
      var scripts = doc.getElementsByTagName('script'),
          thisScript, placeholder, path, threshold;

      for (var i = 0; i < scripts.length; i++) {
        var script = scripts[i];
        if (script.src.indexOf('scroogify') !== -1) {
          thisScript = script;
          break;
        }
      }

      placeholder = thisScript.getAttribute('data-placeholder');
      path = thisScript.getAttribute('data-path');
      threshold = thisScript.getAttribute('data-threshold');

      if (placeholder) this.config.placeholder = placeholder;
      if (threshold) this.config.threshold = parseInt(threshold);
      if (path) this.config.path = (path.slice(-1) === '/') ? path : path + '/';
    },

    init: function() {
      if (this.loaded) return;
      this.loaded = true;

      this.updateConfig();
      this.replaceImages();
    }

  };

  // TODO rm event handlers
  if (doc.readyState === 'complete') {
    win.setTimeout(scroogify.ready, 1);
  } else {
    if (doc.addEventListener) {
      doc.addEventListener("DOMContentLoaded", scroogify.ready, false);
      win.addEventListener("load", scroogify.ready, false);
    } else if (doc.attachEvent) {
      doc.attachEvent("onreadystatechange", scroogify.ready);
      win.attachEvent("onload", scroogify.ready);
    }
  }

})(this.window, this.document);
