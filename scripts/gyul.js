'use strict'
/* global CRATE, LOGS, GYUL, TEMPLATES */

class Gyul {
  constructor (page) {
    page
      ? this.key = page.substring(1)
      : this.key = 'home'
    this.tree = retrieveTree(this.key)
    this.logs = LOGS.filter(log => log.project === this.key)
    this.stats = this.logs
      .reduce(retrieveStats, { totalEntries: this.logs.length, totalTime: 0 })
    this.tags = this.logs
      .flatMap(log => log.tags)
      .filter(log => log !== undefined)
    this.template = retrieveTemplate(
      this.tree.template,
      this.tree.title,
      this.tree.body
    )
  }
  package () {
    for (const section in this.template) {
      const sectionElem =
        document.body.appendChild(createElem({ elem: { 'type': section } }))
      this.template[section]
        .forEach(elem => createElem({ elem: elem, parent: sectionElem }))
    }
  }
}

const createElem = elemObject => {
  const elem = document.createElement(elemObject.elem.type)

  if (elemObject.elem.text) { elem.innerHTML = elemObject.elem.text }

  if (elemObject.elem.attributes) {
    elemObject.elem.attributes
      .map(attribute => elem.setAttribute(attribute.type, attribute.value))
  }

  if (elemObject.elem.children) {
    elemObject.elem.children
      .forEach(childElem => createElem({ elem: childElem, parent: elem }))
  }

  if (elemObject.parent) {
    elemObject.parent.appendChild(elem)
  } else {
    return elem
  }
}

const retrieveTree = key => CRATE[key] ? CRATE[key] : CRATE.missing

const retrieveTemplate = (template, title, body) => {
  const t = TEMPLATES[template]
  return t(title, body)
}

const retrieveStats = (acc, cv) => {
  acc.totalTime += Number(cv.time)
  return acc
}

const showInfo = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = ''
  GYUL.template.main
    .forEach(elem => createElem({ elem: elem, parent: main }))
}

const showStats = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = `<p>Total Entries: ${GYUL.stats.totalEntries}</p>
                    <p>Total Time Spent: ${GYUL.stats.totalTime}</p>`
}

const showLogs = () => {
  const main = document.getElementsByTagName('main')[0]
  const logNotes = GYUL.logs.map(log => `<p>${log.notes}</p>`)
  main.innerHTML = logNotes.join('')
}

const showTags = () => {
  const main = document.getElementsByTagName('main')[0]
  const tagNames = GYUL.tags.map(tag => `<p>${tag}</p>`)
  main.innerHTML = tagNames.join('')
}

window.addEventListener('hashchange', () => window.location.reload(false))
