
!function(){

function extend(dst, src){
    for (var key in src)
        dst[key] = src[key]
    return src
}

var Simulate = {
    event: function(element, eventName, bubbles, cancelable){
        bubbles = bubbles || bubbles === undefined;
        cancelable = cancelable || cancelable === undefined;

        if (document.createEvent) {
            var evt = document.createEvent("HTMLEvents")
            evt.initEvent(eventName, bubbles, cancelable)
            element.dispatchEvent(evt)
        }else{
            var evt = document.createEventObject()
            evt.bubbles = bubbles;
            evt.cancelable = cancelable;
            element.fireEvent('on' + eventName,evt)
        }
    },
    keyEvent: function(element, type, options){
        var evt,
            e = {
            bubbles: true, cancelable: true, view: window,
          	ctrlKey: false, altKey: false, shiftKey: false, metaKey: false,
          	keyCode: 0, charCode: 0
        }
        extend(e, options)
        if (document.createEvent){
            try{
                evt = document.createEvent('KeyEvents')
                evt.initKeyEvent(
                    type, e.bubbles, e.cancelable, e.view,
    				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
    				e.keyCode, e.charCode)
    			element.dispatchEvent(evt)
    		}catch(err){
    		    evt = document.createEvent("Events")
				evt.initEvent(type, e.bubbles, e.cancelable)
				extend(evt, {
				    view: e.view,
					ctrlKey: e.ctrlKey, altKey: e.altKey,
					shiftKey: e.shiftKey, metaKey: e.metaKey,
					keyCode: e.keyCode, charCode: e.charCode
				})
				element.dispatchEvent(evt)
    		}
        }
    }
}

Simulate.keypress = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keypress', {
        keyCode: charCode,
        charCode: charCode
    })
}

Simulate.keydown = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keydown', {
        keyCode: charCode,
        charCode: charCode
    })
}

Simulate.keyup = function(element, chr){
    var charCode = chr.charCodeAt(0)
    this.keyEvent(element, 'keyup', {
        keyCode: charCode,
        charCode: charCode
    })
}

function createMethods(events, bubbles, cancelable) {
    for (var i = events.length; i--;) {
        var event = events[i]
        Simulate[event] = (function(evt) {
            return function(element) {
                this.event(element, evt, bubbles, cancelable)
            }
        }(event))
    }
}

createMethods([
    'click',
    'dblclick',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'submit'
], true, true)

createMethods([
    'input',
    'change',
    'focusin',
    'focusout'
], true, false)

createMethods([
    'mouseenter',
    'mouseleave',
    'focus',
    'blur',
    'resize',
    'scroll',
    'select',
    'load',
    'unload',
    'play',
    'pause',
    'ended',
    'volumechange',
    'stalled',
    'timeupdate',
    'loadeddata'
], false, false)

if (typeof module !== 'undefined'){
    module.exports = Simulate
}else if (typeof window !== 'undefined'){
    window.Simulate = Simulate
}else if (typeof define !== 'undefined'){
    define(function(){ return Simulate })
}

}()
