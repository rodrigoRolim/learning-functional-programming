const compose = (...functions) => x => functions.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...functions) => x => functions.reduce((acc, fn) => fn(acc), x);
const flip = fn => b => a => fn(a)(b);

function curry(f) {
  return function currify() {
    const args = Array.prototype.slice.call(arguments);
    return args.length >= f.length ?
      f.apply(null, args) :
      currify.bind(null, ...args)
  }
}
