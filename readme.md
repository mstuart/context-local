# context-local

> Ergonomic typed context for async flows using AsyncLocalStorage

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
