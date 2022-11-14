function app(state, output) {
  compose(
    append(view(state)),
    clear(),
  )(output);

}

function fullName({firstName, lastName}) {
  return `${firstName} ${lastName}`;
}

function view(state) {
  const el = elem("div");
  const add = flip(append)(el)
  state
    .map(buildPerson)
    .forEach(add)
  return el;
}
function buildPerson(person, index) {
  return compose(
    append(text(fullName(person))),
    attr("data-index", index),
    addClass("text-white"),
    addClass("bg-secondary"),
    addClass("p-2")
  )(elem("div"))
}

app(
  Object.freeze([
    {
      firstName: "jane",
      lastName: "Doe",
      age: 34
    },
    {
      firstName: "rodrigo",
      lastName: "veras",
      age: 30
    },
    {
      firstName: "jane",
      lastName: "Doe",
      age: 34
    }
  ]),
  getElem("message-list")
)