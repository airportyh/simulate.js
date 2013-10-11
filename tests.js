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
    it('simulates all events', function(){
        var events = [
            'click',
            'focus',
            'blur',
            'dblclick',
            'change',
            'mousedown',
            'mousemove',
            'mouseout',
            'mouseover',
            'mouseup',
            'resize',
            'scroll',
            'select',
            'submit',
            'load',
            'unload'
        ]
        for (var i = events.length; i--;){
            !function(event){
                var spy = jasmine.createSpy(event)
                $(input)[event](spy)
                Simulate[event](input)
                expect(spy).toHaveBeenCalled()
            }(events[i])
        }
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