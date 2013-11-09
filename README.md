# [cmon](../../)

#### [CommonJS](http://en.wikipedia.org/wiki/CommonJS) and [ender](https://github.com/ender-js/ender-js)-inspired require/provide with events

```sh
$ npm install cmon
```

## API ([0.6](../../releases))

### cmon()

- `cmon(id)` - delegate to `cmon.require(id)`
- `cmon(id, value)` - delegate to `cmon.provide(id, value)`
- `cmon(id, value, guard)` - delegate to `cmon.require(id)`
- `cmon(fn)` - call `fn` in the root scope and receive `(cmon)`

### .require / .provide

At runtime in a browser `cmon` claims the global `require`/`provide` **if** unclaimed. Otherwise access them as methods:

- `cmon.require(id)` get a module that was provided via `cmon.provide`
- `cmon.require(deps, fn)` async (<var>fn</var> applies with <var>deps</var> when available)
- `cmon.provide(id, value)` provide a module
- `cmon.provide.on(id, fn)` attach a handler to run anytime <var>id</var> is provided
- `cmon.provide.one(id, fn)` attach a 1-time handler to run the next time <var>id</var> is provided
- `cmon.provide.off(id, fn)` remove a handler
- `cmon.provide.off(id)` remove all <var>id</var> handlers
- `cmon.provide.emit(id)` manually trigger active `id` handlers
- `cmon.able(id, fn?, timeout?)` attach a 1-time handler runs when `id` is available&mdash;async.

### .claim / .unclaim

- `cmon.claim(id, value, target?)` - expose a module to the <b>root</b> or to <var>target</var>
- `cmon.unclaim(id, value, target?)` - safely unexpose a module that was exposed via claim

### .noConflict

- `cmon.noConflict()` - unclaim `require`/`provide`
- `cmon.noConflict(true)` - unclaim `require`/`provide`/`cmon`
- `cmon.noConflict(callback)` - unclaim `require`/`provide`/`cmon`

## License: [MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)