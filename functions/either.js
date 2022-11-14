
/* 
  Basic Concept is Functor(a) => Functor(b)
  
  const Left = x => f => g => f(x) // sad path
  const Right = x => f => g => g(x) // happy path
  const Either = e => f => g => e(f)(g);

  const eitherJsNumOrOther = (val) => Number.isInteger(val)
    ? Right(val)
    : Left('is not integer')


  console.log(eitherJsNumOrOther(10)(console.error)(x => x + 5));

  console.log(Either(Left(0))(x => x + 1)(x => x - 1))
*/
const L = x => y => f => g => f(x)(g(y))
const right = (v) => ({
  map: (f) => right(f(v)),
  matchWith: (pattern) => pattern.right(v)
})
const left = (v) => ({
  map: () => left(v),
  matchWith: (pattern) => pattern.left(v)
});

var Try = (f) => {
  try {
    var result = f();
    return right(result);
  } catch (e) {
    return left(e);
  }
}

Try(() => 3/4)
  .map(x => 'the computation result is' + x)
  .matchWith({
    right: v => console.log(v),
    left: v => console.error("error :", v)
  });

Try(() => 3/2)
  .map(x=>`the computation result is :${x}`)
  .matchWith({
    right: v => console.log(v),
    left: v => console.log("error : " + v)
  })
  
right(4)
  .map(x => x * x)
  .matchWith({
    right: v => console.log(v),
    left: v => console.log("left" + v)
  })
  
left(4)
  .map(x => x * x)
  .matchWith({
    right: v => console.log(v),
    left: v => console.log("left " + v)
  })
