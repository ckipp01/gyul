'use strict'
/* global LOGS, createProjects, createAllKeys, createActivityGraph */

const CRATE = {
  gyul: {
    title: '귤 gyul',
    template: 'main',
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
        text: `gyul works by a factory function creating an object which creates a record of all the possible keys in the site and their relevant information. Then by passing it the hash of the url it does a look up in the object and return the necessary data. If you look at the index.html page of this site you'll see what is shown below:`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'code-block' }
        ],
        children: [
          { type: 'code',
            text: `const GYUL = Gyul()<br>
                    GYUL.package(window.location.hash)`
          }
        ]
      },
      {
        type: 'p',
        text: `This creates the main object and then the pacakge fucntion uses the key to locate the correct object, iterate through the temlate, logs, tags, and data it contains to create what you're seeing on each page. The structure of the GYUL object is below:`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'code-block' }
        ],
        children: [
          { type: 'code',
            text: `GYUL<br>
                    package: rawKey => { iterates throw data using the template and renders the dom }<br>
                    showInfo: rawKey => { changes the main element on the page to show the main info of the current key's data }<br>
                    showStats: rawKey => { changes the main element on the page to show the stats and breakdown of the time spent on the key's entries }<br>
                    showTags: rawKey => { changes the main element on the page to show the related tags to the key }<br>
                    switchHeader: rawKey => { changes the header element on the page to match the header element found in the key's template }<br>
                    report: () => { gives a report to the console on missing projects and tags from the CRATE }
                  `
          }
        ]
      },
      {
        type: 'p',
        text: 'There are basically two main important script files that power gyul. One is gyul.js where the factory function is, and all of the necessary methods to parse the data and turn it into dom elements. The other file, tempate.js, does just want it sounds like and provides multiple different templates that gyul can choose from to determine how things are layed out.'
      },
      {
        type: 'p',
        text: 'The next iteration of this plans on doing all of this on the sever side and just handing up the necssary data in order to not have to rely on JS on the client side'
      }
    ]
  },
  home: {
    title: 'welcome',
    template: 'basic',
    body: [
      {
        type: 'p',
        text: `This is a small experiment to create a minimal wiki engine that integrates with my timetracker, ándaga.`
      },
      {
        type: 'div',
        attributes: [
          { type: 'class', value: 'keys-container' }
        ],
        text: createAllKeys(LOGS)
      },
      {
        type: 'div',
        text: createActivityGraph(LOGS)
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
    template: 'basic',
    body: [
      {
        type: 'p',
        text: `I'm unaware of this entry`
      }
    ]
  }
}
