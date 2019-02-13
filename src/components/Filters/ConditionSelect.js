import React, {Component, Fragment} from 'react';
import {Form, Button, Label} from 'semantic-ui-react';
import {withRouter} from "react-router-dom";
import Select, {components} from 'react-select';
import conditions from './conditions';
import {getApi} from "../../api";
import {LOGIN} from "../../actions/UserActions";
import {getPriorityOptions, getStatusOptions} from "../utils";

class FilterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            field: null,
            operation: null,
            value: "",
            selected_value: {}
        }
    }


    getConditionOption() {
        let options = [];
        conditions.map(condition => options.push({
            value: condition.value,
            label: condition.label,
            operations: condition.operations.map((operation) => {
                return {"value": operation, "label": operation}
            }),
            value_choices:condition.value_choices,
            value_type:condition.value_type,
        }));
        return options

    }

    onFieldSelectChange = (selectedOption) => {
        this.setState({field: selectedOption, operation: null, value: "",selected_value:{}});
    };
    onOperationSelectChange = (selectedOption) => {
        this.setState({operation: selectedOption, value: "",selected_value:{}});
    };
    onValueSelectChange = (selectedOption) => {
        this.setState({selected_value: selectedOption},()=> this.props.onChange({
            field: this.state.field.value,
            operation: this.state.operation.value,
            value: this.state.selected_value.value,
            value_type:this.state.field.value_type
        }));
    };
    onValueChange = (value) => {
        this.setState({value}, () => this.props.onChange({
            field: this.state.field.value,
            operation: this.state.operation.value,
            value: this.state.value,
            value_type:this.state.field.value_type
        }));

    };

    onSubmit = () => {
        getApi().post(`filter/`, {
            field: this.state.field.value,
            operation: this.state.operation.value,
            value: this.state.value
        })
            .then(response => {
                console.log(response)
            })
            .catch((response) => {
                console.log(response)

            });
    };

    renderOperationSelect() {
        if (this.state.field !== null) {
            return (
                <div style={{width: "200px", marginRight: "10px"}}>
                    <Select
                        value={this.state.operation}
                        onChange={this.onOperationSelectChange}
                        options={this.state.field.operations}
                    />
                </div>
            )
        }
    }

    renderInput() {
        if (this.state.field !== null) {
            console.log(this.state.field)
            if(this.state.field.value_choices){
                let options=[];
                switch (this.state.field.value_choices) {
                    case "priority":
                        options=getPriorityOptions();
                        break;
                    case "status":
                        options=getStatusOptions()
                }
                return(
                    <div style={{width: "200px", marginRight: "10px"}}>
                        <Select
                            value={this.state.selected_value}
                            onChange={this.onValueSelectChange}
                            options={options}
                        />
                    </div>
                )
            }
            else {
                return (
                    <Form.Field>
                        <input value={this.state.value}
                               onChange={(event) => this.onValueChange(event.target.value)}/>
                    </Form.Field>
                )
            }
        }
    }

    render() {
        return (
            <div style={{display: "flex", marginBottom: "20px"}}>
                <div style={{width: "200px", marginRight: "10px"}}>
                    <Select
                        value={this.state.field}
                        onChange={this.onFieldSelectChange}
                        options={this.getConditionOption()}
                    />
                </div>

                {this.renderOperationSelect()}
                {this.renderInput()}
                <Button onClick={() => this.onSubmit()}>evaluate</Button>
            </div>


        );
    }
}


export default withRouter(FilterForm);

