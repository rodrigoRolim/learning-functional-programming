// A category is just a collection of objects and arrows between objects
/* 
    category C   -->   category D
    X ->[f] Y   -> F   F(x) ->[F(f)] F(y)
*/
const Functor = (v) => ({
  value: v, // unwrapper
  map: (f) => Functor(f(v)) // recursion (wrapper)
});
var s = Functor(2)
  .map(x => x * x)
  .map(x => x.toString());

console.log(s.value) // '4'

// monad identity: a function which simply returns the value given to it.
const Identity = x => ({
  emit: () => x, // or join
  chain: f => f(x), // flatMap or bind
  map: f => Identity(f(x)),
  inspect: () => `Identity(${x})`
});
const one = identity(1);
console.log(one.emit()) // 1
console.log(one.chain(a => a + 1)) // without recursion -> 2 usado para encadear monads
// console.log(one.chain(a => SomeMonad(a + 1))
// monad List (trantando Array como se fossem monads)
const List = x => ({
  emit: () => x,
  chain: f => f(x),
  map: f => List(f(x)),
  concat: a => List(x.concat(a)),
  head: () => x[0],
  inspect: () => `List(${x})`
});
// Maybe Or Option
const Just = (x) => ({
  chain: f => f(x),
  emit: () => x,
  map: f => MaybeOf(f(x)),
  fork: (_, g) => g(x),
  isJust: true,
  isNothing: false,
  inspect: () => `Just(${x})`,
});

const Nothing = (x) => ({
  chain: _ => Nothing(),
  emit: () => Nothing(),
  map: _ => Nothing(),
  fork: (f, _) => f(),
  isJust: false,
  isNothing: true,
  inspect: () => `Nothing`,
});

const Maybe = { of: x => x === null || x === undefined || x.isNothing ? Nothing() : Just(x) };
const fahrenheitToCelsius = a => (a - 32) * 0.5556;

const reading1 = 15;
const reading2 = null;

const temp1C = Maybe.of(reading1)
                    .map(fahrenheitToCelsius);

console.log(temp1C.inspect());
// > Just(-9.4444)

const temp2C = Maybe.of(reading2)
                    .map(fahrenheitToCelsius);

console.log(temp2C.inspect());
// > Nothing()
function Monad() {
  return function unit(value) {
    var monad = Object.create(null);
    monad.bind = function (func) {
      return func(value);
    };
    return monad;
  };
}

var identity = Monad();
var monad = identity("Hello World");
monad.bind(console.log).bind();