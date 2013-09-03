(function(root) {
    var cmon = root.cmon
      , aok = root.aok
      , provide = cmon.provide
      , require = cmon.require
      , port = {};
    
    function handler() {
        handler.ran++;
        handler.scope = this;
    }

    handler.reset = function(to) {
        handler.ran = to || 0;
        return handler;
    }; 
    
    handler.did = function() {
        return handler.ran;
    };
    
    handler.didnt = function() {
        return !handler.ran;
    };

    (function(name) {
        var count = provide.on(name, handler);
        aok({id:'onLength', test:1 === count});
        handler.reset();
        provide(name, port);
        aok({id:'require', test:port === require(name)});
        aok({id:name, test:handler.did});

        // remove all and remember length
        count = provide.off(name, handler);
        aok({
            id:'offLength'
          , test:function() {
                return isFinite(this.remark = count);
            }
        });

        // ensure the handler was removed
        handler.reset();
        provide(name, port);
        aok({id:'offSingle', test:handler.didnt});
        handler.reset();
    }('onHandles'));
}(this));