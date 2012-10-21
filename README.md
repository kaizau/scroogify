# Scroogify your responsive images!

(Version 0.0.1.pre)

Scroogify is a plug-and-play script for sending screen-optimized images to mobile browsers. A 640x960 phone doesn't need a full 2000x1600 image. Instead, Scroogify sends it a scaled-down copy &mdash; in most cases, resized exactly to the rendered size on the screen. No wasted pixels and no browser image-resizing.

Why another responsive image library? [Other options](https://docs.google.com/spreadsheet/ccc?key=0Al0lI17fOl9DdDgxTFVoRzFpV3VCdHk2NTBmdVI2OXc#gid=0) require changes to your markup, cater towards PHP and Apache setups, and add major development and maintenance overhead. Scroogify's minimum-viable setup is a single step:

```html
<script src="/javascripts/scroogify.min.js"></script>
```

## TL;DR

* Vanilla javascript, works with any library
* Simple setup: just add the script to your `<head>`
* Does not require markup changes, fails gracefully without JS
* Uses [Sencha Src](http://docs.sencha.io/current/index.html#!/guide/src) or your own self-hosted [scroogify-node](https://github.com/c4milo/scroogify-node) instance for image resizing
* Configurable via data-attributes on the script tag
* NOTE: Does not stop browsers from prefetching large image assets. I'm still experimenting with solutions for this.

## How it works

Scroogify only executes on screens smaller than a configurable threshold. On execution, it modifies all image `src` attributes to use an image-resizing service. If the image is stretched by CSS or HTML `height` and `width` attributes, Scroogify detects this and requests an image that fits the rendered size exactly.

## Configuration

(Default values shown)

**`data-threshold="1024"`**

The pixel threshold above which Scroogify does not execute.

**`data-path="http://src.sencha.io/{{width}}/{{url}}"`**

The URI to which images are rewritten. Works as long as `{{width}}` and `{{url}}` are present.

**`data-placeholder="data:image/gif;base64,………"`**

The path to a 1px placeholder gif/png. Defaults to a data-URI, but you may see a performance boost by using an actual gif, due to browser caching.

## License

    Copyright (c) 2012 [Yifei Zhang](http://yifei.co)

    MIT License

    Permission is hereby granted, free of charge, to any person obtaining
    a copy of this software and associated documentation files (the
    "Software"), to deal in the Software without restriction, including
    without limitation the rights to use, copy, modify, merge, publish,
    distribute, sublicense, and/or sell copies of the Software, and to
    permit persons to whom the Software is furnished to do so, subject to
    the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
    LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
    OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
    WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
