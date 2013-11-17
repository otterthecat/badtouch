(function(window){

    var _tStart, _tEnd, _dom, _identifier;

    var _tap = new Event('tap');
    var _tapLong = new Event('tapLong');
    var _swipeLeft = new Event('swipeLeft');
    var _swipeRight = new Event('swipeRight');

    var _touches = {
        'tap': _tap,
        'tapLong': _tapLong,
        'swipeLeft': _swipeLeft,
        'swipeRight': _swipeRight
    };

    var getElements = function(selector){

        if(selector.indexOf('#') > -1) {

            return [document.getElementById(selector.substr(1, selector.length - 1))];
        } else if (selector.indexOf('.') > -1) {

            return document.getElementsByClassName(selector);
        } else {

            return document.querySelectorAll(selector);
        };

    };


    var evalTouch = function(start, end, e){

        if(_identifier !== e.identifier){

            return alert('identifiers do not match');
        }

        if((end - start) < 300) {

            e.target.dispatchEvent(_touches.tap);
        } else {

           e.target.dispatchEvent(_touches.tapLong);
        }

        start = null;
        end = null;
        e = null;
    };

    var down = function(e){
        _identifier = e.identifier;
        _tStart = e.timeStamp;
    };


    var up = function(e){

        _tEnd = e.timeStamp;
        evalTouch.call(this, _tStart, _tEnd, e);
    };

    var _touch = function(selector){

        _dom = getElements(selector);

        for(var i = 0; i < _dom.length; i += 1){

            for( var m in _touch.prototype){

                _dom[i][m] = _touch.prototype[m];
            }

            document.addEventListener('touchstart', down, false);
            document.addEventListener('touchend', up, false);
        }

        return _touch.prototype;
    };

    _touch.prototype = {

        on: function(name, callback){

            for(var i = 0; i < _dom.length; i += 1){

                _dom[i].addEventListener(name, callback, false);
            }
        },

        off: function(){
            // placeholder
        }
    };

    window._touch = _touch;
}(window));