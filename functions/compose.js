const compose = (...fns) => x => fns.reduceRight((v, f) => f(v), x);
const composeM = chainMethod => (...ms) => (
  ms.reduce((f, g) => x => {
    console.log(g(x), f, chainMethod, g(x)[chainMethod](f)) 
    return g(x)[chainMethod](f)
  })
);
const composePromises = composeM("then");

// example compose promise
const trace = label => value => {
  console.log(`${ label }: ${ value }`);
  return value;
};
const label = 'API call composition';
  // a => Promise(b)
const getUserById = id => id === 3 ?
  Promise.resolve({ name: 'Kurt', role: 'Author' }) :
  undefined
;
// b => Promise(c)
const hasPermission = ({ role }) => (
  Promise.resolve(role === 'Author')
);
// Compose the functions (this works!)
const authUser = composePromises(hasPermission, getUserById);
authUser(3).then(trace(label)); // true

// functions map: a => b
// functors map with context: Functor(a) => Functor(b)
// Monads flatten and map with context: Monad(Monad(a)) => Monad(b)

/* monads is based on a simple symmetry - A way to wrap a value into a context,
 * and a way to unwrap the value from the context

  lift/unit a type lift from some type into the monad context: a => M(a)
  flatten/join Unwrapping the type from the context: M(a) => a
  Map: Map with context preserved: M(a) => M(b)
  flatMap/chain: Flatten + Map: M(M(a)) => M(b)
*/

// identity monad
const Id = value => ({
  map: f => Id.of(f(value)),
  chain: f => f(value),
  toString: f => `Id(${ value })`
})

Id.of = Id

/* 
Left identity: unit(x).chain(f) ==== f(x)
Right identity: m.chain(unit) ==== m
Associativity: m.chain(f).chain(g) ==== m.chain(x => f(x).chain(g))
*/