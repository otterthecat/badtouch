(function(window){

    var _tStart, _tEnd, _lastX, _dom, _identifier;

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

    var _getElements = function(selector){

        if(selector.indexOf('#') > -1) {

            return [document.getElementById(selector.substr(1, selector.length - 1))];
        } else if (selector.indexOf('.') > -1) {

            return document.getElementsByClassName(selector);
        } else {

            return document.querySelectorAll(selector);
        };

    };


    var _evalTouch = function(start, end){

        if(_identifier !== end.identifier){

            return alert('identifiers do not match');
        }

        if((end.timeStamp - start.timeStamp) < 300) {

            return start.target.dispatchEvent(_touches.tap);
        } else {


            if((start.pageX - _lastX) > 100){

                return start.target.dispatchEvent(_touches.swipeLeft);
            }

            if((_lastX - start.pageX) > 100){

                return start.target.dispatchEvent(_touches.swipeRight);
            }

           return start.target.dispatchEvent(_touches.tapLong);
        }

        start = null;
        end = null;
        e = null;
    };

    var _down = function(e){
        _identifier = e.identifier;
        _tStart = e;
    };

    var _move = function(e){

        e.preventDefault();
        _lastX = e.pageX;
    };

    var _up = function(e){

        _tEnd = e;
        _evalTouch.call(this, _tStart, _tEnd);
    };

    var _touch = function(selector){

        _dom = _getElements(selector);

        for(var i = 0; i < _dom.length; i += 1){

            for( var m in _touch.prototype){

                _dom[i][m] = _touch.prototype[m];
            }

            document.addEventListener('touchstart', _down, false);
            document.addEventListener('touchmove', _move, false);
            document.addEventListener('touchend', _up, false);
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