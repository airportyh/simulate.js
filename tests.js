var addListener = window.addEventListener ?
    function(node, evt, cb){ node.addEventListener(evt, cb, false) } :
    function(node, evt, cb){ node.attachEvent('on' + evt, cb) }

describe('simulate.js', function(){
    var input, a
    beforeEach(function(){
        input = $('<input type="text" name="text">')
            .appendTo(document.body)[0]
        a = $('<a href="#" id="link">Link</a>')
            .appendTo(document.body)[0]
    })
    afterEach(function(){
        $(input).remove()
        $(a).remove()
    })

    function testEvents(events, bubbles, cancelable) {
        for (var i = events.length; i--;){
            !function(event){
                var spy = jasmine.createSpy(event)
                addListener(input, event, spy);
                Simulate[event](input)
                expect(spy).toHaveBeenCalled()
                expect(spy.calls[0].args[0].bubbles).toBe(bubbles);
                expect(spy.calls[0].args[0].cancelable).toBe(cancelable);
            }(events[i])
        }
    }

    it('simulates all bubbling, cancelable events', function(){
        testEvents([
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'submit'
        ], true, true)
    })
    it('simulates all bubbling, non-cancelable events', function(){
        testEvents([
            'input',
            'change',
            'focusin',
            'focusout'
        ], true, false)
    })
    it('simulates all non-bubbling, non-cancelable events', function(){
        testEvents([
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
    })
    it('simulates keypress events', function(){
        var onKeyPress = jasmine.createSpy('onKeyPress')
        $(input).keypress(onKeyPress)
        Simulate.keypress(input, 'h')
        expect(onKeyPress)
            .toHaveBeenCalled()
        expect(onKeyPress.mostRecentCall.args[0].keyCode)
            .toBe(104) // 'h'
        expect(onKeyPress.mostRecentCall.args[0].charCode)
            .toBe(104) // 'h'
    })
    it('simulates multiple key events', function(){
        var onKeyPress = jasmine.createSpy('onKeyPress')
        $(input).keypress(onKeyPress)
        Simulate.keypress(input, 'hello')
        expect(onKeyPress.callCount).toBe(5)
    })
    it('simulates mouse events', function(){

    })
})
