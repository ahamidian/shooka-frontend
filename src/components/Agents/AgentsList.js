import React, {Component} from 'react';
import {Card, CardBody, Col, Row, Table, Button} from 'reactstrap';
import {getApi} from "../../api";
import {withRouter} from "react-router-dom";


class AgentRowWithoutRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {hover: false}
  }

  onEditButtonClicked = () => {
    this.props.history.push(`/agents/${this.props.item.id}/edit`)
  };
  onDeleteButtonClicked = () => {
    getApi().delete(`agent/${this.props.item.id}`, true)
      .then(response => {
        console.log(response);
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  render() {
    return (
      <tr>
        <td>
          <h5>{this.props.item.email}</h5>
        </td>
        <td>
          <h5>{this.props.item.is_active? "active":"not registered"}</h5>
        </td>
        <td>
          <div style={{float:"right"}}>
          <Button className="bg-primary" onClick={this.onEditButtonClicked}> edit</Button>
          <Button className="bg-danger" onClick={this.onDeleteButtonClicked}> delete</Button>
          </div>
        </td>
      </tr>
    );
  }
}

const AgentRow=withRouter(AgentRowWithoutRouter);


class Agents extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      all: []
    }
  }

  componentDidMount() {
    getApi().get(`agent/`, true)
      .then(response => {
        this.setState({all: response.data});
        console.log(response);
      })
      .catch((resp) => {
        console.log(resp);
      });
  }

  generateItems = () => {
    return this.state.all.map(item => <AgentRow item={item}/>)
  };


  render() {
    return (
      <div className="animated fadeIn">
        <Card style={{margin: "0px 0px 8px 0px"}}>
          <div className="card-header">
            <h3 style={{display:"contents"}}>Agents</h3>
            <Button className="card-header-actions bg-primary" onClick={()=>this.props.history.push("/agents/create")}>
               Add
            </Button>
          </div>
          <CardBody>
            <Table responsive bordered>
              <tbody>
              {this.generateItems()}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}


export default Agents;

