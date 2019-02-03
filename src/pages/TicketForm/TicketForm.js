import React, {Component} from 'react';
import {Card, Button, Form} from "semantic-ui-react"
import {getApi} from "../../api";

export default class TicketForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            name: "",
            title: "",
            content: "",

        }
    }


    attemptSubmit = () => {
        getApi().post(`ticket/new/`, this.state)
            .then(response => {
                console.log("ticket created.");
                this.setState({
                    email: "",
                    name: "",
                    title: "",
                    content: ""
                })
            })
            .catch((resp) => {
                console.log("ticket creation failed.")
            });
    };

    render() {
        return (
            <div className="app align-items-center">
                <Card className="p-2" style={{width: "600px", margin: "auto", marginTop: "100px"}}>
                    <Card.Content>

                        <Form>
                            <Form.Field>
                                <label>Email</label>
                                <input placeholder='Email' type="email" value={this.state.email}
                                       onChange={(event) => this.setState({email: event.target.value})}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Name</label>
                                <input placeholder='Name' value={this.state.name}
                                       onChange={(event) => this.setState({name: event.target.value})}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Title</label>
                                <input placeholder='Title' value={this.state.title}
                                       onChange={(event) => this.setState({title: event.target.value})}/>
                            </Form.Field>

                            <Form.Field>
                                <label>Subject</label>
                                <textarea placeholder='Subject' value={this.state.content}
                                          onChange={(event) => this.setState({content: event.target.value})}/>
                            </Form.Field>

                            <Button type='submit' onClick={this.attemptSubmit}>Submit</Button>
                        </Form>


                    </Card.Content>
                </Card>

            </div>
        );
    }
}

