const CRATE = {
  gyul: {
    title: '귤 gyul',
    template: 'mainTemplate',
    body: [
      { type: 'div',
        attributes: [
          { type: 'class', value: 'media-container' }
        ],
        children: [
          { type: 'h1',
            text: '귤',
            attributes: [
              { type: 'class', value: 'gyul-logo' }
            ]
          }
        ]
      },
      {
        type: 'h5',
        text: 'Code: <a target="_blank" href="https://github.com/ckipp01/gyul">gyul</a>'
      },
      {
        type: 'p',
        text: `gyul is an attempt to make a small wiki engine that will seamlessly tie into my timetracker, <a href='#andaga'>ándaga</a>.`
      },
      {
        type: 'p',
        text: `For a while I found myself reverting to large frameworks for simple tasks just because I knew the technology. There came a point where I realized the amount of overhead they brought for such simple tasks was not always necessary. I set out to create something small and simple. This is my effort at that endeavor. It doesn't do a ton, but does exactly what I need it to. It's also flexible enough that if needed to be adapted for another project, it can be. This was my first attempt at creating something like this, and it was a huge learning experience. Expect to see this change and grow and I adjust to fix some of the trouble pointst that I know exist.`
      },
      {
        type: 'p',
        text: 'gyul works by reading the hash of the url and then creating a class from that hash. The hast serves as akey to look up the entry in JS file called <code>crate.js</code>. It will also filter through all of the logs and capture all of them that match the key. There is a templating system that is being used to determine what the layout should be and the body an array of html elements that get iterated over and placed on the dom.'
      }
    ]
  },
  home: {
    title: 'welcome',
    template: 'homeTemplate',
    body: [
      {
        type: 'p',
        text: `Feel free to explore. This is my collected works and logs. If you don't know here to start, you can get an introduction <a href='#chronica'>here</a> or click on any of the projects below.`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'project-list' }
        ],
        text: createProjects(LOGS).join('')
      }
    ]
  },
  missing: {
    title: 'Missing',
    template: 'mainTemplate',
    body: [
      {
        type: 'p',
        text: `I'm unaware of this entry`
      }
    ]
  }
}

function createProjectObject (acc, cur) {
  acc[cur.project] = acc[cur.project] || {}
  acc[cur.project].time = acc[cur.project].time || 0
  acc[cur.project].entries = acc[cur.project].entries || 0
  acc[cur.project].time = acc[cur.project].time += cur.time
  acc[cur.project].entries = acc[cur.project].entries += 1
  return acc
}

function createProjects (logs) {
  const logsObject = logs
    .filter(_ => _.project !== undefined)
    .reduce(createProjectObject, Object.create(null))
  const projects = Object.keys(logsObject)
  return projects
    .sort()
    .map(p => `<div>
                  <p>Project: <a href='#${p}'>${p}</a><br>
                  Time: ${logsObject[p].time} minutes<br>
                  Entries: ${logsObject[p].entries} logs
                </div>`)
}
