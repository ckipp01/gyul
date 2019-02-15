'use strict'
/* global CRATE, LOGS, gyul */

class Gyul {
  constructor (page) {
    page
      ? this.key = page.substring(1)
      : this.key = 'home'
    this.tree = retrieveTree(this.key)
    this.view = 'info'
    this.template = {
      document: {
        header: [
          { type: 'h1', text: '귤 (gyul)' },
          { type: 'h2', text: this.tree.title },
          { type: 'div',
            attributes: [{ type: 'class', value: 'flex-center' }],
            children: [
              { type: 'p',
                text: 'info',
                attributes: [
                  { type: 'class', value: 'tabs' },
                  { type: 'onclick', value: 'showInfo()' }
                ]
              },
              { type: 'p',
                text: 'stats',
                attributes: [
                  { type: 'class', value: 'tabs' },
                  { type: 'onclick', value: 'showStats()' }
                ]
              },
              { type: 'p',
                text: 'logs',
                attributes: [
                  { type: 'class', value: 'tabs' },
                  { type: 'onclick', value: 'showLogs()' }
                ]
              },
              { type: 'p',
                text: 'tags',
                attributes: [
                  { type: 'class', value: 'tabs' },
                  { type: 'onclick', value: 'showTags()' }
                ]
              }
            ]
          }
        ],
        main: this.tree.body,
        footer: []
      }
    }
    this.stats = {}
    this.logs = LOGS.filter(log => log.project === this.key)
    this.tags = this.logs.flatMap(log => log.tags)
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

  if (elemObject.children) {
    elemObject.children
      .map(child => {
        createAndAttatch(child, el)
      })
  }

  return el
}

const createAndAttatch = async (elemObject, sectionElem) => {
  let elem
  switch (elemObject.type) {
    case 'h1':
    case 'h2':
    case 'p':
    case 'img':
      elem = await createElem(
        { type: elemObject.type, text: elemObject.text, attributes: elemObject.attributes }
      )
      break
    case 'div':
      elem = await createElem(
        { type: elemObject.type, text: elemObject.text, children: elemObject.children, attributes: elemObject.attributes }
      )
      break
  }
  sectionElem.appendChild(elem)
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing
const showInfo = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = createElem(gyul.template.document.main)
}
const showStats = () => console.log('stats')
const showLogs = () => console.log('logs')
const showTags = () => {
  console.log('tags')
  const main = document.getElementsByTagName('main')[0]
  console.log(main)
  main.innerHTML = '<h1>cool</h1>'
}
