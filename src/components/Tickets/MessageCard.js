import {getTimeSince} from "../utils";
import React, {Component} from "react";
import {stateToHTML} from "draft-js-export-html";
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {convertFromRaw} from 'draft-js';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {Dropdown, Icon} from 'semantic-ui-react'


class MessageCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checked: !this.props.selectable,
        }
    }

    getImage = (message) => {
        let {type, selectable} = this.props;
        if (selectable) return;

        let src;
        let margin;
        if (type === 1) {
            margin = "0 10px 0 0"
        } else if (type === 2) {
            margin = "0 5px "
        } else if (type === 3) {
            margin = "10px 0 10px 10px"
        }

        if (message.client_sender)
            src = message.client_sender.avatar;
        else
            src = message.agent_sender.avatar;

        return <img className="rounded" width="35" height="35"
                    src={src}
                    style={{margin: margin}}/>

    };
    getTitle = (message) => {
        let name = message.client_sender ? message.client_sender.name : message.agent_sender.name;
        return <p style={{margin: 0, fontWeight: "bold"}}> {name}</p>;

    };
    getHeaderColor = () => {
        let {type} = this.props;
        if (type === 3) {
            return "white"
        }
        else {
            if (this.props.message.is_note) {
                return "#c2c3c3"
            } else if (this.props.message.agent_sender) {
                return "#f0ffff"
            } else {
                return "#fff9f0"
            }
        }
    };
    getBorderColor = () => {
        let {type} = this.props;
        if (type === 3) {
            return "white"
        }
        else {
            if (this.props.message.is_note) {
                return "#acadad"
            } else if (this.props.message.agent_sender) {
                return "#a4cdbc"
            } else {
                return "#cdb499"
            }
        }
    };
    onCheckChanged = (event) => {
        this.setState({checked: event.target.checked});
        this.props.onCheckChanged(this.props.message.id, event.target.checked)
    };
    renderHeader = () => {
        let {type, selectable} = this.props;

        const dropDownTrigger = (<Icon name="cog" color="grey"/>);
        return (
            <div style={{
                display: 'flex',
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: this.getHeaderColor()
            }}>
                <div style={{display: 'flex', alignItems: "center", padding: "10px"}}>
                    {selectable &&
                    <input style={{marginRight: "5px"}} type="checkbox" name="checkBox" checked={this.state.checked}
                           onChange={this.onCheckChanged}/>}
                    {type === 1 && this.getImage(this.props.message)}
                    {this.getTitle(this.props.message)}
                </div>
                <div style={{display: 'flex', alignItems: "center", marginRight: "10px"}}>
                    <small
                        style={{
                            color: "#888888",
                            marginRight: "5px"
                        }}>{getTimeSince(this.props.message.creation_time)} ago
                    </small>
                    {!selectable &&
                    <Dropdown trigger={dropDownTrigger} icon={null} className='link item' direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => this.setState({dropDownSelect: "Awaiting Agent"})}>create
                                ticket from message</Dropdown.Item>
                            <Dropdown.Item onClick={() => this.setState({dropDownSelect: "Awaiting User"})}>delete
                                message</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    }
                </div>
            </div>
        )
    };
    renderContent = () => {
        return (
            <div style={{padding: '10px'}}>
                <div
                    dangerouslySetInnerHTML={{__html: stateToHTML(convertFromRaw(JSON.parse(this.props.message.content)))}}/>
            </div>
        )
    };

    render() {
        let {type} = this.props;
        let {checked} = this.state;

        return (
            <div style={{
                width: '100%',
                opacity: checked ? 1 : .4,
                paddingBottom: "8px",
                display: "flex",
                borderBottom: type === 3 ? "1px solid #cccccc" : "0"
            }}>
                {type !== 1 && this.getImage(this.props.message)}
                <div style={{border: `1px solid ${this.getBorderColor()}`, width: "100%"}}>
                    {this.renderHeader()}
                    {this.renderContent()}
                </div>
            </div>
        );
    }
}


const mapStateToProps = ({layout}) => {
    return {
        type: layout.messageCardType
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MessageCard);


