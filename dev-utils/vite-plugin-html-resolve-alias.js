import path from 'path';
import posthtml from 'posthtml';
import { normalizePath } from 'vite';

const defaultTags = {
  video: ['src', 'poster'],
  source: ['src'],
  img: ['src'],
  image: ['xlink:href', 'href'],
  use: ['xlink:href', 'href'],
  link: ['href'],
  script: ['src']
}

// rollup-alias matches
function matches(pattern, importee) {
  if (pattern instanceof RegExp) {
    return pattern.test(importee)
  }
  if (importee.length < pattern.length) {
    return false
  }
  if (importee === pattern) {
    return true
  }
  return importee.startsWith(`${pattern}/`)
}

const viteHtmlResolveAliasPlugin = (options) => {
  const tags = options?.tags ?? defaultTags
  let config

  return {
    name: 'vite-plugin-html-resolve-alias',

    configResolved(resolvedConfig) {
      config = resolvedConfig
    },

    transformIndexHtml: {
      order: 'pre',

      async handler(html, { filename }) {
        const { resolve: { alias } } = config
        let hasTransformed = false

        const posthtmlTransformPlugin = (tree) => {
          tree.match(Object.keys(tags).map((tag) => ({ tag })), (node) => {
            Object.entries(node.attrs || {}).forEach(([key, value = '']) => {
              if (tags[node.tag].includes(key)) {
                const matchedEntry = alias.find((entry) => matches(entry.find, value))
                if (!matchedEntry) {
                  return
                }
                // eslint-disable-next-line no-param-reassign
                node.attrs[key] = normalizePath(
                  path.relative(
                    path.dirname(filename),
                    value.replace(matchedEntry.find, matchedEntry.replacement)
                  )
                )
                hasTransformed = true
              }
            })
            return node
          })
        }

        try {
          const result = await posthtml([posthtmlTransformPlugin]).process(html)
          if (hasTransformed) {
            return result.html
          }
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(
            `Transform Html error: ${e.message}`
          )
        }

        return null
      }
    }
  }
}

export default viteHtmlResolveAliasPlugin