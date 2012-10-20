describe("stingyimg", function() {

  it("should detect device viewport width", function() {
    var w = StingyImg.detectViewportWidth();
    expect(typeof(w)).toEqual('number');
  });

  it("should detect device orientation", function() {
    var o = StingyImg.detectOrientation();
    expect(['portrait', 'landscape']).toContain(o);
  });

  it("should detect device pixel ratio", function() {
    var pr = StingyImg.detectPixelRatio();
    expect([1, 1.5, 2]).toContain(pr);
  });

  it("should fetch all image nodes", function() {
    var imgs = StingyImg.getImgTags();
    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      //expect(img).toContain(pr);
    }
  });

  it("should replace image sources with formatted URI", function() {

  });

});
