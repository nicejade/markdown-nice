import React, {Component} from "react";
import {Menu, Dropdown} from "antd";

import "./common.css";

const menu = (
  <Menu>
    <Menu.Item>
      <a id="nice-menu-guide" className="nice-menu-item" href="/guide.html" target="_blank" rel="noopener noreferrer">
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">使用指南</span>
        </span>
      </a>
    </Menu.Item>
    <Menu.Item>
      <a id="nice-menu-faq" className="nice-menu-item" href="/faq.html" target="_blank" rel="noopener noreferrer">
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">常见问题</span>
        </span>
      </a>
    </Menu.Item>
    <Menu.Item>
      <a
        id="nice-menu-about-page"
        className="nice-menu-item"
        href="/about.html"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span>
          <span className="nice-menu-flag" />
          <span className="nice-menu-name">关于</span>
        </span>
      </a>
    </Menu.Item>
  </Menu>
);

class Help extends Component {
  render() {
    return (
      <Dropdown overlay={menu} trigger={["click"]} overlayClassName="nice-overlay">
        <a
          id="nice-menu-help"
          className="nice-menu-link"
          href="/guide.html"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          帮助
        </a>
      </Dropdown>
    );
  }
}

export default Help;
