import React, {Component} from 'react';
import {
    withRouter
} from 'react-router-dom'
import {bindActionCreators} from "redux";
import {openTab} from "../../actions/LayoutActions";
import {connect} from "react-redux";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import {loadTickets,loadTicketsByFilter} from "../../actions/TicketActions";
import {getTimeSince} from "../utils";
import {Link} from 'react-router-dom'

class TicketTableWithoutRouter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pages: null,
            loading: true,
            userHover: false,
        };
    }

    getAgent = (ticket) => {
        if (ticket.assigned_to) {
            let agent = this.props.agents.find((agent) => agent.id === ticket.assigned_to);
            if (agent) {
                return agent.name
            }
        }
        ;

        return "Unassigned";
    };
    getClient = (ticket) => {
        return (
            <div style={{display: "flex"}}>
                <img className="rounded" width="25" height="25"
                     src={ticket.client.avatar}
                     style={{margin: "auto 0"}}
                     onClick={(event) => this.onUserClickHandler(event, ticket)}/>
                <Link to="" style={{marginLeft: "5px"}}
                      onClick={(event) => this.onUserClickHandler(event, ticket)}>{ticket.client.name}</Link>
            </div>
        )
    };

    getTeam = (ticket) => {
        return ticket.assigned_team ? this.props.teams.find((team) => team.id === ticket.assigned_team).name : "Unassigned";
    };

    getImage = (ticket) => {
        return <img className="rounded-circle" width="50" height="50"
                    src={ticket.client.avatar}
                    style={{margin: "auto"}}/>

    };

    getStatus(ticket) {
        let {status, priority} = ticket;
        let text;
        if (status === 0) {
            text = `Awaiting User | ${priority}`
        } else if (status === 1) {
            text = `Awaiting Agent | ${priority}`
        } else if (status === 2) {
            text = `Resolved | ${priority}`
        }
        return <p style={{marginBottom: "0"}}>{text}</p>
    }

    onClickHandler = (ticket) => {
        this.props.openTab({
            type: "ticket",
            data: {id: ticket.id},
            title: ticket.title,
            UID: `ticket/${ticket.id}`
        });
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
    onUserClickHandler = (event, ticket) => {
        event.stopPropagation();
        this.props.openTab({
            type: "user",
            data: {id: ticket.client.id},
            title: ticket.client.name,
            UID: `user/${ticket.client.id}`
        });
    };

    fetchData = (state, instance) => {
        // this.setState({loading: true}, () => {
        //     this.props.loadTickets(state.pageSize, state.page, this.props.filter, state.sorted, () => this.setState({loading: false}));
        // });


        this.setState({loading: true}, () => {
            this.props.loadTicketsByFilter(state.pageSize, state.page, this.props.filter, state.sorted, () => this.setState({loading: false}));
        });
    };

    render() {
        const {loading} = this.state;
        return (
            <ReactTable
                // data={this.props.tickets}
                columns={[
                    {
                        Header: "Requester",
                        id: "client",
                        accessor: ticket => this.getClient(ticket)
                    },
                    {
                        Header: "Subject",
                        accessor: "title"
                    },
                    {
                        Header: "Agent",
                        id: "assigned_to",
                        accessor: ticket => this.getAgent(ticket)
                    },
                    {
                        Header: "Agent Team",
                        id: "assigned_team",
                        accessor: ticket => this.getTeam(ticket)
                    },
                    {
                        Header: "Requested at",
                        id: "creation_time",
                        accessor: ticket => getTimeSince(ticket.creation_time)
                    },
                    {
                        Header: "Status",
                        id: "priority",
                        accessor: ticket => this.getStatus(ticket)
                    }
                ]}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                        style: {
                            borderRight: 0
                        },
                        onClick: e =>
                            this.onClickHandler(rowInfo.original)
                    };
                }}
                getTheadThProps={(state, rowInfo, column, instance) => {
                    return {
                        style: {
                            background: "#eeeeee",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            fontWeight: "bold"
                        }
                    };
                }}
                getTbodyProps={(state, rowInfo, column, instance) => {
                    return {
                        style: {
                            display: "block"
                        }
                    };
                }}
                style={{
                    height: this.props.height,
                    background: "white"
                }}
                manual // Forces table not to paginate or sort automatically, so we can handle it server-side
                data={this.props.tickets}
                pages={this.props.pages} // Display the total number of pages
                loading={loading} // Display the loading overlay when we need it
                filtered={this.props.filter}
                onFetchData={this.fetchData} // Request new data when things change
                minRows={0}
                defaultPageSize={25}
                className=" -highlight"
                // pivotBy={["firstName", "lastName"]}
            />
        );
    }
}

const mapStateToProps = ({tickets, agents, teams, tags}) => {
    return {
        agents: agents.all,
        teams: teams.all,
        tickets: tickets.tickets,
        pages: tickets.pages,
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({openTab, loadTickets,loadTicketsByFilter}, dispatch);
}

const TicketTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(TicketTableWithoutRouter));
export default TicketTable


