/* what is containers in functional programming ?*/
/* container justo contain datas nothing else */
/* containers will only two tasks:
  1. keeping the inside itself
  2. giving us the value back, only when we require it
  3. never mutate the value inside them
*/
/* example of container: Arrays */
/* functors are a special type of containers */
/* functors are containers that can be used with 'map' function */

const arr = [8, 9, 19, 20, 21, 22, 23, 24, 25];
const b = arr[1];

/* never modify the origina array like */
arr.push(34) // never do this
// or
arr[1] = 12

// But you can always use them to create new ones

const arr2 = [...arr, 67, 79] // immutablility

// or

const even = (arr) => arr.filter(x => x % 2 === 0);

// yes Array is a functor
/* A functor is a container which can be mapped upon by a unary function */
/* 
  Functors are a mapping using a function f(x) (or composition function f(g(x)) for instance) 
  on a category A generating a category B, creating new image, respecting the morphism. In other
  words, is any object we can map and apply a function generating another object instance of the
  same type and connections (have the same number of items).

  A     B
  a. -> a'. 
  b. -> b'.
  c. -> c'.
  d. -> d'.
  e. -> e'.
  
  class MyArray extends Array {
    static get [Symbol.species]() {
      return Array
    }
  }

  const a = new MyArray(1, 2, 3, 4, 5, 6, 7, 8)
  const mapped = a.map((x) => x * x)

  console.log(mapped instanceof MyArray) // false
  console.log(mapped instanceof Array) // true


class Train {
  constructor(connectedWagons=[]){
    this.wagons = ["engine", "coal", ...connectedWagons];
    this.metersSize = 8 * this.wagons.length;
  }
  
  static get[Symbol.species]() {
    return this;
  }
  
  map(func) {
    const [engine, coal, ...others] = this.wagons;
    const This = this.constructor[Symbol.species];
    
    return new This(others.map(func)); // And the magic happens here!
  }
  
  beep() {
    console.log("Beeeeeeeep! Beeeeeeeeep!");
  }
}


class Zord {
  static of(...values) {
    const This = this[Symbol.species];
    return new This(...values);
  }

  static get [Symbol.species]() {
    return this;
  }

  constructor(...values) {
    this._values = values
  }

  map(actor=(x) => x) {
    const This = this.constructor[Symbol.species];
    return new This(...this._values.map(actor));
  }

  flatMap(actor=(x) => x) {
    const This = this.constructor[Symbol.species];

    //We need to flatten the result array, as it can result in [ val1, [val2], [val3] ]
    const result = [].concat.apply([], this._values.map(value => {
      //Here we check if we need lift/unwrap from a inner Zord
      if (value instanceof This) {
        return value._values.map(actor);
      }
      else return actor(value);
    }));

    return This.of(...result); //We make sure to always return a new instance
  }

  lass CustomZord extends Zord {
  finalAtack(){
    this.flatMap(ranger => console.log(`${ranger} ready!`));
    console.log("Slice, slice, turns around ... BOOM! (epic explosion in background)");
  }
}

const megaDragonZord = CustomZord.of(
  "green",
  CustomZord.of("red"),
  CustomZord.of("blue"),
  CustomZord.of("yellow"),
  CustomZord.of("pink"),
  CustomZord.of("black")
);

megaDragonZord
  .flatMap(color => `${color} ranger`) // Put the complete name on them, e.g. "red ranger"
  .finalAtack(); // Logs "green ranger ready" ... "red ranger ready" ... and at the end: "Slice, slice ..."

}
*/
/* 
  When I say mapped upon, I mean that this container can be treated with a special 
  function(say fmap or map) which applies any unary function to every content of this 
  container and returns a container with the resulting values as its contents. 
*/

/* example */

Array([1,2,3,4]).map(x => x*2)// => [2,4,6,8]

// we can do a chain of array transformations
Array([1,2,3,4]).map(x => x*2).map(x => x*3).map(x => x + 1)
// console.log(map(String, [1, 2, 3]))

/* 
  a map function never changes the container, instead it 
  just act upon its contents. Keeping the container retained.
*/
/* A map will not change the type of the container but it can change the type of its contents */

/* definition of the map function 
  map :: (a -> b) -> [a] -> [b]
  or
  fmap :: (a -> b) -> F a -> F b

  a -> b means any unary function that takes a and returns b like
  multiplyBy2(3) = 6 // is a -> b as 3 -> 6
  in other words 'multiplyBy2' is the arrow '->'

  and Fa -> Fb means any unary function that takes a Container 
  with a inside and returns a Container with b inside.

  multiplyArrBy2([1]) = [2] // is Fa -> Fb as [1] -> [2], F is [] and, again, 
  multiplyArrBy2 is the '->' (arrow)

  our map function promoted or 'lifted' our function so that it can 
  act on our containers or arrays in this case.

*/

/* Functions */

/* All Functions are functors too and hence are also containers */
/* 
  containers contains data and function containers logic, so how can functions be containers
  the answer:
  a function, when called, returns a value. So in a way, it is containing our
  value, the only difference is that the value is dynamically computed.

  aFunction(45) // => 90

  Think of them as arrays of infinite number of values and 
  if you want a particular value from those, you need 
  to call the function with the particular argument or arguments.

  Functions are arrays with Infinite Values

  const a = [ 8, 10, 23, 35, 54 ]

  const f = z => z * 2

  a[1] = 10f(2) = 4

  Functions are containers with infinite no. of values.

  const fnMap = (f, mappingFn) => (x => f(mappingFn(x)))


  in functional programming never use your data naked. Always wrap it inside a container.
*/

// compose function
const fnMap = (f, mappingFn) => (x => f(mappingFn(x)))
const multBy2and3 = fnMap(
  x => x*2,
  x => x*3
)
console.log(multBy2and3(4))

/* single unit: monada (contextualizar e descontextualizar um valor) */
/* monads is an endofunctor, where a category is map to same category */
/* types of monads */

/* Identity */
const Identity = x => ({
  emit: () => x, // altenative name join, value and valueOf
  chain: f => f(x), // alternative names flatMap, bind which is intended to chain various monads together
  map: f => Identity(f(x)), // alternative name fmap
  inspect: () => `Identity(${x})`
});

const IdentityOf = x => Identity(x);

const exportIdentity = {
  of: IdentityOf
}
const one = Identity.of(1);
const two = one.map(a => a + 1);

console.log(two.inspect());

/* List */
const List = x => ({
  emit: () => x,
  chain: f => f(x),
  map: f => List.of(f(x)),
  inspect: () => `List(${x})`
});
const concat = a => List.of(x.concat(a))

// e.g.

const myNumbers = List.of([1, 3, 4, 7, 10]);

myNumbers.concat([12]).inspect();
/* Maybe */
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

const MaybeOf = x => x === null || x === undefined || x.isNothing ? 
  Nothing() : 
  Just(x);

const Maybe = {
  of: MaybeOf
};


const fahrenheitToCelsius = a => (a - 32) * 0.5556;

const reading1 = 15;
const reading2 = null;

Maybe.of(reading1)
    .map(fahrenheitToCelsius)
    .fork(
        _ => display('ERR!'),
        t => display(`${t}°C`) // will read `-9.4452°C`
    );

Maybe.of(reading2)
    .map(fahrenheitToCelsius)
    .fork(
        _ => display('ERR!'), // will read `ERR!`
        t => display(`${t}°C`)
    );