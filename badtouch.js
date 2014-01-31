(function(window){

    var __tStart, __tEnd, __direction;
    var __hasTouch = 'ontouchstart' in window;

    // Would prefer to create instance of Event object,
    // but Samsung Andriod doesn't like it. The deprecated
    // custom event approach works though. Go figure.
    var event = document.createEvent('Event');
    event.initEvent('tap', true, true);

    var __touchEvents = {
        'tap': event
    };

    var __evalTouch = function(){

        var tStampDiff = (__tEnd.timeStamp - __tStart.timeStamp);
        var hSwipe = Math.abs(__tStart.pageX - __tEnd.pageX) > 10;

        if(tStampDiff <= 100){

            __tStart.target.dispatchEvent(__touchEvents.tap);
            return;
        } else if(hSwipe){

            __tStart.target.dispatchEvent(__touchEvents['swipe' + __direction]);
            __tStart = __tEnd = null;
            return;
        }
    };

    var __down = function(e){

        __tStart = e;
    };

    var __up = function(e){

        if(!__tEnd){

            __tEnd = e;
        }
        __evalTouch();
    };

    var __getElements = function(selector){

        var nodes;

        // TODO - make these checks more robust
        if(selector.indexOf('#') > -1){

            nodes = [document.getElementById(selector.substr(1, selector.length -1))];
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

            this.elements.forEach(function(el){

                __applyEvents.call(el, ev, callback);
            });
        }.bind(this),

        off: function(ev, callback){

            this.elements.forEach(function(el){

                __removeEvents.call(el, ev, callback);
            });
        }.bind(this)
    };

    window._touch = _touch;
}(window));