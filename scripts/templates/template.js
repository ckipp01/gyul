'use strict'

const TEMPLATES = {
  mainTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: 'index.html#gyul' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: '귤 (gyul)' }
          ]
        },
        { type: 'h2', text: title },
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
      main: body,
      footer: []
    }
    return t
  },
  homeTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: 'index.html#gyul' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: '귤 (gyul)' }
          ]
        },
        { type: 'h2', text: title },
        { type: 'div',
          attributes: [{ type: 'class', value: 'flex-center' }],
          children: [
            { type: 'p',
              text: 'welcome to 귤'
            }
          ]
        }
      ],
      main: body,
      footer: []
    }
    return t
  }
}
