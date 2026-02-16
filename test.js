import test from 'ava';
import createContext from './index.js';

test('.get() returns default value outside .run()', t => {
	const context = createContext('default');
	t.is(context.get(), 'default');
});

test('.get() returns undefined when no default', t => {
	const context = createContext();
	t.is(context.get(), undefined);
});

test('.get() returns set value inside .run()', t => {
	const context = createContext('default');
	context.run('override', () => {
		t.is(context.get(), 'override');
	});
});

test('value reverts after .run()', t => {
	const context = createContext('default');
	context.run('temp', () => {});
	t.is(context.get(), 'default');
});

test('nested runs override', t => {
	const context = createContext('outer-default');
	context.run('outer', () => {
		t.is(context.get(), 'outer');
		context.run('inner', () => {
			t.is(context.get(), 'inner');
		});
		t.is(context.get(), 'outer');
	});
	t.is(context.get(), 'outer-default');
});

test('async propagation', async t => {
	const context = createContext('default');
	await context.run('async-value', async () => {
		await new Promise(resolve => {
			setTimeout(resolve, 10);
		});
		t.is(context.get(), 'async-value');
	});
});

test('value available in awaited promises', async t => {
	const context = createContext('default');
	await context.run('promise-value', async () => {
		const result = await Promise.resolve().then(() => context.get());
		t.is(result, 'promise-value');
	});
});

test('deeply nested async propagation', async t => {
	const context = createContext('default');
	await context.run('deep', async () => {
		const inner = async () => {
			await new Promise(resolve => {
				setTimeout(resolve, 5);
			});
			return context.get();
		};

		const result = await inner();
		t.is(result, 'deep');
	});
});

test('runWith curried form', t => {
	const context = createContext('default');
	const withValue = context.runWith('curried');
	const result = withValue(() => context.get());
	t.is(result, 'curried');
});

test('runWith does not affect outside scope', t => {
	const context = createContext('default');
	const withValue = context.runWith('scoped');
	withValue(() => {
		t.is(context.get(), 'scoped');
	});
	t.is(context.get(), 'default');
});

test('runWith returns function result', t => {
	const context = createContext('default');
	const withValue = context.runWith('test');
	const result = withValue(() => 42);
	t.is(result, 42);
});

test('multiple contexts are independent', t => {
	const contextA = createContext('a-default');
	const contextB = createContext('b-default');

	contextA.run('a-value', () => {
		t.is(contextA.get(), 'a-value');
		t.is(contextB.get(), 'b-default');

		contextB.run('b-value', () => {
			t.is(contextA.get(), 'a-value');
			t.is(contextB.get(), 'b-value');
		});

		t.is(contextB.get(), 'b-default');
	});
});

test('.run() returns function result', t => {
	const context = createContext('default');
	const result = context.run('value', () => 'returned');
	t.is(result, 'returned');
});

test('object as context value', t => {
	const context = createContext({id: 0});
	context.run({id: 42}, () => {
		t.deepEqual(context.get(), {id: 42});
	});
});

test('null as context value', t => {
	const context = createContext('default');
	context.run(null, () => {
		t.is(context.get(), null);
	});
});

test('zero as context value', t => {
	const context = createContext(99);
	context.run(0, () => {
		t.is(context.get(), 0);
	});
});

test('empty string as context value', t => {
	const context = createContext('default');
	context.run('', () => {
		t.is(context.get(), '');
	});
});

test('false as context value', t => {
	const context = createContext(true);
	context.run(false, () => {
		t.is(context.get(), false);
	});
});
