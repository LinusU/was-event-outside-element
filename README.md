# Was event outside element?

Check if an event was outside a specific element.

## Installation

```sh
npm install --save was-event-outside-element
```

## Usage

```javascript
var wasEventOutsideElement = require('was-event-outside-element')
var div = document.getElementById('click-outside-me')

document.body.addEventListener('click', function (ev) {
  if (wasEventOutsideElement(ev, div)) {
    alert('You clicked outside the div!')
  }
})
```

## API

### `wasEventOutsideElement(event, element)`

Check whether the event `event` occurred outside of the element `element`.

## Tests

Run `npm test` to compile the tests using `browserify` and then run them in
your default browser.
