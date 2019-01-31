import React, {Component} from 'react';
import {
  Col,
  Button,
  Label,
  Input,
  FormGroup,
  ModalFooter,
  ModalHeader,
  ModalBody,
  Modal
} from 'reactstrap';
import {getApi} from "../../../api";
import {connect} from "react-redux";
// import SearchBar from 'material-ui-search-bar'

class SearchField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      value: "",
    }
  }
  onValueChanged=(event)=>{
    this.setState({value: event.target.value})
  };

  render() {
    return (

          <FormGroup row>
            <Col>
              {/*<SearchBar*/}
                {/*onChange={() => console.log('onChange')}*/}
                {/*onRequestSearch={() => console.log('onRequestSearch')}*/}
                {/*placeholder="Search Ticket"*/}
                {/*style={{*/}
                  {/*margin: '0 auto',*/}
                  {/*maxWidth: 800*/}
                {/*}}*/}
              {/*/>*/}
            </Col>
          </FormGroup>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    user: user.user||{}
  };
};


export default connect(mapStateToProps)(SearchField);
