const person = Object.freeze([0,1,2,3,4,5]);

function addElement(arr) {
  return Object.freeze([...arr, arr.length]);
}

addElement(addElement(person));