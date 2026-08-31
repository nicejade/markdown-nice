import React, {Component} from "react";
import {observer, inject} from "mobx-react";
import {Tooltip} from "antd";

import {copyWechatHtml} from "../../utils/converter";
import {ENTER_DELAY, LEAVE_DELAY} from "../../utils/constant";
import SvgIcon from "../../icon";
import "./Wechat.css";

@inject("content")
@inject("navbar")
@inject("imageHosting")
@inject("dialog")
@observer
class Wechat extends Component {
  copyWechat = () => {
    copyWechatHtml();
  };

  render() {
    return (
      <Tooltip placement="left" mouseEnterDelay={ENTER_DELAY} mouseLeaveDelay={LEAVE_DELAY} title="复制到公众号">
        <a id="nice-sidebar-wechat" className="nice-btn-wechat" onClick={this.copyWechat}>
          <SvgIcon name="wechat" className="nice-btn-wechat-icon" />
        </a>
      </Tooltip>
    );
  }
}

export default Wechat;
