function app(state, output, dispatch) {
  compose(
    append(view(state)),
    clear(),
  )(output);

  const stop = dispatch((e) => {
    stop();
    const newText = getText();
    const newState = [
      ...state,
      newText
    ]

    setText("");

    app(newState, output, dispatch);
  });

}

function view(state) {
  const el = elem("div");

  return state.length ? pipe(
    ...state.map((content, index) => append(message(content, index)))
  )(elem("div")) : el;
}
function message(content) {
  return compose(
    append(text(content)),
    attr("data-message", content),
    addClass("bg-warning"),
    addClass("p-2")
  )(elem("div"))
}

const buttonClick = on("click", getElem("message-button"))

app(
  Object.freeze([]),
  getElem("message-list"),
  buttonClick
)