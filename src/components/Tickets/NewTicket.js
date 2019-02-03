import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import {convertToRaw, EditorState} from 'draft-js';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {loadTicket, sendReply} from "../../actions/TicketActions";
import {Button, Form, Grid} from "semantic-ui-react"


class Ticket extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            user: null,
            editorState: EditorState.createEmpty(),
        }
    };

    componentDidMount() {

    }


    onReplyClicked = () => {
        this.props.sendReply(this.props.id, {
            agent_sender: null,
            client_sender: null,
            ticket: this.props.ticket.id,
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())).toString()
        }, () => this.setState({editorState: EditorState.createEmpty()}));
    };


    render() {
        let dynamicHeight = 'calc(100vh - 105px)';
        let {messageCardType, settingsInSide} = this.props;

        return (
            <Grid columns='equal' style={{margin: "0"}}>
                <Grid.Row style={{
                    display: "flex",
                    flexDirection: "column",
                    height: "50px",
                    backgroundColor: "#f4f4f4",
                    padding: "0"
                }}>
                    salam
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
                        {/*<VerticalSettingMenu ticket={ticket}/>*/}
                    </Grid.Column>
                    }
                    <Grid.Column
                        style={{height: dynamicHeight, overflowY: "auto", padding: "0", backgroundColor: "white"}}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>

                            <div style={{padding: "10px",width:"100%"}}>
                                <Form>

                                    <Form.Field>
                                        <label>Title</label>
                                        <input placeholder='Title' value={this.state.title}
                                               onChange={(event) => this.setState({title: event.target.value})}/>
                                    </Form.Field>

                                </Form>


                            </div>
                        </div>
                        {!settingsInSide &&
                        {/*<HorizontalSettingMenu ticket={ticket}/>*/}
                        }


                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                width: "100%",
                                padding: "10px",
                            }}>
                                <Form>

                                    <Form.Field>
                                        <label>Content</label>
                                        <Editor wrapperStyle={{border: '1px solid #dddddd'}}
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
                                                    options: ['inline', 'blockType', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'emoji', 'image'],
                                                    inline: {
                                                        options: ['bold', 'italic', 'underline', 'strikethrough']
                                                    },
                                                }}
                                                onEditorStateChange={(editorState) => this.setState({editorState})}
                                        />
                                    </Form.Field>

                                </Form>



                                <Button type="submit" onClick={this.onReplyClicked} style={{margin:"0"}}>Create ticket</Button>
                            </div>


                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}


const mapStateToProps = ({tickets, agents, teams, tags, user, layout}, ownProps) => {
    return {
        user: user.user,
        messageCardType: layout.messageCardType,
        settingsInSide: layout.ticketSettingsInSide
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadTicket, sendReply}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Ticket);

