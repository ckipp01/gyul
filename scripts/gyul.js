'use strict'

class Gyul {
  view () {
    document.body.appendChild(h1('gyul'))
  }
}

const createElem = (type, text) => {
  const el = document.createElement(type)
  const tn = document.createTextNode(text)

  el.appendChild(tn)

  return el
}

const h1 = text => createElem('h1', text)
