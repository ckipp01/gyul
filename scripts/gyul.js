'use strict'
/* global CRATE */

class Gyul {
  constructor (page) {
    page
      ? this.key = page.substring(1)
      : this.key = 'home'
    this.tree = retrieveTree(this.key)
    this.template = {
      document: {
        header: [
          { type: 'h1', text: '귤 (gyul)' },
          { type: 'h2', text: this.tree.title },
          { type: 'div',
            children: [
              { type: 'p', text: 'info' },
              { type: 'p', text: 'stats' },
              { type: 'p', text: 'logs' },
              { type: 'p', text: 'tags' }
            ]
          }
        ],
        main: this.tree.body,
        footer: []
      }
    }
  }
  package () {
    for (const section in this.template.document) {
      const sectionElem =
        document.body.appendChild(createElem({ 'type': section }))
      this.template.document[section]
        .forEach(item => createAndAttatch(item, sectionElem))
    }
  }
}

const createElem = elemObject => {
  const el = document.createElement(elemObject.type)

  if (elemObject.text) {
    const tn = document.createTextNode(elemObject.text)
    el.appendChild(tn)
  }

  if (elemObject.attributes) {
    elemObject.attributes
      .map(attribute => el.setAttribute(attribute.type, attribute.value))
  }

  return el
}

const createAndAttatch = async (elemObject, sectionElem) => {
  let elem
  switch (elemObject.type) {
    case 'h1':
    case 'h2':
    case 'p':
      elem = await createElem({ 'type': elemObject.type, 'text': elemObject.text })
      break
    case 'img':
      elem = await createElem({ 'type': elemObject.type, 'attributes': elemObject.attributes })
      break
    case 'div':
      elem = await createElem({ 'type': elemObject.type })
      break
  }
  sectionElem.appendChild(elem)
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing
