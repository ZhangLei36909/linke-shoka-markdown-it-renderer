module.exports = function (md, options) {
  const toc = [];
  const originalHeadingOpen = md.renderer.rules.heading_open;

  md.renderer.rules.heading_open = function (tokens, idx, options, env, self) {
    const title = tokens[idx + 1].children.reduce((acc, t) => acc + t.content, '');
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    tokens[idx].attrs = tokens[idx].attrs || [];
    tokens[idx].attrs.push(['id', title]);

    toc.push({ level: tokens[idx].tag, title: title, slug: slug });

    if (originalHeadingOpen) {
      return originalHeadingOpen(tokens, idx, options, env, self)
    } else {
      tokens[idx + 1].children.unshift({
        type: 'html_inline',
        content: `<a href="#${title}" class="anchor">::before"#"::after</a>`
      })
      return self.renderToken(tokens, idx, options)
    }
  };

  return md;
};