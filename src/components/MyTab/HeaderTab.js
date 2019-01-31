import React, {Component} from 'react';
import "./MyCss.css"
import {Icon,Grid} from "semantic-ui-react"

export default class HeaderTab extends Component {
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
            return "#f4f4f4"
        } else if (this.state.hover) {
            return "#f8f8f8"
        } else {
            return "#ffffff"
        }
    };
    getTextColor = () => {
        if (this.props.active) {
            return "#333333"
        } else {
            return "#555555"
        }
    };
    onCloseClicked = (e) => {
        e.stopPropagation();
        this.props.onClose()
    };

    renderCloseButton = () => {
        let shouldCloseEnable = this.props.type !== "ticketList"
        if (shouldCloseEnable && this.state.hover) {
            return <p onClick={(e) => this.onCloseClicked(e)}
                      style={{
                          position: "absolute",
                          right: "0px",
                          top: "13px",
                          zIndex: "1",
                          height: "20px",
                          width: "20px",
                          textAlign: "center",
                          backgroundColor: "#dddddd"
                      }} className="rounded-circle m-1"><Icon style={{fontSize: ".80em",margin:"0",color:"#888888"}} name='delete' /></p>
        }
    };


    render() {
        return (
            <Grid.Column onClick={this.props.onClick} className={`${this.props.active? "":"border-bottom"} border-right pt-1 pb-1 pr-2 pl-2`}
                 style={{

                     maxWidth: "130px",
                     height:"50px",
                     backgroundColor: this.getBackgroundColor(),
                     position: "relative",
                     display:"flex",
                     alignItems:"center"
                 }}
                 onMouseEnter={this.onUserMouseEnterHandler}
                 onMouseLeave={this.onUserMouseLeaveHandler}>
                <p style={{
                    marginBottom: "0",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: this.getTextColor()
                }}>{this.props.title}</p>
                {this.renderCloseButton()}
            </Grid.Column>
        );
    }
}
