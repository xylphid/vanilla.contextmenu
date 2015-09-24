/**
 * Vanilla ctxm ;) (https://github.com/xylphid)
 * Version 0.1.0
 *
 * @author Anthony PERIQUET
 */
(function(vanilla) {
    var currentCtxm = null;
    var refresh = {
        time: null,
        timeout: false
    };

    vanilla.ctxm = function( query, options ){
        if (!(this instanceof vanilla.ctxm))
            return new vanilla.ctxm( query, options );

        this.options = vanilla.extend({}, vanilla.ctxm.defaults, options);
        currentCtxm = this;

        // Bind keyboard event
        vanilla(document).on('keydown', function(event) {
            if (currentCtxm && currentCtxm.opened) {
                if (event.which == 27) vanilla.ctxm.close();
            }
        });

        // Bind global context event menu to remove active menu
        vanilla(document).on('contextmenu, oncontextmenu', '*:not(#vanilla-ctxm)', function(event) {
            if (currentCtxm.opened) currentCtxm.close();
        });
        
        // Bing target element to open overriden context menu
        vanilla(document).on('contextmenu', query, function(event) {
            event.preventDefault();
            currentCtxm.elm = event.value;
            currentCtxm.event = event;
            currentCtxm.open();
        });
        
        // Bind click to remove active menu
        vanilla(document).on('click', '*:not(#vanilla-ctxm)', function(event) {
            if (currentCtxm.opened) currentCtxm.close();
        });
    };

    vanilla.ctxm.prototype = {
        constructor: vanilla.ctxm,

        // Open the ctxm
        open: function( elm ) {
            if ( elm instanceof vanilla )
                this.elm = elm;
            this.setOverlay();
            this.setMenu();
            this.opened = true;
            return false;
        },

        // Add overlay
        setOverlay:function() {
            vanilla('.overlay').remove();
            this.overlay = vanilla('<div>')
                .addClass('overlay')
                .css('background', this.options.overlay)
                .css('bottom', 0)
                .css('display', 'none')
                .css('height', '100%')
                .css('left', 0)
                .css('opacity', this.options.opacity)
                .css('position', 'fixed')
                .css('right', 0)
                .css('top', 0)
                .css('transition', 'opacity 100ms, z-index 1s')
                .css('width', '100%')
                .css('z-index', 1)
                .appendTo('body')
                .fadeIn();
        },
        
        // Define the ctxm
        setMenu: function() {
            this.ctxm = this.ctxm || vanilla('<div>').attr( 'id', 'vanilla-ctxm' )
                .css('background', this.options.background)
                .css('border-color', this.options.border)
                .css('border-radius', '3px')
                .css('border-style', 'solid')
                .css('border-width', '1px')
                .css('font-size', this.options.fontSize)
                .css('padding', '5px 0 5px 5px')
                .css('opacity', 0)
                .css('position', 'absolute')
                .css('transition', 'opacity 200ms, left 1s, top 1s, z-index 200ms')
                .css('width', this.options.width)
                .appendTo('body');

            // Clean content
            this.ctxm.html('');
            // Add Header text
            vanilla('<div>').addClass('header')
                .html(this.options.headerText)
                .css('border-bottom', 'solid 1px #000')
                .css('margin-right', '5px')
                .css('font-weight', 'bold')
                .appendTo( this.ctxm );
            this.setOptions();

            // Animate the menu to the current position
            var x = window.innerWidth - parseInt(this.options.width) > this.event.clientX ? this.event.clientX : (this.event.clientX - parseInt(this.options.width));
            var y = window.innerHeight - this.ctxm.outerHeight() > this.event.clientY ? this.event.clientY : (this.event.clientY - this.ctxm.outerHeight());
            this.ctxm.css('opacity', 1)
                .css('left', (x + window.scrollX) + 'px')
                .css('top', (y + window.scrollY) + 'px')
                .css('z-index', 2);
        },

        setOptions: function() {
            var items = this.options.items;
            var icons = false;
            for (var key in items) {
                var item = vanilla('<div>').addClass('item')
                    .css('align-items', 'center')
                    .css('cursor', 'pointer')
                    .css('display', 'flex')
                    .css('flex-direction', 'row')
                    .css('height', '20px')
                    .on('click', items[key].callback)
                    .appendTo('#vanilla-ctxm');
                    
                // Add icon if defined or empty space
                var icon = /this\./.test(items[key].icon) ? this.elm.attr(items[key].icon.replace('this.', '')) : items[key].icon;
                vanilla('<div>').addClass( 'icon-'+icon || 'noIcon' )
                    .css('flex', '0 20px')
                    .css('margin-right', '5px')
                    .css('order', this.options.iconPosition)
                    .appendTo( item );
                // Add text
                vanilla('<div>').addClass('item')
                    .css('flex', '1')
                    .css('margin-right', '5px')
                    .css('white-space', 'nowrap')
                    .append(items[key].title)
                    .appendTo( item );
            }
        },

        // Center the ctxm
        center: function() {
            this.ctxm.css('left', "50%")
                .css('margin-left', -(this.ctxm.outerWidth() / 2) + 'px')
                .css('margin-top', -(this.ctxm.outerHeight() / 2) + 'px')
                .css('position', 'fixed')
                .css('top', "50%")
                .css('z-index', this.options.zIndex + 1);
        },

        // Close the ctxm
        close: function() {
            this.overlay.css('opacity', 0)
                .css('z-index', -1);
            this.ctxm.css('opacity', 0)
                .css('z-index', -1);
            this.opened = false;
        },

        // Close the ctxm
        getTarget: function() {
            return this.elm;
        },
    };

    // Context menu default options
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

    vanilla.ctxm.dispatcher = function( event, callable ) {
        if (!currentCtxm || typeof currentCtxm[callable] != 'function') return;
        if (/Event/.test(event)) event.preventDefault();
        currentCtxm[callable]( event );
        return currentCtxm; 
    };
    vanilla.ctxm.open = function(event) {
        return vanilla.ctxm.dispatcher( event, 'open');
    };
    vanilla.ctxm.close = function(event) {
        return vanilla.ctxm.dispatcher( event, 'close');
    };
    vanilla.ctxm.getTarget = function(event) {
        if (!currentCtxm) return;
        return currentCtxm.getTarget();
    };

    vanilla.prototype.ctxm = function(options) {
        if (this instanceof vanilla) {
            currentCtxm = new vanilla.ctxm(this, options);
            vanilla.ctxm.open();
        }
        return this;
    };
    
}) (vanilla);