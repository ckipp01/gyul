'use strict'
/* global CRATE */

class Gyul {
  constructor (page) {
    this.key = page.substring(1)
    this.tree = retrieveTree(this.key)
    this.template = {
      document: {
        header: {
          logo: {
            h1: '귤 (gyul)'
          },
          title: {
            h2: this.tree.title
          },
          tabs: retrieveTabData(this.key)
        },
        main: {
          image: this.tree.image ? this.tree.image : null,
          content: {
            tracker: 'test'
          }
        },
        footer: {}
      }
    }
  }
  package () {
    for (const section in this.template.document) {
      const sectionElem = document.body.appendChild(createElem(section))
    }
  }
}

const createElem = (type, text = null) => {
  const el = document.createElement(type)

  if (text) {
    const tn = document.createTextNode(text)
    el.appendChild(tn)
  }

  return el
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing
const retrieveTabData = key => {}
