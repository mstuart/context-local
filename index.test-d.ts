import {expectType} from 'tsd';
import createContext, {type Context} from './index.js';

// Create with default value
const stringContext = createContext('default');
expectType<Context<string>>(stringContext);
expectType<string>(stringContext.get());

// Run returns the function result
expectType<number>(stringContext.run('value', () => 42));

// RunWith returns a function wrapper
const result = stringContext.runWith<number>('scoped')(() => 42);
expectType<number>(result);

// Create without default
const numberContext = createContext<number>();
expectType<Context<number>>(numberContext);
expectType<number>(numberContext.get());

// Object context
const objectContext = createContext({id: 0, name: ''});
expectType<{id: number; name: string}>(objectContext.get());
