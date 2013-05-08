/*!
 * @link        github.com/ryanve/cmon
 * @license     MIT
 * @copyright   2013 Ryan Van Etten
 * @version     0.1.x
 */

/*jshint expr:true, laxcomma:true, supernew:true, debug:true, eqnull:true, node:true, boss:true, evil:true,
  undef:true, unused:true, sub:true, browser:true, devel:true, es5:true, jquery:true, indent:4, maxerr:100 */

(function(root, name, make) {
    if (typeof module != 'undefined' && module['exports']) {
        module['exports'] = make.call(root);
    } else {
        root[name] = make = make.call(root);
        make['id'] = name;
        root['require'] || make['claim']('require', make['require'], root);
        root['provide'] || make['claim']('provide', make['provide'], root);
    }
}(this, 'cmon', function() {

    var root = this || window
      , owns = 'hasOwnProperty'
      , handlers = {}
      , modules = {}
      , claimed = {};
    
    /**
     * @param  {string|number} id
     * @param  {*=}            value
     * @param  {*=}            scope
     */
    function claim(id, value, scope) {
        if (null == id) { throw new TypeError; }
        scope = scope || root;
        claimed[id] = scope[id]; // store previous value
        return scope[id] = value; 
    }
    
    /**
     * @param  {string|number} id
     * @param  {*=}            value
     * @param  {*=}            scope
     */
    function unclaim(id, value, scope) {
        if (null == id) { throw new TypeError; }
        scope = scope || root;
        if (null == value || value === scope[id])
            scope[id] = claimed[owns](id) ? claimed[id] : void 0;
        return value;
    }
    
    /**
     * @param  {Array|Object} fns
     * @param  {*=}           scope
     */
    function callEach(fns, scope) {
        if (!fns) { return; }
        for (var i = 0, l = fns.length; i < l; i++) {
            if (fns[i] && fns[i].call(scope) === false) {
                break;
            }
        }
    }

    /**
     * @param  {string|number} id
     * @link   wiki.commonjs.org/wiki/Modules/1.1.1
     */
    function require(id) {
        if (null == id) { throw new TypeError; }
        return (modules[owns](id) ? modules : root)[id];
    }
    require['main'] = void 0;
    
    /**
     * @param  {string|number} id
     * @param  {*=}            value
     */
    function provide(id, value) {
        if (null == id) { throw new TypeError; }
        modules[id] = value;
        handlers[owns](id) && callEach(handlers[id], this);
        return value;
    }
    
    /**
     * @param  {string|number|Function} id
     * @param  {*=}  value
     */
    function cmon(id, value) {
        if (typeof id == 'function')
            id.call(root, cmon);
        // check for 2 exactly so that arrays map v/i/a as require
        else return 2 == arguments.length ? provide(id, value) : require(id);
    }

    /**
     * @param  {string|number} id
     * @param  {Function=}     fn
     * @return {number}
     */    
    function on(id, fn) {
        return typeof fn == 'function' ? (
            handlers[id] = handlers[owns](id) && handlers[id] || []
        ).push(fn) : 0;
    }
    
    /**
     * @param  {string|number} id
     * @param  {Function=}     fn
     * @return {number}
     */
    function off(id, fn) {
        var fns, f, len = 0, i = 0;
        if (void 0 === fn) {
            handlers[id] = fn; // undefine (remove all)
        } else if (fns = handlers[id]) {
            for (handlers[id] = []; (f = fns[i]); i++) {
                f === fn || (handlers[id][len++] = f);
            }
        }
        return len;
    }
    
    /**
     * @this   {Object|Function}
     * @param  {(boolean|Function)=} fn 
     * @return {Object|Function}
     */
    function noConflict(fn) {
        unclaim('provide', provide);
        unclaim('require', require);
        fn && null != this['id'] && unclaim(this['id'], this);
        typeof fn == 'function' && fn.call(root, this); 
        return this;
    }

    cmon['on'] = provide['on'] = on;
    cmon['off'] = provide['off'] = off;
    cmon['provide'] = provide;
    cmon['require'] = require;
    cmon['claim'] = claim;
    cmon['unclaim'] = unclaim;
    cmon['noConflict'] = noConflict;
    return cmon;
}));