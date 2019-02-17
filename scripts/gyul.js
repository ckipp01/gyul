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
    this.view = 'info'
    this.template = retrieveTemplate(
      this.tree.template,
      this.tree.title,
      this.tree.body
    )
  }
  package () {
    for (const section in this.template) {
      const sectionElem =
        document.body.appendChild(createElem({ 'type': section }))
      this.template[section]
        .forEach(item => createAndAttatch(item, sectionElem))
    }
  }
}

const retrieveStats = (acc, cv) => {
  acc.totalTime += Number(cv.time)
  return acc
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
  main.innerHTML = ''
  GYUL.template.main.forEach(elem => createAndAttatch(elem, main))
}
const retrieveTemplate = (template, title, body) => {
  const t = TEMPLATES[template]
  return t(title, body)
}

const showStats = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = `<p>Total Entries: ${GYUL.stats.totalEntries}</p><p>Total Time Spent: ${GYUL.stats.totalTime}</p>`
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
