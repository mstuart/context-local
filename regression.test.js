import test from "ava";
import createContext from "./index.js";

test("contexts without a default are undefined outside their scopes", (t) => {
  const context = createContext();
  t.is(context.get(), undefined);
  t.is(
    context.run(42, () => context.get()),
    42
  );
  t.is(context.get(), undefined);
});

test("curried runners preserve independent callback results", async (t) => {
  const context = createContext("default");
  const run = context.runWith("scoped");
  t.is(
    run(() => 42),
    42
  );
  t.is(
    run(() => context.get()),
    "scoped"
  );
  t.is(await run(async () => context.get()), "scoped");
  t.is(context.get(), "default");
});
