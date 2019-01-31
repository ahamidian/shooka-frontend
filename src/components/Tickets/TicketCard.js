import React, {Component} from 'react';
import {Card, CardBody, Col, Row} from 'reactstrap';
import {
  withRouter
} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {openTab, closeTab, changeTab} from "../../actions/LayoutActions";
import {connect} from "react-redux";


class TicketCardWithoutRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {cardHover: false, userHover: false}
  }

  getAgent = () => {
    return this.props.ticket.assigned_to ? this.props.agents.find((agent)=>agent.id===this.props.ticket.assigned_to).name : "Unassigned";
  };

  getTeam = () => {
    return this.props.ticket.assigned_team ? this.props.teams.find((team)=>team.id===this.props.ticket.assigned_team).name : "Unassigned";
  };

  getImage = () => {
    return <img className="rounded-circle" width="50" height="50"
                src={this.props.ticket.client.avatar}
                style={{margin: "auto"}}/>

  };

  renderStatus() {
    let {status,priority} = this.props.ticket;
    if (status===0) {
      return <p>Awaiting User | {priority}</p>
    }else if (status===1) {
      return <p>Awaiting Agent | {priority}</p>
    }else if (status===2) {
      return <p>Resolved | {priority}</p>
    }
  }

  onCardMouseEnterHandler = () => {
    this.setState({
      cardHover: true
    });
  };
  onCardMouseLeaveHandler = () => {
    this.setState({
      cardHover: false
    });
  };
  onCardClickHandler = () => {
    this.props.openTab({
      type: "ticket",
      data: {id:this.props.ticket.id},
      title: this.props.ticket.title,
      UID: `ticket/${this.props.ticket.id}`
    });

    // const ticketLink = `/ticket/${this.props.ticket.id}`;
    // this.props.history.push(ticketLink);
  };

  onUserMouseEnterHandler = () => {
    this.setState({
      userHover: true
    });
  };
  onUserMouseLeaveHandler = () => {
    this.setState({
      userHover: false
    });
  };
  onUserClickHandler = (event) => {
    event.stopPropagation();
    this.props.openTab({
      type: "user",
      data:{id: this.props.ticket.client.id},
      title: this.props.ticket.client.name,
      UID: `user/${this.props.ticket.client.id}`
    });

    // const ticketLink = `/user/${this.props.ticket.client.id}`;
    // this.props.history.push(ticketLink)
  };
  getTimeSince = (time) => {
    let timeAgo = "";

    const SECOND = 1000;
    const MINUTE = SECOND * 60;
    const HOUR = MINUTE * 60;
    const DAY = HOUR * 24;
    const WEEK = DAY * 7;
    const MONTH = DAY * 30;
    const YEAR = DAY * 365;

    let diffInMillis = (new Date().valueOf()) - (new Date(time).valueOf());
    if (diffInMillis < MINUTE) {
      timeAgo = Math.round(diffInMillis / SECOND) + " seconds"
    } else if (diffInMillis < HOUR) {
      timeAgo = Math.round(diffInMillis / MINUTE) + " minutes and " + Math.round((diffInMillis % MINUTE) / SECOND) + " seconds"
    } else if (diffInMillis < DAY) {
      timeAgo = Math.round(diffInMillis / HOUR) + " hours and " + Math.round((diffInMillis % HOUR) / MINUTE) + " minutes"
    } else if (diffInMillis < MONTH) {
      timeAgo = Math.round(diffInMillis / DAY) + " days and " + Math.round((diffInMillis % DAY) / HOUR) + " hours"
    } else if (diffInMillis < YEAR) {
      timeAgo = Math.round(diffInMillis / MONTH) + " months and " + Math.round((diffInMillis % MONTH) / DAY) + " days"
    } else {
      timeAgo = Math.round(diffInMillis / YEAR) + " years and " + Math.round((diffInMillis % YEAR) / MONTH) + " months"
    }
    return timeAgo
  };

  render() {
    return (
      <Card style={{margin: "0px 0px 8px 0px", backgroundColor: this.state.cardHover ? "#eeeeff" : "#ffffff"}}
            onMouseEnter={this.onCardMouseEnterHandler}
            onMouseLeave={this.onCardMouseLeaveHandler}
            onClick={this.onCardClickHandler}>
        <CardBody style={{padding: "0.25rem"}}>
          <Row style={{margin:"0"}}>
            <Col md="9" sm="12" style={{display: "flex", flexDirection: "row"}}>
              {this.getImage()}
              <div className="card-body d-flex flex-column align-items-start"
                   style={{padding: "10px", paddingLeft: "20px"}}>
                <h4 style={{margin: "0 0 5px 0"}}>
                  {this.props.ticket.title}
                </h4>
                <div style={{display: "flex"}}>
                  <p style={{color: this.state.userHover ? "#0b56e5" : "#10a4ff"}}
                     onMouseEnter={this.onUserMouseEnterHandler}
                     onMouseLeave={this.onUserMouseLeaveHandler}
                     onClick={this.onUserClickHandler}
                     className="card-text mb-auto"> {this.props.ticket.client.name} </p>
                  <p className="mb-1 text-muted"
                     style={{marginLeft: "5px"}}> &lt; {this.props.ticket.client.email} &gt;</p>
                </div>
                <p className="mb-1 text-muted"> {this.getTimeSince(this.props.ticket.creation_time)} ago</p>
              </div>


            </Col>
            <Col md="3" className="d-none d-lg-block d-md-block">
              Agent : {this.getAgent()}
              <br/>
              Team : {this.getTeam()}
              <br/>
              {this.renderStatus()}
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = ({tickets, agents, teams, tags}) => {
  return {
    agents:agents.all,
    teams:teams.all,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({openTab}, dispatch);
}

const TicketCard = withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketCardWithoutRouter));
export default TicketCard


