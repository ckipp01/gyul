'use strict'
/* global CRATE, LOGS, GYUL, TEMPLATES */

class Gyul {
  constructor (page) {
    page
      ? this.key = page.substring(1)
      : this.key = 'home'
    this.tree = retrieveTree(this.key)
    this.logs = LOGS.filter(log => log.project === this.key)
    this.groupedLogs = groupByType(this.logs)
    this.stats = this.logs.reduce(retrieveStats, Object.create(null))
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

const retrieveStats = (acc, cur) => {
  acc.totalTime = acc.totalTime || 0
  acc.totalTime = acc.totalTime + cur.time
  return acc
}

const showInfo = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = ''
  GYUL.template.main
    .forEach(elem => createElem({ elem: elem, parent: main }))
}

const showStats = () => {
  // TODO maybe just grap the logs and group them here so we can group
  // them the way we want. Don't optimize prematurely
  const main = document.getElementsByTagName('main')[0]
  const categories = Object.keys(GYUL.groupedLogs)
  const t = categories.map(category => {
    return GYUL.groupedLogs[category].map(log => log.time)
  })
  console.log(t)

  console.log(categories)

  main.innerHTML = `<p>Total Time Spent: ${GYUL.stats.totalTime}</p>
                    <svg width="400" height="110">
                      <rect width="300" height="100" style="fill:rgb(0,0,255);stroke-width:3;stroke:rgb(0,0,0)" />
                    </svg>`
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

const groupByType = logs => {
  return logs.reduce((acc, cur) => {
    acc[cur.category] = acc[cur.category] || []
    acc[cur.category].push(cur)
    return acc
  }, Object.create(null))
}

window.addEventListener('hashchange', () => window.location.reload(false))
