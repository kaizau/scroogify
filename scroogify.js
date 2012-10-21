/*! Scroogify.js | v0.0.1.pre | https://github.com/ezYZ/scroogify */
(function(win, doc) {

  var scroogify = {

    config: {
      //path: 'http://scroogify-node.herokuapp.com?w={{width}}&u={{url}}',
      path: 'http://src.sencha.io/{{width}}/{{url}}',
      placeholder: 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==',
      threshold: 1280
    },

    getPixelRatio: function() {
      var dpr = (win.devicePixelRatio) ? win.devicePixelRatio : 1;
      return dpr;
    },

    getViewportWidth: function() {
      return doc.documentElement.clientWidth;
    },

    resizeImages: function() {
      var pixelRatio = this.getPixelRatio(),
          viewportWidth = this.getViewportWidth(),
          maxWidth = Math.ceil(pixelRatio * viewportWidth),
          imgNodes;

      //console.log('pixelRatio:', pixelRatio);
      //console.log('viewportWidth:', viewportWidth);
      //console.log('maxWidth:', maxWidth);

      // Do nothing if viewport is large enough
      if (maxWidth > this.config.threshold) return;

      imgNodes = doc.getElementsByTagName('img');
      for(var i = 0; i < imgNodes.length; i++) {
        var img = imgNodes[i],
            originalSrc = img.src,
            renderWidth;

        // TODO determine the original width of the image and skip all of this?
        // TODO Does img.src always fetch the absolute path to the img? Or is this just a webkit feature?
        //console.log(img.src);

        // Swap src with placeholder and get the rendered width of the image
        // Fallback to maxWidth if placeholder is not resized via CSS or HTML attributes
        img.src = this.config.placeholder;
        renderWidth = (img.clientWidth > 1) ? Math.ceil(img.clientWidth * pixelRatio) : maxWidth;

        // Swap the source to use the image resizer
        newSrc = this.config.path.replace('{{width}}', renderWidth).replace('{{url}}', originalSrc);
        img.src = newSrc;
      }
    },

    ready: function() {
      if (! doc.body) return window.setTimeout(scroogify.ready, 1);
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

      if (thisScript.hasAttribute('data-placeholder')) this.config.placeholder = thisScript.getAttribute('data-placeholder');
      if (thisScript.hasAttribute('data-path')) this.config.path = parseInt(thisScript.getAttribute('data-path'));
      if (thisScript.hasAttribute('data-threshold')) this.config.threshold = thisScript.getAttribute('data-threshold');
    },

    init: function() {
      if (this.loaded) return;
      this.loaded = true;

      this.updateConfig();
      this.resizeImages();
    }

  };

  // Simple DOM Ready
  //
  // borrowed from jQuery source
  // TODO detach listeners  after ready?
  if (doc.readyState === 'complete') {
    win.setTimeout(scroogify.ready, 1);
  } else if (doc.addEventListener) {
    doc.addEventListener('DOMContentLoaded', scroogify.ready, false);
    win.addEventListener('load', scroogify.ready, false);
  } else if (doc.attachEvent) {
    doc.attachEvent('onreadystatechange', scroogify.ready);
    win.attachEvent('onload', scroogify.ready);
  }

})(this.window, this.document);
