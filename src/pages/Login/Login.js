import React, {Component} from 'react';
import {Card, Button, Form} from "semantic-ui-react"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signIn} from "../../actions/UserActions";
import {Redirect, withRouter} from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",

        }
    }


    attemptLogin = () => {
        const onSuccess = (responce) => {
            this.props.history.push("/tickets");
        };
        this.props.signIn(this.state.email, this.state.password,
            onSuccess,
            (response) => console.log(response)
        );
    };

    render() {
        // if(localStorage.getItem("access")){
        //   return <Redirect to="/tickets/"/>
        // }
        return (
            <div className="app align-items-center">
                <Card className="p-2" style={{width: "400px",margin:"auto", marginTop: "100px"}}>
                    <Card.Content>
                        <Card.Header>
                            <h3>Login</h3>

                        </Card.Header>

                        <Form style={{marginTop:"20px"}}>


                            <Form.Group>
                                <Form.Input label='Email' type="email" placeholder='Email'
                                            value={this.state.email}
                                            onChange={(event) => this.setState({email: event.target.value})}/>
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label='password' type="password" placeholder='Password'
                                            value={this.state.password}
                                            onChange={(event) => this.setState({password: event.target.value})}/>
                            </Form.Group>
                            <Button positive className="px-4 p-2 " style={{width: "100%"}}
                                    onClick={this.attemptLogin}>Login</Button>
                        </Form>
                    </Card.Content>
                </Card>

            </div>
        );
    }
}

function mapStateToProps({auth}) {
    return {
        auth
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({signIn}, dispatch);
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));



