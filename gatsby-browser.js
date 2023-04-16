import './src/styles/global.css';
const React = require("react")
const Layout = require("./src/components/Layout/Layout").Layout

/**
 * 
 * Wraps every page in a component
 * Modified to support i18n 
 * https://andremonteiro.pt/gatsby-i18next-wrap-page-element/ 
 */
export const wrapPageElement = ({ element, props }) => {
  const newElement = React.cloneElement(
    element,  // I18nextProvider
    element.props,
    React.cloneElement(
      element.props.children,  // I18nextContext.Provider
      element.props.children.props,
      React.createElement(
        Layout,
        undefined,
        element.props.children.props.children,
      ),
    ),
  );

  return newElement;
}
