import {AsyncLocalStorage} from 'node:async_hooks';

/**
Create a typed async context with an optional default value.

@param {*} [defaultValue] - The default value returned by `.get()` when outside a `.run()` scope.
@returns {{run: Function, get: Function, runWith: Function}} A context object.
*/
export default function createContext(defaultValue) {
	const storage = new AsyncLocalStorage();

	return {
		/**
		Run a function with the given value in the async context.

		@param {*} value - The context value.
		@param {Function} function_ - The function to run.
		@returns {*} The result of function_.
		*/
		run(value, function_) {
			return storage.run(value, function_);
		},

		/**
		Get the current context value or the default value.

		@returns {*} The current context value.
		*/
		get() {
			const value = storage.getStore();
			return value === undefined ? defaultValue : value;
		},

		/**
		Create a curried runner that wraps functions to run in the given context.

		@param {*} value - The context value.
		@returns {Function} A function that takes a function and runs it in the context.
		*/
		runWith(value) {
			return function_ => storage.run(value, function_);
		},
	};
}
