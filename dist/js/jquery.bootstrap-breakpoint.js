(function($) {
    var BootstrapBreakpoint = {
        breakpoints: ['xs','sm','md','lg','xl'],
        
        /**
         * Adds HTML to body
         * 
         * @returns {undefined}
         */
        init: function() {
            if ($('.bsbp-container').length === 0) {
                var template = '<div class="bsbp-container">' +
                    '<div class="d-xs-block"></div>' +
                    '<div class="d-none d-sm-block"></div>' +
                    '<div class="d-none d-md-block"></div>' +
                    '<div class="d-none d-lg-block"></div>' +
                    '<div class="d-none d-xl-block"></div>' +
                '</div>';
                $('body').append(template);
            }
        },
    
        /**
         * Returns true if window is wider than breakpoint
         * 
         * @param {string} breakpoint
         * @returns {boolean}
         */
        up: function(breakpoint) {
            if (BootstrapBreakpoint.checkBreakpoint(breakpoint)) {
                return $('.bsbp-container .d-' + breakpoint + '-block').is(':visible');
            }
            return false;
        },
    
        /**
         * Returns true if window is smaller than breakpoint
         * 
         * @param {string} breakpoint
         * @returns {boolean}
         */
        down: function(breakpoint) {
            if (BootstrapBreakpoint.checkBreakpoint(breakpoint)) {
                return !$('.bsbp-container .d-' + breakpoint + '-block').is(':visible');
            }
            return false;
        },
    
        /**
         * Returns true if window width is between two breakpoints
         * 
         * @param {object} breakpoint
         * @returns {boolean}
         */
        between: function(breakpoint) {
            if (typeof breakpoint === 'object' 
                    && BootstrapBreakpoint.checkBreakpoint(breakpoint[0]) 
                    && BootstrapBreakpoint.checkBreakpoint(breakpoint[1])) {
                return BootstrapBreakpoint.up(breakpoint[0]) && BootstrapBreakpoint.down(breakpoint[1]);
            }
            return false;
        },
    
        /**
         * Returns true if window is in range of breakpoint
         * 
         * @param {string} breakpoint
         * @returns {boolean}
         */
        only: function(breakpoint) {
            if (BootstrapBreakpoint.checkBreakpoint(breakpoint)) {
                // if is last breakpoint
                if (BootstrapBreakpoint.up(breakpoint) 
                        && BootstrapBreakpoint.breakpoints.length - 1 === BootstrapBreakpoint.breakpoints.indexOf(breakpoint)) {
                    return true;
                }

                return BootstrapBreakpoint.up(breakpoint) && !BootstrapBreakpoint.up(BootstrapBreakpoint.breakpoints[BootstrapBreakpoint.breakpoints.indexOf(breakpoint) + 1]);
            }
            return false;
        },
    
        /**
         * Returns true if breakpoint exists
         * 
         * @param {string} breakpoint
         * @returns {boolean}
         */
        checkBreakpoint: function(breakpoint) {
        return BootstrapBreakpoint.breakpoints.indexOf(breakpoint) > -1;
        }
    };
    
    $.bootstrapBreakpoint = function(mode, breakpoint) {
        var result = false;
        
        switch(mode) {
            case 'up':
                result = BootstrapBreakpoint.up(breakpoint);
                break;
            case 'down':
                result = BootstrapBreakpoint.down(breakpoint);
                break;
            case 'between':
                result = BootstrapBreakpoint.between(breakpoint);
                break;
            case 'only':
                result = BootstrapBreakpoint.only(breakpoint);
                break;
            default:
        }
        
        return result;
    };
})(jQuery);