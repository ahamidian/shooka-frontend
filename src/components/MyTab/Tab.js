import React, {Component} from 'react';
import "./MyCss.css"


export default class Tab extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: false}
  }

  onUserMouseEnterHandler = () => {
    this.setState({
      hover: true
    });
  };
  onUserMouseLeaveHandler = () => {
    this.setState({
      hover: false
    });
  };
  getBackgroundColor = () => {
    if (this.props.active) {
      return "#63c2de"
    } else if (this.state.hover) {
      return "#ffffff"
    } else {
      return "#eeeeee"
    }
  };
  getTextColor = () => {
    if (this.props.active) {
      return "#ffffff"
    } else {
      return "#333333"
    }
  };
  onCloseClicked = (e) => {
    e.stopPropagation();
    this.props.onClose()
  };

  renderCloseButton = () => {
    let shouldCloseEnable=this.props.type!=="ticketList"
    if (shouldCloseEnable && this.state.hover ) {
      return <p onClick={(e) => this.onCloseClicked(e)}
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "0px",
                  zIndex: "1",
                  height: "20px",
                  width: "20px",
                  textAlign: "center"
                }} className="rounded-circle bg-danger m-1">X</p>
    }
  };


  render() {
    return (
      <div onClick={this.props.onClick} className="border rounded-top pt-1 pb-1 pr-2 pl-2 ml-1 mt-2"
           style={{minWidth: "130px",maxWidth: "130px", backgroundColor: this.getBackgroundColor(), position: "relative"}}
           onMouseEnter={this.onUserMouseEnterHandler}
           onMouseLeave={this.onUserMouseLeaveHandler}>
        <p style={{
          marginBottom: "0",
          overflow: "hidden",
          textOverflow: "ellipsis",
          color: this.getTextColor()
        }}>{this.props.title}</p>
        {this.renderCloseButton()}
      </div>
    );
  }
}
