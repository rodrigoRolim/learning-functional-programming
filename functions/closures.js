// Lexical Scope defines how variables names are resolved in nested functions.

// Nested(child) functions hava access to the scope of their parent functions


// This is often confused whit closure, but lexical scope is only an important part of closure

// "A Closure is a function having access to the parent scope, even after the parent function has closed"

// A closure is created when define a function, not when a function is executed

// global scope
let x = 1

const parentFunction = () => {
  // local scope
  let myValue = 2;
  console.log(x);
  console.log(myValue);

  const childParent = () => {
    console.log(x += 5);
    console.log(myValue += 1);
  };

  return childParent;
}

const result = parentFunction();

result();
result();
result();



// IIFE (Immediately Invoked Function Expression)

const privateCounter = (() => {
  let count = 0;
  console.log("initial value:", count);
  return () => { count += 1; console.log(count); };
})();

privateCounter();
privateCounter();




const credits = ((num) => {
  let credits = num;
  console.log("initial creadits value:", credits);
  return () => {
    credits -= 1;
    if (credits > 0) console.log("playing game", credits, "credits(s) remaining");
    if (credits <= 0) console.log("not enough credits");
  }
})(3)

credits()
credits()
credits()