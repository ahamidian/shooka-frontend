import React, {Component, Fragment} from 'react';
import Header from "./Header";
import ShookaSideBar from "./ShookaSideBar";
import {Grid} from "semantic-ui-react";
import navigation from "../nav"
import {Switch, Route, Redirect} from 'react-router-dom'
import TabLayout from "./MyTab/TabLayout"

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchTeams} from "../actions/TeamActions";
import {fetchTags} from "../actions/TagActions";
import {fetchAgents} from "../actions/AgentActions";
import {changeTab, closeTab, openTab} from "../actions/LayoutActions";
import LoginRequired from "./LoginRequired";


class DefaultLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSideBarOpen: true
        }
    }

    componentDidMount() {

        this.props.fetchAgents();
        this.props.fetchTeams();
        this.props.fetchTags();
        this.props.openTab({
            type: "ticketList",
            data: {query: ``},
            title: "tickets",
            UID: `ticketList`
        });

    }

    renderMain() {
        // let {twoColumnEnabled} = this.props.layout;

        // if (twoColumnEnabled) {
        return (
            <TabLayout/>
        )

    }

    render() {
        let dynamicHeight = 'calc(100vh - 50px)';

        return (
            <LoginRequired>
                <Grid columns="equal" style={{margin: "0"}}>
                    <Grid.Row style={{padding: "0"}}>
                        <Header onMenuTogglerClick={() => this.setState({isSideBarOpen: !this.state.isSideBarOpen})}/>
                    </Grid.Row>
                    <Grid.Row style={{padding: "0"}}>
                        <ShookaSideBar navigation={navigation} visible={this.state.isSideBarOpen}/>
                        <div style={{
                            marginLeft: this.state.isSideBarOpen ? "55px" : "0px",
                            height: dynamicHeight,
                            width: "100%"
                        }}
                             className="shooka-pusher">

                            {this.renderMain()}

                        </div>
                    </Grid.Row>
                </Grid>
            </LoginRequired>

        );
    }
}


const mapStateToProps = ({layout}) => {
    return {
        layout: layout
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeTab, closeTab, fetchTeams, fetchTags, fetchAgents, openTab}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);


