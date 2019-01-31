import React, {Component, Fragment} from 'react';
import {getApi} from "../../../api";
import {connect} from "react-redux";
import SearchField from "./SearchField";
import {Modal, Button, TransitionablePortal} from "semantic-ui-react"

class MergeModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            search: "",
            open: false,

        }
    }

    open = () => this.setState({open: true});
    close = () => {
        this.setState({open: false});
        document.body.classList.remove('modal-fade-in');
    };


    onSaveClicked = () => {
        getApi().post(`ticket/merge/`, {
            destination_ticket: 476,
            origin_ticket: this.props.ticket.id,
        }, true)
            .then(response => {
                console.log(response);
                if (response.status === 200) {
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
                <Button style={{width: "80px"}} onClick={this.open}>Merge</Button>
                <TransitionablePortal
                    open={open}
                    onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                    onClose={this.close}
                    transition={{animation: 'fade down', duration: 300}}

                >
                    <Modal
                        open={true}
                        onClose={this.close}
                        centered={false}
                        style={{maxWidth: "800px"}}>
                        <Modal.Header> Merge Ticket </Modal.Header>
                        <Modal.Content>
                            <SearchField/>
                            <div style={{height: "400px"}}>

                            </div>

                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close}>Cancel</Button>
                            <Button positive onClick={this.onSaveClicked}>Merge</Button>
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


export default connect(mapStateToProps)(MergeModal);
