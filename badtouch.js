(function(window){

    var __tStart, __tEnd;
    var __tap = new Event('tap');
    var __hasTouch = document.ontouchstart !== undefined;

    var __touchEvents = {
        'tap': __tap
    }

    var __evalTouch = function(){

        if((__tEnd.timeStamp - __tStart.timeStamp) <= 200){

            __tStart.target.dispatchEvent(__touchEvents.tap);
        }
    };

    var __down = function(e){

        __tStart = e;
    };

    var __up = function(e){

        __tEnd = e;
        __evalTouch();
    };

    var __getElements = function(selector){

        var nodes;

        // TODO - make these checks more robust
        if(selector.indexOf('#') > -1){

            nodes = [document.getElementById(selector)];
        } else if(selector.indexOf('.') > -1){

            nodes = document.getElementsByClassName(selector);
        } else {

            nodes = document.querySelectorAll(selector);
        }

        // returning newly array created from nodeList
        return Array.prototype.slice.call(nodes);
    };


    var __applyEvents = function(ev, callback){

        if(!__hasTouch && ev === 'tap'){

            this.addEventListener('click', callback, false);
        } else {

            this.addEventListener(ev, callback, false);
        }
    };


    var __removeEvents = function(ev, callback){

        if(!__hasTouch && ev === 'tap'){

            this.removeEventListener('click', callback, false);
        } else {

            this.removeEventListener(ev, callback, false);
        }
    };

    var _touch = function(selector){

        // property is an array
        this.elements = __getElements(selector);

        if(__hasTouch){

            document.addEventListener('touchstart', __down, false);
            document.addEventListener('touchend', __up, false);
        }
        return _touch.prototype;
    };

    _touch.prototype = {

        on: function(ev, callback){

            this.elements.forEach(function(el, idx, arr){

                __applyEvents.call(el, ev, callback);
            });
        }.bind(this),

        off: function(ev, callback){

            this.elements.forEach(function(el, idx, arr){

                __removeEvents.call(el, ev, callback);
            });
        }.bind(this)
    };

    window._touch = _touch;
}(window));