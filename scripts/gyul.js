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

const showInfo = () => {
  const main = document.getElementsByTagName('main')[0]
  main.innerHTML = ''
  GYUL.template.main
    .forEach(elem => createElem({ elem: elem, parent: main }))
}

const showStats = () => {
  const main = document.getElementsByTagName('main')[0]
  const categoryTotal = GYUL.logs.reduce((acc, cur) => acc + cur.time, 0)
  const categories = Object.keys(GYUL.groupedLogs).sort()

  const summarizer = (acc, cur) => {
    acc[cur.category] = acc[cur.category] || Object.create(null)
    acc[cur.category].time = acc[cur.category].time || 0
    acc[cur.category].time += cur.time
    return acc
  }

  const totals = categories.map(category => {
    const y = GYUL.groupedLogs[category]
      .reduce(summarizer, Object.create(null))
    y[category].totalLogs = GYUL.groupedLogs[category].length
    y[category].percentage = Math.round((y[category].time / categoryTotal) * 100)
    return y
  })

  console.log(totals)

  main.innerHTML = `<p>Total Time Spent: ${categoryTotal}</p>
                    <svg width="400" height="110">
                      <rect width="500" height="5" style="fill:#0B132B" />
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
