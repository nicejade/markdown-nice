import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import classnames from "classnames";

import File from "../component/MenuLeft/File";
import Pattern from "../component/MenuLeft/Pattern";
import Function from "../component/MenuLeft/Function";
import Theme from "../component/MenuLeft/Theme";
import CodeTheme from "../component/MenuLeft/CodeTheme";
import Setting from "../component/MenuLeft/Setting";
import View from "../component/MenuLeft/View";
import Help from "../component/MenuLeft/Help";
import {copyWechatHtml} from "../utils/converter";

import "../component/MenuLeft/common.css";
import "./Navbar.css";

const MOBILE_NAV_QUERY = "(max-width: 767px)";

@inject("view")
@observer
class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobileNavOpen: false,
    };
    this.toggleRef = null;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
    window.removeEventListener("resize", this.handleResize);
  }

  handleKeyDown = (event) => {
    if (event.key === "Escape") {
      this.closeMobileNav({restoreFocus: true});
    }
  };

  handleResize = () => {
    if (!window.matchMedia(MOBILE_NAV_QUERY).matches) {
      this.closeMobileNav();
    }
  };

  closeMobileNav = (options = {}) => {
    if (!this.state.isMobileNavOpen) {
      return;
    }
    this.setState({isMobileNavOpen: false}, () => {
      if (options.restoreFocus && this.toggleRef) {
        this.toggleRef.focus();
      }
    });
  };

  toggleMobileNav = () => {
    this.setState((prevState) => ({isMobileNavOpen: !prevState.isMobileNavOpen}));
  };

  copyWechat = () => {
    copyWechatHtml();
    this.closeMobileNav();
  };

  render() {
    const {title, token} = this.props;
    const {isImmersiveEditing} = this.props.view;
    const {isMobileNavOpen} = this.state;
    const niceNavbarClass = classnames({
      "nice-navbar": true,
      "nice-navbar-hide": isImmersiveEditing,
    });
    const toggleClass = classnames({
      "nice-navbar-toggle": true,
      "is-open": isMobileNavOpen,
    });
    const collapseClass = classnames({
      "nice-navbar-collapse": true,
      "nice-navbar-collapse-open": isMobileNavOpen,
    });
    return (
      <header className={niceNavbarClass}>
        <div className="nice-navbar-inner">
          {title === "" ? null : (
            <h1 id="nice-title" className="nice-title">
              {title}
            </h1>
          )}
          <button
            ref={(node) => {
              this.toggleRef = node;
            }}
            type="button"
            className={toggleClass}
            aria-label={isMobileNavOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={isMobileNavOpen}
            aria-controls="nice-navbar-collapse"
            onClick={this.toggleMobileNav}
          >
            <span className="nice-navbar-toggle-box" aria-hidden="true">
              <span className="nice-navbar-toggle-bar" />
              <span className="nice-navbar-toggle-bar" />
              <span className="nice-navbar-toggle-bar" />
            </span>
          </button>
          <div id="nice-navbar-collapse" className={collapseClass}>
            <nav className="nice-left-nav" aria-label="编辑器菜单">
              <File />
              <Pattern />
              <Function />
              <View />
              <CodeTheme />
              <Setting />
              <Help />
            </nav>
            <div className="nice-right-nav">
              <Theme token={token} />
              <button
                id="nice-navbar-copy"
                type="button"
                className="nice-navbar-copy"
                aria-label="复制到微信公众号"
                onClick={this.copyWechat}
              >
                <svg
                  className="nice-navbar-copy-icon"
                  viewBox="0 0 16 16"
                  width="14"
                  height="14"
                  aria-hidden="true"
                  focusable="false"
                >
                  <rect
                    x="5.25"
                    y="5.25"
                    width="7.5"
                    height="8.25"
                    rx="1.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M3.5 10.75H3.25A1.75 1.75 0 0 1 1.5 9V3.75A1.75 1.75 0 0 1 3.25 2h5A1.75 1.75 0 0 1 10 3.75V4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                复制
              </button>
              <nav className="nice-navbar-friends" aria-label="相关站点">
                <a
                  className="nice-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.niceshare.site/?ref=wechat.jeffjade.com"
                  onClick={this.closeMobileNav}
                >
                  逍遥自在轩
                </a>
                <a
                  className="nice-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.jeffjade.com/nicelinks/?ref=wechat.jeffjade.com"
                  onClick={this.closeMobileNav}
                >
                  晚晴幽草轩
                </a>
                <a
                  className="nice-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.lovejade.cn/?ref=wechat.jeffjade.com"
                  onClick={this.closeMobileNav}
                >
                  清风明月轩
                </a>
              </nav>
            </div>
          </div>
        </div>
        {isMobileNavOpen ? (
          <button
            type="button"
            className="nice-navbar-backdrop"
            aria-label="关闭菜单"
            onClick={() => this.closeMobileNav({restoreFocus: true})}
          />
        ) : null}
      </header>
    );
  }
}

export default Navbar;
