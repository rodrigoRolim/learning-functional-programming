const initApp = () => {
  const memoizedMultiplyBy10 = memoize(multiplyBy10);
  console.log(memoizedMultiplyBy10(10));
  console.log(memoizedMultiplyBy10(10));
  console.log(memoizedMultiplyBy10(10));
}

const multiplyBy10 = (num) => {
  return num * 10;
}

const add3 = (num1, num2, num3) => {
  return num1 + num2 + num3;
}

const addMany = (...args) => {
  return args.reduce((acc, num) => acc + num)
}
const memoizedMultiplyBy10 = () => {
  const cache = {};

  return (num) => {
    if (num in cache) {
      console.log(cache);
      return cache[num];
    }
    const result = num * 10;
    cache[num] = result;
    return result;
  };
}

const memoize = (fn) => {
  const cache = {};

  return (...args) => {
    if (args.toString() in cache) {
      console.log(cache)

      return cache[args.toString()]
    }
    result = fn(...args);
    cache[args.toString()] = result;
    return result
  }
}

initApp()