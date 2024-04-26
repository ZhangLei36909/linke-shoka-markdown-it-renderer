const cfg = {
  render: {
    html: true,
    xhtmlOut: false,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: "“”‘’",
    tab: "",
  },
  plugins: [
    {
      plugin:
      {
        name: 'markdown-it-multimd-table',
        enable: true,
        options: {
          multiline: true,
          rowspan: true,
          headerless: true
        }
      }
    },
    {
      plugin:
      {
        name: './markdown-it-furigana',
        enable: true,
        options: {
          fallbackParens: "()"
        }
      }
    },
    {
      plugin:
      {
        name: './markdown-it-spoiler',
        enable: true,
        options: {
          title: "你知道得太多了"
        }
      }
    },
  ]
};

module.exports = function shokaMarkdownIt(data) {
  const renderer = require("./lib/renderer");
  return renderer(data, cfg);
}