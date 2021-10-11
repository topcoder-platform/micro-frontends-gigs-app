import "./styles.scss";
import React, { useLayoutEffect } from "react";
import PT from "prop-types";
import { showMenu } from "@topcoder/micro-frontends-earn-app";

/**
 * Displays base Gigs page with the navigation menu in the sidebar.
 *
 * @param {Object} props component properties
 * @returns {JSX.Element}
 */
const BasePage = ({
  children,
  className,
  contentClassName,
  sidebarClassName,
  sidebarContent,
  sidebarFooter,
}) => {
  useLayoutEffect(() => {
    showMenu(true);
    return () => {
      showMenu(false);
    };
  }, []);

  return (
    <div className={className} styleName="layout">
      <aside className={sidebarClassName} styleName="sidebar">
        <div styleName="sidebar-content">
          <div id="menu-id" />
          <hr />
          {sidebarContent}
        </div>
        <div styleName="sidebar-footer">{sidebarFooter}</div>
      </aside>
      <div className={contentClassName} styleName="content">
        {children}
      </div>
    </div>
  );
};

BasePage.propTypes = {
  children: PT.node,
  className: PT.string,
  contentClassName: PT.string,
  sidebarClassName: PT.string,
  sidebarContent: PT.node,
  sidebarFooter: PT.node,
};

export default BasePage;
