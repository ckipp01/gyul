'use strict'

const TEMPLATES = {
  mainTemplate: function (title, body) {
    const t = {
      header: [
        { type: 'h1', text: '귤 (gyul)' },
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
  }
}
