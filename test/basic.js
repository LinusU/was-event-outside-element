/* eslint-env mocha, browser */

var assert = require('assert')
var wasEventOutsideElement = require('../')

var eventName = 'test'

var cases = [
  { trigger: 'A', check: 'A', expect: false },
  { trigger: 'A', check: 'B', expect: true },
  { trigger: 'A', check: 'C', expect: true },
  { trigger: 'B', check: 'A', expect: true },
  { trigger: 'B', check: 'B', expect: false },
  { trigger: 'B', check: 'C', expect: true },
  { trigger: 'C', check: 'A', expect: true },
  { trigger: 'C', check: 'B', expect: false },
  { trigger: 'C', check: 'C', expect: false }
]

describe('Was event outside element?', function () {
  var elements = {}

  before(function () {
    elements.root = document.createElement('div')
    elements.root.innerHTML = '<div key=a>A</div><div key=b>B<div key=c>C</div></div>'

    elements.A = elements.root.querySelector('[key=a]')
    elements.B = elements.root.querySelector('[key=b]')
    elements.C = elements.root.querySelector('[key=c]')

    document.body.appendChild(elements.root)
  })

  after(function () {
    document.body.removeChild(elements.root)
  })

  cases.forEach(function (c) {
    var name = (
      'should detect that event in ' +
      c.trigger + ' was ' +
      (c.expect ? 'outside' : 'inside') +
      ' of ' + c.check
    )

    it(name, function (done) {
      var ev = new Event(eventName)
      var elT = elements[c.trigger]
      var elC = elements[c.check]

      function listener (ev) {
        elT.removeEventListener(eventName, listener)
        assert.equal(wasEventOutsideElement(ev, elC), c.expect)
        done()
      }

      elT.addEventListener(eventName, listener)
      elT.dispatchEvent(ev)
    })
  })
})
