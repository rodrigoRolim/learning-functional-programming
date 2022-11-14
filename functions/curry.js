// Concept from lambda calculus

function curry1(f) {
  return function currify() {
    const args = Array.prototype.slice.call(arguments);
    return args.length >= f.length ?
      f.apply(null, args) :
      currify.bind(null, ...args)
  }
}

const curry2 = (fn) => {
  return curried = (...args) => {
    if (fn.length !== args.length) {
      return curried.bind(null, ...args);
    }
    return fn(...args);
  }
}
// Currying takes a function that receives more than one parameter
// and breaks it into a series of unary (one parameters) functions

// Therefore, a curried function only takes one parameter at a time

// examples 

const buildSandwich = (ingredient1) => {
  return (ingredient2) => {
    return (ingredient3) => {
      return `${ingredient1}, ${ingredient2}, ${ingredient3}`
    }
  }
}

const mySandwich = buildSandwich("bread")("meat")("tomato");

const buildSammy = ingredient1 => ingredient2 => ingredient3 => ``

const multiply = (x, y) => x * y;

const curriedMultiply = x => y => x * y;

console.log(multiply(2, 3));
console.log(curriedMultiply(2));
console.log(curriedMultiply(2)(3));

// Another example
//const updateElemText = id => content => document.querySelector(`#${id}`).textContent = content;
//const updateHeaderText = updateElemText("header");
// updateHeaderText("Hello!");


// Another common use of currying is function composition 
// Allows calling small functions in a specific order

const addCustomer = fn => (...args) => {
  console.log("saving customer info...");
  return fn(...args);
}

const processOrder = fn => (...args) => {
  console.log(`processing order #${args[0]}`);
  return fn(...args);
}

let completeOrder = (...args) => {
  console.log(`order #${[...args].toString()} completed.`);
}

completeOrder = (processOrder(completeOrder));
completeOrder = (addCustomer(completeOrder));
completeOrder("1000");