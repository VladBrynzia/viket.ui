exports.onCreatePage = ({ page, actions }: any) => {
  const { createPage } = actions
  // notice the addition of .*
  if (page.path.match(/^\/.*\/products/)) {
    // notice page.context.language
    page.matchPath = `/${page.context.language}/products/:id`
    createPage(page)
  }
}