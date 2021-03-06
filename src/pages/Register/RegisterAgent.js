import React, { Component } from 'react';
import { Button, Card, CardBody, CardFooter, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {agentRegister} from "../../../actions/UserActions";
import {getApi} from "../../../api";

class RegisterAgent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password1: "",
      password2: "",
    }
  }
  componentDidMount(){
    if( this.props.match.params.id ){
      getApi().get(`team/${this.props.match.params.id}`, true)
        .then(response => {
          if(response.status===200) {
            this.setState({name:response.data.name})
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    }
  }
  attemptRegister = () => {
    this.props.agentRegister(this.props.match.params.id,this.state.password1,
      (response)=>window.open("/login/", '_self'),
      (response)=>console.log(response)
    );
  };

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBody className="p-4">
                  <Form>
                    <h1>Register</h1>
                    <p className="text-muted">Create your account</p>



                    <InputGroup className="mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Password" autoComplete="new-password"
                             value={this.state.password1} onChange={(event) => this.setState({password1: event.target.value})}/>
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="icon-lock"/>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input type="password" placeholder="Repeat password" autoComplete="new-password"
                             value={this.state.password2} onChange={(event) => this.setState({password2: event.target.value})}/>
                    </InputGroup>
                    <Button color="success" block onClick={this.attemptRegister}>Create Account</Button>
                  </Form>
                </CardBody>
                <CardFooter className="p-4">
                  <Row>
                    <Col xs="12" sm="6">
                      <Button className="btn-facebook" block><span>facebook</span></Button>
                    </Col>
                    <Col xs="12" sm="6">
                      <Button className="btn-twitter" block><span>twitter</span></Button>
                    </Col>
                  </Row>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
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
  return bindActionCreators({agentRegister}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(RegisterAgent);


