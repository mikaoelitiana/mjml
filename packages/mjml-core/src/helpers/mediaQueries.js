import { map, isEmpty } from 'lodash'

// eslint-disable-next-line import/prefer-default-export
export default function buildMediaQueriesTags(breakpoint, mediaQueries = {}, options = {}) {
  if (isEmpty(mediaQueries)) {
    return ''
  }

  const { 
    forceOWADesktop = false, 
    printerSupport = false,
  } = options

  const baseMediaQueries = map(
    mediaQueries,
    (mediaQuery, className) => `.${className} ${mediaQuery}`,
  )
  const thunderbirdMediaQueries = map(
    mediaQueries,
    (mediaQuery, className) => `.moz-text-html .${className} ${mediaQuery}`,
  )
  const owaQueries = map(baseMediaQueries, (mq) => `[owa] ${mq}`)

  return `
    <style type="text/css">
      @media only screen and (min-width:${breakpoint}) {
        ${baseMediaQueries.join('\n')}
      }
    </style>
    <style media="screen and (min-width:${breakpoint})">
      ${thunderbirdMediaQueries.join('\n')}
    </style>
    ${
      printerSupport 
        ? `<style type="text/css">
            @media only print {
              ${baseMediaQueries.join('\n')}
            }
          </style>`
        : ``
    }
    ${
      forceOWADesktop
        ? `<style type="text/css">\n${owaQueries.join('\n')}\n</style>`
        : ``
    }
  `
}
