export type Context<T> = {
	/**
	Run a function with the given value in the async context.

	@param value - The context value.
	@param function_ - The function to run.
	@returns The result of function_.
	*/
	run<R>(value: T, function_: () => R): R;

	/**
	Get the current context value or the default value.

	@returns The current context value.
	*/
	get(): T;

	/**
	Create a curried runner that wraps functions to run in the given context.

	@param value - The context value.
	@returns A function that takes a function and runs it in the context.
	*/
	runWith<R>(value: T): (function_: () => R) => R;
};

/**
Create a typed async context with an optional default value.

@param defaultValue - The default value returned by `.get()` when outside a `.run()` scope.
@returns A context object with `run`, `get`, and `runWith` methods.

@example
```
import createContext from 'context-local';

const userContext = createContext({name: 'anonymous'});

userContext.run({name: 'Alice'}, () => {
	console.log(userContext.get()); // {name: 'Alice'}
});
```
*/
export default function createContext<T>(defaultValue?: T): Context<T>;
