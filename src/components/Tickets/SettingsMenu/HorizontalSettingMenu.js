import React, {Component} from 'react';
import {Button, CardBody} from 'reactstrap';
import {Editor} from 'react-draft-wysiwyg';
import '../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select, {components} from 'react-select';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeSettings, sendReply} from "../../../actions/TicketActions";

const {Option} = components;


class TicketSettingMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ticket: null,
      agentOptions: [{value: null, label: "Unassigned"}],
      teamOptions: [{value: null, label: "Unassigned"}],
      tagOptions: [],
      statuses: [{value: 0, label: "Awaiting User"}, {value: 1, label: "Awaiting Agent"}, {
        value: 2,
        label: "Resolved"
      }],
      priorities: [{value: 1, label: "1"}, {value: 2, label: "2"}, {value: 3, label: "3"}, {value: 4, label: "4"},
        {value: 5, label: "5"}, {value: 6, label: "6"}, {value: 7, label: "7"}, {value: 8, label: "8"},
        {value: 9, label: "9"}, {value: 10, label: "10"}],
      selectedOptions: {
        agent: {value: null, label: "Unassigned"},
        team: {value: null, label: "Unassigned"},
        status: {value: 0, label: "Awaiting User"},
        priority: {value: 1, label: "1"},
        tags: []
      },

    }
  };

  componentDidMount() {
    let options = this.state.agentOptions;
    this.props.agents.map(agent => options.push({value: agent.id, label: agent.name, image: agent.avatar}));
    this.setState({agentOptions: options});

    options = this.state.teamOptions;
    this.props.teams.map(team => options.push({value: team.id, label: team.name}));
    this.setState({teamOptions: options});

    options = this.state.tagOptions;
    this.props.tags.map(tag => options.push({value: tag.id, label: tag.name}));
    this.setState({tagOptions: options});

    let agent;
    if (this.props.ticket.assigned_to !== null) {
      agent = this.state.agentOptions.find((agent) => agent.value === this.props.ticket.assigned_to.id);
    } else {
      agent = this.state.agentOptions[0]
    }

    let team;
    if (this.props.ticket.assigned_team !== null) {
      team = this.state.teamOptions.find((team) => team.value === this.props.ticket.assigned_team.id);
    } else {
      team = this.state.teamOptions[0]
    }

    let status = this.state.statuses.find((status) => status.value === this.props.ticket.status);
    let priority = this.state.priorities.find((priority) => priority.value === this.props.ticket.priority);
    let tags = [];
    this.props.ticket.tags.map((ticketTag) => tags.push(this.state.tagOptions.find((tag) => tag.value === ticketTag)));

    this.setState({selectedOptions: {agent, team, status, priority, tags}});

  }

  CustomOption = (props) => {
    return (
      <Option {...props}>
        {props.data.image ? <img className="rounded-circle" width="20" height="20"
                                 src={props.data.image}/> : null}
        {props.data.label}
      </Option>
    )
  };


  handleAgentSelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedOptions: {...this.state.selectedOptions, agent: selectedOption}});
  };
  handleTeamSelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedOptions: {...this.state.selectedOptions, team: selectedOption}});
  };
  handleStatusSelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedOptions: {...this.state.selectedOptions, status: selectedOption}});
  };
  handlePrioritySelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedOptions: {...this.state.selectedOptions, priority: selectedOption}});
  };
  handleTagSelectChange = (selectedOption) => {
    console.log(`Option selected:`, selectedOption);
    this.setState({selectedOptions: {...this.state.selectedOptions, tags: selectedOption}});
  };

  onSaveChangesClicked = () => {
    let selectedTagsIdArray = [];
    this.state.selectedOptions.tags.map((option) => selectedTagsIdArray.push(option.value));

    this.props.changeSettings(this.props.ticket.id, {
      status: this.state.selectedOptions.status.value,
      priority: this.state.selectedOptions.priority.value,
      assigned_to: this.state.selectedOptions.agent.value,
      assigned_team: this.state.selectedOptions.team.value,
      tags: selectedTagsIdArray,
    })
  };


  generateTicketCards = () => {
    let ticket = this.props.ticket;
    if (ticket) {
      return (
        <div>
          <div style={{padding: 10, display: 'flex', flexDirection: "vertical", flexWrap: "wrap"}}>
            <div style={{width: "200px", marginRight: "20px"}}>
              <label htmlFor="agent-select">agent</label>
              <Select
                value={this.state.selectedOptions.agent}
                onChange={this.handleAgentSelectChange}
                options={this.state.agentOptions}
                components={{Option: this.CustomOption}}
              />
            </div>
            <div style={{width: "200px", marginRight: "20px"}}>
              <label htmlFor="team-select">team</label>
              <Select
                value={this.state.selectedOptions.team}
                onChange={this.handleTeamSelectChange}
                options={this.state.teamOptions}
                components={{Option: this.CustomOption}}
              />
            </div>
            <div style={{width: "200px", marginRight: "20px"}}>
              <label htmlFor="status-select">status</label>
              <Select
                value={this.state.selectedOptions.status}
                onChange={this.handleStatusSelectChange}
                options={this.state.statuses}
                components={{Option: this.CustomOption}}
              />
            </div>
            <div style={{width: "200px", marginRight: "20px"}}>
              <label htmlFor="priority-select">priority</label>
              <Select
                value={this.state.selectedOptions.priority}
                onChange={this.handlePrioritySelectChange}
                options={this.state.priorities}
              />
            </div>
            <div style={{width: "420px", marginRight: "20px"}}>
              <label htmlFor="priority-select">followers</label>
              <Select
                value={this.state.selectedOptions.agent}
                onChange={this.handleAgentSelectChange}
                options={this.state.agentOptions}
                components={{Option: this.CustomOption}}
                isMulti
              />
            </div>
            <div style={{minWidth: "420px", marginRight: "20px"}}>
              <label htmlFor="tags-select">tags</label>
              <Select
                value={this.state.selectedOptions.tags}
                onChange={this.handleTagSelectChange}
                options={this.state.tagOptions}
                isMulti
              />
            </div>
          </div>

          <div style={{paddingLeft: 10}}>
            <Button type="submit" onClick={this.onSaveChangesClicked}>Save Changes</Button>
          </div>
        </div>
      )
    }
  };


  render() {
    return (
      <div>
        {this.generateTicketCards()}
      </div>
    );
  }
}


const mapStateToProps = ({tickets, agents, teams, tags}, ownProps) => {
  return {
    agents: agents.all,
    teams: teams.all,
    tags: tags.all
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({changeSettings, sendReply}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(TicketSettingMenu);

