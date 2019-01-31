import React, {Component} from 'react';
import "./MyCss.css"
import {changeTab, closeTab} from "../../actions/LayoutActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import HeaderTab from "./HeaderTab";
import {Grid} from "semantic-ui-react"


class HeaderTabs extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            scrollRight: false,
            scrollLeft: false
        }

    }

    toggle = (tab) => {
        if (this.props.layout.activeTab !== tab.UID) {
            this.props.changeTab(tab.UID)
        }
    };

    generateTabs = () => {

        return this.props.layout.tabs.map((tab) =>

            <HeaderTab
                active={this.props.layout.activeTab === tab.UID} title={tab.title}
                type={tab.type}
                onClose={() => this.props.closeTab(tab.UID)}
                onClick={() => this.toggle(tab)}>
            </HeaderTab>
        )
    };

    render() {

        return (

                <div style={{width:"100%"}}>
                    <Grid columns="equal" className="shooka-100-columns" style={{margin:"0"}}>
                    <Grid.Row className="MyNav" ref={this.myRef} style={{padding:"0"}}>
                        {this.generateTabs()}
                    </Grid.Row>
                    </Grid>
                </div>
        );
    }
}


const mapStateToProps = ({layout}) => {
    return {
        layout: layout
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({changeTab, closeTab}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(HeaderTabs);

