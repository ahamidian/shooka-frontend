import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {loadTickets} from "../../actions/TicketActions";
import {connect} from "react-redux";
import TicketCard from "./TicketCard";
import Select from 'react-select';

const orderByOptions = [
  {value: "priority", label: "priority"}, {value: "-priority", label: "priority desc"},
  {value: "creation_time", label: "creation time"}, {value: "-creation_time", label: "creation time desc"},
  {value: "date_of_last_reply", label: "date of last reply"}, {value: "-date_of_last_reply", label: "date of last reply desc"},
];


class Tickets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      orderBy: {value: "-priority", label: "priority desc"},
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    let oldId = prevProps.match.params.query;
    let newId = this.props.match.params.query;
    if (newId !== oldId)
      this.fetchData()
  }

  fetchData = () => {
    let query = "";
    if (this.props.match.params.query) {
      query = "?" + this.props.match.params.query;
    }
    // this.props.loadTickets(query)
    this.props.loadTickets()

  };

  generateTicketCards = () => {
    return this.props.tickets.map(ticket => <TicketCard ticket={ticket} key={ticket.id}/>)
  };

  handleOrderBySelectChange = (selectedOption) => {
    this.setState({orderBy: selectedOption});
    const query = this.props.match.params.query;

    let filterQuery = "";
    if (query) {
      if (query.indexOf("&ordering") !== -1) {
        filterQuery = query.substring(0, query.indexOf("&ordering"));
      } else if (query.indexOf("ordering") !== -1) {
        filterQuery = query.substring(0, query.indexOf("ordering"));
      } else {
        filterQuery = query;
      }
    }
    if (filterQuery.length > 0) {
      filterQuery = filterQuery + "&"
    }

    this.props.history.push(`/tickets/${filterQuery}ordering=${selectedOption.value}`)
  };

  render() {
    return (
      <div className="animated fadeIn">
        <div style={{paddingLeft: 10, display: "flex", alignItems: "center", width: "100%"}}>
          <label htmlFor="team-select" style={{paddingRight: "10px"}}>order by:</label>
          <div style={{width: "200px"}}><Select
            theme={(theme) => ({...theme, spacing: {...theme.spacing, menuGutter: 0}})}
            value={this.state.orderBy}
            onChange={this.handleOrderBySelectChange}
            options={orderByOptions}
          /></div>
        </div>
        {this.generateTicketCards()}
      </div>
    );
  }
}


const mapStateToProps = ({tickets}) => {
  return {
    tickets: tickets.tickets
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({loadTickets}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Tickets);




