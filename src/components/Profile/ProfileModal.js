import React, {Component, Fragment} from 'react';
import {getApi} from "../../api";
import {Editor} from 'react-draft-wysiwyg';
import {convertToRaw, convertFromRaw, EditorState} from "draft-js";
import {Modal, Button, TransitionablePortal, Form,Dropdown} from "semantic-ui-react"

export default class ProfileModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            firstName: "",
            lastName: "",
            phoneNumber: "",
            signature: EditorState.createEmpty(),
            email: "",
            open: false
        }
    }

    open = () => this.setState({open: true});
    close = () => {
        this.setState({open: false});
        document.body.classList.remove('modal-fade-in');
    };

    componentDidMount() {
        let editorState = EditorState.createEmpty();
        if (this.props.user.signature) {
            editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.user.signature)))
        }
        this.setState({
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
            phoneNumber: this.props.user.phone_number,
            email: this.props.user.email,
            signature: editorState,
        })
    }


    onSaveClicked = () => {
        getApi().patch(`agent/${this.props.user.id}/`, {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            phone_number: this.state.phoneNumber,
            email: this.state.email,
            signature: JSON.stringify(convertToRaw(this.state.signature.getCurrentContent()))
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
                <Dropdown.Item icon='profile' onClick={this.open}>Profile Settings</Dropdown.Item>

                <TransitionablePortal
                    open={open}
                    onOpen={() => setTimeout(() => document.body.classList.add('modal-fade-in'), 0)}
                    onClose={this.close}
                    transition={{animation: 'fade down', duration: 300}}

                >
                    <Modal open={true}
                           onClose={this.close}
                           centered={false}
                           trigger={<Button style={{width: "80px"}}>Split</Button>} style={{maxWidth: "800px"}}>

                        <Modal.Header> Profile Settings </Modal.Header>
                        <Modal.Content>
                            <Form>
                                <Form.Group widths={2}>
                                    <Form.Input label='First name' placeholder='First name' value={this.state.firstName}
                                                onChange={(event) => this.setState({firstName: event.target.value})}/>
                                    <Form.Input label='Last name' placeholder='Last name' value={this.state.lastName}
                                                onChange={(event) => this.setState({lastName: event.target.value})}/>
                                </Form.Group>
                                <Form.Group widths={2}>
                                    <Form.Input label='Email' type="email" placeholder='Email address'
                                                value={this.state.email}
                                                onChange={(event) => this.setState({email: event.target.value})}/>
                                    <Form.Input label='Phone number' placeholder='Phone number'
                                                value={this.state.phoneNumber}
                                                onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
                                </Form.Group>
                                <Form.Field>
                                    <label>signature</label>
                                    <Editor wrapperStyle={{border: '1px solid rgb(222, 222, 223)'}}
                                            editorStyle={{
                                                minHeight: "200px",
                                                backgroundColor: "white",
                                                paddingLeft: "10px",
                                                paddingRight: "10px"
                                            }}
                                            editorState={this.state.signature}
                                            onEditorStateChange={(editorState) => this.setState({signature: editorState})}
                                    />
                                </Form.Field>
                            </Form>

                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.close}>Close</Button>
                            <Button positive className="bg-primary" onClick={this.onSaveClicked}>save</Button>
                        </Modal.Actions>
                    </Modal>
                </TransitionablePortal>
            </Fragment>
        );
    }
}
