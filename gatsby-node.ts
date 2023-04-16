exports.onCreatePage = ({ page, actions }: any) => {
  const { createPage } = actions
  // notice the addition of .*
  if (page.path.match(/^\/.*\/blog-posts/)) {
    // notice page.context.language
    page.matchPath = `/${page.context.language}/blog-posts/:id`
    createPage(page)
  }
}