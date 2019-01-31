import React, {Component} from 'react';
import {Card, CardBody, Col, Row, Table, Button, Label, Input, FormGroup} from 'reactstrap';
import {getApi} from "../../api";
import {withRouter} from "react-router-dom";
import Select from 'react-select';

class Agents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      allTeams:[],
      selectedTeams:[],
    }
  }

  componentDidMount() {
    this.fetchTeams();


    if (this.props.match.params.id) {
      getApi().get(`agent/${this.props.match.params.id}`, true)
        .then(response => {
          if (response.status === 200) {
            let selectedTeams=[];

            response.data.teams.map((userTeam)=>selectedTeams.push(this.state.allTeams.find((team)=>team.value===userTeam)));

            console.log(selectedTeams);
            this.setState({
              firstName: response.data.first_name,
              lastName: response.data.last_name,
              phoneNumber: response.data.phone_number,
              email: response.data.email,
              selectedTeams :selectedTeams,
            })
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    }
  }

  onSaveClicked = () => {
    let selectedTeamsIdArray=[];
    this.state.selectedTeams.map((option)=>selectedTeamsIdArray.push(option.value));

    if (this.props.match.params.id) {
      getApi().patch(`agent/${this.props.match.params.id}/`, {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone_number: this.state.phoneNumber,
        email: this.state.email,
        teams: selectedTeamsIdArray,
      }, true)
        .then(response => {
          console.log(response);
          if (response.status === 200) {
            this.props.history.push("/agents/")
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    } else {
      getApi().post(`agent/`, {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        phone_number: this.state.phoneNumber,
        email: this.state.email,
        teams: selectedTeamsIdArray,
      }, true)
        .then(response => {
          if (response.status === 201) {
            this.props.history.push("/agents/")
          }
        })
        .catch((resp) => {
          console.log(resp);
        });
    }
  };

  fetchTeams = () => {
    getApi().get(`team/`, true)
      .then(response => {
        console.log(response);
        let options=[];
        response.data.map(team => options.push({value:team.id,label:team.name}));
        this.setState({allTeams:options});
      })
      .catch((resp) => {
        console.log(resp);
      });
  };
  handleTeamSelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedTeams:selectedOption});
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Card style={{margin: "0px 0px 8px 0px"}}>
          <div className="card-header">
            <h3 style={{display: "contents"}}>Create Agent</h3>
          </div>
          <CardBody>


            <FormGroup row>
              <Col md="1">
                <Label htmlFor="email">Email</Label>
              </Col>
              <Col xs="12" md="11">
                <Input type="email" id="email" placeholder="agent email address" value={this.state.email}
                       onChange={(event) => this.setState({email: event.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="1">
                <Label htmlFor="firstName">First Name</Label>
              </Col>
              <Col xs="12" md="11">
                <Input type="text" id="firstName" placeholder="agent first name" value={this.state.firstName}
                       onChange={(event) => this.setState({firstName: event.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="1">
                <Label htmlFor="lastName">Last Name</Label>
              </Col>
              <Col xs="12" md="11">
                <Input type="text" id="lastName" placeholder="agent last name" value={this.state.lastName}
                       onChange={(event) => this.setState({lastName: event.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="1">
                <Label htmlFor="phoneNumber">Phone Number</Label>
              </Col>
              <Col xs="12" md="11">
                <Input type="text" id="phoneNumber" placeholder="agent phone number" value={this.state.phoneNumber}
                       onChange={(event) => this.setState({phoneNumber: event.target.value})}/>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col md="1">
                <Label htmlFor="phoneNumber">Teams</Label>
              </Col>
              <Col xs="12" md="11">
                <Select
                  value={this.state.selectedTeams}
                  onChange={this.handleTeamSelectChange}
                  options={this.state.allTeams}
                  isMulti
                />
              </Col>
            </FormGroup>
            <Button className="bg-primary" onClick={this.onSaveClicked}>save</Button>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default withRouter(Agents);

