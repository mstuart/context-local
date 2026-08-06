<div align="center">
  <img src="docs/assets/logo.svg" alt="context-local — Ergonomic typed context for async flows using AsyncLocalStorage" width="720">
</div>

<p align="center"><strong>Ergonomic typed context for async flows using AsyncLocalStorage</strong></p>

<p align="center">
  <a href="https://github.com/mstuart/context-local/actions/workflows/main.yml"><img src="https://github.com/mstuart/context-local/actions/workflows/main.yml/badge.svg" alt="CI"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License: MIT"></a>
  <a href="https://www.npmjs.com/package/context-local"><img src="https://img.shields.io/npm/v/context-local?label=npm" alt="npm"></a>
  <img src="https://img.shields.io/badge/node-%E2%89%A520-339933.svg" alt="Node 20+">
</p>

---
## Install

```sh
npm install context-local
```

## Usage

```js
import createContext from 'context-local';

const userContext = createContext({name: 'anonymous'});

userContext.run({name: 'Alice'}, () => {
	console.log(userContext.get());
	//=> {name: 'Alice'}
});

console.log(userContext.get());
//=> {name: 'anonymous'}
```

## API

### createContext(defaultValue?)

Returns a context object with `run`, `get`, and `runWith` methods.

#### defaultValue

Type: `T`

The default value returned by `.get()` when outside a `.run()` scope.

### context.run(value, function_)

Runs `function_` with `value` in the async context. Returns the result of `function_`.

### context.get()

Returns the current context value or the default value.

### context.runWith(value)

Returns a curried function `(fn) => context.run(value, fn)`.

## Related

- [node:async_hooks](https://nodejs.org/api/async_hooks.html) - Node.js AsyncLocalStorage

## License

MIT
