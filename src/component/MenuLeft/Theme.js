import React from "react";
import {Menu, Dropdown} from "antd";
import {observer, inject} from "mobx-react";

import {RIGHT_SYMBOL, TEMPLATE_NUM, MARKDOWN_THEME_ID, THEME_LIST, STYLE, THEME_API, TOKEN} from "../../utils/constant";
import {replaceStyle} from "../../utils/helper";
import ThemeConf from "./ThemeConf";
import TEMPLATE from "../../template/index";
import "./Theme.css";

@inject("content")
@inject("navbar")
@inject("view")
@observer
class Theme extends React.Component {
  changeTemplate = (item) => {
    const index = parseInt(item.key, 10);
    const {themeId, css} = this.props.content.themeList[index];
    this.props.navbar.setTemplateNum(index);

    // 更新style编辑器
    if (themeId === "custom") {
      this.props.content.setCustomStyle();
      // 切换自定义自动打开css编辑
      this.props.view.setStyleEditorOpen(true);
    } else {
      this.props.content.setStyle(css);
    }
  };

  toggleStyleEditor = () => {
    const {isStyleEditorOpen} = this.props.view;
    this.props.view.setStyleEditorOpen(!isStyleEditorOpen);
  };

  componentDidMount = async () => {
    const themeList = [
      {themeId: "normal", name: "默认主题", css: TEMPLATE.normal},
      ...ThemeConf,
      {themeId: "custom", name: "自定义", css: TEMPLATE.custom},
    ];
    this.props.content.setThemeList(themeList);

    const templateNum = parseInt(window.localStorage.getItem(TEMPLATE_NUM), 10);

    // 主题样式初始化，属于自定义主题则从localstorage中读数据
    let style = "";
    if (templateNum === themeList.length - 1) {
      style = window.localStorage.getItem(STYLE);
    } else {
      if (templateNum) {
        const {css} = themeList[templateNum];
        style = css;
      } else {
        style = TEMPLATE.normal;
      }
    }
    this.props.content.setStyle(style);
    replaceStyle(MARKDOWN_THEME_ID, style);
  };

  render() {
    const {templateNum} = this.props.navbar;
    const {themeList} = this.props.content;

    const mdMenu = (
      <Menu onClick={this.changeTemplate}>
        {themeList.map((option, index) => (
          <Menu.Item key={index}>
            <div id={`nice-menu-theme-${option.themeId}`} className="nice-themeselect-theme-item">
              <span>
                <span className="nice-themeselect-theme-item-flag">
                  {templateNum === index && <span>{RIGHT_SYMBOL}</span>}
                </span>
                <span className="nice-themeselect-theme-item-name">{option.name}</span>
                {option.isNew && <span className="nice-themeselect-theme-item-new">new</span>}
              </span>
              <span className="nice-themeselect-theme-item-author">{option.authorName}</span>
            </div>
          </Menu.Item>
        ))}
        <Menu.Divider />

        <li className="nice-themeselect-menu-item">
          <div id="nice-menu-view-css" className="nice-themeselect-theme-item" onClick={this.toggleStyleEditor}>
            <span>
              <span className="nice-themeselect-theme-item-flag">
                {this.props.view.isStyleEditorOpen && <span>{RIGHT_SYMBOL}</span>}
              </span>
              <span className="nice-themeselect-theme-item-name">查看主题 CSS</span>
            </span>
          </div>
        </li>
      </Menu>
    );
    const currentTheme = (themeList[templateNum] && themeList[templateNum].name) || "主题";
    return (
      <Dropdown
        overlay={mdMenu}
        trigger={["click"]}
        overlayClassName="nice-overlay nice-overlay-theme"
        placement="bottomRight"
      >
        <a id="nice-menu-theme" className="nice-menu-link nice-menu-select" href="#">
          <span className="nice-menu-select-label">{currentTheme}</span>
        </a>
      </Dropdown>
    );
  }
}

export default Theme;
