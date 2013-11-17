(function(window){

    var _tStart, _tEnd, _dom;

    var getDOM = function(selector){

        if(selector.indexOf('#') > -1) {

            return [document.getElementById(selector.substr(1, selector.length - 1))];
        } else if (selector.indexOf('.') > -1) {

            return document.getElementsByClassName(selector);
        } else {

            return document.querySelectorAll(selector);
        };

    };


    var evalTouch = function(start, end){

        if(start.target !== end.target){

           return alert("went off target");
        }

        if((end.timeStamp - start.timeStamp) < 500) {

            this._events['tap'].call(this, start)
        } else {

           this._events['tapLong'].call(this, start);
        }
    }

    var down = function(e){

        _tStart = e;
    }


    var up = function(e){

        evalTouch.call(this, _tStart, e);
    }


    var _touch = function(selector){

        _dom = getDOM(selector);

        for(var i = 0; i < _dom.length; i += 1){

            for( var m in _touch.prototype){

                _dom[i][m] = _touch.prototype[m];
                _dom[i]._events = {};
            }

            _dom[i].addEventListener('touchstart', down, false);
            _dom[i].addEventListener('touchend', up, false);
        }

        return _touch.prototype;
    };


    _touch.prototype = {

        on: function(name, callback){

            for(var i = 0; i < _dom.length; i += 1){

                _dom[i]._events[name] = callback;
            }
        }
    };


    window._touch = _touch;

}(window));