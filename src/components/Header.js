import React, {Component} from 'react';
import {Menu, Image, Dropdown, Icon} from 'semantic-ui-react'
import HeaderTabs from "./MyTab/HeaderTabs";
import ProfileModal from "./Profile/ProfileModal";
import {connect} from "react-redux";
import {openTab} from "../actions/LayoutActions";
import {loadTickets} from "../actions/TicketActions";
import {bindActionCreators} from "redux";

class Header extends Component {

    logout = () => {
        localStorage.removeItem("access");
        window.location.reload();
    };

    render() {
        return (
            <Menu style={{
                height: "50px", width: "100%", border: "0", borderRadius: "0",
                borderBottom: "1px solid rgba(34,36,38,.15)",
                boxShadow: " 0 0px 0px 0 rgba(34,36,38,.15)"
            }}>
                <Menu.Item icon='sidebar' style={{width: "55px", fontSize: "1.5em", padding: "0",}}
                           onClick={this.props.onMenuTogglerClick}/>


                <HeaderTabs/>

                <div onClick={() => this.props.openTab({
                    type: "newTicket",
                    title: "new ticket",
                    UID: `newTicket`
                })} style={{display: "flex", alignItems: "center", paddingLeft: "10px"}}>
                    <Icon name='add' color="grey"/>
                    <p>new</p>
                </div>


                <Menu.Menu position='right'>

                    <Dropdown trigger={<Image src={(this.props.user).avatar} alt={(this.props.user).name} avatar/>}
                              icon={null} className='link item' direction='left'>
                        <Dropdown.Menu>
                            <Dropdown.Header content='Account'/>
                            <Dropdown.Divider/>
                            <ProfileModal user={this.props.user}/>
                            <Dropdown.Item icon='lock' onClick={this.logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Menu>

            </Menu>
        );
    }
}


const mapStateToProps = ({user}) => {
    return {
        user: user.user || {}
    };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({openTab, loadTickets}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
