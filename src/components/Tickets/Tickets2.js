import React, {Component} from 'react';
import {bindActionCreators} from "redux";
import {loadTickets} from "../../actions/TicketActions";
import {openTab} from "../../actions/LayoutActions";
import {connect} from "react-redux";
import TicketCard from "./TicketCard";
import {Grid} from "semantic-ui-react"
import TicketFilterMenu from "./TicketFilterMenu";
import TicketTable from "./TicketTable";


const orderByOptions = [
    {value: "priority", label: "priority"}, {value: "-priority", label: "priority desc"},
    {value: "creation_time", label: "creation time"}, {value: "-creation_time", label: "creation time desc"},
    {value: "date_of_last_reply", label: "date of last reply"}, {
        value: "-date_of_last_reply",
        label: "date of last reply desc"
    },
];


class Tickets extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            orderBy: {value: "-priority", label: "priority desc"},
        }
    }

    // componentDidMount() {
    //     if (this.props.query.indexOf("ordering") !== -1) {
    //         let ordering = this.props.query.substring(this.props.query.indexOf("ordering") + 9);
    //         this.setState({orderBy: orderByOptions.find(option => option.value === ordering)})
    //     }
    //     this.fetchData(this.props.query)
    // }
    //
    // componentDidUpdate(prevProps) {
    //     let oldId = prevProps.query;
    //     let newId = this.props.query;
    //     if (newId !== oldId)
    //         this.fetchData(this.props.query)
    // }
    //
    // fetchData = (query) => {
    //     let webQuery = "";
    //     if (query) {
    //         webQuery = "?" + query;
    //     }
    //     // this.props.loadTickets(webQuery)
    //
    // };
    //
    // generateTicketCards = () => {
    //     return this.props.tickets.map(ticket => <TicketCard ticket={ticket} key={ticket.id}/>)
    // };
    //
    // handleOrderBySelectChange = (selectedOption) => {
    //     this.setState({orderBy: selectedOption});
    //     const query = this.props.query;
    //
    //     let filterQuery = "";
    //     if (query) {
    //         if (query.indexOf("&ordering") !== -1) {
    //             filterQuery = query.substring(0, query.indexOf("&ordering"));
    //         } else if (query.indexOf("ordering") !== -1) {
    //             filterQuery = query.substring(0, query.indexOf("ordering"));
    //         } else {
    //             filterQuery = query;
    //         }
    //     }
    //     if (filterQuery.length > 0) {
    //         filterQuery = filterQuery + "&"
    //     }
    //
    //     this.props.openTab({
    //         type: "ticketList",
    //         data: {query: `${filterQuery}ordering=${selectedOption.value}`},
    //         title: "tickets",
    //         UID: `ticketList`
    //     });
    // };
    //
    // getAgent = (ticket) => {
    //     return ticket.assigned_to ? this.props.agents.find((agent) => agent.id === ticket.assigned_to).name : "Unassigned";
    // };
    //
    // getTeam = (ticket) => {
    //     return ticket.assigned_team ? this.props.teams.find((team) => team.id === ticket.assigned_team).name : "Unassigned";
    // };
    //
    // getImage = () => {
    //     return <img className="rounded-circle" width="50" height="50"
    //                 src={this.props.ticket.client.avatar}
    //                 style={{margin: "auto"}}/>
    //
    // };
    //
    // renderStatus() {
    //     let {status, priority} = this.props.ticket;
    //     if (status === 0) {
    //         return <p>Awaiting User | {priority}</p>
    //     } else if (status === 1) {
    //         return <p>Awaiting Agent | {priority}</p>
    //     } else if (status === 2) {
    //         return <p>Resolved | {priority}</p>
    //     }
    // }
    //

    render() {
        let dynamicHeight = 'calc(100vh - 50px)';

        return (
            <Grid className="animated fadeIn" columns='equal' style={{marginLeft: "0",marginTop:"0"}}>
                <Grid.Row style={{margin: "0", padding: "0"}}>
                    <Grid.Column style={{
                        display: "flex",
                        flexDirection: "column",
                        height: dynamicHeight,
                        overflowY: "auto",
                        backgroundColor: "#f4f4f4",
                        padding: "0",
                        maxWidth: "300px",
                        minWidth: "300px"
                    }}>
                        <TicketFilterMenu id={this.props.id} onFilterChanged={(filter) => this.setState({filter})}/>
                    </Grid.Column>
                    <Grid.Column style={{height: dynamicHeight, overflowY: "auto", padding: "0"}}>

                        {/*<div style={{paddingLeft: 10, display: "flex", alignItems: "center", width: "100%"}}>*/}
                        {/*<label htmlFor="team-select" style={{paddingRight: "10px"}}>order by:</label>*/}
                        {/*<div style={{width: "200px"}}><Select*/}
                        {/*theme={(theme) => ({...theme, spacing: {...theme.spacing, menuGutter: 0}})}*/}
                        {/*value={this.state.orderBy}*/}
                        {/*onChange={this.handleOrderBySelectChange}*/}
                        {/*options={orderByOptions}*/}
                        {/*/></div>*/}
                        {/*</div>*/}
                        {/*{this.generateTicketCards()}*/}
                        <TicketTable height={dynamicHeight} filter={this.state.filter}/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}


const mapStateToProps = ({tickets}) => {
    return {
        tickets: tickets.tickets
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({loadTickets, openTab}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Tickets);




