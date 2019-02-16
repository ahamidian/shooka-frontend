import React, {Component, Fragment} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {convertToRaw, EditorState} from 'draft-js';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTicket, sendReply} from "../../actions/TicketActions";
import Spinner from 'react-spinkit'
import _ from 'lodash'
import VerticalSettingMenu from "./SettingsMenu/VerticalSettingMenu";
import HorizontalSettingMenu from "./SettingsMenu/HorizontalSettingMenu";
import MessageCard from "./MessageCard";
import SplitModal from "./actions/SplitModal";
import MergeModal from "./actions/MergeModal";
import {Grid, Dropdown, Button, Image} from "semantic-ui-react"
import {Link} from 'react-router-dom'
import EditableField from "../EditableField";
import mailIcon from '../../Mail.png';


class Ticket extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            ticket: null,
            loading: true,
            activeTab: '1',
            dropDownOpen: false,
            dropDownSelect: "Awaiting User",
            editorState: EditorState.createEmpty(),
            showSplitModal: false,
            showMergeModal: false
        }
    };

    componentDidMount() {
        this.fetchTicket();

    }

    componentDidUpdate(prevProps) {
        let oldId = prevProps.id;
        let newId = this.props.id;
        if (newId !== oldId)
            this.setState({loading: true}, () => this.fetchTicket());
    }


    fetchTicket = () => {
        this.props.loadTicket(this.props.id, (data) => {
            this.setState({loading: false});
        });
    };

    generateMessages = () => {
        const {ticket} = this.props;
        const size = ticket.messages.length;
        return ticket.messages.map((message, index) => <MessageCard message={message} index={size - index}
                                                                    key={message.id}/>);
    };


    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }


    // getDirection=(editorState)=>{
    //     const content = editorState.getCurrentContent();
    //
    //     const directionMap =editorState.getDirectionMap();
    //
    //     const blocksAsArray = content.getBlocksAsArray();
    //
    //
    //     for (let ii = 0; ii < blocksAsArray.length; ii++) {
    //         const block = blocksAsArray[ii];
    //         const key = block.getKey();
    //
    //
    //         console.log(directionMap.get(key));
    //
    //     }
    // }

    onReplyClicked = () => {
        this.props.sendReply(this.props.id, {
            agent_sender: null,
            client_sender: null,
            ticket: this.props.ticket.id,
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString()
        }, () => this.setState({editorState: EditorState.createEmpty()}));
    };

    onUserClickHandler = (event, ticket) => {
        event.stopPropagation();
        this.props.openTab({
            type: "user",
            data: {id: ticket.client.id},
            title: ticket.client.name,
            UID: `user/${ticket.client.id}`
        });
    };

    generateTicketCards = () => {
        if (this.state.loading) {
            return <Spinner name='three-bounce' fadeIn='none' style={{justifySelf: "center"}}/>
        }
        let ticket = this.props.ticket;
        let dynamicHeight = 'calc(100vh - 105px)';
        let {messageCardType, settingsInSide} = this.props;
        if (ticket) {
            return (
                <Grid columns='equal' style={{margin: "0"}}>
                    <Grid.Row style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "50px",
                        backgroundColor: "#f4f4f4",
                        padding: "0",
                        borderBottom: "1px solid #cccccc"
                    }}>
                        <div style={{display: "flex", alignItems: "center",margin:"auto 10px"}}>
                            <MergeModal ticket={ticket}/>
                            <SplitModal ticket={ticket}/>
                            <Button className="mr-1" style={{width: "80px"}}>delete</Button>

                        </div>
                    </Grid.Row>
                    <Grid.Row style={{margin: "0", padding: "0"}}>
                        {settingsInSide &&
                        <Grid.Column style={{
                            display: "flex",
                            flexDirection: "column",
                            height: dynamicHeight,
                            overflowY: "auto",
                            maxWidth: "300px",
                            minWidth: "300px",
                            backgroundColor: "#f4f4f4",
                            padding: "0"
                        }}>
                            <VerticalSettingMenu ticket={ticket}/>
                        </Grid.Column>
                        }
                        <Grid.Column
                            style={{height: dynamicHeight, overflowY: "auto", padding: "0", backgroundColor: "white"}}>
                            <div style={{display: "flex", borderBottom: "1px solid #cccccc" ,marginTop:"10px"}}>

                                <img src={mailIcon} style={{marginLeft: "10px"}} className="rounded" width="50" height="50"/>

                                <div style={{marginLeft: "10px",marginTop:"5px"}}>
                                    <EditableField tag="h3" text={ticket.title}/>

                                    <Link to="" onClick={(event) => this.onUserClickHandler(event, ticket)}>
                                        <div style={{display: "flex"}}>
                                            <p className="mr-1">{ticket.client.name}</p>
                                            <p>({ticket.client.email})</p>
                                        </div>
                                    </Link>

                                </div>

                            </div>
                            {!settingsInSide &&
                            <HorizontalSettingMenu ticket={ticket}/>
                            }

                            <div style={{display: "flex",padding:"10px 0", borderBottom: "1px solid #cccccc"}}>
                                {messageCardType !== 1 &&
                                <img className="rounded" width="35" height="35" src={this.props.user.avatar}
                                     style={{margin: "0 5px"}}/>
                                }
                                <div style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "100%",
                                    paddingRight: "10px"
                                }}>
                                    <Editor wrapperStyle={{border: '1px solid #dddddd', borderBottom: "0"}}
                                            editorStyle={{
                                                minHeight: "200px",
                                                backgroundColor: "white",
                                                paddingLeft: "10px",
                                                paddingRight: "10px"
                                            }}
                                            toolbarStyle={{
                                                backgroundColor: "#f3f3f3",
                                                marginBottom: "0"
                                            }}
                                            toolbar={{
                                                options: ['inline', 'blockType', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
                                                inline: {
                                                    options: ['bold', 'italic', 'underline', 'strikethrough']
                                                },
                                                link: { inDropdown: true },
                                            }}
                                            onEditorStateChange={(editorState) => this.setState({editorState})}
                                    />

                                    <div className="btn-group p-1" role="group"
                                         aria-label="Button group with nested dropdown"
                                         style={{
                                             border: '1px solid #dddddd',
                                             borderTop: "0",
                                             backgroundColor: "#f3f3f3"
                                         }}>

                                        <Button type="submit" onClick={this.onReplyClicked}>Send Reply
                                            as {this.state.dropDownSelect}</Button>
                                        <Dropdown className='link item' direction='left'>
                                            <Dropdown.Menu>
                                                <Dropdown.Item
                                                    onClick={() => this.setState({dropDownSelect: "Awaiting User"})}>Awaiting
                                                    User</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => this.setState({dropDownSelect: "Awaiting Agent"})}>Awaiting
                                                    Agent</Dropdown.Item>
                                                <Dropdown.Item
                                                    onClick={() => this.setState({dropDownSelect: "Resolved"})}>Resolved</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </div>
                                </div>
                            </div>


                            {this.generateMessages()}

                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            )
        }
    };


    render() {
        let ticket = this.props.ticket;
        let {showSplitModal, showMergeModal} = this.state;

        return (
            <Fragment>
                {showSplitModal &&
                <SplitModal ticket={ticket} isOpen onClosed={() => this.setState({showSplitModal: false})}/>}
                {showMergeModal &&
                <MergeModal ticket={ticket} isOpen onClosed={() => this.setState({showMergeModal: false})}/>}

                {this.generateTicketCards()}
            </Fragment>
        );
    }
}


const mapStateToProps = ({tickets, agents, teams, tags, user, layout}, ownProps) => {
    return {
        ticket: _.cloneDeep(tickets.detailedTickets.find(ticket => ticket.id === ownProps.id)),
        user: user.user,
        messageCardType: layout.messageCardType,
        settingsInSide: layout.ticketSettingsInSide
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadTicket, sendReply}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

