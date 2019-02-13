import React, {Component, Fragment} from 'react';
import {Icon, Menu, Sidebar} from 'semantic-ui-react'
import {Link, withRouter} from 'react-router-dom'

class ShookaSideBar extends Component {
    renderItems = () => {
        return this.props.navigation.items.map((nav) =>
            <Link to={nav.url}>
                <Menu.Item as='a' active={this.props.location.pathname.startsWith(nav.url)} style={{
                    minWidth: 0,
                    height: "55px",
                    padding:"0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>

                    <Icon name={nav.icon} className="shooka"/>
                </Menu.Item>
            </Link>
        )
    };

    render() {
        console.log(this.props.location);
        return (
            <Sidebar
                borderless
                className="shooka"
                as={Menu}
                animation='push'
                inverted
                vertical
                visible={this.props.visible}
            >
                {this.renderItems()}
            </Sidebar>


        );
    }
}

export default withRouter(ShookaSideBar)
