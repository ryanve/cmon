# [cmon](../../)

#### [CommonJS](http://en.wikipedia.org/wiki/CommonJS) and [ender](https://github.com/ender-js/ender-js)-inspired require/provide with events

```sh
$ npm install cmon
```

## API ([0.6](../../releases))

### cmon()

- `cmon(id)` Delegate to `cmon.require(id)`.
- `cmon(id, value)` Delegate to `cmon.provide(id, value)`.
- `cmon(id, value, guard)` Delegate to `cmon.require(id)`.
- `cmon(fn)` Call `fn` in the root scope and receive `(cmon)`.

### .require / .provide

At runtime in a browser `cmon` claims the global `require`/`provide` **if** unclaimed. Otherwise access them as methods:

- `cmon.require(id)` Get a module that was provided via `cmon.provide`.
- `cmon.require(deps, fn)` Async (<var>fn</var> applies with <var>deps</var> when available).
- `cmon.provide(id, value)` Provide a module.
- `cmon.provide.on(id, fn)` Attach a handler to run anytime <var>id</var> is provided.
- `cmon.provide.one(id, fn)` Attach a 1-time handler to run the next time <var>id</var> is provided.
- `cmon.provide.off(id, fn)` Remove a handler.
- `cmon.provide.off(id)` Remove all <var>id</var> handlers.
- `cmon.provide.emit(id)` Manually trigger active `id` handlers.
- `cmon.able(id, fn?, timeout?)` Attach a 1-time handler runs when `id` is available&mdash;async.

### .claim / .unclaim

- `cmon.claim(id, value, target?)` Expose a module to the <b>root</b> or to <var>target</var>.
- `cmon.unclaim(id, value, target?)` Safely unexpose a module that was exposed via claim.

### .noConflict

- `cmon.noConflict()` Unclaim `require`/`provide`
- `cmon.noConflict(true)` Unclaim `require`/`provide`/`cmon`
- `cmon.noConflict(callback)` Unclaim `require`/`provide`/`cmon`

## Developers

<b>Contribute</b> by making edits in [`/src`](./src) or reporting [issues](../../issues).

```sh
$ npm install
$ grunt jshint:src
```

## Fund

Fund development with [tips to @ryanve](https://www.gittip.com/ryanve/) =)

## License: [MIT](http://opensource.org/licenses/MIT)

Copyright (C) 2013 by [Ryan Van Etten](https://github.com/ryanve)