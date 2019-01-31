import React, {Component} from 'react';
import {
  Button,
  ButtonDropdown,
  Card,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from 'reactstrap';
import {Editor} from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Select, {components} from 'react-select';
import classnames from "classnames";
import {getApi} from "../../api";
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';

const {Option} = components;


class Message extends Component {
  constructor(props) {
    super(props);
  }

  getImage = (message) => {
    if (message.client_sender)
      return <img className="rounded-circle" width="50" height="50"
                  src={message.client_sender.avatar}
                  style={{margin: "auto", marginLeft: "10px"}}/>
    else
      return <img className="rounded-circle" width="50" height="50"
                  src={message.agent_sender.avatar}
                  style={{margin: "auto", marginLeft: "10px"}}/>

  };
  getTitle = (message) => {
    if (message.client_sender)
      return <p
        style={{margin: 0}}>{this.props.index} | {this.props.message.client_sender.name}</p>
    else
      return <p
        style={{margin: 0}}>{this.props.index} | {this.props.message.agent_sender.name}</p>

  };
  getHeaderColor = () => {
    if (this.props.message.is_note) {
      return "#c2c3c3"
    } else if (this.props.message.agent_sender) {
      return "#b1f5ff"
    } else {
      return "#ffe395"
    }
  };

  render() {
    return (
      <div style={{padding: 10, display: 'flex'}}>
        <div>
          {this.getImage(this.props.message)}
        </div>
        <div style={{width: '100%', marginLeft: 8}}>
          <div className="border border-dark rounded" style={{backgroundColor: 'white'}}>
            <div style={{padding: 5, backgroundColor: this.getHeaderColor()}}>
              {this.getTitle(this.props.message)}
            </div>
            <div className="rounded-top " style={{padding: '0px 8px'}}>
              <div dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(JSON.parse(this.props.message.content)))}}/>

            </div>
          </div>
        </div>
      </div>
    );
  }
}


