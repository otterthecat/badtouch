(function(window){

    var __tStart, __tEnd, __direction;
    var __hasTouch = document.ontouchstart !== undefined;

    var __touchEvents = {
        'tap': new Event('tap'),
        'swipeLeft': new Event('swipeLeft'),
        'swipeRight': new Event('swipeRight')
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
        };
    };

    var __down = function(e){

        __tStart = e;
    };

    var __move = function(e){
        if(__tStart.pageX > e.pageX){

            __direction = "Left";
        };

        if(__tStart.pageX < e.pageX){

            __direction = "Right";
        };
        __tEnd = e;
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
            document.addEventListener('touchmove', __move, false);
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