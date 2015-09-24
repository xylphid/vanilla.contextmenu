# Vanilla contextMenu

vanilla.contextmenu is a simple and configurable contextual menu in vanilla-js.

## Requirements

* [vanilla](https://github.com/xylphid/vanilla)

## Installation

Include [vanilla](https://github.com/xylphid/vanilla) and `vanilla.contextmenu.min.js`script :
```html
<script src="vanilla.min.js" type="text/javascript" charset="utf-8" />
<script src="vanilla.contextmenu.min.js" type="text/javascript" charset="utf-8" />
```

Include the modal requirements and `vanilla.ctxm.css` default style :
```html
<link rel="stylesheet" href="vanilla.ctxm.css" type="text/css" media="screen" />
```

## Usage

To register on contextual menu
```js
//vanilla.ctxm( selector, options );
vanilla.ctxm( 'img', {
    items: {
        highlight: { // Highlight the clicked image
            title:'Highlight',
            icon:'this.data-highglight',
            callback: function() {
                var target = vanilla.ctxm.getTarget();
                target.css('box-shadow', '0 0 5px #000;');
            }
        },
        delete: { // Delete the clicked item
            title:'Delete',
            icon:'delete',
            callback: function() {
                var target = vanilla.ctxm.getTarget();
                target.remove();
            }
        }
    }
} );
```

### Icons

Each item of the contextual menu accept icon decorator. The icon decorator is identified by the class name `icon-[decorator]` you __must__ declare. For example, width the previous code, we may declare the CSS classes :
```css
#vanilla-ctxm .icon-highlight {
    background-image:url(example/icon-highligth.png);
}
#vanilla-ctxm .icon-delete {
    background-image:url(example/icon-delete.png);
}
```

The icon declaration value can also be an expression as `this.[attribute]`.<br />
For example `icon:'this.data-highlight'` will match the `data-highlight` attribute of the clicked element.

## Closing

Because there can be only one context menu active at a single time, there's no need to select which menu to close:
```js
vanilla.ctxm.close();
```
The contextual menu will also close on ESC key oron click anywhere.

## Options

These are the supported options and their default values:
```js
vanilla.ctxm.defaults = {
    background: '#FFF',             // Background color
    border: '#CDCDCD',              // Border color
    fontSize: '14px',               // Font size
    headerText: 'Context menu',     // Menu header title
    iconPosition: 0,                // Icon position [0: left, 1: right]
    opacity: 0.5,                   // Overlay opacity
    overlay: '#000',                // Overlay color
    width: '200px'                  // Menu width
}
```

# License (MIT)

jQuery Modal is distributed under the [MIT License](Learn more at http://opensource.org/licenses/mit-license.php):

    Copyright (c) 2015 Anthony PERIQUET

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