class Ticket extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      ticket: null,
      agents: [{value: null, label: "Unassigned"}],
      teams: [{value: null, label: "Unassigned"}],
      tags: [],
      statuses: [{value: 0, label: "Awaiting User"}, {value: 1, label: "Awaiting Agent"}, {
        value: 2,
        label: "Resolved"
      }],
      priorities: [{value: 1, label: "1"}, {value: 2, label: "2"}, {value: 3, label: "3"}, {value: 4, label: "4"},
        {value: 5, label: "5"}, {value: 6, label: "6"}, {value: 7, label: "7"}, {value: 8, label: "8"},
        {value: 9, label: "9"}, {value: 10, label: "10"}],
      loading: true,
      activeTab: '1',
      dropDownOpen: false,
      dropDownSelect: "Awaiting User",
      selectedOptions: {
        agent: {value: null, label: "Unassigned"},
        team: {value: null, label: "Unassigned"},
        status: {value: 0, label: "Awaiting User"},
        priority: {value: 1, label: "1"},
        tags: []
      },
      editorState: EditorState.createEmpty()

    }
  };

  componentDidMount() {


    this.fetchAgents();
    this.fetchTeams();
    this.fetchTags();

    this.fetchTicket();


  }

  fetchTicket = () => {
    getApi().get(`ticket/${this.props.match.params.id }/`, true)
      .then(response => {
        console.log(response);

        let agent = this.state.selectedOptions.agent;
        let team = this.state.selectedOptions.team;
        let status = this.state.selectedOptions.status;
        let priority = this.state.selectedOptions.priority;
        let tags = this.state.selectedOptions.tags;

        if (response.data.assigned_to !== null)
          agent = this.state.agents.find((agent) => agent.value === response.data.assigned_to.id);

        if (response.data.assigned_team !== null)
          team = this.state.teams.find((team) => team.value === response.data.assigned_team.id);

        status = this.state.statuses.find((status) => status.value === response.data.status);
        priority = this.state.priorities.find((priority) => priority.value === response.data.priority);
        tags = [];
        response.data.tags.map((ticketTags) => tags.push(this.state.tags.find((tag) => tag.value === ticketTags)));

        this.setState({selectedOptions: {agent, team, status, priority, tags}});
        this.setState({ticket: response.data});
      })
      .catch((resp) => {
        console.log(resp);
      });
  };
  fetchAgents = () => {
    getApi().get(`agent/`, true)
      .then(response => {
        console.log(response);
        let options = this.state.agents;
        response.data.map(agent => options.push({value: agent.id, label: agent.name, image: agent.avatar}));
        this.setState({agents: options});
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  fetchTeams = () => {
    getApi().get(`team/`, true)
      .then(response => {
        console.log(response);
        let options = this.state.teams;
        response.data.map(team => options.push({value: team.id, label: team.name}));
        this.setState({teams: options});
      })
      .catch((resp) => {
        console.log(resp);
      });
  };
  fetchTags = () => {
    getApi().get(`tag/`, true)
      .then(response => {
        console.log(response);
        let options = [];
        response.data.map(tag => options.push({value: tag.id, label: tag.name}));
        this.setState({tags: options});
      })
      .catch((resp) => {
        console.log(resp);
      });
  };
  generateMessages = () => {
    const size= this.state.ticket.messages.length;
    return this.state.ticket.messages.reverse().map((message,index) => <Message message={message} index={size-index}/>);
  };

  CustomOption = (props) => {
    return (
      <Option {...props}>
        {props.data.image ? <img className="rounded-circle" width="20" height="20"
                                 src={props.data.image}/> : null}
        {props.data.label}
      </Option>
    )
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

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
    console.log(this.state.selectedOptions);
    let selectedTagsIdArray = [];
    this.state.selectedOptions.tags.map((option) => selectedTagsIdArray.push(option.value));

    getApi().patch(`ticket/${this.props.match.params.id}/`, {
      status: this.state.selectedOptions.status.value,
      priority: this.state.selectedOptions.priority.value,
      assigned_to: this.state.selectedOptions.agent.value,
      assigned_team: this.state.selectedOptions.team.value,
      tags: selectedTagsIdArray,
    }, true)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // this.props.history.push("/agents/")
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  onReplyClicked = () => {

    getApi().post(`message/`, {
      agent_sender: null,
      client_sender: null,
      ticket_id: this.props.match.params.id,
      content: JSON.stringify(convertToRaw(this.state.editorState.getCurrentContent()))
    }, true)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          // this.props.history.push("/agents/")
        }
      })
      .catch((resp) => {
        console.log(resp);
      });
  };

  generateTicketCards = () => {
    if (this.state.ticket) {
      let ticket = this.state.ticket;
      return (
        <div style={{marginTop: 10, marginLeft: 0, paddingLeft: 0}}>
          <Card style={{padding: 10}}>
            <h2>{ticket.title}</h2>
            <div style={{padding: 10, display: 'flex'}}>
              <div style={{width: 200}}>
                <label htmlFor="agent-select">agent</label>
                <Select
                  value={this.state.selectedOptions.agent}
                  onChange={this.handleAgentSelectChange}
                  options={this.state.agents}
                  components={{Option: this.CustomOption}}
                />
              </div>
              <div style={{paddingLeft: 10, width: 200}}>
                <label htmlFor="team-select">team</label>
                <Select
                  value={this.state.selectedOptions.team}
                  onChange={this.handleTeamSelectChange}
                  options={this.state.teams}
                  components={{Option: this.CustomOption}}
                />
              </div>
              <div style={{paddingLeft: 10, width: 200}}>
                <label htmlFor="status-select">status</label>
                <Select
                  value={this.state.selectedOptions.status}
                  onChange={this.handleStatusSelectChange}
                  options={this.state.statuses}
                  components={{Option: this.CustomOption}}
                />
              </div>
              <div style={{paddingLeft: 10, width: 200}}>
                <label htmlFor="priority-select">priority</label>
                <Select
                  value={this.state.selectedOptions.priority}
                  onChange={this.handlePrioritySelectChange}
                  options={this.state.priorities}
                />
              </div>
              <div style={{paddingLeft: 10, width: 200}}>
                <label htmlFor="priority-select">follow</label>
                <input name="follow" type="checkbox"/>
              </div>
            </div>
            <div style={{padding: '0px 10px 10px 10px'}}>
              <label htmlFor="tags-select">tags</label>
              <Select
                value={this.state.selectedOptions.tags}
                onChange={this.handleTagSelectChange}
                options={this.state.tags}
                isMulti
              />
            </div>
            <div style={{paddingLeft: 10}}>
              <Button type="submit" onClick={this.onSaveChangesClicked}>Save Changes</Button>
            </div>
          </Card>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === '1'})}
                onClick={() => {
                  this.toggle('1');
                }}>
                reply
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({active: this.state.activeTab === '2'})}
                onClick={() => {
                  this.toggle('2');
                }}
              >
                note
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Editor wrapperStyle={{border: '1px solid #555555'}}
                      editorStyle={{
                        minHeight: "200px",
                        backgroundColor: "white",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                      }}
                      editorState={this.state.editorState}
                      onEditorStateChange={(editorState) => this.setState({editorState})}
              />
              <div className="btn-group mt-2" role="group" aria-label="Button group with nested dropdown">
                <Button type="submit" onClick={this.onReplyClicked}>Send Reply as {this.state.dropDownSelect}</Button>
                <ButtonDropdown className="mr-1" isOpen={this.state.dropDownOpen} toggle={() => {
                  this.setState({dropDownOpen: !this.state.dropDownOpen})
                }}>
                  <DropdownToggle caret color="primary"/>
                  <DropdownMenu>
                    <DropdownItem onClick={() => this.setState({dropDownSelect: "Awaiting User"})}>Awaiting
                      User</DropdownItem>
                    <DropdownItem onClick={() => this.setState({dropDownSelect: "Awaiting Agent"})}>Awaiting
                      Agent</DropdownItem>
                    <DropdownItem onClick={() => this.setState({dropDownSelect: "Resolved"})}>Resolved</DropdownItem>
                  </DropdownMenu>
                </ButtonDropdown>
              </div>

            </TabPane>
            <TabPane tabId="2">
              <Editor wrapperStyle={{border: '1px solid #555555'}}
                      editorStyle={{
                        minHeight: "200px",
                        backgroundColor: "white",
                        paddingLeft: "10px",
                        paddingRight: "10px"
                      }}
              />
              <Button type="submit" className="mt-2">Add Note</Button>

            </TabPane>
          </TabContent>

          <Card>
            {this.generateMessages()}
          </Card>
        </div>

      )
    }
  };


  render() {
    return (
      <div className="animated fadeIn">
        {this.generateTicketCards()}
      </div>
    );
  }
}


export default Ticket;

