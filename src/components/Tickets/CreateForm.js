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

class CreateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      name: "",
      title: "",
      content: "",
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
    return (
      <div className="app align-items-center">
        <Card className="p-2" style={{width: "400px", marginTop: "100px"}}>
          <CardBody>
            <Form>
              <h3>Ask Question</h3>
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
                <Input type="text" placeholder="Name" autoComplete="name" value={this.state.name}
                       onChange={(event) => this.setState({name: event.target.value})}/>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-lock"/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Title" autoComplete="title" value={this.state.name}
                       onChange={(event) => this.setState({title: event.target.value})}/>
              </InputGroup>
              <InputGroup className="mb-4">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="icon-lock"/>
                  </InputGroupText>
                </InputGroupAddon>
                <Input type="text" placeholder="Content" autoComplete="content" value={this.state.name}
                       onChange={(event) => this.setState({content: event.target.value})}/>
              </InputGroup>
              <Row>
                <Button color="primary" className="px-4 p-2 mr-3 ml-3" style={{width: "100%"}}
                        onClick={this.attemptLogin}>Submit</Button>
              </Row>
            </Form>
          </CardBody>
        </Card>

      </div>
    );
  }
}



function mapDispatchToProps(dispatch) {
  return bindActionCreators({signIn}, dispatch);
}


export default connect(null, mapDispatchToProps)(CreateForm);



