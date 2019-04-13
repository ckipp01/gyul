'use strict'
const footer = [
  { type: 'div',
    attributes: [{ type: 'class', value: 'contact' }],
    children: [
      {
        type: 'a',
        attributes: [
          { type: 'href', value: 'https://github.com/ckipp01/gyul' },
          { type: 'target', value: '_blank' }
        ],
        children: [
          { type: 'img',
            attributes: [
              { type: 'src', value: 'media/github.png' },
              { type: 'alt', value: 'Github icon' }
            ]
          }
        ]
      }
    ]
  }
]

const TEMPLATES = {
  main: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: '#home' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: 'chronica' }
          ]
        },
        { type: 'h2', text: title },
        { type: 'div',
          attributes: [{ type: 'class', value: 'flex-center' }],
          children: [
            { type: 'h5',
              text: 'info',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'info' },
                { type: 'onclick', value: 'GYUL.showInfo(window.location.hash)' }
              ]
            },
            { type: 'h5',
              text: 'stats',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'stats' },
                { type: 'onclick', value: 'GYUL.showStats(window.location.hash)' }
              ]
            },
            { type: 'h5',
              text: 'logs',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'logs' },
                { type: 'onclick', value: 'GYUL.showLogs(window.location.hash)' }
              ]
            },
            { type: 'h5',
              text: 'tags',
              attributes: [
                { type: 'class', value: 'tabs' },
                { type: 'id', value: 'tags' },
                { type: 'onclick', value: 'GYUL.showTags(window.location.hash)' }
              ]
            }
          ]
        }
      ],
      main: body,
      footer: footer
    }
    return t
  },
  basic: function (title, body) {
    const t = {
      header: [
        { type: 'a',
          attributes: [
            { type: 'href', value: '#home' },
            { type: 'class', value: 'logo' }
          ],
          children: [
            { type: 'h1', text: 'chronica' }
          ]
        },
        { type: 'h2', text: title },
        { type: 'div',
          attributes: [{ type: 'class', value: 'flex-center' }],
          children: [
            { type: 'h5',
              text: 'welcome to the chronica wiki'
            }
          ]
        }
      ],
      main: body,
      footer: footer
    }
    return t
  }
}
