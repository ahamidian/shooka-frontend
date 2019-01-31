import React, {Component, Fragment} from 'react';
import {getApi} from "../../../api";
import {connect} from "react-redux";
import MessageCard from "../MessageCard";
import {Modal, Button, Input,TransitionablePortal} from "semantic-ui-react"

class SplitModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            subject: "",
            selectedMessages: [],
            open: false
        }
    }

    open = () => this.setState({open: true});
    close = () => {
        this.setState({open: false});
        document.body.classList.remove('modal-fade-in');
    };
    onSaveClicked = () => {
        getApi().post(`ticket/split/`, {
            messages: this.state.selectedMessages,
            ticket_title: this.state.subject,
            ticket_id: this.props.ticket.id,
        }, true)
            .then(response => {
                console.log(response);
                if (response.status === 201) {
                    this.close();
                }
            })
            .catch((resp) => {
                console.log(resp);
            });

    };
    onCheckChanged = (id, checked) => {
        let {selectedMessages} = this.state;
        if (selectedMessages.includes(id) && !checked) {
            selectedMessages.pop(id);
            this.setState({selectedMessages})
        }
        else if (!selectedMessages.includes(id) && checked) {
            selectedMessages.push(id);
            this.setState({selectedMessages})
        }
        console.log(selectedMessages);
    };
    renderMessages = () => {
        const {ticket} = this.props;
        if (!ticket) return;

        const size = ticket.messages.length;
        return ticket.messages.map((message, index) => <MessageCard simple selectable message={message}
                                                                    index={size - index}
                                                                    onCheckChanged={this.onCheckChanged}
                                                                    key={message.id}/>);
    };


    render() {
        const {open} = this.state;


        return (
            <Fragment>
                <Button style={{width: "80px"}} onClick={this.open}>Split</Button>
                <TransitionablePortal
                    open={open}
                    onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                    onClose={this.close}
                    transition={{animation: 'fade down', duration: 300}}

                >
            <Modal  open={true}
                    onClose={this.close}
                   centered={false}
                   trigger={<Button style={{width: "80px"}}>Split</Button>} style={{maxWidth: "800px"}}>
                <Modal.Header> Split Messages to New Ticket </Modal.Header>
                <Modal.Content>

                    <Input label='Subject' fluid placeholder='New Ticket Subject' value={this.state.subject}
                           onChange={(event) => this.setState({subject: event.target.value})}/>


                    <div style={{height: "400px", overflow: "auto"}}>
                        {this.renderMessages()}
                    </div>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close}>Cancel</Button>
                    <Button positive onClick={this.onSaveClicked}>Split Selected Messages</Button>
                </Modal.Actions>
            </Modal>
                </TransitionablePortal>
            </Fragment>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
        user: user.user || {}
    };
};


export default connect(mapStateToProps)(SplitModal);
