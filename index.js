import { AsyncLocalStorage } from "node:async_hooks";

/**
Create a typed async context with an optional default value.

@param {unknown} [defaultValue] - The default value returned by `.get()` when outside a `.run()` scope.
@returns {{run: (value: unknown, function_: (...arguments_: unknown[]) => unknown) => unknown, get: () => unknown, runWith: (value: unknown) => (function_: (...arguments_: unknown[]) => unknown) => unknown}} A context object.
*/
export default function createContext(defaultValue) {
  const storage = new AsyncLocalStorage();

  return {
    /**
		Get the current context value or the default value.

		@returns {unknown} The current context value.
		*/
    get() {
      const store = storage.getStore();
      return store === undefined ? defaultValue : store.value;
    },
    /**
		Run a function with the given value in the async context.

		@param {unknown} value - The context value.
		@param {(...arguments_: unknown[]) => unknown} function_ - The function to run.
		@returns {unknown} The result of function_.
		*/
    run(value, function_) {
      return storage.run({ value }, function_);
    },

    /**
		Create a curried runner that wraps functions to run in the given context.

		@param {unknown} value - The context value.
		@returns {(...arguments_: unknown[]) => unknown} A function that takes a function and runs it in the context.
		*/
    runWith(value) {
      return (function_) => storage.run({ value }, function_);
    },
  };
}
