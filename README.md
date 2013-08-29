# [cmon](https://github.com/ryanve/cmon)

[CommonJS](http://en.wikipedia.org/wiki/CommonJS) and [ender](https://github.com/ender-js/ender-js)-inspired require/provide with events

```
$ npm install cmon
```

## API

### cmon()

- `cmon(id)` - delegates to `cmon.require(id)`
- `cmon(id, value)` - delegates to `cmon.provide(id, value)`
- `cmon(id, value, guard)` - delegates to `cmon.require(id)`
- `cmon(callback)` - runs in the root scope and receives `(cmon)`

### require/provide

At runtime in a browser `cmon` claims the global `require`/`provide` **if** unclaimed. Otherwise access them as methods:

- `cmon.require(id)` - get a module that was provided via `cmon.provide`
- `cmon.provide(id, value)` - provide a module
- `cmon.provide.on(id, handler)` - attach a handler to run anytime `id` is provided
- `cmon.provide.one(id, handler)` - attach a 1-time handler to run the next time `id` is provided
- `cmon.provide.able(id, handler)` - attach a 1-time handler to run when `id` is available&mdash;now or later.
- `cmon.provide.off(id, handler)` - remove a handler
- `cmon.provide.off(id)` - remove all `id` handlers
- `cmon.provide.trigger(id)` - manually trigger active `id` handlers

### claim/unclaim

- `cmon.claim(id, value, opt_scope)` - expose a module to the **root** or `opt_scope`
- `cmon.unclaim(id, value, opt_scope)` - safely unexpose a module that was exposed via claim

### noConflict

- `cmon.noConflict()` - unclaim `require`/`provide`
- `cmon.noConflict(true)` - unclaim `require`/`provide`/`cmon`
- `cmon.noConflict(callback)` - unclaim `require`/`provide`/`cmon`


## license

### [cmon](http://github.com/ryanve/cmon) is available under the [MIT license](http://en.wikipedia.org/wiki/MIT_License)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)