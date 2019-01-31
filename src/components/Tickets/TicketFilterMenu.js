import React, {Component} from 'react';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import {components} from 'react-select';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeSettings, loadTicket, sendReply} from "../../actions/TicketActions";
import _ from 'lodash'
import {NavLink} from "react-router-dom";

const {Option} = components;

class TicketFilterItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    }
  };

  onUserMouseEnterHandler = () => {
    this.setState({
      hover: true
    });
  };
  onUserMouseLeaveHandler = () => {
    this.setState({
      hover: false
    });
  };

  onClick = () => {

  };

  render() {
    let {hover} = this.state;
    let {name, link, onClick} = this.props;
    return (
      <NavLink to={link} activeClassName="active" className="p-2"
               style={{
                 backgroundColor: hover ? "#e0e0e0" : "#eeeeee",
                 display: "flex", justifyContent: "space-between", color: "#333333"
               }}
               onMouseEnter={this.onUserMouseEnterHandler} onMouseLeave={this.onUserMouseLeaveHandler} onClick={onClick}>
        <p style={{margin: "0", overflow: "hidden", textOverflow: "ellipsis",}}>{name}</p>
        <p style={{margin: "0"}}>5</p>
      </NavLink>
    )
  }
}


class TicketFilterMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  };


  render() {
    return (
      <div style={{padding: "10px"}}>
        <TicketFilterItem name="All Tickets" link="/ticket/all"onClick={()=>this.props.onFilterChanged("")}/>
        <TicketFilterItem name="Unassigned Tickets"  link="/ticket/unassigned"onClick={()=>this.props.onFilterChanged("&unassigned=true")}/>
        <TicketFilterItem name="My Tickets"  link="/tickets/my" onClick={()=>this.props.onFilterChanged("&my=true")}/>
        <TicketFilterItem name="My Groups Ticket"  link="/ticket/myGroup"/>
      </div>
    );
  }
}


const mapStateToProps = ({tickets, agents, teams, tags}, ownProps) => {
  return {
    ticket: _.cloneDeep(tickets.detailedTickets.find(ticket => ticket.id === ownProps.id)),
    agents: agents.all,
    teams: teams.all,
    tags: tags.all
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadTicket, changeSettings, sendReply}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketFilterMenu);

