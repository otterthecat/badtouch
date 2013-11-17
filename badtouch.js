(function(window){

    var _tStart, _tEnd;

    var getDOM = function(selector){

        if(selector.indexOf('#') > -1) {

            return document.getElementById(selctor);
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

            this.tap(start);
        } else {

            this.tapLong(start);
        }
    }

    var down = function(e){

        _tStart = e;
    }


    var up = function(e){

        evalTouch.call(this, _tStart, e);
    }


    var _touch = function(selector){

        var _dom = getDOM(selector);

        for(var i = 0; i < _dom.length; i += 1){

            for(m in _touch.prototype){

                _dom[i][m] = _touch.prototype[m]
            }

            _dom[i].addEventListener('touchstart', down, false);
            _dom[i].addEventListener('touchend', up, false);
        }

        return _dom;
    };


    _touch.prototype = {

        tap: function(e){

            alert(this);
        },

        tapLong: function(e){

            alert('long tap');
        }
    };


    window._touch = _touch;

}(window));