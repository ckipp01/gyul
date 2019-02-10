'use strict'
/* global CRATE:true */

class Gyul {
  constructor (key) {
    this.key = key.substring(1)
    this.tree = retrieveTree(this.key)
  }
  package () {
    this.tree.body.forEach(item => {
      const elem = Object.keys(item)[0]
      document.body.appendChild(createElem(elem, item[elem]))
    })
  }
}

const createElem = (type, text) => {
  const el = document.createElement(type)
  const tn = document.createTextNode(text)

  el.appendChild(tn)

  return el
}

const retrieveTree = key => CRATE[key]
