// pure
const add = function (x, y) {
  return x + y;
}
// impure
function add (x, y) {
  console.log(x + y);
  return x + y;
}