'use strict'
/* global CRATE */

class Gyul {
  constructor (page) {
    this.key = page.substring(1)
    this.tree = retrieveTree(this.key)
    this.template = {
      document: {
        header: [
          { type: 'h1',
            text: '귤 (gyul)'
          },
          { type: 'h2',
            text: this.tree.title
          }
        ],
        main: this.tree.body,
        footer: []
      }
    }
  }
  package () {
    for (const section in this.template.document) {
      const sectionElem = document.body.appendChild(createElem(section))
      this.template.document[section]
        .forEach(item => createAndAttatch(item, sectionElem))
    }
  }
}

const createElem = (type, text = null) => {
  const el = document.createElement(type)

  if (text) {
    const tn = document.createTextNode(text)
    el.appendChild(tn)
  }

  console.log(el)
  return el
}

const createAndAttatch = async (elemObject, sectionElem) => {
  let elem
  switch (elemObject.type) {
    case 'h1':
    case 'h2':
    case 'p':
      elem = await createElem(elemObject.type, elemObject.text)
      break
    case 'img':
      break
  }
  sectionElem.appendChild(elem)
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing
const retrieveTabData = key => {}
