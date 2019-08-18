import React, {Component, Fragment} from 'react';
import {getApi} from "../../../api";
import {connect} from "react-redux";
import MessageCard from "../MessageCard";
import {Modal, Button, Input,TransitionablePortal} from "semantic-ui-react"

class DeleteModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            subject: "",
            open: false
        }
    }

    open = () => this.setState({open: true});
    close = () => {
        this.setState({open: false});
        document.body.classList.remove('modal-fade-in');
    };
    onSaveClicked = () => {
        getApi().delete(`ticket/${this.props.ticket.id}/`,  true)
            .then(response => {
                console.log(response);
                if (response.status === 204) {
                    this.close();

                }
            })
            .catch((resp) => {
                console.log(resp);
            });

    };


    render() {
        const {open} = this.state;


        return (
            <Fragment>
                <Button style={{width: "80px"}} onClick={this.open}>Delete</Button>
                <TransitionablePortal
                    open={open}
                    onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                    onClose={this.close}
                    transition={{animation: 'fade down', duration: 300}}

                >
            <Modal  open={true}
                    onClose={this.close}
                   centered={false}
                   trigger={<Button style={{width: "80px"}}>Delete</Button>} style={{maxWidth: "800px"}}>
                <Modal.Header> Delete Ticket </Modal.Header>
                <Modal.Content>


                    <div style={{height: "50px", overflow: "auto"}}>
                        <h4>Are you sure you want to delete this ticket?</h4>
                    </div>

                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.close}>Cancel</Button>
                    <Button negative onClick={this.onSaveClicked}>Delete</Button>
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


export default connect(mapStateToProps)(DeleteModal);
