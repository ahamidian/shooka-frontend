import React, {Component} from 'react';
import {
  Button,
  Card,
  CardBody,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from 'reactstrap';
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
        <Card className="p-2" style={{width: "400px", marginTop: "100px"}}>
          <CardBody>
            <Form>
              <h3>Login</h3>
              <p className="text-muted">Sign In to your account</p>
              <InputGroup className="mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-user"/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Username" autoComplete="username" value={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value})}/>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-lock"/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="password" placeholder="Password" autoComplete="current-password"
                       value={this.state.password} onChange={(event) => this.setState({password: event.target.value})}/>
              </InputGroup>
              <Row>
                {/*<Button color="link" className="px-0" style={{width:"100%"}}>Forgot password?</Button>*/}
              </Row>
              <Row>
                <Button color="primary" className="px-4 p-2 mr-3 ml-3" style={{width: "100%"}}
                        onClick={this.attemptLogin}>Login</Button>
              </Row>
            </Form>
          </CardBody>
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



