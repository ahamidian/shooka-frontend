import React, {Component} from 'react';
import {Card, CardBody, Col, Row, Table, Button, Label, Input, FormGroup} from 'reactstrap';
import {getApi} from "../../api";
import {withRouter} from "react-router-dom";

class Agents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      name:"",
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
  onButtonClicked = () => {
    if(this.props.match.params.id) {
      getApi().patch(`team/${this.props.match.params.id}/`, {name: this.state.name}, true)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.props.history.push("/teams/")
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    }else{
      getApi().post(`team/`, {name: this.state.name}, true)
        .then(response => {
          if (response.status === 201) {
            this.props.history.push("/teams/")
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    }
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card style={{margin: "0px 0px 8px 0px"}}>
          <div className="card-header">
            <h3 style={{display: "contents"}}>Create Team</h3>
          </div>
          <CardBody>

            <FormGroup row>
              <Col md="1">
                <Label htmlFor="name">Name</Label>
              </Col>
              <Col xs="12" md="11">
                <Input type="text" id="name" placeholder="team name" value={this.state.name}
                       onChange={(event) => this.setState({name: event.target.value})}/>
              </Col>
            </FormGroup>
            <Button className="bg-primary" onClick={this.onButtonClicked}>save</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default withRouter(Agents);

