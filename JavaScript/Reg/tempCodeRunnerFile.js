const EVENTS = ["click", "focus", "blur", "keyup", "keydown", "keypress"]
const listeners = EVENTS.reduce(
  (res, type) => ((res[type] = event => this.$emit(type, event)), res),
  {}
)
console.log(listeners)