import React, {Component} from 'react';
import "./MyCss.css"
import {changeTab, closeTab} from "../../actions/LayoutActions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Tab from "./Tab";
import Ticket2 from "../Tickets/Ticket2";
import Tickets2 from "../Tickets/Tickets2";
import User2 from "../Users/User2";
import NewTicket from "../Tickets/NewTicket";

class TabLayout extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      scrollRight: false,
      scrollLeft: false
    }

  }

  componentDidMount() {
    // this.myRef.current.addEventListener('scroll', (event) => {
    //   this.setState({
    //     scrollLeft: this.myRef.current.scrollLeft > 0,
    //     scrollRight: this.myRef.current.offsetWidth + this.myRef.current.scrollLeft < this.myRef.current.scrollWidth
    //   });
    // });

  }

  // toggle = (tab) => {
  //   if (this.props.layout.activeTab !== tab.UID) {
  //     this.props.changeTab(tab.UID)
  //   }
  // };
  //
  // onRightClick = () => {
  //   this.myRef.current.scrollLeft = this.myRef.current.scrollLeft + (this.myRef.current.offsetWidth - 50);
  //
  // };
  // onLeftClick = () => {
  //   this.myRef.current.scrollLeft = this.myRef.current.scrollLeft - (this.myRef.current.offsetWidth - 50);
  //
  // };
  // generateTabs = () => {
  //
  //   return this.props.layout.tabs.map((tab) =>
  //
  //     <Tab
  //       active={this.props.layout.activeTab === tab.UID} title={tab.title}
  //       type={tab.type}
  //       onClose={() => this.props.closeTab(tab.UID)}
  //       onClick={() => this.toggle(tab)}>
  //     </Tab>
  //   )
  // };

  generateTabContent = () => {
    let tab = this.props.layout.tabs.find((tab) => tab.UID === this.props.layout.activeTab);


    if (!tab) {
      return;
    }
    if (tab.type === "ticket") {
      return <Ticket2 id={tab.data.id}/>
    }
    else if (tab.type === "user") {
      return <User2 id={tab.data.id}/>
    }
    else if (tab.type === "ticketList") {
      return <Tickets2 query={tab.data.query}/>
    }
    else if (tab.type === "newTicket") {
        return <NewTicket/>
    }

  };


  render() {


    //
    // if (this.myRef.current&&  this.props.layout.tabs.length*130 > this.myRef.current.offsetWidth + this.myRef.current.scrollLeft  &&!this.state.scrollRight) {
    //   this.setState({
    //     scrollRight: true
    //   });
    // }
    return (
      <div style={{padding: "0"}}>
        {/*<div>*/}
          {/*{this.state.scrollLeft &&*/}
          {/*<button onClick={this.onLeftClick} style={{*/}
            {/*position: "absolute",*/}
            {/*left: "10px",*/}
            {/*top: "10px",*/}
            {/*zIndex: "1",*/}
          {/*}}>o*/}
          {/*</button>*/}
          {/*}*/}
          {/*{this.state.scrollRight &&*/}
          {/*<button onClick={this.onRightClick} style={{*/}
            {/*position: "absolute",*/}
            {/*right: "20px",*/}
            {/*top: "10px",*/}
            {/*zIndex: "10",*/}
          {/*}}>o*/}
          {/*</button>*/}
          {/*}*/}
          {/*<ul className="nav nav-tabs MyNav" ref={this.myRef}>*/}
            {/*{this.generateTabs()}*/}
          {/*</ul>*/}
        {/*</div>*/}
        <div style={{padding: "0"}}>

        {this.generateTabContent()}
        </div>
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


export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);

