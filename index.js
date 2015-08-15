function wasEventOutsideElement (event, element) {
  var eventTarget = event.target

  while (eventTarget) {
    if (eventTarget === element) return false
    eventTarget = eventTarget.parentNode
  }

  return true
}

module.exports = wasEventOutsideElement
