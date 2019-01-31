import React, {Component} from 'react';
import {Card, CardBody, CardHeader, Col, Row, Table} from 'reactstrap';

import {getApi} from "../../api";

class User extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      user: {}
    }
  }

  componentDidMount() {

    getApi().get(`client/${this.props.id}`, true)
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          this.setState({user: response.data})
        }
      })
      .catch((resp) => {
        console.log(resp);
      });


  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.id;
    let newId = this.props.id;
    if (newId !== oldId){
      getApi().get(`client/${this.props.id}`, true)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
            this.setState({user: response.data})
          }
        })
        .catch((resp) => {
          console.log(resp);
        });

    }
  }


  render() {
    return (
      <div className="animated fadeIn">

        <Card>
          <CardHeader>
            <strong>User id: {this.props.id}</strong>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="10" sm="12" style={{display: "flex", flexDirection: "row"}}>
                <img className="rounded-circle" width="50" height="50"
                     src={this.state.user.avatar}
                     style={{margin: "auto", marginLeft: "10px"}}/>
                <div className="card-body d-flex flex-column align-items-start"
                     style={{padding: "10px", paddingLeft: "20px"}}>
                  <h4 style={{margin: "0 0 5px 0"}}>
                    {this.state.user.name}
                  </h4>
                  <div style={{display: "flex"}}>

                    <p className="mb-1 text-muted"> {this.state.user.email} </p>
                  </div>
                </div>
              </Col>
            </Row>

          </CardBody>
        </Card>

      </div>
    )
  }
}

export default User;
