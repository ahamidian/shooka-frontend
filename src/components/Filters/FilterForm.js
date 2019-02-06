import React, {Component, Fragment} from 'react';
import {Form, Button, Label} from 'semantic-ui-react';
import {getApi} from "../../api";
import {withRouter} from "react-router-dom";
import ConditionSelect from "./ConditionSelect";

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastIndex: 0,
            loading: true,
            title: "",
            conditions: [],
            conditionsData: {},
            groupBy: null,
            orderBy: null
        }
    }

    // componentDidMount(){
    //     if( this.props.match.params.id ){
    //         getApi().get(`team/${this.props.match.params.id}`, true)
    //             .then(response => {
    //                 if(response.status===200) {
    //                     this.setState({name:response.data.name})
    //                 }
    //             })
    //             .catch((resp) => {
    //                 console.log(resp);
    //             });
    //     }
    // }

    onSaveClick = () => {

        getApi().post(`triggers/`, {
            name: this.state.title,
            clauses: [
                {
                    singles: Object.values(this.state.conditionsData)
                }
            ]
        })
            .then(response => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)

            });
    };

    onInputChange = (data, id) => {
        let {conditionsData} = this.state;
        conditionsData[id] = data;
        this.setState({conditionsData: conditionsData})
    };

    onAddConditionClick = () => {
        let id = this.state.lastIndex;
        this.setState({
            lastIndex: id + 1,
            conditions: [...this.state.conditions,
                <ConditionSelect key={id} onChange={(data) => this.onInputChange(data, id)}/>
            ]
        })
    };
    renderConditions = () => {
        return this.state.conditions.map((condition => condition));
    };

    render() {
        return (
            <div>
                <div>
                    <h3 style={{display: "contents"}}>Create Filter</h3>
                </div>
                <Form>
                    <Form.Field>
                        <label>Title</label>
                        <input placeholder='Title' value={this.state.title}
                               onChange={(event) => this.setState({title: event.target.value})}/>
                    </Form.Field>
                    {this.renderConditions()}
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                        <Button positive onClick={this.onAddConditionClick}>Add Condition</Button>
                    </div>
                    <Button className="bg-primary" onClick={this.onSaveClick}>save</Button>
                </Form>
            </div>
        );
    }
}


export default withRouter(FilterForm);

